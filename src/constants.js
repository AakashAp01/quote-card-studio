export const FONTS = [
  { name: 'Playfair Display', style: 'serif' },
  { name: 'Lora', style: 'serif' },
  { name: 'Merriweather', style: 'serif' },
  { name: 'DM Serif Display', style: 'serif' },
  { name: 'Cormorant Garamond', style: 'serif' },
  { name: 'Bebas Neue', style: 'display' },
  { name: 'Raleway', style: 'sans' },
  { name: 'Space Grotesk', style: 'sans' },
  { name: 'Outfit', style: 'sans' },
  { name: 'Inter', style: 'sans' },
  { name: 'Poppins', style: 'sans' },
  { name: 'Pacifico', style: 'fancy' },
  { name: 'Dancing Script', style: 'fancy' },
  { name: 'Satisfy', style: 'fancy' },
  { name: 'Kaushan Script', style: 'fancy' },
  { name: 'Cinzel', style: 'fancy' },
  { name: 'Abril Fatface', style: 'fancy' },
  { name: 'Monoton', style: 'fancy' },
  { name: 'Lobster', style: 'fancy' },
  { name: 'Righteous', style: 'fancy' },
  { name: 'Caveat', style: 'fancy' },
];

export const GRADIENTS = [
  { c1: '#ffecd2', c2: '#fcb69f', angle: 135 },
  { c1: '#a8edea', c2: '#fed6e3', angle: 135 },
  { c1: '#d299c2', c2: '#fef9d7', angle: 135 },
  { c1: '#0fd850', c2: '#f9f047', angle: 120 },
  { c1: '#667eea', c2: '#764ba2', angle: 135 },
  { c1: '#f093fb', c2: '#f5576c', angle: 135 },
  { c1: '#4facfe', c2: '#00f2fe', angle: 135 },
  { c1: '#43e97b', c2: '#38f9d7', angle: 135 },
  { c1: '#fa709a', c2: '#fee140', angle: 135 },
  { c1: '#30cfd0', c2: '#330867', angle: 135 },
  { c1: '#1a1a2e', c2: '#16213e', angle: 135 },
  { c1: '#f5f7fa', c2: '#c3cfe2', angle: 135 },
];

export const SHADOWS = {
  none: 'none',
  sm: '0 2px 8px rgba(0,0,0,0.08)',
  md: '0 8px 30px rgba(0,0,0,0.12)',
  lg: '0 16px 48px rgba(0,0,0,0.18)',
  xl: '0 24px 64px rgba(0,0,0,0.25)',
};

export const RATIO_MAP = {
  square: [480, 480],
  portrait: [430, 538],
  landscape: [640, 360],
  free: [480, null],
};

export const PRESETS = {
  cyberpunk: {
    bgTab: 'gradient', gradC1: '#ff00ff', gradC2: '#00ffff', gradAngle: 135,
    textColor: '#ffffff', font: 'Monoton', fontWeight: '400', italic: false,
    hlColor: '#ffff00', padding: 44, radius: 0, shadow: 'xl', showBorder: true, borderColor: '#ffffff',
    glassMode: true, glassOpacity: 30, glassBlur: 10, noiseOpacity: 25,
  },
  editorial: {
    bgTab: 'solid', bgColor: '#1a1a1a',
    textColor: '#ffffff', font: 'Abril Fatface', fontWeight: '400', italic: false,
    hlColor: '#ff3e3e', padding: 60, radius: 4, shadow: 'lg', showBorder: false,
    noiseOpacity: 5, align: 'center',
  },
  zen: {
    bgTab: 'gradient', gradC1: '#a8edea', gradC2: '#fed6e3', gradAngle: 135,
    textColor: '#2c3e50', font: 'Pacifico', fontWeight: '400', italic: false,
    hlColor: '#ffffff', padding: 48, radius: 24, shadow: 'md', showBorder: false,
    glassMode: true, glassOpacity: 20, glassBlur: 15,
  },
  midnight: {
    bgTab: 'solid', bgColor: '#0a0a0a',
    textColor: '#d4af37', font: 'Cinzel', fontWeight: '700', italic: false,
    hlColor: '#d4af37', padding: 50, radius: 8, shadow: 'xl', showBorder: true, borderColor: '#d4af37',
    noiseOpacity: 10,
  },
  handwritten: {
    bgTab: 'solid', bgColor: '#fdf6e3',
    textColor: '#268bd2', font: 'Caveat', fontWeight: '700', italic: false,
    hlColor: '#eee8d5', padding: 44, radius: 12, shadow: 'sm', showBorder: false,
    noiseOpacity: 15,
  },
  retrowave: {
    bgTab: 'gradient', gradC1: '#2b0044', gradC2: '#ff0080', gradAngle: 180,
    textColor: '#ffffff', font: 'Righteous', fontWeight: '400', italic: false,
    hlColor: '#00ffff', padding: 40, radius: 20, shadow: 'xl', showBorder: false,
    patternEmoji: '✨', patternSize: 20, patternSpacing: 60, patternOpacity: 30,
  },
  minimal: {
    bgTab: 'solid', bgColor: '#ffffff',
    textColor: '#1a1a1a', font: 'Outfit', fontWeight: '600', italic: false,
    hlColor: '#5a5aff', padding: 56, radius: 16, shadow: 'xl', showBorder: false,
    align: 'left',
  },
  ocean: {
    bgTab: 'gradient', gradC1: '#0077b6', gradC2: '#00b4d8', gradAngle: 160,
    textColor: '#ffffff', font: 'Satisfy', fontWeight: '400', italic: false,
    hlColor: '#90e0ef', padding: 44, radius: 20, shadow: 'lg', showBorder: false,
    glassMode: true, glassOpacity: 25, glassBlur: 10,
  },
  vintage: {
    bgTab: 'solid', bgColor: '#f5f0e8',
    textColor: '#2c2416', font: 'Lora', fontWeight: '400', italic: true,
    hlColor: '#d4a574', padding: 48, radius: 0, shadow: 'sm', showBorder: true, borderColor: '#d4c4a0',
    noiseOpacity: 20,
  },
  cosmic: {
    bgTab: 'gradient', gradC1: '#0f0c29', gradC2: '#302b63', gradAngle: 135,
    textColor: '#e8e8ff', font: 'Space Grotesk', fontWeight: '400', italic: false,
    hlColor: '#a855f7', padding: 44, radius: 20, shadow: 'xl', showBorder: false,
    patternEmoji: '⭐', patternSize: 18, patternSpacing: 80, patternOpacity: 20,
  },
};
