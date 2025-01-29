import { useRoot } from '@/shared/context/root';
import { observer } from 'mobx-react-lite';

import styles from './TodoModal.module.css';
import { TodoSkeleton } from './TodoSkeleton';

export const TodoModal = observer(() => {
  const { todoService } = useRoot();

  const onClose = () => {
    todoService.setSelectedTodoId(null);
  };

  const handleUpdateTodo = () => {
    if (!todoService.selectedTodoState.data) return;

    const updatedTodo = {
      ...todoService.selectedTodoState.data,
      completed: !todoService.selectedTodoState.data.completed,
    };

    todoService.updateTodo(updatedTodo);
  };

  const handleDeleteTodo = () => {
    if (!todoService.selectedTodoState.data) return;

    todoService.deleteTodo(todoService.selectedTodoState.data.id);
    onClose();
  };

  if (!todoService.selectedTodoState.id) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        {todoService.selectedTodoState.isLoading ? (
          <TodoSkeleton />
        ) : todoService.selectedTodoState.data ? (
          <>
            <h2>Todo #{todoService.selectedTodoState.data.id}</h2>
            <p className={styles.title}>
              {todoService.selectedTodoState.data.title}
            </p>
            <div className={styles.actions}>
              <label className={styles.status}>
                <input
                  type="checkbox"
                  checked={todoService.selectedTodoState.data.completed}
                  onChange={handleUpdateTodo}
                />
                Status:{' '}
                {todoService.selectedTodoState.data.completed
                  ? 'Completed'
                  : 'Pending'}
              </label>
              <button
                className={styles.deleteButton}
                onClick={handleDeleteTodo}
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
