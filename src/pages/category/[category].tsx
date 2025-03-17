import { CategoryContainer } from '@/modules/containers/category/CategoryContainer';
import { Layout } from '@/shared/components/Layout/Layout';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const router = useRouter();
  console.log({ router });
  return (
    <Layout title="Todo List" metaDescription="Simple Todo List">
      <CategoryContainer category={'category'} />
    </Layout>
  );
};

export default ProfilePage;
