export interface ColorTheme {
  name: string;
  void: string;
  raven: string;
  primary: string;
  primaryGlow: string;
  primaryBright: string;
  accent: string;
  accentGlow: string;
  silver: string;
  silverBright: string;
  parchment: string;
  parchmentDim: string;
  border: string;
  borderGlow: string;
  menuBg: string;
  menuText: string;
  menuAccent: string;
  buttonBg: string;
  buttonText: string;
  buttonBorder: string;
  particleColors: string[];
  fontFamily: string;
  borderStyle: string;
  isDark: boolean;
}

export const homeTheme: ColorTheme = {
  name: 'home',
  void: '#0c0c10',
  raven: '#14141c',
  primary: '#6a5430',
  primaryGlow: '#8a7040',
  primaryBright: '#a89060',
  accent: '#5a3030',
  accentGlow: '#7a4040',
  silver: '#9098a0',
  silverBright: '#b0b8c0',
  parchment: '#b0a080',
  parchmentDim: '#706850',
  border: 'rgba(80, 70, 50, 0.25)',
  borderGlow: 'rgba(106, 84, 48, 0.4)',
  menuBg: 'rgba(12, 12, 16, 0.97)',
  menuText: '#b0a080',
  menuAccent: '#8a7040',
  buttonBg: 'rgba(20, 15, 10, 0.85)',
  buttonText: '#8a7040',
  buttonBorder: 'rgba(106, 84, 48, 0.4)',
  particleColors: ['#8a7040', '#6a5430', '#a89060'],
  fontFamily: "'Cinzel', Georgia, serif",
  borderStyle: 'linear-gradient(180deg, #2a2010 0%, transparent 20%, transparent 80%, #2a2010 100%)',
  isDark: true,
};

export const valeryTheme: ColorTheme = {
  name: 'valery',
  void: '#050507',
  raven: '#0a0a0e',
  primary: '#1a3a5c',
  primaryGlow: '#2a5a8a',
  primaryBright: '#4a7aaa',
  accent: '#8a1c1c',
  accentGlow: '#c43a3a',
  silver: '#c0c8d0',
  silverBright: '#e0e8f0',
  parchment: '#d4c4a0',
  parchmentDim: '#a09070',
  border: 'rgba(42, 90, 138, 0.25)',
  borderGlow: 'rgba(42, 90, 138, 0.5)',
  menuBg: 'rgba(5, 5, 7, 0.97)',
  menuText: '#c0c8d0',
  menuAccent: '#2a5a8a',
  buttonBg: 'rgba(10, 15, 25, 0.85)',
  buttonText: '#7ec8e3',
  buttonBorder: 'rgba(42, 90, 138, 0.4)',
  particleColors: ['#7ec8e3', '#2a5a8a', '#c43a3a'],
  fontFamily: "'Cinzel', Georgia, serif",
  borderStyle: 'linear-gradient(180deg, #2a5a8a 0%, transparent 15%, transparent 85%, #2a5a8a 100%)',
  isDark: true,
};

export const sakrisTheme: ColorTheme = {
  name: 'sakris',
  void: '#030804',
  raven: '#061208',
  primary: '#1a3a1a',
  primaryGlow: '#2a6a2a',
  primaryBright: '#4a8a4a',
  accent: '#2a6a3a',
  accentGlow: '#3a8a3a',
  silver: '#b0c8b0',
  silverBright: '#d0e8d0',
  parchment: '#c4d4a0',
  parchmentDim: '#809060',
  border: 'rgba(42, 138, 42, 0.25)',
  borderGlow: 'rgba(58, 196, 58, 0.4)',
  menuBg: 'rgba(3, 8, 4, 0.97)',
  menuText: '#b0c8b0',
  menuAccent: '#3a8a3a',
  buttonBg: 'rgba(10, 30, 10, 0.85)',
  buttonText: '#7ec87e',
  buttonBorder: 'rgba(58, 138, 58, 0.4)',
  particleColors: ['#7ec87e', '#2a6a2a', '#4a90d0', '#6a4a9a'],
  fontFamily: "'Cinzel', Georgia, serif",
  borderStyle: 'linear-gradient(180deg, #3a8a3a 0%, #4a90d0 8%, transparent 20%, transparent 50%, #6a4a9a 70%, transparent 85%, #3a8a3a 100%)',
  isDark: true,
};

export const brinTheme: ColorTheme = {
  name: 'brin',
  void: '#080308',
  raven: '#120612',
  primary: '#3a1a3a',
  primaryGlow: '#6a2a6a',
  primaryBright: '#8a4a8a',
  accent: '#8a3a6a',
  accentGlow: '#aa5a8a',
  silver: '#c8b0c8',
  silverBright: '#e8d0e8',
  parchment: '#d4a0c4',
  parchmentDim: '#906080',
  border: 'rgba(138, 42, 90, 0.25)',
  borderGlow: 'rgba(176, 106, 240, 0.4)',
  menuBg: 'rgba(8, 3, 8, 0.97)',
  menuText: '#c8b0c8',
  menuAccent: '#aa5a8a',
  buttonBg: 'rgba(20, 10, 20, 0.85)',
  buttonText: '#c87ec8',
  buttonBorder: 'rgba(138, 58, 106, 0.4)',
  particleColors: ['#c87ec8', '#b06af0', '#c43a5a'],
  fontFamily: "'Cinzel', Georgia, serif",
  borderStyle: 'linear-gradient(180deg, #aa5a8a 0%, #b06af0 8%, transparent 20%, transparent 50%, #c43a5a 70%, transparent 85%, #aa5a8a 100%)',
  isDark: true,
};

export const darkbainTheme: ColorTheme = {
  name: 'darkbain',
  void: '#030303',
  raven: '#080808',
  primary: '#1f1f1f',
  primaryGlow: '#4a3f2a',
  primaryBright: '#6e5a3a',
  accent: '#5a0a0a',
  accentGlow: '#8b0000',
  silver: '#6e6e6e',
  silverBright: '#9a9a9a',
  parchment: '#b8b8b8',
  parchmentDim: '#6e6e6e',
  border: 'rgba(74, 63, 42, 0.3)',
  borderGlow: 'rgba(74, 63, 42, 0.5)',
  menuBg: 'rgba(3, 3, 3, 0.98)',
  menuText: '#9a9a9a',
  menuAccent: '#4a3f2a',
  buttonBg: 'rgba(13, 13, 13, 0.9)',
  buttonText: '#b8b8b8',
  buttonBorder: 'rgba(74, 63, 42, 0.4)',
  particleColors: ['#4a3f2a', '#6e5a3a', '#5a0a0a'],
  fontFamily: "'Cinzel Decorative', 'UnifrakturMaguntia', serif",
  borderStyle: 'linear-gradient(180deg, #4a3f2a 0%, transparent 20%, transparent 80%, #4a3f2a 100%)',
  isDark: true,
};

export const letopisTheme: ColorTheme = {
  name: 'letopis',
  void: '#f5f0e6',
  raven: '#faf6ed',
  primary: '#8b4513',
  primaryGlow: '#a0522d',
  primaryBright: '#c9a86c',
  accent: '#6b3410',
  accentGlow: '#8b4513',
  silver: '#5c3d2e',
  silverBright: '#4a1c1c',
  parchment: '#2c1810',
  parchmentDim: '#6b4423',
  border: 'rgba(139, 69, 19, 0.3)',
  borderGlow: 'rgba(201, 168, 108, 0.5)',
  menuBg: 'rgba(245, 240, 230, 0.98)',
  menuText: '#5c3d2e',
  menuAccent: '#8b4513',
  buttonBg: 'rgba(250, 246, 237, 0.9)',
  buttonText: '#8b4513',
  buttonBorder: 'rgba(139, 69, 19, 0.3)',
  particleColors: ['#c9a86c', '#8b4513', '#a0522d'],
  fontFamily: "'Georgia', 'Palatino Linotype', serif",
  borderStyle: 'none',
  isDark: false,
};

export const lorTheme: ColorTheme = {
  name: 'lor',
  void: '#0c0c10',
  raven: '#14141c',
  primary: '#6a5430',
  primaryGlow: '#8a7040',
  primaryBright: '#a89060',
  accent: '#5a3030',
  accentGlow: '#7a4040',
  silver: '#9098a0',
  silverBright: '#b0b8c0',
  parchment: '#b0a080',
  parchmentDim: '#706850',
  border: 'rgba(80, 70, 50, 0.25)',
  borderGlow: 'rgba(106, 84, 48, 0.4)',
  menuBg: 'rgba(12, 12, 16, 0.97)',
  menuText: '#b0a080',
  menuAccent: '#8a7040',
  buttonBg: 'rgba(20, 15, 10, 0.85)',
  buttonText: '#8a7040',
  buttonBorder: 'rgba(106, 84, 48, 0.4)',
  particleColors: ['#8a7040', '#6a5430', '#a89060'],
  fontFamily: "'Cinzel', Georgia, serif",
  borderStyle: 'linear-gradient(180deg, #2a2010 0%, transparent 20%, transparent 80%, #2a2010 100%)',
  isDark: true,
};

export const getThemeByPath = (pathname: string): ColorTheme => {
  if (pathname.includes('valery')) return valeryTheme;
  if (pathname.includes('sakris')) return sakrisTheme;
  if (pathname.includes('brin')) return brinTheme;
  if (pathname.includes('darkbain')) return darkbainTheme;
  if (pathname.includes('hessen')) return brinTheme;
  if (pathname.includes('berghheim')) return sakrisTheme;
  if (pathname.includes('arantir')) return homeTheme; // Will be overridden by ArantirPage's own theme
  if (pathname.includes('stive')) return homeTheme;
  if (pathname.includes('talis')) return homeTheme; // Will be overridden by TalisPlaceholder's own theme
  if (pathname.includes('subclass')) {
    // Subclass page handles theme internally via characterId
    return homeTheme;
  }
  if (pathname.includes('map')) return lorTheme;
  if (pathname.includes('letopis')) return letopisTheme;
  if (pathname.includes('lor')) return lorTheme;
  return homeTheme;
};
