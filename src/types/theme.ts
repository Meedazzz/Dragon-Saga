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

// Blood Ice — elegant crimson / frost unified palette
export const homeTheme: ColorTheme = {
  name: 'home',
  void: '#07070c',
  raven: '#10111a',
  primary: '#b4283a',
  primaryGlow: '#e44a5a',
  primaryBright: '#ff6b7c',
  accent: '#4bc8e8',
  accentGlow: '#7de4ff',
  silver: '#c9d2e0',
  silverBright: '#eaf2ff',
  parchment: '#efe5d5',
  parchmentDim: '#b69f82',
  border: 'rgba(180, 40, 58, 0.28)',
  borderGlow: 'rgba(228, 74, 90, 0.45)',
  menuBg: 'rgba(7, 7, 12, 0.97)',
  menuText: '#efe5d5',
  menuAccent: '#e44a5a',
  buttonBg: 'rgba(22, 14, 18, 0.9)',
  buttonText: '#ff7a88',
  buttonBorder: 'rgba(180, 40, 58, 0.5)',
  particleColors: ['#e44a5a', '#4bc8e8', '#ff6b7c'],
  fontFamily: "'Cinzel', Georgia, serif",
  borderStyle: 'linear-gradient(180deg, #b4283a 0%, rgba(75,200,232,0.35) 12%, transparent 22%, transparent 78%, rgba(180,40,58,0.55) 100%)',
  isDark: true,
};

export const valeryTheme: ColorTheme = {
  name: 'valery',
  void: '#05060c',
  raven: '#0b0e18',
  primary: '#2464a8',
  primaryGlow: '#3e8de0',
  primaryBright: '#6bb8ff',
  accent: '#c62a3a',
  accentGlow: '#ff4a5c',
  silver: '#d0d8e8',
  silverBright: '#eef4ff',
  parchment: '#e9e0d0',
  parchmentDim: '#a99a84',
  border: 'rgba(36, 100, 168, 0.30)',
  borderGlow: 'rgba(62, 141, 224, 0.5)',
  menuBg: 'rgba(5, 6, 12, 0.97)',
  menuText: '#d9e4f0',
  menuAccent: '#3e8de0',
  buttonBg: 'rgba(10, 16, 28, 0.9)',
  buttonText: '#6bb8ff',
  buttonBorder: 'rgba(36, 100, 168, 0.5)',
  particleColors: ['#6bb8ff', '#3e8de0', '#ff4a5c'],
  fontFamily: "'Cinzel', Georgia, serif",
  borderStyle: 'linear-gradient(180deg, #2464a8 0%, transparent 15%, transparent 85%, #c62a3a 100%)',
  isDark: true,
};

export const sakrisTheme: ColorTheme = {
  name: 'sakris',
  void: '#040a06',
  raven: '#08140c',
  primary: '#1f7a3a',
  primaryGlow: '#35b85a',
  primaryBright: '#5de07e',
  accent: '#3a9ed0',
  accentGlow: '#6ac8f8',
  silver: '#c8dcd0',
  silverBright: '#e6f8ec',
  parchment: '#e6e8cf',
  parchmentDim: '#9ab08a',
  border: 'rgba(31, 122, 58, 0.30)',
  borderGlow: 'rgba(53, 184, 90, 0.45)',
  menuBg: 'rgba(4, 10, 6, 0.97)',
  menuText: '#d0e8d8',
  menuAccent: '#35b85a',
  buttonBg: 'rgba(8, 24, 14, 0.9)',
  buttonText: '#5de07e',
  buttonBorder: 'rgba(31, 122, 58, 0.5)',
  particleColors: ['#5de07e', '#35b85a', '#6ac8f8', '#b48af0'],
  fontFamily: "'Cinzel', Georgia, serif",
  borderStyle: 'linear-gradient(180deg, #35b85a 0%, #3a9ed0 10%, transparent 22%, transparent 55%, #b48af0 72%, transparent 86%, #35b85a 100%)',
  isDark: true,
};

export const brinTheme: ColorTheme = {
  name: 'brin',
  void: '#09040c',
  raven: '#140a1a',
  primary: '#6a2a7a',
  primaryGlow: '#a24ab8',
  primaryBright: '#cc6ae8',
  accent: '#3ab8d8',
  accentGlow: '#6de4ff',
  silver: '#d8c8e0',
  silverBright: '#f0e4ff',
  parchment: '#ead8e8',
  parchmentDim: '#b88aa8',
  border: 'rgba(162, 74, 184, 0.30)',
  borderGlow: 'rgba(204, 106, 232, 0.45)',
  menuBg: 'rgba(9, 4, 12, 0.97)',
  menuText: '#e0c8e8',
  menuAccent: '#cc6ae8',
  buttonBg: 'rgba(22, 10, 28, 0.9)',
  buttonText: '#d87af0',
  buttonBorder: 'rgba(162, 74, 184, 0.5)',
  particleColors: ['#cc6ae8', '#a24ab8', '#3ab8d8'],
  fontFamily: "'Cinzel', Georgia, serif",
  borderStyle: 'linear-gradient(180deg, #a24ab8 0%, #3ab8d8 10%, transparent 22%, transparent 52%, #e44a5a 72%, transparent 86%, #a24ab8 100%)',
  isDark: true,
};

export const darkbainTheme: ColorTheme = {
  name: 'darkbain',
  void: '#040404',
  raven: '#0b0b0b',
  primary: '#b4283a',
  primaryGlow: '#d84a50',
  primaryBright: '#ff6b72',
  accent: '#9a7c3a',
  accentGlow: '#d4aa4a',
  silver: '#c8c8c8',
  silverBright: '#e8e8e8',
  parchment: '#e0d8cc',
  parchmentDim: '#9a8a76',
  border: 'rgba(180, 40, 58, 0.32)',
  borderGlow: 'rgba(216, 74, 80, 0.5)',
  menuBg: 'rgba(4, 4, 4, 0.98)',
  menuText: '#d8d0c4',
  menuAccent: '#d84a50',
  buttonBg: 'rgba(18, 12, 12, 0.92)',
  buttonText: '#ff7a80',
  buttonBorder: 'rgba(180, 40, 58, 0.5)',
  particleColors: ['#d84a50', '#d4aa4a', '#b4283a'],
  fontFamily: "'Cinzel Decorative', 'UnifrakturMaguntia', serif",
  borderStyle: 'linear-gradient(180deg, #b4283a 0%, transparent 20%, transparent 80%, #9a7c3a 100%)',
  isDark: true,
};

export const letopisTheme: ColorTheme = {
  name: 'letopis',
  void: '#f6f0e6',
  raven: '#faf6ed',
  primary: '#a81e2e',
  primaryGlow: '#cc3544',
  primaryBright: '#d94a58',
  accent: '#1a6b8a',
  accentGlow: '#2a8ab0',
  silver: '#4a3028',
  silverBright: '#2a1812',
  parchment: '#221410',
  parchmentDim: '#7a5a3a',
  border: 'rgba(168, 30, 46, 0.28)',
  borderGlow: 'rgba(204, 53, 68, 0.45)',
  menuBg: 'rgba(246, 240, 230, 0.98)',
  menuText: '#4a3028',
  menuAccent: '#a81e2e',
  buttonBg: 'rgba(250, 246, 237, 0.96)',
  buttonText: '#a81e2e',
  buttonBorder: 'rgba(168, 30, 46, 0.32)',
  particleColors: ['#d94a58', '#a81e2e', '#2a8ab0'],
  fontFamily: "'Cormorant Garamond', 'Georgia', serif",
  borderStyle: 'none',
  isDark: false,
};

export const lorTheme: ColorTheme = {
  name: 'lor',
  void: '#07070c',
  raven: '#10111a',
  primary: '#b4283a',
  primaryGlow: '#e44a5a',
  primaryBright: '#ff6b7c',
  accent: '#4bc8e8',
  accentGlow: '#7de4ff',
  silver: '#c9d2e0',
  silverBright: '#eaf2ff',
  parchment: '#efe5d5',
  parchmentDim: '#b69f82',
  border: 'rgba(180, 40, 58, 0.28)',
  borderGlow: 'rgba(228, 74, 90, 0.45)',
  menuBg: 'rgba(7, 7, 12, 0.97)',
  menuText: '#efe5d5',
  menuAccent: '#e44a5a',
  buttonBg: 'rgba(22, 14, 18, 0.9)',
  buttonText: '#ff7a88',
  buttonBorder: 'rgba(180, 40, 58, 0.5)',
  particleColors: ['#e44a5a', '#4bc8e8', '#ff6b7c'],
  fontFamily: "'Cinzel', Georgia, serif",
  borderStyle: 'linear-gradient(180deg, #b4283a 0%, rgba(75,200,232,0.35) 12%, transparent 22%, transparent 78%, rgba(180,40,58,0.55) 100%)',
  isDark: true,
};

export const getThemeByPath = (pathname: string): ColorTheme => {
  if (pathname.includes('valery')) return valeryTheme;
  if (pathname.includes('sakris')) return sakrisTheme;
  if (pathname.includes('brin')) return brinTheme;
  if (pathname.includes('darkbain')) return darkbainTheme;
  if (pathname.includes('hessen')) return brinTheme;
  if (pathname.includes('berghheim')) return sakrisTheme;
  if (pathname.includes('arantir')) return homeTheme;
  if (pathname.includes('stive')) return sakrisTheme;
  if (pathname.includes('talis')) return homeTheme;
  if (pathname.includes('subclass')) {
    return homeTheme;
  }
  if (pathname.includes('map')) return lorTheme;
  if (pathname.includes('letopis')) return letopisTheme;
  if (pathname.includes('lor')) return lorTheme;
  return homeTheme;
};
