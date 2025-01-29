import { TodoDto } from '@/api/todos/todos.dto';
import { observer } from 'mobx-react-lite';

import styles from './TodoList.module.css';

type TodoListProps = {
  todos: TodoDto[];
  isLoading: boolean;
  onTodoClick: (id: number) => void;
};

export const TodoList = observer((props: TodoListProps) => {
  const { todos, isLoading, onTodoClick } = props;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (todos.length === 0) {
    return <p>No todos found</p>;
  }

  return (
    <ul className={styles.todoList}>
      {todos.map((todo) => (
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
