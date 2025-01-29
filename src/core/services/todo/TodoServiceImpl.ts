import { todosApi } from '@/api/todos/todos';
import { makeAutoObservable } from 'mobx';

import { StateQueryManager } from '../state-query-manager/StateQueryManager';
import { TodoService } from './TodoService';
import { TodoFilter } from './TodoService';

export class TodoServiceImpl implements TodoService {
  private _selectedTodoId: number | null = null;
  private _searchQuery = '';
  private _filter: TodoFilter = 'all';

  private _todosState = new StateQueryManager(() => ({
    queryKey: ['todos', this._searchQuery],
    queryFn: async (meta) =>
      await todosApi.getTodos(this._searchQuery, meta.signal),
    staleTime: 1000,
  }));

  private _selectedTodoState = new StateQueryManager(() => ({
    queryKey: ['todos', this._selectedTodoId],
    queryFn: async (meta) => {
      if (!this._selectedTodoId) return null;
      return await todosApi.getTodoById(this._selectedTodoId, meta.signal);
    },
    enabled: !!this._selectedTodoId,
    staleTime: 1000,
  }));

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get searchQuery() {
    return this._searchQuery;
  }

  get filter() {
    return this._filter;
  }

  get todos() {
    return this._todosState.results.data ?? [];
  }

  get isTodosLoading() {
    return this._todosState.results.isPending;
  }

  get selectedTodo() {
    return this._selectedTodoState.results.data ?? null;
  }

  get selectedTodoId() {
    return this._selectedTodoId;
  }

  get isSelectedTodoLoading() {
    return this._selectedTodoState.results.isPending;
  }

  get filteredTodos() {
    switch (this.filter) {
      case 'completed':
        return this.todos.filter((todo) => todo.completed);
      case 'active':
        return this.todos.filter((todo) => !todo.completed);
      default:
        return this.todos;
    }
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
}
