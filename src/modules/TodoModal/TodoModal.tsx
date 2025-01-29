import { useRoot } from '@/shared/context/root';
import { observer } from 'mobx-react-lite';

import styles from './TodoModal.module.css';
import { TodoSkeleton } from './TodoSkeleton';

export const TodoModal = observer(() => {
  const { todoService } = useRoot();

  const onClose = () => {
    todoService.setSelectedTodoId(null);
  };

  if (!todoService.selectedTodoId) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        {todoService.isSelectedTodoLoading ? (
          <TodoSkeleton />
        ) : todoService.selectedTodo ? (
          <>
            <h2>Todo #{todoService.selectedTodo.id}</h2>
            <p className={styles.title}>{todoService.selectedTodo.title}</p>
            <div className={styles.actions}>
              <label className={styles.status}>
                <input
                  type="checkbox"
                  checked={todoService.selectedTodo.completed}
                  // onChange={() =>
                  //   todoService.updateTodo(todoService.selectedTodo!.id, {
                  //     completed: !todoService.selectedTodo!.completed,
                  //   })
                  // }
                />
                Status:{' '}
                {todoService.selectedTodo.completed ? 'Completed' : 'Pending'}
              </label>
              <button
                className={styles.deleteButton}
                // onClick={async () => {
                //   await todoService.deleteTodo(todoService.selectedTodo!.id);
                //   onClose();
                // }}
              >
                Delete Todo
              </button>
            </div>
          </>
        ) : (
          <p className={styles.error}>Todo not found</p>
        )}
      </div>
    </div>
  );
});
