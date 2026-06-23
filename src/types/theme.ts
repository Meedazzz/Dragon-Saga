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

const ancientBorder = 'linear-gradient(180deg, rgba(190,148,74,0.78) 0%, rgba(95,18,29,0.62) 11%, transparent 23%, transparent 76%, rgba(87,83,77,0.42) 88%, rgba(190,148,74,0.78) 100%)';

const baseDark = {
  void: '#050404',
  raven: '#0d0c0c',
  primary: '#741923',
  primaryGlow: '#a32837',
  primaryBright: '#c34b55',
  accent: '#8a6a35',
  accentGlow: '#c3a15a',
  silver: '#aaa59b',
  silverBright: '#ddd6c8',
  parchment: '#dcc8a5',
  parchmentDim: '#a8946b',
  border: 'rgba(151, 119, 67, 0.32)',
  borderGlow: 'rgba(190, 148, 74, 0.48)',
  menuBg: 'rgba(5, 4, 4, 0.97)',
  menuText: '#dcc8a5',
  menuAccent: '#c3a15a',
  buttonBg: 'rgba(16, 12, 10, 0.92)',
  buttonText: '#d8bc76',
  buttonBorder: 'rgba(151, 119, 67, 0.48)',
  particleColors: ['#c3a15a', '#8d202b', '#77716a'],
  fontFamily: "'Cinzel', Georgia, serif",
  borderStyle: ancientBorder,
  isDark: true,
};

export const homeTheme: ColorTheme = {
  name: 'home',
  ...baseDark,
};

export const valeryTheme: ColorTheme = {
  name: 'valery',
  ...baseDark,
  primary: '#5b6066',
  primaryGlow: '#85847d',
  primaryBright: '#c9c4b7',
  accent: '#741923',
  accentGlow: '#c3a15a',
  menuAccent: '#c3a15a',
  particleColors: ['#c3a15a', '#85847d', '#741923'],
};

export const sakrisTheme: ColorTheme = {
  name: 'sakris',
  ...baseDark,
  primary: '#244236',
  primaryGlow: '#6b765c',
  primaryBright: '#b8b28b',
  accent: '#7a1d28',
  accentGlow: '#c3a15a',
  menuAccent: '#c3a15a',
  particleColors: ['#c3a15a', '#6b765c', '#7a1d28'],
};

export const brinTheme: ColorTheme = {
  name: 'brin',
  ...baseDark,
  primary: '#4f334f',
  primaryGlow: '#80627b',
  primaryBright: '#d2c4d0',
  accent: '#7b1d28',
  accentGlow: '#c3a15a',
  menuAccent: '#c3a15a',
  particleColors: ['#c3a15a', '#80627b', '#7b1d28'],
};

export const talisTheme: ColorTheme = {
  name: 'talis',
  ...baseDark,
  primary: '#7a3418',
  primaryGlow: '#d46a2c',
  primaryBright: '#f2a45f',
  accent: '#23324a',
  accentGlow: '#e08040',
  silver: '#b8ada1',
  silverBright: '#ead8c4',
  parchment: '#e5c59e',
  parchmentDim: '#b28a64',
  menuAccent: '#e08040',
  buttonText: '#e08040',
  buttonBorder: 'rgba(224, 128, 64, 0.46)',
  particleColors: ['#e08040', '#c06020', '#6f111b'],
};

export const stiveTheme: ColorTheme = {
  name: 'stive',
  ...baseDark,
  primary: '#2e5b38',
  primaryGlow: '#6ea46d',
  primaryBright: '#b9d99a',
  accent: '#365a7a',
  accentGlow: '#8fd37f',
  silver: '#aab8a6',
  silverBright: '#d8e7cc',
  parchment: '#d7d3a6',
  parchmentDim: '#9aa67d',
  menuAccent: '#8fd37f',
  buttonText: '#8fd37f',
  buttonBorder: 'rgba(143, 211, 127, 0.42)',
  particleColors: ['#8fd37f', '#6ea46d', '#365a7a'],
};

export const darkbainTheme: ColorTheme = {
  name: 'darkbain',
  ...baseDark,
  primary: '#6f111b',
  primaryGlow: '#aa2231',
  primaryBright: '#d25a62',
  accent: '#8a6a35',
  accentGlow: '#d3ad5f',
  fontFamily: "'Cinzel Decorative', 'UnifrakturMaguntia', Georgia, serif",
  particleColors: ['#aa2231', '#d3ad5f', '#5b6066'],
};

export const letopisTheme: ColorTheme = {
  name: 'letopis',
  ...baseDark,
  void: '#060504',
  raven: '#100d0a',
  primary: '#704022',
  primaryGlow: '#9a6c37',
  primaryBright: '#d1a65d',
  accent: '#6f111b',
  accentGlow: '#b88a43',
  silver: '#b5afa3',
  silverBright: '#e2d8c7',
  parchment: '#e1c89b',
  parchmentDim: '#a98d58',
  menuAccent: '#d1a65d',
  buttonText: '#d1a65d',
  particleColors: ['#d1a65d', '#704022', '#6f111b'],
  fontFamily: "'Cormorant Garamond', 'Georgia', serif",
};

export const lorTheme: ColorTheme = {
  name: 'lor',
  ...baseDark,
};

export const getThemeByPath = (pathname: string): ColorTheme => {
  if (pathname.includes('valery')) return valeryTheme;
  if (pathname.includes('sakris')) return sakrisTheme;
  if (pathname.includes('brin') || pathname.includes('black-ice-research')) return brinTheme;
  if (pathname.includes('darkbain')) return darkbainTheme;
  if (pathname.includes('hessen')) return brinTheme;
  if (pathname.includes('berghheim')) return sakrisTheme;
  if (pathname.includes('arantir')) return talisTheme;
  if (pathname.includes('stive')) return stiveTheme;
  if (pathname.includes('talis') || pathname.includes('tallis')) return talisTheme;
  if (pathname.includes('subclass')) return homeTheme;
  if (pathname.includes('map')) return lorTheme;
  if (pathname.includes('letopis')) return letopisTheme;
  if (pathname.includes('lor')) return lorTheme;
  return homeTheme;
};
