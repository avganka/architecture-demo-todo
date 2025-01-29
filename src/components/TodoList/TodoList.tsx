import { useRoot } from '@/shared/context/root';
import { observer } from 'mobx-react-lite';

import styles from './TodoList.module.css';

interface TodoListProps {
  onTodoClick: (id: number) => void;
}

export const TodoList = observer(({ onTodoClick }: TodoListProps) => {
  const { todoService } = useRoot();

  if (todoService.todosIsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <ul className={styles.todoList}>
      {todoService.filteredTodos.map((todo) => (
        <li
          key={todo.id}
          className={`${styles.todoItem} ${
            todo.completed ? styles.completed : styles.pending
          }`}
          onClick={() => onTodoClick(todo.id)}
        >
          <span className={styles.todoTitle}>{todo.title}</span>
          <span className={styles.todoStatus}>
            {todo.completed ? '✓' : '!'}
          </span>
        </li>
      ))}
    </ul>
  );
});
