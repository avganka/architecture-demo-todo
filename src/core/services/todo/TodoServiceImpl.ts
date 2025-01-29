import { todosApi } from '@/api/todos/todos';
import { TodoDto } from '@/api/todos/todos.dto';
import { makeAutoObservable } from 'mobx';

import { MutationManager } from '../state-query-manager/MutationManager';
import { QueryManager } from '../state-query-manager/QueryManager';
import { TodoService } from './TodoService';
import { TodoFilter } from './TodoService';

export class TodoServiceImpl implements TodoService {
  private _filter: TodoFilter = 'all';
  private _searchQuery = '';
  private _selectedTodoId: number | null = null;

  private _todosQuery = new QueryManager(() => ({
    queryKey: ['todos', this._searchQuery],
    queryFn: async (meta) =>
      await todosApi.getTodos(this._searchQuery, meta.signal),
    staleTime: 1000,
  }));

  private _selectedTodoQuery = new QueryManager(() => ({
    queryKey: ['todos', this._selectedTodoId],
    queryFn: async (meta) => {
      if (!this._selectedTodoId) return null;
      return await todosApi.getTodoById(this._selectedTodoId, meta.signal);
    },
    enabled: !!this._selectedTodoId,
    staleTime: 1000,
  }));

  private _createTodoMutation = new MutationManager(() => ({
    mutationFn: async (todo: Pick<TodoDto, 'title' | 'completed'>) => {
      return await todosApi.createTodo({ ...todo, userId: 1 });
    },
    onSuccess: () => {
      this._todosQuery.fetch();
    },
  }));

  private _updateTodoMutation = new MutationManager(() => ({
    mutationFn: async (todo: Partial<TodoDto>) => {
      return await todosApi.updateTodo(todo);
    },
    /**
     *  Пример оптимистичного обновления
     *  https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates
     */
    onMutate: (newTodo) => {
      // Отменяем текущие запросы, чтобы они не перезаписали оптимистичное обновление
      this._todosQuery.cancelQuery();
      this._selectedTodoQuery.cancelQuery();

      // Сохраняем предыдущее состояние
      const previousTodos = this._todosQuery.results.data;
      const previousSelectedTodo = this._selectedTodoQuery.results.data;

      // Оптимистично обновляем состояния
      if (previousTodos) {
        const updatedTodos = previousTodos.map((todo) =>
          todo.id === newTodo.id ? { ...todo, ...newTodo } : todo,
        );
        this._todosQuery.setData(updatedTodos);
      }

      if (previousSelectedTodo && previousSelectedTodo.id === newTodo.id) {
        this._selectedTodoQuery.setData({
          ...previousSelectedTodo,
          ...newTodo,
        });
      }

      // Возвращаем контекст для отката
      return { previousTodos, previousSelectedTodo };
    },
    onError: (_, __, context) => {
      // В случае ошибки откатываем изменения
      if (context) {
        this._todosQuery.setData(context.previousTodos);
        this._selectedTodoQuery.setData(context.previousSelectedTodo);
      }
    },
    onSettled: () => {
      // После завершения (успех/ошибка) обновляем данные с сервера
      this._todosQuery.fetch();
      this._selectedTodoQuery.fetch();
    },
  }));

  private _deleteTodoMutation = new MutationManager(() => ({
    mutationFn: async (todoId: number) => {
      return await todosApi.deleteTodo(todoId);
    },
    // Пример обновления данных после завершения мутации
    onSuccess: () => {
      this._todosQuery.fetch();
    },
  }));

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get todoState() {
    return {
      data: this._todosQuery.results.data ?? [],
      isLoading: this._todosQuery.results.isPending,
      filtered: this._getFilteredTodos(this._todosQuery.results.data ?? []),
    };
  }

  get selectedTodoState() {
    return {
      id: this._selectedTodoId,
      data: this._selectedTodoQuery.results.data ?? null,
      isLoading: this._selectedTodoQuery.results.isPending,
    };
  }

  get searchState() {
    return {
      query: this._searchQuery,
      filter: this._filter,
    };
  }

  setSelectedTodoId(id: number | null) {
    this._selectedTodoId = id;
  }

  setFilter(filter: TodoFilter) {
    this._filter = filter;
  }

  setSearchQuery(query: string) {
    this._searchQuery = query;
  }

  createTodo(todo: Pick<TodoDto, 'title' | 'completed'>) {
    this._createTodoMutation.mutate(todo);
  }

  updateTodo(todo: Partial<TodoDto>) {
    this._updateTodoMutation.mutate(todo);
  }

  deleteTodo(todoId: number) {
    this._deleteTodoMutation.mutate(todoId);
  }

  private _getFilteredTodos(todos: TodoDto[]) {
    switch (this._filter) {
      case 'completed':
        return todos.filter((todo) => todo.completed);
      case 'active':
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  }
}
