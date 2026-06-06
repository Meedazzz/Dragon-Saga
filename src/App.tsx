import { Routes, Route } from 'react-router-dom';
import { MusicProvider } from '@/contexts/MusicContext';
import HomePage from '@/pages/HomePage';
import ValeryPage from '@/pages/ValeryPage';
import SakrisPage from '@/pages/SakrisPage';
import BrinPage from '@/pages/BrinPage';
import DarkbainPage from '@/pages/DarkbainPage';
import LetopisPage from '@/pages/LetopisPage';
import LorPage from '@/pages/LorPage';

// Импорты страниц лора (создай их, если ещё нет)
import ValeryLorePage from '@/pages/ValeryLorePage';
import BrinLorePage from '@/pages/BrinLorePage';
import SakrisLorePage from '@/pages/SakrisLorePage';
import StiveLorePage from '@/pages/StiveLorePage';
import TalisLorePage from '@/pages/TalisLorePage';

function App() {
  return (
    <MusicProvider>
      <Routes>
        {/* Главная */}
        <Route path="/" element={<HomePage />} />

        {/* Лор персонажей */}
        <Route path="/valery-lore" element={<ValeryLorePage />} />
        <Route path="/brin-lore" element={<BrinLorePage />} />
        <Route path="/sakris-lore" element={<SakrisLorePage />} />
        <Route path="/stive-lore" element={<StiveLorePage />} />
        <Route path="/talis-lore" element={<TalisLorePage />} />

        {/* Личные умения (существующие) */}
        <Route path="/valery" element={<ValeryPage />} />
        <Route path="/sakris" element={<SakrisPage />} />
        <Route path="/brin" element={<BrinPage />} />
        <Route path="/darkbain" element={<DarkbainPage />} />

        {/* Летопись и мир игры */}
        <Route path="/letopis" element={<LetopisPage />} />
        <Route path="/lor" element={<LorPage />} />
      </Routes>
    </MusicProvider>
  );
}

export default App;
