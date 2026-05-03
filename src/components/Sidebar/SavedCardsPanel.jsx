import { useEffect, useState } from 'react';
import { FiSave, FiFolder, FiTrash2, FiUpload, FiPlus } from 'react-icons/fi';
import CollapsiblePanel from '../ui/CollapsiblePanel';
import { useAuth } from '../../context/AuthContext';
import useSavedCards from '../../hooks/useSavedCards';
import './SavedCardsPanel.css';

export default function SavedCardsPanel({ state, onLoadCard }) {
  const { user } = useAuth();
  const { cards, loading, loadCards, saveCard, loadCard, deleteCard } = useSavedCards();
  const [saving, setSaving] = useState(false);
  const [cardName, setCardName] = useState('');
  const [showSaveInput, setShowSaveInput] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (user) loadCards();
  }, [user, loadCards]);

  if (!user) return null;

  const handleSave = async () => {
    if (!cardName.trim()) return;
    setSaving(true);
    setMessage(null);
    try {
      await saveCard(cardName, state);
      setCardName('');
      setShowSaveInput(false);
      setMessage({ type: 'success', text: 'Card saved!' });
      setTimeout(() => setMessage(null), 2500);
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
    setSaving(false);
  };

  const handleLoad = async (id) => {
    setLoadingId(id);
    setMessage(null);
    try {
      const cardState = await loadCard(id);
      if (cardState) onLoadCard(cardState);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to load card' });
    }
    setLoadingId(null);
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"?`)) return;
    setMessage(null);
    try {
      await deleteCard(id);
      setMessage({ type: 'success', text: 'Deleted' });
      setTimeout(() => setMessage(null), 2000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to delete' });
    }
  };

  return (
    <CollapsiblePanel title="Saved Cards" icon={FiFolder} defaultOpen={true}>
      {message && (
        <div className={`saved-msg saved-msg-${message.type}`}>
          {message.text}
        </div>
      )}

      {!showSaveInput ? (
        <button
          className="save-current-btn"
          onClick={() => setShowSaveInput(true)}
          type="button"
        >
          <FiPlus size={14} />
          <span>Save Current Design</span>
        </button>
      ) : (
        <div className="save-input-row">
          <input
            type="text"
            placeholder="Card name..."
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            autoFocus
          />
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={saving || !cardName.trim()}
            type="button"
            style={{ padding: '7px 12px', fontSize: 12 }}
          >
            <FiSave size={13} />
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => { setShowSaveInput(false); setCardName(''); }}
            type="button"
            style={{ padding: '7px 10px', fontSize: 12 }}
          >
            ✕
          </button>
        </div>
      )}

      {loading ? (
        <div className="saved-loading">Loading...</div>
      ) : cards.length === 0 ? (
        <div className="saved-empty">No saved cards yet</div>
      ) : (
        <div className="saved-cards-list">
          {cards.map((card) => (
            <div key={card.id} className="saved-card-item">
              <div className="saved-card-info">
                <span className="saved-card-name">{card.name}</span>
                <span className="saved-card-date">
                  {new Date(card.updated_at).toLocaleDateString()}
                </span>
              </div>
              <div className="saved-card-actions">
                <button
                  className="saved-card-action load"
                  onClick={() => handleLoad(card.id)}
                  disabled={loadingId === card.id}
                  type="button"
                  title="Load"
                >
                  <FiUpload size={13} />
                </button>
                <button
                  className="saved-card-action delete"
                  onClick={() => handleDelete(card.id, card.name)}
                  type="button"
                  title="Delete"
                >
                  <FiTrash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </CollapsiblePanel>
  );
}
