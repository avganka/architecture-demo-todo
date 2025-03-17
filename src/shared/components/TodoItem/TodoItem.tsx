import type { CategoryDto } from '@/api/category/category.dto';
import type { TodoDto } from '@/api/todos/todos.dto';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';

import styles from './TodoItem.module.css';

interface TodoItemProps {
  todo: TodoDto;
  category?: CategoryDto;
  onClick: (id: number) => void;
}

export const TodoItem = observer((props: TodoItemProps) => {
  const { todo, onClick, category } = props;

  return (
    <div
      className={`${styles.todoItem} ${
        todo.completed ? styles.completed : styles.pending
      }`}
      onClick={() => {
        onClick(todo.id);
      }}
    >
      <span className={styles.todoTitle}>{todo.title}</span>
      {category && (
        <Link
          href={`/category/${category.name.toLowerCase()}?id=${category.id.toString()}`}
          className={styles.todoCategory}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          {category.name}
        </Link>
      )}
      <span className={styles.todoStatus}>{todo.completed ? '✓' : '!'}</span>
    </div>
  );
});
