import { TodoDto } from '@/api/todos/todos.dto';

export type TodoFilter = 'all' | 'completed' | 'active';

export interface TodoState {
  data: TodoDto[];
  isLoading: boolean;
  filtered: TodoDto[];
}

export interface DetailTodoState {
  data: TodoDto | null;
  isLoading: boolean;
  id: number | null;
}

export interface SearchState {
  query: string;
  filter: TodoFilter;
}

export interface TodoService {
  readonly todoState: TodoState;
  readonly selectedTodoState: DetailTodoState;
  readonly searchState: SearchState;

  setSelectedTodoId: (id: number | null) => void;
  setSearchQuery: (query: string) => void;
  setFilter: (filter: TodoFilter) => void;

  updateTodo: (todo: Partial<TodoDto>) => void;
  deleteTodo: (todoId: number) => void;
  createTodo: (todo: Pick<TodoDto, 'title' | 'completed'>) => void;
}
