import { MainContainer } from '@/modules/containers/main/MainContainer';
import { Layout } from '@/shared/components/Layout/Layout';

const MainPage = () => {
  return (
    <Layout title="Todo List" metaDescription="Simple Todo List">
      <MainContainer />
    </Layout>
  );
};

export default MainPage;
