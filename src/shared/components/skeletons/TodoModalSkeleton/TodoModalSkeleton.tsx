import styles from './TodoModalSkeleton.module.css';

export const TodoModalSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.header}>
        <div className={styles.id} />
      </div>
      <div className={styles.title} />
      <div className={styles.actions}>
        <div className={styles.status} />
        <div className={styles.button} />
      </div>
    </div>
  );
};
