import { categoryApi } from '@/api/category/category';

import { QueryManager } from '../state-query-manager/QueryManager';
import type { CategoryService } from './CategoryService';

export class CategoryServiceImpl implements CategoryService {
  private _categoryId: number | null = null;

  private _categoriesQuery = new QueryManager(() => ({
    queryKey: ['categories', 'list'],
    queryFn: async (meta) => {
      return await categoryApi.getCategories(meta.signal);
    },
    staleTime: 1000,
  }));

  private _categoryQuery = new QueryManager(() => ({
    queryKey: ['categories', this._categoryId],
    queryFn: async (meta) => {
      if (!this._categoryId) return null;
      return await categoryApi.getCategory(this._categoryId, meta.signal);
    },
    enabled: !!this._categoryId,
  }));

  get categories() {
    return this._categoriesQuery.results.data ?? [];
  }

  get category() {
    return this._categoryQuery.results.data ?? null;
  }

  setCategoryId(id: number) {
    this._categoryId = id;
  }
}
