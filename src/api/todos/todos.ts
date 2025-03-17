import { apiInstance } from '../api-instance';
import type { TodoDto } from './todos.dto';

export const todosApi = {
  getTodos: async (query: string, signal?: AbortSignal): Promise<TodoDto[]> => {
    return await apiInstance<TodoDto[]>(
      `/todos${query ? '?title_like=' + encodeURIComponent(query) : ''}`,
      { signal },
    );
  },

  getTodoById: async (id: number, signal?: AbortSignal): Promise<TodoDto> => {
    return await apiInstance<TodoDto>(`/todos/${id.toString()}`, { signal });
  },

  createTodo: async (todo: Omit<TodoDto, 'id'>): Promise<TodoDto> => {
    return await apiInstance<TodoDto>('/todos', {
      method: 'POST',
      json: todo,
    });
  },

  updateTodo: async (
    todo: Partial<TodoDto> & { id: number },
  ): Promise<TodoDto> => {
    return await apiInstance<TodoDto>(`/todos/${todo.id.toString()}`, {
      method: 'PATCH',
      json: todo,
    });
  },

  deleteTodo: async (id: number): Promise<void> => {
    await apiInstance(`/todos/${id.toString()}`, {
      method: 'DELETE',
    });
  },
};
