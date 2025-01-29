import { TodoDto } from '@/api/todos/todos.dto';
import { AppStartup } from '../root/AppStartup';

export type TodoFilter = 'all' | 'completed' | 'active';

export interface TodoService extends AppStartup {
  todos: TodoDto[];
  selectedTodo: TodoDto | null;
  todosIsLoading: boolean;
  detailsIsLoading: boolean;
  searchQuery: string;
  filter: TodoFilter;
  filteredTodos: TodoDto[];
  getTodos: () => Promise<TodoDto[]>;
  getTodoById: (id: number) => Promise<TodoDto | null>;
  createTodo: (todo: Omit<TodoDto, 'id'>) => Promise<TodoDto>;
  updateTodo: (id: number, todo: Partial<TodoDto>) => Promise<TodoDto>;
  deleteTodo: (id: number) => Promise<void>;
  searchTodos: (query: string) => Promise<TodoDto[]>;
  setSearchQuery: (query: string) => void;
  setFilter: (filter: TodoFilter) => void;
}
