import { useState } from 'react';
import { FiLayers } from 'react-icons/fi';
import CollapsiblePanel from '../ui/CollapsiblePanel';
import ControlRow from '../ui/ControlRow';
import GradientSwatch from '../ui/GradientSwatch';
import { GRADIENTS } from '../../constants';

export default function BackgroundSection({
  bgTab,
  bgColor,
  gradC1,
  gradC2,
  gradAngle,
  bgImgUrl,
  overlayColor,
  overlayOpacity,
  patternEmoji,
  patternSize,
  patternSpacing,
  patternOpacity,
  patternRotation,
  patternBgColor,
  setField,
  setGradientPreset,
}) {
  const [activeGradient, setActiveGradient] = useState(-1);

  return (
    <CollapsiblePanel title="Background" icon={FiLayers} defaultOpen={true}>
      <ControlRow label="Type">
        <select
          value={bgTab}
          onChange={(e) => setField('bgTab', e.target.value)}
          style={{ flex: 2, fontSize: 12 }}
        >
          <option value="solid">Solid Color</option>
          <option value="gradient">Gradient</option>
          <option value="pattern">Emoji Pattern</option>
          <option value="image">Image URL</option>
        </select>
      </ControlRow>

      <div className="divider" />

      {bgTab === 'solid' && (
        <ControlRow label="Color">
          <input type="color" value={bgColor} onInput={(e) => setField('bgColor', e.target.value)} />
        </ControlRow>
      )}

      {bgTab === 'gradient' && (
        <>
          <div className="hint-text" style={{ marginBottom: 8 }}>Presets</div>
          <div className="gradient-presets-grid">
            {GRADIENTS.map((g, i) => (
              <GradientSwatch
                key={i}
                c1={g.c1}
                c2={g.c2}
                angle={g.angle}
                index={i}
                isActive={activeGradient === i}
                onClick={() => {
                  setActiveGradient(i);
                  setGradientPreset(g.c1, g.c2, g.angle);
                }}
              />
            ))}
          </div>
          <ControlRow label="Color 1">
            <input type="color" value={gradC1} onInput={(e) => setField('gradC1', e.target.value)} />
          </ControlRow>
          <ControlRow label="Color 2">
            <input type="color" value={gradC2} onInput={(e) => setField('gradC2', e.target.value)} />
          </ControlRow>
          <ControlRow label="Angle">
            <input type="range" min={0} max={360} value={gradAngle} onInput={(e) => setField('gradAngle', Number(e.target.value))} style={{ flex: 2 }} />
            <span className="range-val">{gradAngle}°</span>
          </ControlRow>
        </>
      )}

      {bgTab === 'pattern' && (
        <>
          <div className="hint-text" style={{ marginBottom: 6 }}>
            Type or paste emoji(s) — separate with spaces
          </div>
          <input
            type="text"
            placeholder="e.g. ❤️ or ⭐ 🌙 ✨"
            value={patternEmoji}
            onChange={(e) => setField('patternEmoji', e.target.value)}
            style={{ fontSize: 16, marginBottom: 10 }}
          />
          <div className="divider" />
          <ControlRow label="Bg Color">
            <input type="color" value={patternBgColor} onInput={(e) => setField('patternBgColor', e.target.value)} />
          </ControlRow>
          <ControlRow label="Size">
            <input type="range" min={12} max={56} value={patternSize} onInput={(e) => setField('patternSize', Number(e.target.value))} style={{ flex: 2 }} />
            <span className="range-val">{patternSize}</span>
          </ControlRow>
          <ControlRow label="Spacing">
            <input type="range" min={24} max={96} value={patternSpacing} onInput={(e) => setField('patternSpacing', Number(e.target.value))} style={{ flex: 2 }} />
            <span className="range-val">{patternSpacing}</span>
          </ControlRow>
          <ControlRow label="Opacity">
            <input type="range" min={5} max={100} value={patternOpacity} onInput={(e) => setField('patternOpacity', Number(e.target.value))} style={{ flex: 2 }} />
            <span className="range-val">{patternOpacity}%</span>
          </ControlRow>
          <ControlRow label="Rotation">
            <input type="range" min={-45} max={45} value={patternRotation} onInput={(e) => setField('patternRotation', Number(e.target.value))} style={{ flex: 2 }} />
            <span className="range-val">{patternRotation}°</span>
          </ControlRow>
        </>
      )}

      {bgTab === 'image' && (
        <>
          <div className="hint-text" style={{ marginBottom: 6 }}>Image URL</div>
          <input type="url" placeholder="https://..." value={bgImgUrl} onInput={(e) => setField('bgImgUrl', e.target.value)} style={{ marginBottom: 8 }} />
          <div className="hint-text" style={{ marginBottom: 6 }}>Overlay</div>
          <ControlRow label="">
            <input type="color" value={overlayColor} onInput={(e) => setField('overlayColor', e.target.value)} />
            <input type="range" min={0} max={90} value={overlayOpacity} onInput={(e) => setField('overlayOpacity', Number(e.target.value))} style={{ flex: 1 }} />
            <span className="range-val">{overlayOpacity}%</span>
          </ControlRow>
        </>
      )}
    </CollapsiblePanel>
  );
}
