import { TodoService } from '../todo/TodoService';
import { TodoServiceImpl } from '../todo/TodoServiceImpl';
import { AppStartup } from './AppStartup';

export class RootService implements ServiceRegistry, AppStartup {
  readonly todoService: TodoService = new TodoServiceImpl();

  constructor() {
    this.init();
  }

  // Методы, которые нужно вызвать при инициализации приложения
  init() {}
}

export type ServiceRegistry = InstanceType<typeof RootService>;

export const rootService = new RootService();
