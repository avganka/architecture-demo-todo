import { TodoDto } from '@/api/todos/todos.dto';
import { TodoFilter } from '@/core/services/todo/TodoService';

import styles from './TodoTabs.module.css';

const tabs: { value: TodoFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
];

type TodoTabsProps = {
  todos: TodoDto[];
  filter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
};

export const TodoTabs = (props: TodoTabsProps) => {
  const { todos, filter, onFilterChange } = props;

  return (
    <div className={styles.tabs}>
      {tabs.map(({ value, label }) => (
        <button
          key={value}
          className={`${styles.tab} ${filter === value ? styles.active : ''}`}
          onClick={() => onFilterChange(value)}
        >
          {label}
          <span className={styles.count}>
            {value === 'all'
              ? todos.length
              : value === 'completed'
                ? todos.filter((todo) => todo.completed).length
                : todos.filter((todo) => !todo.completed).length}
          </span>
        </button>
      ))}
    </div>
  );
};
