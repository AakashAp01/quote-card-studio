import { useState, useCallback } from 'react';
import { FiType } from 'react-icons/fi';
import CollapsiblePanel from '../ui/CollapsiblePanel';
import ControlRow from '../ui/ControlRow';
import FontChip from '../ui/FontChip';
import { FONTS } from '../../constants';

export default function FontSection({
  font,
  customFontName,
  fontSize,
  lineHeight,
  fontWeight,
  italic,
  align,
  setField,
  setFont,
  setCustomFont,
}) {
  const [gfontUrl, setGfontUrl] = useState('');
  const [gfontStatus, setGfontStatus] = useState({ text: '', color: '#666' });

  const loadGoogleFont = useCallback(() => {
    const url = gfontUrl.trim();
    if (!url) {
      setGfontStatus({ text: 'Please enter a URL.', color: '#ff6464' });
      return;
    }

    let fontName = null;
    try {
      const u = new URL(url);
      const family = u.searchParams.get('family');
      if (family) {
        fontName = family.split(':')[0].replace(/\+/g, ' ');
      }
    } catch {
      /* invalid URL */
    }

    const existing = document.getElementById('custom-gfont-link');
    if (existing) existing.remove();

    const link = document.createElement('link');
    link.id = 'custom-gfont-link';
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);

    link.onload = () => {
      if (fontName) {
        setCustomFont(fontName);
        setGfontStatus({ text: `✓ Loaded: ${fontName}`, color: '#4adf80' });
      } else {
        setGfontStatus({
          text: 'Loaded (could not auto-detect name)',
          color: '#ffaa44',
        });
      }
    };

    link.onerror = () => {
      setGfontStatus({ text: '✗ Failed to load font.', color: '#ff6464' });
    };
  }, [gfontUrl, setCustomFont]);

  const handleFontSelect = useCallback(
    (name) => {
      setFont(name);
      setGfontStatus({ text: '', color: '#666' });
    },
    [setFont]
  );

  return (
    <CollapsiblePanel title="Font" icon={FiType} defaultOpen={false}>
      <div style={{ marginBottom: 10 }}>
        <div className="hint-text">Custom Google Font</div>
        <div style={{ display: 'flex', gap: 6 }}>
          <input
            type="url"
            id="gfont-url"
            placeholder="https://fonts.googleapis.com/css2?family=..."
            style={{ flex: 1, fontSize: 12 }}
            value={gfontUrl}
            onChange={(e) => setGfontUrl(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={loadGoogleFont}
            style={{ whiteSpace: 'nowrap', fontSize: 11 }}
            type="button"
          >
            Load
          </button>
        </div>
        {gfontStatus.text && (
          <div style={{ fontSize: 11, marginTop: 4, color: gfontStatus.color }}>
            {gfontStatus.text}
          </div>
        )}
      </div>

      <div className="hint-text">Built-in Fonts</div>
      <div className="font-chips-container">
        {FONTS.map((f) => (
          <FontChip
            key={f.name}
            name={f.name}
            isActive={font === f.name && !customFontName}
            onClick={() => handleFontSelect(f.name)}
          />
        ))}
      </div>

      <div className="divider" />

      <ControlRow label="Size">
        <input type="range" min={14} max={72} value={fontSize} onInput={(e) => setField('fontSize', Number(e.target.value))} style={{ flex: 2 }} />
        <span className="range-val">{fontSize}px</span>
      </ControlRow>

      <ControlRow label="Line Height">
        <input type="range" min={100} max={200} value={lineHeight} onInput={(e) => setField('lineHeight', Number(e.target.value))} style={{ flex: 2 }} />
        <span className="range-val">{(lineHeight / 100).toFixed(2)}</span>
      </ControlRow>

      <ControlRow label="Weight">
        <select value={fontWeight} onChange={(e) => setField('fontWeight', e.target.value)} style={{ flex: 2, fontSize: 12 }}>
          <option value="300">Light</option>
          <option value="400">Regular</option>
          <option value="600">Semibold</option>
          <option value="700">Bold</option>
        </select>
      </ControlRow>

      <ControlRow label="Italic">
        <label className="toggle" htmlFor="font-italic">
          <input type="checkbox" id="font-italic" checked={italic} onChange={(e) => setField('italic', e.target.checked)} />
          <span className="toggle-slider" />
        </label>
      </ControlRow>

      <ControlRow label="Align">
        <div style={{ display: 'flex', gap: 4 }}>
          {['left', 'center', 'right'].map((a) => (
            <button
              key={a}
              className={`btn ${align === a ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setField('align', a)}
              style={{ padding: '5px 8px', fontSize: 12 }}
              type="button"
              aria-label={`Align ${a}`}
            >
              {a === 'left' ? '⬅' : a === 'center' ? '≡' : '➡'}
            </button>
          ))}
        </div>
      </ControlRow>
    </CollapsiblePanel>
  );
}
