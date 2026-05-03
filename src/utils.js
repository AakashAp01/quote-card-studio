export function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function applyHighlights(text, highlights, hlColor, hlOpacity) {
  if (!highlights.length) return escapeHtml(text);

  const alpha = hlOpacity / 100;
  const rgba = hexToRgba(hlColor, alpha);

  let result = escapeHtml(text);
  highlights.forEach((word) => {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    result = result.replace(
      regex,
      `<span class="highlight-word" style="background:${rgba}">$1</span>`
    );
  });
  return result;
}


export function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
