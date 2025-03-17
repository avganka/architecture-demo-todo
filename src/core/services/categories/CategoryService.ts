import type { CategoryDto } from '@/api/category/category.dto';

export interface CategoryService {
  readonly category: CategoryDto | null;
  readonly categories: CategoryDto[];

  setCategoryId: (id: number) => void;
}
