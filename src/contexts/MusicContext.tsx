import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';

interface MusicContextType {
  isPlaying: boolean;
  toggleMusic: () => void;
  volume: number;
  setVolume: (v: number) => void;
}

const MusicContext = createContext<MusicContextType>({
  isPlaying: false,
  toggleMusic: () => {},
  volume: 0.3,
  setVolume: () => {},
});

export const useMusic = () => useContext(MusicContext);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.3);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio(`${import.meta.env.BASE_URL}music/ambient.mp3`);
      audio.loop = true;
      audio.volume = volume;
      audio.preload = 'none';
      audioRef.current = audio;
    }
    return audioRef.current;
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => () => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
  }, []);

  const toggleMusic = useCallback(() => {
    const audio = getAudio();
    if (isPlaying) { audio.pause(); setIsPlaying(false); }
    else { audio.play().catch(() => {}); setIsPlaying(true); }
  }, [getAudio, isPlaying]);

  const setVolume = useCallback((v: number) => { setVolumeState(v); }, []);

  return (
    <MusicContext.Provider value={{ isPlaying, toggleMusic, volume, setVolume }}>
      {children}
    </MusicContext.Provider>
  );
};
