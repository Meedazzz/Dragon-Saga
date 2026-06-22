import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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
const DarkbainPage = lazy(() => import('@/pages/DarkbainPage'));
const LetopisPage = lazy(() => import('@/pages/LetopisPage'));
const LorPage = lazy(() => import('@/pages/LorPage'));
const SubclassPage = lazy(() => import('@/pages/SubclassPage'));
const HessenPage = lazy(() => import('@/pages/HessenPage'));
const BerghheimPage = lazy(() => import('@/pages/BerghheimPage'));
const ArantirPage = lazy(() => import('@/pages/ArantirPage'));
const MapPage = lazy(() => import('@/pages/MapPage'));
const StivePlaceholder = lazy(() => import('@/pages/StivePlaceholder'));
const TalisSubclassPage = lazy(() => import('@/pages/TalisSubclassPage'));

function App() {
  useEffect(() => {
    // 1. Prevent right click
    const preventContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    
    // 2. Prevent dragging images
    const preventDragStart = (e: DragEvent) => {
      if (e.target instanceof HTMLElement && (e.target.tagName === 'IMG' || e.target.tagName === 'img')) {
        e.preventDefault();
      }
    };

    // 3. Prevent copying content
    const preventCopy = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    // 4. Prevent common keyboard shortcuts for developer tools and saving
    const preventShortcuts = (e: KeyboardEvent) => {
      // Prevent Ctrl+S, Ctrl+U, Ctrl+Shift+I, F12
      if (
        (e.ctrlKey && e.key === 's') ||
        (e.ctrlKey && e.key === 'u') ||
        (e.ctrlKey && e.shiftKey && e.key === 'i') ||
        e.key === 'F12'
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', preventContextMenu);
    document.addEventListener('dragstart', preventDragStart);
    document.addEventListener('copy', preventCopy);
    document.addEventListener('keydown', preventShortcuts);

    return () => {
      document.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('dragstart', preventDragStart);
      document.removeEventListener('copy', preventCopy);
      document.removeEventListener('keydown', preventShortcuts);
    };
  }, []);

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
          <Route path="/talis" element={<TalisSubclassPage />} />

          {/* Подклассы */}
          <Route path="/subclass/valery" element={<ValerySubclassPage />} />
          <Route path="/subclass/sakris" element={<SakrisSubclassPage />} />
          <Route path="/subclass/talis" element={<TalisSubclassPage />} />
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
