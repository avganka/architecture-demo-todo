import styles from './CreateTodoButton.module.css';

export const CreateTodoButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      +
    </button>
  );
}; 