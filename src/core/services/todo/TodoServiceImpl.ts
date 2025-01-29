import { todosApi } from '@/api/todos/todos';
import { TodoDto } from '@/api/todos/todos.dto';
import { makeAutoObservable } from 'mobx';

import { ServiceRegistry } from '../root/RootService';
import { TodoService } from './TodoService';
import { TodoFilter } from './TodoService';

export class TodoServiceImpl implements TodoService {
  todos: TodoDto[] = [];
  selectedTodo: TodoDto | null = null;
  todosIsLoading = false;
  detailsIsLoading = false;
  searchQuery = '';
  filter: TodoFilter = 'all';

  // private _searchResult = new MobxQueryImpl(() => ({
  //   queryKey: ["search"],
  //   queryFn: async () =>
  //     await fetch(
  //       `https://jsonplaceholder.typicode.com/posts/?userId=${1}`
  //     ).then((response) => response.json() as Promise<User[]>),
  // }));

  constructor(private readonly _root: ServiceRegistry) {
    makeAutoObservable(this);
  }

  // get searchResult() {
  //   return this._searchResult.results?.data ?? [];
  // }

  // async search(query: string) {
  //   this._searchResult.init();
  //   console.log(this._searchResult.results);
  //   const client = new MobxQueryImpl(() => ({
  //     queryKey: ['search', query],
  //     queryFn: async () =>
  //       await fetch(
  //         `https://jsonplaceholder.typicode.com/posts/?userId=${query}`,
  //       ).then((response) => response.json() as Promise<User[]>),
  //   }));

  //   const results = await client.fetch();

  //   const results = await client.getResult();
  //     queryKey: ['search', query],
  //     queryFn: () =>
  //       fetch(
  //         `https://jsonplaceholder.typicode.com/posts/?userId=${query}`,
  //       ).then((response) => response.json() as Promise<User[]>),
  //   }));

  //   console.log({ results });

  //   runInAction(() => {
  //     this._searchResult = results.data ?? [];
  //   });
  // }

  init() {
    this.getTodos();
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
    if (query) {
      this.searchTodos(query);
    } else {
      this.getTodos();
    }
  }

  async searchTodos(query: string): Promise<TodoDto[]> {
    this.todosIsLoading = true;
    try {
      this.todos = await todosApi.searchTodos(query);
      return this.todos;
    } finally {
      this.todosIsLoading = false;
    }
  }

  async createTodo(todo: Omit<TodoDto, 'id'>): Promise<TodoDto> {
    return await todosApi.createTodo(todo);
  }

  async getTodos(): Promise<TodoDto[]> {
    this.todosIsLoading = true;
    try {
      this.todos = await todosApi.getTodos();
      return this.todos;
    } finally {
      this.todosIsLoading = false;
    }
  }

  async getTodoById(id: number): Promise<TodoDto | null> {
    this.detailsIsLoading = true;
    try {
      this.selectedTodo = await todosApi.getTodoById(id);
      return this.selectedTodo ?? null;
    } finally {
      this.detailsIsLoading = false;
    }
  }

  async updateTodo(id: number, todo: Partial<TodoDto>): Promise<TodoDto> {
    const updatedTodo = await todosApi.updateTodo(id, todo);
    this.todos = this.todos.map((t) => (t.id === id ? updatedTodo : t));
    if (this.selectedTodo?.id === id) {
      this.selectedTodo = updatedTodo;
    }
    return updatedTodo;
  }

  async deleteTodo(id: number): Promise<void> {
    await todosApi.deleteTodo(id);
    this.todos = this.todos.filter((t) => t.id !== id);
    if (this.selectedTodo?.id === id) {
      this.selectedTodo = null;
    }
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

  setFilter(filter: TodoFilter) {
    this.filter = filter;
  }
}
