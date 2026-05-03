import { useState, useCallback } from 'react';
import { FiPenTool } from 'react-icons/fi';
import CollapsiblePanel from '../ui/CollapsiblePanel';
import ControlRow from '../ui/ControlRow';

export default function HighlightSection({
  highlights,
  hlColor,
  hlOpacity,
  addHighlight,
  removeHighlight,
  setField,
}) {
  const [inputVal, setInputVal] = useState('');

  const handleAdd = useCallback(() => {
    if (inputVal.trim()) {
      addHighlight(inputVal.trim());
      setInputVal('');
    }
  }, [inputVal, addHighlight]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') handleAdd();
    },
    [handleAdd]
  );

  return (
    <CollapsiblePanel title="Highlight Words" icon={FiPenTool} defaultOpen={false}>
      <div style={{ display: 'flex', gap: 6 }}>
        <input
          id="highlight-input"
          type="text"
          placeholder="Type a word/phrase..."
          style={{ flex: 1 }}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="btn btn-primary"
          onClick={handleAdd}
          style={{ whiteSpace: 'nowrap' }}
          type="button"
        >
          Add
        </button>
      </div>

      {highlights.length > 0 && (
        <div id="highlight-words-list">
          {highlights.map((word) => (
            <div className="word-tag" key={word}>
              <span>{word}</span>
              <button
                onClick={() => removeHighlight(word)}
                type="button"
                aria-label={`Remove highlight: ${word}`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="divider" />

      <ControlRow label="Color">
        <input
          type="color"
          id="hl-color"
          value={hlColor}
          onInput={(e) => setField('hlColor', e.target.value)}
        />
      </ControlRow>

      <ControlRow label="Opacity">
        <input
          type="range"
          id="hl-opacity"
          min={10}
          max={100}
          value={hlOpacity}
          onInput={(e) => setField('hlOpacity', Number(e.target.value))}
          style={{ flex: 2 }}
        />
        <span className="range-val">{hlOpacity}%</span>
      </ControlRow>
    </CollapsiblePanel>
  );
}
