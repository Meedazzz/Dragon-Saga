import { Suspense, lazy, useEffect, useLayoutEffect } from 'react';
import type React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { MusicProvider } from '@/contexts/MusicContext';
import LoadingScreen from '@/components/LoadingScreen';
import { homeTheme } from '@/types/theme';

const HomePage = lazy(() => import('@/pages/HomePage'));
const LorePage = lazy(() => import('@/pages/LorePage'));
const ValeryPage = lazy(() => import('@/pages/ValeryPage'));
const ValerySubclassPage = lazy(() => import('@/pages/ValerySubclassPage'));
const SakrisPage = lazy(() => import('@/pages/SakrisPage'));
const SakrisSubclassPage = lazy(() => import('@/pages/SakrisSubclassPage'));
const BrinPage = lazy(() => import('@/pages/BrinPage'));
const BrinSubclassPage = lazy(() => import('@/pages/BrinSubclassPage'));
const BlackIceResearchPage = lazy(() => import('@/pages/BlackIceResearchPage'));
const DarkbainPage = lazy(() => import('@/pages/DarkbainPage'));
const LetopisPage = lazy(() => import('@/pages/LetopisPage'));
const LorPage = lazy(() => import('@/pages/LorPage'));
const SubclassPage = lazy(() => import('@/pages/SubclassPage'));
const HessenPage = lazy(() => import('@/pages/HessenPage'));
const BerghheimPage = lazy(() => import('@/pages/BerghheimPage'));
const ArantirPage = lazy(() => import('@/pages/ArantirPage'));
const MapPage = lazy(() => import('@/pages/MapPage'));
const ActivitiesPage = lazy(() => import('@/pages/ActivitiesPage'));
const StivePlaceholder = lazy(() => import('@/pages/StivePlaceholder'));
const TallisSubclassPage = lazy(() => import('@/pages/TallisSubclassPage'));

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    document.body.style.overflow = '';
    document.documentElement.style.overflowY = 'auto';
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
};

function App() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <MusicProvider>
      <ScrollToTop />
      <Suspense fallback={<LoadingScreen theme={homeTheme} isLoading={true} />}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Лор персонажей */}
          <Route path="/lore/:characterId" element={<LorePage />} />

          {/* Страницы персонажей */}
          <Route path="/valery" element={<ValeryPage />} />
          <Route path="/sakris" element={<SakrisPage />} />
          <Route path="/brin" element={<BrinPage />} />
          <Route path="/darkbain" element={<DarkbainPage />} />

          {/* Стив и Таллис */}
          <Route path="/stive" element={<StivePlaceholder />} />
          <Route path="/tallis" element={<TallisSubclassPage />} />

          {/* Подклассы */}
          <Route path="/subclass/valery" element={<ValerySubclassPage />} />
          <Route path="/subclass/brin" element={<BrinSubclassPage />} />
          <Route path="/subclass/sakris" element={<SakrisSubclassPage />} />
          <Route path="/subclass/tallis" element={<TallisSubclassPage />} />
          <Route path="/subclass/:characterId" element={<SubclassPage />} />

          {/* Дополнительный лор */}
          <Route path="/black-ice-research" element={<BlackIceResearchPage />} />
          <Route path="/hessen" element={<HessenPage />} />
          <Route path="/berghheim" element={<BerghheimPage />} />
          <Route path="/arantir" element={<ArantirPage />} />

          {/* Карта */}
          <Route path="/map/:mapId" element={<MapPage />} />

          {/* Активности, летопись, общий лор */}
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/letopis" element={<LetopisPage />} />
          <Route path="/lor" element={<LorPage />} />
        </Routes>
      </Suspense>
    </MusicProvider>
  );
}

export default App;
