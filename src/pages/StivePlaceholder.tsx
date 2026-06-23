import Layout from '@/components/Layout';
import HeroNav from '@/components/HeroNav';
import { stiveTheme } from '@/types/theme';

const StivePlaceholder = () => {
  return (
    <Layout theme={stiveTheme}>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <HeroNav theme={stiveTheme} characterId="stive" />
        <h1 className="text-4xl font-bold mb-6" style={{ fontFamily: "'Cinzel Decorative', serif", color: stiveTheme.parchment }}>
          Личное умение Стива
        </h1>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", color: stiveTheme.silver }}>
          Страница в разработке. Скоро здесь появится описание способностей.
        </p>
      </div>
    </Layout>
  );
};
export default StivePlaceholder;
