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
  minimal: {
    bgTab: 'solid', bgColor: '#ffffff',
    textColor: '#1a1a1a', font: 'Montserrat', fontWeight: '400', italic: false,
    gfontUrl: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap',
    hlColor: '#d4f0b0', padding: 48, radius: 12, shadow: 'md', showBorder: false,
  },
  dark: {
    bgTab: 'solid', bgColor: '#0d0d0d',
    textColor: '#f5f5f0', font: 'Playfair Display', fontWeight: '400', italic: true,
    gfontUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap',
    hlColor: '#2a4a2a', padding: 48, radius: 8, shadow: 'lg', showBorder: false,
  },
  sunset: {
    bgTab: 'gradient', gradC1: '#ff6b6b', gradC2: '#ffa500', gradAngle: 135,
    textColor: '#ffffff', font: 'Inter', fontWeight: '700', italic: false,
    gfontUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap',
    hlColor: '#ffffff', padding: 44, radius: 20, shadow: 'xl', showBorder: false,
  },
  forest: {
    bgTab: 'gradient', gradC1: '#1a472a', gradC2: '#2d5a27', gradAngle: 120,
    textColor: '#d8f3dc', font: 'Lora', fontWeight: '400', italic: true,
    gfontUrl: 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&display=swap',
    hlColor: '#40916c', padding: 44, radius: 16, shadow: 'lg', showBorder: false,
  },
  aurora: {
    bgTab: 'gradient', gradC1: '#1a1a2e', gradC2: '#16213e', gradAngle: 135,
    textColor: '#e8e8ff', font: 'Outfit', fontWeight: '400', italic: false,
    gfontUrl: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap',
    hlColor: '#a855f7', padding: 44, radius: 20, shadow: 'xl', showBorder: true, borderColor: '#3a3a6a',
  },
  paper: {
    bgTab: 'solid', bgColor: '#f5f0e8',
    textColor: '#2c2416', font: 'Lora', fontWeight: '400', italic: false,
    gfontUrl: 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&display=swap',
    hlColor: '#d4a574', padding: 48, radius: 4, shadow: 'sm', showBorder: true, borderColor: '#d4c4a0',
  },
  midnight: {
    bgTab: 'gradient', gradC1: '#0a0a1a', gradC2: '#0d2137', gradAngle: 135,
    textColor: '#a8d8ea', font: 'Space Grotesk', fontWeight: '400', italic: false,
    gfontUrl: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap',
    hlColor: '#1a4a6a', padding: 48, radius: 16, shadow: 'xl', showBorder: false,
  },
  rose: {
    bgTab: 'gradient', gradC1: '#f9e4e4', gradC2: '#f5d0c5', gradAngle: 135,
    textColor: '#5c2a2a', font: 'Caveat', fontWeight: '700', italic: false,
    gfontUrl: 'https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap',
    hlColor: '#e8a0a0', padding: 44, radius: 20, shadow: 'md', showBorder: false,
  },
  neon: {
    bgTab: 'solid', bgColor: '#0a0a0a',
    textColor: '#39ff14', font: 'Bebas Neue', fontWeight: '400', italic: false,
    gfontUrl: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap',
    hlColor: '#39ff14', padding: 44, radius: 16, shadow: 'xl', showBorder: true, borderColor: '#39ff14',
  },
  pastel: {
    bgTab: 'gradient', gradC1: '#ffd1dc', gradC2: '#c3b1e1', gradAngle: 135,
    textColor: '#4a3060', font: 'Montserrat', fontWeight: '400', italic: false,
    gfontUrl: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap',
    hlColor: '#e8b4f8', padding: 48, radius: 24, shadow: 'md', showBorder: false,
  },
  ocean: {
    bgTab: 'gradient', gradC1: '#0077b6', gradC2: '#00b4d8', gradAngle: 160,
    textColor: '#caf0f8', font: 'Outfit', fontWeight: '400', italic: false,
    gfontUrl: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap',
    hlColor: '#90e0ef', padding: 44, radius: 16, shadow: 'lg', showBorder: false,
  },
  retro: {
    bgTab: 'solid', bgColor: '#fdf6e3',
    textColor: '#b58900', font: 'Bebas Neue', fontWeight: '400', italic: false,
    gfontUrl: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap',
    hlColor: '#cb4b16', padding: 48, radius: 0, shadow: 'none', showBorder: true, borderColor: '#b58900',
  },
  luxury: {
    bgTab: 'solid', bgColor: '#1a1a1a',
    textColor: '#d4af37', font: 'Playfair Display', fontWeight: '700', italic: false,
    gfontUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap',
    hlColor: '#d4af37', padding: 48, radius: 4, shadow: 'xl', showBorder: true, borderColor: '#d4af37',
  },
  loveEmoji: {
    bgTab: 'pattern', patternEmoji: '💗', patternBgColor: '#fff0f5', patternSize: 22, patternSpacing: 70, patternOpacity: 25, patternRotation: -15,
    textColor: '#8b2252', font: 'Caveat', fontWeight: '700', italic: false,
    gfontUrl: 'https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap',
    hlColor: '#ff69b4', padding: 44, radius: 20, shadow: 'md', showBorder: false,
  },
  cosmicEmoji: {
    bgTab: 'pattern', patternEmoji: '✨', patternBgColor: '#0d0d2b', patternSize: 20, patternSpacing: 90, patternOpacity: 20, patternRotation: -10,
    textColor: '#e8e8ff', font: 'Space Grotesk', fontWeight: '400', italic: false,
    gfontUrl: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap',
    hlColor: '#a855f7', padding: 44, radius: 16, shadow: 'xl', showBorder: false,
  },
  floralEmoji: {
    bgTab: 'pattern', patternEmoji: '🌸', patternBgColor: '#fef9f0', patternSize: 24, patternSpacing: 80, patternOpacity: 20, patternRotation: 0,
    textColor: '#5c3d2e', font: 'Lora', fontWeight: '400', italic: true,
    gfontUrl: 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&display=swap',
    hlColor: '#e8a0a0', padding: 48, radius: 16, shadow: 'sm', showBorder: false,
  },
};
