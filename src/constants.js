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

export const PATTERNS = [
  { key: 'hearts', emoji: '❤️', label: 'Hearts' },
  { key: 'stars', emoji: '⭐', label: 'Stars' },
  { key: 'fire', emoji: '🔥', label: 'Fire' },
  { key: 'sparkles', emoji: '✨', label: 'Sparkles' },
  { key: 'flowers', emoji: '🌸', label: 'Flowers' },
  { key: 'leaves', emoji: '🍃', label: 'Leaves' },
  { key: 'moons', emoji: '🌙', label: 'Moons' },
  { key: 'lightning', emoji: '⚡', label: 'Lightning' },
  { key: 'diamonds', emoji: '💎', label: 'Diamonds' },
  { key: 'roses', emoji: '🌹', label: 'Roses' },
  { key: 'butterflies', emoji: '🦋', label: 'Butterflies' },
  { key: 'coffee', emoji: '☕', label: 'Coffee' },
  { key: 'books', emoji: '📚', label: 'Books' },
  { key: 'rocket', emoji: '🚀', label: 'Rocket' },
  { key: 'love-mix', emoji: '❤️ 💕 💗', label: 'Love Mix', multi: true },
  { key: 'cosmic', emoji: '⭐ 🌙 ✨', label: 'Cosmic', multi: true },
  { key: 'nature', emoji: '🌿 🍃 🌱', label: 'Nature', multi: true },
  { key: 'floral', emoji: '🌸 🌺 🌷', label: 'Floral', multi: true },
  { key: 'weather', emoji: '☁️ ⚡ 🌧️', label: 'Weather', multi: true },
  { key: 'food', emoji: '☕ 🍩 🧁', label: 'Sweet', multi: true },
];

export const PRESETS = {
  minimal: {
    bg: { tab: 'solid', color: '#ffffff' },
    text: '#1a1a1a', font: 'Playfair Display', weight: '400', italic: false,
    hlColor: '#d4f0b0', padding: 48, radius: 12, shadow: 'md', border: false,
  },
  dark: {
    bg: { tab: 'solid', color: '#0d0d0d' },
    text: '#f5f5f0', font: 'Merriweather', weight: '300', italic: true,
    hlColor: '#2a4a2a', padding: 48, radius: 8, shadow: 'lg', border: false,
  },
  sunset: {
    bg: { tab: 'gradient', c1: '#ff6b6b', c2: '#ffa500', angle: 135 },
    text: '#ffffff', font: 'DM Serif Display', weight: '400', italic: false,
    hlColor: '#ffffff', padding: 44, radius: 20, shadow: 'xl', border: false,
  },
  forest: {
    bg: { tab: 'gradient', c1: '#1a472a', c2: '#2d5a27', angle: 120 },
    text: '#d8f3dc', font: 'Lora', weight: '400', italic: true,
    hlColor: '#40916c', padding: 44, radius: 16, shadow: 'lg', border: false,
  },
  aurora: {
    bg: { tab: 'gradient', c1: '#1a1a2e', c2: '#16213e', angle: 135 },
    text: '#e8e8ff', font: 'Cormorant Garamond', weight: '300', italic: true,
    hlColor: '#a855f7', padding: 44, radius: 20, shadow: 'xl', border: true, borderColor: '#3a3a6a',
  },
  paper: {
    bg: { tab: 'solid', color: '#f5f0e8' },
    text: '#2c2416', font: 'Lora', weight: '400', italic: false,
    hlColor: '#d4a574', padding: 48, radius: 4, shadow: 'sm', border: true, borderColor: '#d4c4a0',
  },
  midnight: {
    bg: { tab: 'gradient', c1: '#0a0a1a', c2: '#0d2137', angle: 135 },
    text: '#a8d8ea', font: 'Raleway', weight: '300', italic: false,
    hlColor: '#1a4a6a', padding: 48, radius: 16, shadow: 'xl', border: false,
  },
  rose: {
    bg: { tab: 'gradient', c1: '#f9e4e4', c2: '#f5d0c5', angle: 135 },
    text: '#5c2a2a', font: 'Cormorant Garamond', weight: '600', italic: false,
    hlColor: '#e8a0a0', padding: 44, radius: 20, shadow: 'md', border: false,
  },
  neon: {
    bg: { tab: 'solid', color: '#0a0a0a' },
    text: '#39ff14', font: 'Space Grotesk', weight: '600', italic: false,
    hlColor: '#39ff14', padding: 44, radius: 16, shadow: 'xl', border: true, borderColor: '#39ff14',
  },
  pastel: {
    bg: { tab: 'gradient', c1: '#ffd1dc', c2: '#c3b1e1', angle: 135 },
    text: '#4a3060', font: 'Poppins', weight: '400', italic: false,
    hlColor: '#e8b4f8', padding: 48, radius: 24, shadow: 'md', border: false,
  },
  ocean: {
    bg: { tab: 'gradient', c1: '#0077b6', c2: '#00b4d8', angle: 160 },
    text: '#caf0f8', font: 'Raleway', weight: '300', italic: false,
    hlColor: '#90e0ef', padding: 44, radius: 16, shadow: 'lg', border: false,
  },
  retro: {
    bg: { tab: 'solid', color: '#fdf6e3' },
    text: '#b58900', font: 'DM Serif Display', weight: '400', italic: false,
    hlColor: '#cb4b16', padding: 48, radius: 0, shadow: 'none', border: true, borderColor: '#b58900',
  },
  luxury: {
    bg: { tab: 'solid', color: '#1a1a1a' },
    text: '#d4af37', font: 'Playfair Display', weight: '700', italic: false,
    hlColor: '#d4af37', padding: 48, radius: 4, shadow: 'xl', border: true, borderColor: '#d4af37',
  },
  loveEmoji: {
    bg: { tab: 'pattern', patternEmoji: '❤️ 💕 💗', patternBgColor: '#fff0f5', patternSize: 22, patternSpacing: 44, patternOpacity: 25, patternRotation: -15 },
    text: '#8b2252', font: 'Playfair Display', weight: '400', italic: true,
    hlColor: '#ff69b4', padding: 44, radius: 20, shadow: 'md', border: false,
  },
  cosmicEmoji: {
    bg: { tab: 'pattern', patternEmoji: '⭐ 🌙 ✨', patternBgColor: '#0d0d2b', patternSize: 20, patternSpacing: 40, patternOpacity: 30, patternRotation: -10 },
    text: '#e8e8ff', font: 'Space Grotesk', weight: '300', italic: false,
    hlColor: '#a855f7', padding: 44, radius: 16, shadow: 'xl', border: false,
  },
  floralEmoji: {
    bg: { tab: 'pattern', patternEmoji: '🌸 🌺 🌷', patternBgColor: '#fef9f0', patternSize: 24, patternSpacing: 48, patternOpacity: 20, patternRotation: 0 },
    text: '#5c3d2e', font: 'Cormorant Garamond', weight: '600', italic: false,
    hlColor: '#e8a0a0', padding: 48, radius: 16, shadow: 'sm', border: false,
  },
};


