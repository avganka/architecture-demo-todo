import { apiInstance } from '../api-instance';
import type { CategoryDto } from './category.dto';

export const categoryApi = {
  getCategories: async (signal?: AbortSignal) => {
    return await apiInstance<CategoryDto[]>('/categories', { signal });
  },
  getCategory: async (id: number, signal?: AbortSignal) => {
    return await apiInstance<CategoryDto>(`/categories/${id.toString()}`, {
      signal,
    });
  },
};
