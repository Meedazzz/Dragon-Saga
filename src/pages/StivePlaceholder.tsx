import Layout from '@/components/Layout';
import { homeTheme } from '@/types/theme';

const StivePlaceholder = () => {
  return (
    <Layout theme={homeTheme}>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6">Личное умение Стива</h1>
        <p>Страница в разработке. Скоро здесь появится описание способностей.</p>
      </div>
    </Layout>
  );
};
export default StivePlaceholder;
