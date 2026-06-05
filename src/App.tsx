import { Routes, Route } from 'react-router-dom';
import { MusicProvider } from '@/contexts/MusicContext';
import HomePage from '@/pages/HomePage';
import ValeryPage from '@/pages/ValeryPage';
import SakrisPage from '@/pages/SakrisPage';
import BrinPage from '@/pages/BrinPage';
import DarkbainPage from '@/pages/DarkbainPage';
import LetopisPage from '@/pages/LetopisPage';
import LorPage from '@/pages/LorPage';

function App() {
  return (
    <MusicProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/valery" element={<ValeryPage />} />
        <Route path="/sakris" element={<SakrisPage />} />
        <Route path="/brin" element={<BrinPage />} />
        <Route path="/darkbain" element={<DarkbainPage />} />
        <Route path="/letopis" element={<LetopisPage />} />
        <Route path="/lor" element={<LorPage />} />
      </Routes>
    </MusicProvider>
  );
}

export default App;
