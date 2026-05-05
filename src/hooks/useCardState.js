import { useReducer, useCallback } from 'react';

const initialState = {
  id: null,
  user_id: null,
  quoteText: 'Your future is shaped by the habits you repeat, not the goals you set.',
// ...
  authorText: '— James Clear',
  font: 'Playfair Display',
  customFontName: null,
  fontSize: 28,
  lineHeight: 145,
  fontWeight: '400',
  italic: false,
  align: 'left',
  textColor: '#1a1a2e',
  showQuotes: true,
  bgTab: 'solid',
  bgColor: '#ffffff',
  gradC1: '#ffecd2',
  gradC2: '#fcb69f',
  gradAngle: 135,
  bgImgUrl: '',
  overlayColor: '#000000',
  overlayOpacity: 40,
  padding: 40,
  radius: 16,
  shadow: 'md',
  showBorder: false,
  borderColor: '#e0e0e0',
  borderWidth: 1.5,
  borderStyle: 'solid',
  showWatermark: false,
  watermarkText: '@quotecardstudio',
  watermarkColor: '',
  watermarkFontSize: 10,
  watermarkOpacity: 40,
  watermarkPosition: 'bottom-right',
  highlights: ['the habits you repeat'],
  hlColor: '#b6f0b0',
  hlOpacity: 60,
  ratio: 'square',
  patternEmoji: '',
  patternSize: 24,
  patternSpacing: 48,
  patternOpacity: 20,
  patternRotation: -15,
  patternBgColor: '#ffffff',
  gfontUrl: '',
  shouldDownload: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };

    case 'SET_FONT':
      return { ...state, font: action.value, customFontName: null, gfontUrl: '' };

    case 'SET_CUSTOM_FONT':
      return { ...state, font: action.value, customFontName: action.value, gfontUrl: action.url || state.gfontUrl };

    case 'ADD_HIGHLIGHT': {
      const word = action.value.trim();
      if (!word || state.highlights.includes(word)) return state;
      return { ...state, highlights: [...state.highlights, word] };
    }

    case 'REMOVE_HIGHLIGHT':
      return {
        ...state,
        highlights: state.highlights.filter((h) => h !== action.value),
      };



    case 'SET_GRADIENT_PRESET':
      return {
        ...state,
        gradC1: action.c1,
        gradC2: action.c2,
        gradAngle: action.angle,
      };

    case 'LOAD_SAVED_CARD': {
      const { card, autoDownload } = action.payload;
      return {
        ...state,
        ...card.card_state,
        id: card.id,
        user_id: card.user_id,
        shouldDownload: autoDownload
      };
    }
    case 'APPLY_PRESET': {
      return {
        ...state,
        ...action.payload
      };
    }

    default:
      return state;
  }
}

export default function useCardState() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setField = useCallback(
    (field, value) => dispatch({ type: 'SET_FIELD', field, value }),
    []
  );

  const setFont = useCallback(
    (name) => dispatch({ type: 'SET_FONT', value: name }),
    []
  );

  const setCustomFont = useCallback(
    (name, url) => dispatch({ type: 'SET_CUSTOM_FONT', value: name, url }),
    []
  );

  const addHighlight = useCallback(
    (word) => dispatch({ type: 'ADD_HIGHLIGHT', value: word }),
    []
  );

  const removeHighlight = useCallback(
    (word) => dispatch({ type: 'REMOVE_HIGHLIGHT', value: word }),
    []
  );



  const setGradientPreset = useCallback(
    (c1, c2, angle) => dispatch({ type: 'SET_GRADIENT_PRESET', c1, c2, angle }),
    []
  );

  const loadCardState = useCallback(
    (card, autoDownload = false) => {
      dispatch({ type: 'LOAD_SAVED_CARD', payload: { card, autoDownload } });
    },
    []
  );

  const applyPreset = useCallback(
    (preset) => dispatch({ type: 'APPLY_PRESET', payload: preset }),
    []
  );

  return {
    state,
    setField,
    setFont,
    setCustomFont,
    addHighlight,
    removeHighlight,
    setGradientPreset,
    loadCardState,
    applyPreset,
  };
}
