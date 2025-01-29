import { TodoFilter } from '@/core/services/todo/TodoService';
import { useRoot } from '@/shared/context/root';
import { observer } from 'mobx-react-lite';

import styles from './TodoTabs.module.css';

const tabs: { value: TodoFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
];

export const TodoTabs = observer(() => {
  const { todoService } = useRoot();

  return (
    <div className={styles.tabs}>
      {tabs.map(({ value, label }) => (
        <button
          key={value}
          className={`${styles.tab} ${todoService.filter === value ? styles.active : ''}`}
          onClick={() => todoService.setFilter(value)}
        >
          {label}
          <span className={styles.count}>
            {value === 'all'
              ? todoService.todos.length
              : value === 'completed'
                ? todoService.todos.filter((todo) => todo.completed).length
                : todoService.todos.filter((todo) => !todo.completed).length}
          </span>
        </button>
      ))}
    </div>
  );
});
