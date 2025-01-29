import { TodoList } from '@/components/TodoList/TodoList';
import { TodoModal } from '@/components/TodoModal/TodoModal';
import { TodoSearch } from '@/components/TodoSearch/TodoSearch';
import { TodoTabs } from '@/components/TodoTabs/TodoTabs';
import { Geist } from 'next/font/google';
import Head from 'next/head';
import { useState } from 'react';

import styles from './Home.module.css';

const geist = Geist({
  subsets: ['latin'],
});

export default function Home() {
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

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
          <h1>Todo List</h1>

          <div className={styles.controls}>
            <TodoSearch />
            <TodoTabs />
          </div>
          <TodoList onTodoClick={setSelectedTodoId} />

          <TodoModal
            todoId={selectedTodoId}
            onClose={() => setSelectedTodoId(null)}
          />
        </main>
      </div>
    </>
  );
}
