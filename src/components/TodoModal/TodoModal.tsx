import { useRoot } from '@/shared/context/root';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import styles from './TodoModal.module.css';
import { TodoSkeleton } from './TodoSkeleton';

interface TodoModalProps {
  todoId: number | null;
  onClose: () => void;
}

export const TodoModal = observer(({ todoId, onClose }: TodoModalProps) => {
  const { todoService } = useRoot();

  useEffect(() => {
    if (todoId) {
      todoService.getTodoById(todoId);
    }
  }, [todoId, todoService]);

  if (!todoId) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        {todoService.detailsIsLoading ? (
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
                  onChange={() =>
                    todoService.updateTodo(todoService.selectedTodo!.id, {
                      completed: !todoService.selectedTodo!.completed,
                    })
                  }
                />
                Status:{' '}
                {todoService.selectedTodo.completed ? 'Completed' : 'Pending'}
              </label>
              <button
                className={styles.deleteButton}
                onClick={async () => {
                  await todoService.deleteTodo(todoService.selectedTodo!.id);
                  onClose();
                }}
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
