import { CreateTodoButton } from '@/modules/components/CreateTodoButton/CreateTodoButton';
import { TodoSearch } from '@/modules/components/TodoSearch/TodoSearch';
import { TodoTabs } from '@/modules/components/TodoTabs/TodoTabs';
import { TodoList } from '@/shared/components/TodoList/TodoList';
import { useRoot } from '@/shared/context/root';
import { observer } from 'mobx-react-lite';

import styles from './MainContainer.module.css';

export const MainContainer = observer(() => {
  const { todoService, categoryService } = useRoot();

  return (
    <>
      <div className={styles.header}>
        <h1>Todo List</h1>
        <CreateTodoButton />
      </div>

      <div className={styles.controls}>
        {/* Пример "умного компонента". Содержит логику и взаимодействие с сервисом. Располагается в папке modules */}
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
        categories={categoryService.categories}
        isLoading={todoService.todoState.isLoading}
        onTodoClick={todoService.setSelectedTodoId}
      />
    </>
  );
});
