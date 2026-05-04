import { useEffect, useState } from 'react';
import { FiSave, FiFolder, FiTrash2, FiUpload, FiPlus, FiEdit2, FiCheck, FiX } from 'react-icons/fi';
import CollapsiblePanel from '../ui/CollapsiblePanel';
import { useAuth } from '../../context/AuthContext';
import useSavedCards from '../../hooks/useSavedCards';
import './SavedCardsPanel.css';

export default function SavedCardsPanel({ state, onLoadCard }) {
  const { user } = useAuth();
  const { cards, loading, loadCards, saveCard, loadCard, deleteCard, updateCard } = useSavedCards();
  const [saving, setSaving] = useState(false);
  const [cardName, setCardName] = useState('');
  const [showSaveInput, setShowSaveInput] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  const [message, setMessage] = useState(null);

  // Editing state
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editIsPublic, setEditIsPublic] = useState(false);

  useEffect(() => {
    if (user) loadCards();
  }, [user, loadCards]);

  if (!user) return null;

  const handleSave = async (forceNew = false) => {
    if (!cardName.trim()) return;
    setSaving(true);
    setMessage(null);
    try {
      if (state.id && state.user_id === user.id && !forceNew) {
        await updateCard(state.id, { 
          card_state: state, 
          is_public: isPublic,
          name: cardName.trim(),
          updated_at: new Date().toISOString()
        });
        setMessage({ type: 'success', text: 'Card updated!' });
      } else {
        await saveCard(cardName, state, isPublic);
        setMessage({ type: 'success', text: 'Card saved!' });
      }
      setCardName('');
      setIsPublic(false);
      setShowSaveInput(false);
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
      const card = await loadCard(id);
      if (card) onLoadCard(card);
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

  const startEditing = (card) => {
    setEditingId(card.id);
    setEditName(card.name);
    setEditIsPublic(card.is_public);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName('');
  };

  const handleUpdate = async (id) => {
    if (!editName.trim()) return;
    setSaving(true);
    try {
      await updateCard(id, { name: editName.trim(), is_public: editIsPublic });
      setEditingId(null);
      setMessage({ type: 'success', text: 'Updated!' });
      setTimeout(() => setMessage(null), 2000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Update failed' });
    }
    setSaving(false);
  };

  return (
    <CollapsiblePanel title="Saved Cards" icon={FiFolder} defaultOpen={true}>
      {message && (
        <div className={`saved-msg saved-msg-${message.type}`}>
          {message.text}
        </div>
      )}

      {!showSaveInput ? (
        <div className="save-actions">
          <button
            className="save-current-btn"
            onClick={() => {
              setShowSaveInput(true);
              if (state.id && state.user_id === user.id) {
                const currentCard = cards.find(c => c.id === state.id);
                if (currentCard) {
                  setCardName(currentCard.name);
                  setIsPublic(currentCard.is_public);
                }
              }
            }}
            type="button"
          >
            <FiPlus size={14} />
            <span>{state.id && state.user_id === user.id ? 'Update / Save Design' : 'Save Current Design'}</span>
          </button>
        </div>
      ) : (
        <div className="save-form">
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
              onClick={() => handleSave(false)}
              disabled={saving || !cardName.trim()}
              type="button"
              style={{ padding: '7px 12px', fontSize: 12 }}
              title={state.id && state.user_id === user.id ? 'Update Existing' : 'Save New'}
            >
              {state.id && state.user_id === user.id ? <FiEdit2 size={13} /> : <FiSave size={13} />}
              <span>{state.id && state.user_id === user.id ? 'Update' : 'Save'}</span>
            </button>
            {state.id && state.user_id === user.id && (
              <button
                className="btn btn-ghost"
                onClick={() => handleSave(true)}
                disabled={saving || !cardName.trim()}
                type="button"
                style={{ padding: '7px 12px', fontSize: 12 }}
                title="Save as a new copy"
              >
                <FiPlus size={13} />
              </button>
            )}
            <button
              className="btn btn-ghost"
              onClick={() => { setShowSaveInput(false); setCardName(''); setIsPublic(false); }}
              type="button"
              style={{ padding: '7px 10px', fontSize: 12 }}
            >
              ✕
            </button>
          </div>
          <div className="save-options">
            <label className="save-option-label">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
              <span>Public</span>
            </label>
          </div>
        </div>
      )}

      {loading && !saving ? (
        <div className="saved-loading">Loading...</div>
      ) : cards.length === 0 ? (
        <div className="saved-empty">No saved cards yet</div>
      ) : (
        <div className="saved-cards-list">
          {cards.map((card) => (
            <div key={card.id} className={`saved-card-item${editingId === card.id ? ' editing' : ''}`}>
              {editingId === card.id ? (
                <div className="edit-form">
                  <div className="edit-input-row">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleUpdate(card.id)}
                      autoFocus
                    />
                    <button className="edit-action save" onClick={() => handleUpdate(card.id)} disabled={saving} title="Save">
                      <FiCheck size={14} />
                    </button>
                    <button className="edit-action cancel" onClick={cancelEditing} title="Cancel">
                      <FiX size={14} />
                    </button>
                  </div>
                  <div className="edit-options">
                    <label className="save-option-label">
                      <input
                        type="checkbox"
                        checked={editIsPublic}
                        onChange={(e) => setEditIsPublic(e.target.checked)}
                      />
                      <span>Public</span>
                    </label>
                  </div>
                </div>
              ) : (
                <>
                  <div className="saved-card-info">
                    <div className="saved-card-name-row">
                      <span className="saved-card-name">{card.name}</span>
                      {card.is_public && <span className="public-badge">Public</span>}
                    </div>
                    <span className="saved-card-date">
                      {new Date(card.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="saved-card-actions">
                    <button
                      className="saved-card-action edit"
                      onClick={() => startEditing(card)}
                      type="button"
                      title="Edit Name/Status"
                    >
                      <FiEdit2 size={13} />
                    </button>
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
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </CollapsiblePanel>
  );
}
