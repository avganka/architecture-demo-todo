import { TodoService } from '../todo/TodoService';
import { TodoServiceImpl } from '../todo/TodoServiceImpl';
import { AppStartup } from './AppStartup';

export class RootService implements ServiceRegistry, AppStartup {
  readonly todoService: TodoService = new TodoServiceImpl(this);

  constructor() {
    this.init();
  }

  init() {
    this.todoService.init();
  }
}

export type ServiceRegistry = InstanceType<typeof RootService>;

export const rootService = new RootService();
