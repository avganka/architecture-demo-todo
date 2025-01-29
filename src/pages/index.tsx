import { CreateTodoButton } from '@/modules/CreateTodoButton/CreateTodoButton';
import { CreateTodoModal } from '@/modules/CreateTodoModal/CreateTodoModal';
import { TodoModal } from '@/modules/TodoModal/TodoModal';
import { TodoSearch } from '@/modules/TodoSearch/TodoSearch';
import { TodoTabs } from '@/modules/TodoTabs/TodoTabs';
import { TodoList } from '@/shared/components/TodoList/TodoList';
import { useRoot } from '@/shared/context/root';
import { observer } from 'mobx-react-lite';
import { Geist } from 'next/font/google';
import Head from 'next/head';
import { useState } from 'react';

import styles from './Home.module.css';

const geist = Geist({
  subsets: ['latin'],
});

export default observer(() => {
  const { todoService } = useRoot();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Todo List</title>
        <meta name="description" content="Simple Todo List" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.page} ${geist.className}`}>
        <main className={styles.main}>
          <div className={styles.header}>
            <h1>Todo List</h1>
            <CreateTodoButton onClick={() => setIsCreateModalOpen(true)} />
          </div>
          <div className={styles.controls}>
            <TodoSearch />

            <TodoTabs
              todos={todoService.todoState.data}
              filter={todoService.searchState.filter}
              onFilterChange={todoService.setFilter}
            />
          </div>

          {/* Пример "глупого компонента". Получает данные через пропсы. Легко переиспользовать. Располагается в папке shared */}
          <TodoList
            todos={todoService.todoState.filtered}
            isLoading={todoService.todoState.isLoading}
            onTodoClick={todoService.setSelectedTodoId}
          />

          {/* Пример "умного компонента". Содержит логику и взаимодействие с сервисом. Располагается в папке components */}
          <TodoModal />

          {isCreateModalOpen && (
            <CreateTodoModal onClose={() => setIsCreateModalOpen(false)} />
          )}
        </main>
      </div>
    </>
  );
});
