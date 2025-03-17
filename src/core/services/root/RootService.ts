import type { CategoryService } from '../categories/CategoryService';
import { CategoryServiceImpl } from '../categories/CategoryServiceImpl';
import type { TodoService } from '../todo/TodoService';
import { TodoServiceImpl } from '../todo/TodoServiceImpl';
import type { AppStartup } from './AppStartup';

export class RootService implements ServiceRegistry, AppStartup {
  readonly todoService: TodoService = new TodoServiceImpl(this);
  readonly categoryService: CategoryService = new CategoryServiceImpl();

  constructor() {
    this.init();
  }

  // Методы, которые нужно вызвать при инициализации приложения
  init() {
    this.categoryService.setCategoryId(1);
  }
}

export type ServiceRegistry = InstanceType<typeof RootService>;

export const rootService = new RootService();
