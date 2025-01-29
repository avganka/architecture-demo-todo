import { TodoDto } from '@/api/todos/todos.dto';

export type TodoFilter = 'all' | 'completed' | 'active';

export interface TodoService {
  readonly searchQuery: string;
  readonly todos: TodoDto[];
  readonly selectedTodo: TodoDto | null;
  readonly selectedTodoId: number | null;
  readonly filter: TodoFilter;
  readonly filteredTodos: TodoDto[];
  readonly isTodosLoading: boolean;
  readonly isSelectedTodoLoading: boolean;

  setSelectedTodoId: (id: number | null) => void;
  setSearchQuery: (query: string) => void;
  setFilter: (filter: TodoFilter) => void;
}
