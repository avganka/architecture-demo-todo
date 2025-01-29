import { CreateTodoModal } from '@/modules/components/CreateTodoModal/CreateTodoModal';
import { useState } from 'react';

import styles from './CreateTodoButton.module.css';

export const CreateTodoButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button className={styles.button} onClick={() => setIsModalOpen(true)}>
        +
      </button>
      {isModalOpen && <CreateTodoModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};
