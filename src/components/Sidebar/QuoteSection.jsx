import { FiEdit2 } from 'react-icons/fi';
import CollapsiblePanel from '../ui/CollapsiblePanel';

export default function QuoteSection({ quoteText, authorText, setField }) {
  return (
    <CollapsiblePanel title="Quote" icon={FiEdit2} defaultOpen={true}>
      <textarea
        id="quote-text"
        rows={4}
        placeholder="Enter your quote here..."
        value={quoteText}
        onChange={(e) => setField('quoteText', e.target.value)}
        style={{ resize: 'none' }}
      />
      <div style={{ marginTop: 8 }}>
        <input
          id="author-text"
          type="text"
          placeholder="— Author name (optional)"
          value={authorText}
          onChange={(e) => setField('authorText', e.target.value)}
        />
      </div>
    </CollapsiblePanel>
  );
}
