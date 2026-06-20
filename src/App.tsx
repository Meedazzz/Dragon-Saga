import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { MusicProvider } from '@/contexts/MusicContext';
import Preloader from '@/components/Preloader';

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

/**
 * ScrollToTop — guarantees that every navigation lands at the very top
 * of the page (requirement #3).
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Disable the browser's auto-scroll-restoration so we control it.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Reset scroll on every route change.
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    // Also reset any internal scroll containers.
    const root = document.getElementById('root');
    if (root) root.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);
  return null;
}

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
      <ScrollToTop />
      <Suspense fallback={<Preloader theme={{name:"home",void:"#07070c",raven:"#10111a",primary:"#b4283a",primaryGlow:"#e44a5a",primaryBright:"#ff6b7c",accent:"#4bc8e8",accentGlow:"#7de4ff",silver:"#c9d2e0",silverBright:"#eaf2ff",parchment:"#efe5d5",parchmentDim:"#b69f82",border:"rgba(180,40,58,0.28)",borderGlow:"rgba(228,74,90,0.45)",menuBg:"rgba(7,7,12,0.97)",menuText:"#efe5d5",menuAccent:"#e44a5a",buttonBg:"rgba(22,14,18,0.9)",buttonText:"#ff7a88",buttonBorder:"rgba(180,40,58,0.5)",particleColors:["#e44a5a","#4bc8e8","#ff6b7c"],fontFamily:"Cinzel",borderStyle:"linear-gradient(180deg, #b4283a 0%, transparent 22%, transparent 78%, rgba(180,40,58,0.55) 100%)",isDark:true}} isLoading={true} />}>
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />

          {/* Character lore */}
          <Route path="/lore/:characterId" element={<LorePage />} />

          {/* Personal abilities */}
          <Route path="/valery" element={<ValeryPage />} />
          <Route path="/brin" element={<BrinPage />} />
          <Route path="/sakris" element={<SakrisPage />} />
          <Route path="/stive" element={<StivePlaceholder />} />

          {/* Subclasses */}
          <Route path="/subclass/:characterId" element={<SubclassPage />} />
          <Route path="/talis" element={<TalisPlaceholder />} />

          {/* Linked lore */}
          <Route path="/darkbain" element={<DarkbainPage />} />
          <Route path="/hessen" element={<HessenPage />} />
          <Route path="/berghheim" element={<BerghheimPage />} />
          <Route path="/arantir" element={<ArantirPage />} />

          {/* Maps */}
          <Route path="/map/:mapId" element={<MapPage />} />

          {/* World chronicles */}
          <Route path="/letopis" element={<LetopisPage />} />
          <Route path="/lor" element={<LorPage />} />

          {/* Catch-all */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Suspense>
    </MusicProvider>
  );
}

export default App;
