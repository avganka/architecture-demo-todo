import type { CategoryDto } from '@/api/category/category.dto';
import type { TodoDto } from '@/api/todos/todos.dto';
import { TodoModal } from '@/modules/components/TodoModal/TodoModal';
import { TodoSkeleton } from '@/shared/components/skeletons/TodoSkeleton/TodoSkeleton';
import { observer } from 'mobx-react-lite';

import { TodoItem } from '../TodoItem/TodoItem';
import styles from './TodoList.module.css';

interface TodoListProps {
  todos: TodoDto[];
  isLoading: boolean;
  onTodoClick: (id: number) => void;
  categories?: CategoryDto[];
}

export const TodoList = observer((props: TodoListProps) => {
  const { todos, isLoading, onTodoClick, categories } = props;

  if (isLoading) {
    return <TodoSkeleton />;
  }

  if (todos.length === 0) {
    return <p>No todos found</p>;
  }

  return (
    <>
      <ul className={styles.todoList}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`${styles.todoItem} ${
              todo.completed ? styles.completed : styles.pending
            }`}
          >
            <TodoItem
              todo={todo}
              category={categories?.find(
                (category) => category.id === todo.categoryId,
              )}
              onClick={onTodoClick}
            />
          </li>
        ))}
      </ul>

      <TodoModal />
    </>
  );
});
