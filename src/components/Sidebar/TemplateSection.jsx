import { PRESETS } from '../../constants';
import { FiLayout } from 'react-icons/fi';
import CollapsiblePanel from '../ui/CollapsiblePanel';
import './Sidebar.css';

export default function TemplateSection({ applyPreset }) {
  const handleApply = (presetKey) => {
    applyPreset(PRESETS[presetKey]);
  };

  return (
    <CollapsiblePanel title="Demo templates" icon={FiLayout} defaultOpen={true}>
      <div className="template-grid">
        {Object.keys(PRESETS).map((key) => {
          const preset = PRESETS[key];
          const bgStyle = preset.bgTab === 'gradient' 
            ? { background: `linear-gradient(${preset.gradAngle}deg, ${preset.gradC1}, ${preset.gradC2})` }
            : preset.bgTab === 'solid'
            ? { background: preset.bgColor }
            : { background: preset.patternBgColor || '#f0f0f0' };

          return (
            <button
              key={key}
              className="template-btn"
              onClick={() => handleApply(key)}
              title={`Apply ${key.charAt(0).toUpperCase() + key.slice(1)} style`}
            >
              <div className="template-preview" style={bgStyle}>
                <span style={{ color: preset.textColor, fontFamily: preset.font }}>Abc</span>
              </div>
              <span className="template-name">{key}</span>
            </button>
          );
        })}
      </div>
    </CollapsiblePanel>
  );
}
