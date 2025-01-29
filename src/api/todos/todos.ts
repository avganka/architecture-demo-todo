import { jsonApiInstance } from '../api-instance';
import { TodoDto } from './todos.dto';

const API_URL = 'http://localhost:3001';

export const todosApi = {
  getTodos: async (): Promise<TodoDto[]> => {
    return await jsonApiInstance<TodoDto[]>('/todos');
  },

  getTodoById: async (id: number): Promise<TodoDto> => {
    return await jsonApiInstance<TodoDto>(`/todos/${id}`);
  },

  createTodo: async (todo: Omit<TodoDto, 'id'>): Promise<TodoDto> => {
    return await jsonApiInstance<TodoDto>('/todos', {
      method: 'POST',
      json: todo,
    });
  },

  updateTodo: async (id: number, todo: Partial<TodoDto>): Promise<TodoDto> => {
    return await jsonApiInstance<TodoDto>(`/todos/${id}`, {
      method: 'PATCH',
      json: todo,
    });
  },

  deleteTodo: async (id: number): Promise<void> => {
    await jsonApiInstance<void>(`/todos/${id}`, {
      method: 'DELETE',
    });
  },

  searchTodos: async (query: string): Promise<TodoDto[]> => {
    const response = await fetch(
      `${API_URL}/todos?title_like=${encodeURIComponent(query)}`,
    );
    return response.json();
  },
};
