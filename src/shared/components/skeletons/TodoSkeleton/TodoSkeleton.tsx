import styles from './TodoSkeleton.module.css';

export const TodoSkeleton = () => {
  return (
    <ul className={styles.todoList}>
      {Array.from({ length: 5 }).map((_, index) => (
        <li key={index} className={`${styles.todoItem} ${styles.skeleton}`}>
          <div className={styles.skeletonTitle} />
          <div className={styles.skeletonStatus} />
        </li>
      ))}
    </ul>
  );
}; 