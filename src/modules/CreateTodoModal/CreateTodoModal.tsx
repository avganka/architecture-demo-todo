import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useRoot } from '@/shared/context/root';
import styles from './CreateTodoModal.module.css';

export const CreateTodoModal = observer(({ onClose }: { onClose: () => void }) => {
  const { todoService } = useRoot();
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    todoService.createTodo({ title, completed: false });
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>Create New Todo</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className={styles.input}
            autoFocus
          />
          <div className={styles.actions}>
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}); 