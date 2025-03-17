import { TodoList } from '@/shared/components/TodoList/TodoList';
import { useRoot } from '@/shared/context/root';
import { observer } from 'mobx-react-lite';

import styles from './CategoryContainer.module.css';

// interface CategoryContainerProps {
//   category: string;
// }

export const CategoryContainer = observer(() => {
  const { categoryService, todoService } = useRoot();

  return (
    <>
      <div className={styles.content}>
        <h1 className={styles.title}>{categoryService.category?.name}</h1>
        <p className={styles.description}>
          {categoryService.category?.description}
        </p>
      </div>

      <TodoList
        todos={todoService.todoState.filteredByUser}
        isLoading={todoService.todoState.isLoading}
        onTodoClick={todoService.setSelectedTodoId}
      />
    </>
  );
});
