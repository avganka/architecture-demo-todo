import { apiInstance } from '../api-instance';
import { TodoDto } from './todos.dto';

export const todosApi = {
  getTodos: async (query: string, signal?: AbortSignal): Promise<TodoDto[]> => {
    return await apiInstance<TodoDto[]>(
      `/todos${query ? '?title_like=' + encodeURIComponent(query) : ''}`,
      { signal },
    );
  },

  getTodoById: async (id: number, signal?: AbortSignal): Promise<TodoDto> => {
    return await apiInstance<TodoDto>(`/todos/${id}`, { signal });
  },

  createTodo: async (todo: Omit<TodoDto, 'id'>): Promise<TodoDto> => {
    return await apiInstance<TodoDto>('/todos', {
      method: 'POST',
      json: todo,
    });
  },

  updateTodo: async (id: number, todo: Partial<TodoDto>): Promise<TodoDto> => {
    return await apiInstance<TodoDto>(`/todos/${id}`, {
      method: 'PATCH',
      json: todo,
    });
  },

  deleteTodo: async (id: number): Promise<void> => {
    await apiInstance<void>(`/todos/${id}`, {
      method: 'DELETE',
    });
  },
};
