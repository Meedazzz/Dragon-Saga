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

// Страницы-заглушки для Стива и Таллиса (личные умения пока пустые)
import StivePlaceholder from '@/pages/StivePlaceholder';
import TalisPlaceholder from '@/pages/TalisPlaceholder';

function App() {
  return (
    <MusicProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* Лор персонажей – универсальный компонент */}
        <Route path="/lore/:characterId" element={<LorePage />} />

        {/* Личные умения существующие */}
        <Route path="/valery" element={<ValeryPage />} />
        <Route path="/sakris" element={<SakrisPage />} />
        <Route path="/brin" element={<BrinPage />} />
        <Route path="/darkbain" element={<DarkbainPage />} />

        {/* Временные страницы для Стива и Таллиса (личные умения) */}
        <Route path="/stive" element={<StivePlaceholder />} />
        <Route path="/talis" element={<TalisPlaceholder />} />

        {/* Летопись и мир игры */}
        <Route path="/letopis" element={<LetopisPage />} />
        <Route path="/lor" element={<LorPage />} />
      </Routes>
    </MusicProvider>
  );
}

export default App;
