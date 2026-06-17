import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MusicProvider } from '@/contexts/MusicContext';
import LoadingScreen from '@/components/LoadingScreen';
import { homeTheme } from '@/types/theme';

const HomePage = lazy(() => import('@/pages/HomePage'));
const LorePage = lazy(() => import('@/pages/LorePage'));
const ValeryPage = lazy(() => import('@/pages/ValeryPage'));
const SakrisPage = lazy(() => import('@/pages/SakrisPage'));
const BrinPage = lazy(() => import('@/pages/BrinPage'));
const DarkbainPage = lazy(() => import('@/pages/DarkbainPage'));
const LetopisPage = lazy(() => import('@/pages/LetopisPage'));
const LorPage = lazy(() => import('@/pages/LorPage'));
const SubclassPage = lazy(() => import('@/pages/SubclassPage'));
const HessenPage = lazy(() => import('@/pages/HessenPage'));
const BerghheimPage = lazy(() => import('@/pages/BerghheimPage'));
const ArantirPage = lazy(() => import('@/pages/ArantirPage'));
const MapPage = lazy(() => import('@/pages/MapPage'));
const StivePlaceholder = lazy(() => import('@/pages/StivePlaceholder'));
const TalisPlaceholder = lazy(() => import('@/pages/TalisPlaceholder'));

function App() {
  return (
    <MusicProvider>
      <Suspense fallback={<LoadingScreen theme={homeTheme} isLoading={true} />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* Лор персонажей */}
          <Route path="/lore/:characterId" element={<LorePage />} />

          {/* Личные умения */}
          <Route path="/valery" element={<ValeryPage />} />
          <Route path="/sakris" element={<SakrisPage />} />
          <Route path="/brin" element={<BrinPage />} />
          <Route path="/darkbain" element={<DarkbainPage />} />

          {/* Страницы для Стива и Таллиса */}
          <Route path="/stive" element={<StivePlaceholder />} />
          <Route path="/talis" element={<TalisPlaceholder />} />

          {/* Подклассы */}
          <Route path="/subclass/:characterId" element={<SubclassPage />} />

          {/* Связанный лор */}
          <Route path="/hessen" element={<HessenPage />} />
          <Route path="/berghheim" element={<BerghheimPage />} />
          <Route path="/arantir" element={<ArantirPage />} />

          {/* Карты */}
          <Route path="/map/:mapId" element={<MapPage />} />

          {/* Летопись и мир игры */}
          <Route path="/letopis" element={<LetopisPage />} />
          <Route path="/lor" element={<LorPage />} />
        </Routes>
      </Suspense>
    </MusicProvider>
  );
}

export default App;
