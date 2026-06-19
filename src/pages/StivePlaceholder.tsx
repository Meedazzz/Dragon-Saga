import Layout from '@/components/Layout';
import HeroNav from '@/components/HeroNav';
import { homeTheme } from '@/types/theme';

const StivePlaceholder = () => {
  return (
    <Layout theme={homeTheme}>
      <div className="tome-page">
        <HeroNav theme={homeTheme} />
        <header className="tome-header">
          <h1 className="tome-title">Личное умение Стива</h1>
          <p className="tome-lead">Страница в разработке. Скоро здесь появится описание способностей.</p>
        </header>
      </div>
    </Layout>
  );
};
export default StivePlaceholder;
