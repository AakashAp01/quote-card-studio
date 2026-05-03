import { FiDroplet } from 'react-icons/fi';
import CollapsiblePanel from '../ui/CollapsiblePanel';
import ControlRow from '../ui/ControlRow';
import Toggle from '../ui/Toggle';

const POSITIONS = [
  { key: 'bottom-right', label: 'Bottom Right' },
  { key: 'bottom-left', label: 'Bottom Left' },
  { key: 'bottom-center', label: 'Bottom Center' },
  { key: 'top-right', label: 'Top Right' },
  { key: 'top-left', label: 'Top Left' },
  { key: 'top-center', label: 'Top Center' },
];

export default function WatermarkSection({
  showWatermark,
  watermarkText,
  watermarkColor,
  watermarkFontSize,
  watermarkOpacity,
  watermarkPosition,
  setField,
}) {
  return (
    <CollapsiblePanel title="Watermark" icon={FiDroplet} defaultOpen={false}>
      <ControlRow label="Show">
        <Toggle id="show-watermark" checked={showWatermark} onChange={(v) => setField('showWatermark', v)} />
      </ControlRow>

      {showWatermark && (
        <>
          <input
            type="text"
            placeholder="@yourhandle"
            value={watermarkText}
            onChange={(e) => setField('watermarkText', e.target.value)}
            style={{ marginBottom: 8 }}
          />

          <ControlRow label="Color">
            <input type="color" value={watermarkColor || '#888888'} onInput={(e) => setField('watermarkColor', e.target.value)} />
            {watermarkColor && (
              <button
                className="btn btn-ghost"
                style={{ fontSize: 10, padding: '4px 8px' }}
                onClick={() => setField('watermarkColor', '')}
                type="button"
              >
                Auto
              </button>
            )}
          </ControlRow>

          <ControlRow label="Position">
            <select value={watermarkPosition} onChange={(e) => setField('watermarkPosition', e.target.value)} style={{ flex: 2, fontSize: 12 }}>
              {POSITIONS.map((p) => (
                <option key={p.key} value={p.key}>{p.label}</option>
              ))}
            </select>
          </ControlRow>

          <ControlRow label="Size">
            <input type="range" min={6} max={24} value={watermarkFontSize} onInput={(e) => setField('watermarkFontSize', Number(e.target.value))} style={{ flex: 2 }} />
            <span className="range-val">{watermarkFontSize}px</span>
          </ControlRow>

          <ControlRow label="Opacity">
            <input type="range" min={5} max={100} value={watermarkOpacity} onInput={(e) => setField('watermarkOpacity', Number(e.target.value))} style={{ flex: 2 }} />
            <span className="range-val">{watermarkOpacity}%</span>
          </ControlRow>
        </>
      )}
    </CollapsiblePanel>
  );
}
