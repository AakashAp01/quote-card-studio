import { FiAlignCenter } from 'react-icons/fi';
import CollapsiblePanel from '../ui/CollapsiblePanel';
import ControlRow from '../ui/ControlRow';
import Toggle from '../ui/Toggle';

export default function TextSection({ textColor, showQuotes, setField }) {
  return (
    <CollapsiblePanel title="Text" icon={FiAlignCenter} defaultOpen={false}>
      <ControlRow label="Color">
        <input type="color" value={textColor} onInput={(e) => setField('textColor', e.target.value)} />
      </ControlRow>
      <ControlRow label="Quote Marks">
        <Toggle id="show-quotes" checked={showQuotes} onChange={(v) => setField('showQuotes', v)} />
      </ControlRow>
    </CollapsiblePanel>
  );
}
