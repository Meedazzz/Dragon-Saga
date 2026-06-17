import { Routes, Route } from 'react-router-dom';
import { MusicProvider } from '@/contexts/MusicContext';
import HomePage from '@/pages/HomePage';
import LorePage from '@/pages/LorePage';
import ValeryPage from '@/pages/ValeryPage';
import SakrisPage from '@/pages/SakrisPage';
import BrinPage from '@/pages/BrinPage';
import DarkbainPage from '@/pages/DarkbainPage';
import LetopisPage from '@/pages/LetopisPage';
import LorPage from '@/pages/LorPage';
import SubclassPage from '@/pages/SubclassPage';
import HessenPage from '@/pages/HessenPage';
import BerghheimPage from '@/pages/BerghheimPage';
import ArantirPage from '@/pages/ArantirPage';
import MapPage from '@/pages/MapPage';

// Страницы-заглушки для Стива и Таллиса
import StivePlaceholder from '@/pages/StivePlaceholder';
import TalisPlaceholder from '@/pages/TalisPlaceholder';

function App() {
  return (
    <MusicProvider>
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
    </MusicProvider>
  );
}

export default App;
