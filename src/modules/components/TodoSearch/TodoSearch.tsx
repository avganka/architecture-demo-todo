import { useRoot } from '@/shared/context/root';
import debounce from 'lodash/debounce';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';

import styles from './TodoSearch.module.css';

export const TodoSearch = observer(() => {
  const { todoService } = useRoot();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      todoService.setSearchQuery(value);
    }, 300),
    [todoService],
  );

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Search todos..."
        defaultValue={todoService.searchState.query}
        onChange={(e) => debouncedSearch(e.target.value)}
        className={styles.input}
      />
      {todoService.searchState.query && (
        <button
          className={styles.clear}
          onClick={() => {
            todoService.setSearchQuery('');
            const input = document.querySelector('input');
            if (input) input.value = '';
            debouncedSearch.cancel();
          }}
        >
          ×
        </button>
      )}
    </div>
  );
});
