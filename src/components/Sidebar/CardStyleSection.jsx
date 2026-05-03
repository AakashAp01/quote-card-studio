import { FiLayout } from 'react-icons/fi';
import CollapsiblePanel from '../ui/CollapsiblePanel';
import ControlRow from '../ui/ControlRow';
import Toggle from '../ui/Toggle';

const RATIOS = [
  { key: 'square', label: '1:1' },
  { key: 'portrait', label: '4:5' },
  { key: 'landscape', label: '16:9' },
  { key: 'free', label: 'Auto' },
];

const BORDER_STYLES = [
  { key: 'solid', label: 'Solid' },
  { key: 'dashed', label: 'Dashed' },
  { key: 'dotted', label: 'Dotted' },
  { key: 'double', label: 'Double' },
  { key: 'groove', label: 'Groove' },
  { key: 'ridge', label: 'Ridge' },
  { key: 'inset', label: 'Inset' },
  { key: 'outset', label: 'Outset' },
];

export default function CardStyleSection({
  ratio,
  padding,
  radius,
  shadow,
  showBorder,
  borderColor,
  borderWidth,
  borderStyle,
  setField,
}) {
  return (
    <CollapsiblePanel title="Card Style" icon={FiLayout} defaultOpen={false}>
      <div className="hint-text" style={{ marginBottom: 6 }}>Aspect Ratio</div>
      <div className="ratio-group">
        {RATIOS.map((r) => (
          <button
            key={r.key}
            className={`ratio-btn${ratio === r.key ? ' active' : ''}`}
            onClick={() => setField('ratio', r.key)}
            type="button"
          >
            {r.label}
          </button>
        ))}
      </div>

      <ControlRow label="Padding">
        <input type="range" min={16} max={100} value={padding} onInput={(e) => setField('padding', Number(e.target.value))} style={{ flex: 2 }} />
        <span className="range-val">{padding}px</span>
      </ControlRow>

      <ControlRow label="Radius">
        <input type="range" min={0} max={40} value={radius} onInput={(e) => setField('radius', Number(e.target.value))} style={{ flex: 2 }} />
        <span className="range-val">{radius}px</span>
      </ControlRow>

      <ControlRow label="Shadow">
        <select value={shadow} onChange={(e) => setField('shadow', e.target.value)} style={{ flex: 2, fontSize: 12 }}>
          <option value="none">None</option>
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
          <option value="xl">XL</option>
        </select>
      </ControlRow>

      <div className="divider" />

      <ControlRow label="Border">
        <Toggle id="show-border" checked={showBorder} onChange={(v) => setField('showBorder', v)} />
        <input type="color" value={borderColor} onInput={(e) => setField('borderColor', e.target.value)} style={{ marginLeft: 4 }} />
      </ControlRow>

      {showBorder && (
        <>
          <ControlRow label="Style">
            <select value={borderStyle} onChange={(e) => setField('borderStyle', e.target.value)} style={{ flex: 2, fontSize: 12 }}>
              {BORDER_STYLES.map((s) => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
          </ControlRow>

          <ControlRow label="Width">
            <input type="range" min={0.5} max={10} step={0.5} value={borderWidth} onInput={(e) => setField('borderWidth', Number(e.target.value))} style={{ flex: 2 }} />
            <span className="range-val">{borderWidth}px</span>
          </ControlRow>
        </>
      )}
    </CollapsiblePanel>
  );
}
