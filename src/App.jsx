import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar/Sidebar';
import Preview from './components/Preview/Preview';
import AuthModal from './components/Auth/AuthModal';
import Showcase from './pages/Showcase';
import useCardState from './hooks/useCardState';
import useSavedCards from './hooks/useSavedCards';

function Editor({ 
  state, 
  setField, 
  setFont, 
  setCustomFont, 
  addHighlight, 
  removeHighlight, 
  setGradientPreset, 
  loadCardState,
  applyPreset
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { recoveryMode } = useAuth();
  const location = useLocation();

  const { loadCard } = useSavedCards();

  useEffect(() => {
    if (recoveryMode) {
      setAuthOpen(true);
    }
  }, [recoveryMode]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const cardId = searchParams.get('cardId');

    if (location.state?.loadCard) {
      loadCardState(location.state.loadCard, location.state.autoDownload);
      window.history.replaceState({}, document.title);
    } else if (cardId) {
      loadCard(cardId).then(data => {
        if (data) {
          loadCardState(data);
        }
      }).catch(err => {
        console.error('Failed to load shared card:', err);
      });
      
      const newUrl = window.location.hash.split('?')[0];
      window.history.replaceState({}, document.title, `#${newUrl}`);
    }
  }, [location, loadCardState, loadCard]);

  return (
    <div className="app-layout">
      <button
        className={`mobile-toggle ${sidebarOpen ? 'hidden' : ''}`}
        onClick={() => setSidebarOpen(true)}
        type="button"
        aria-label="Toggle controls"
      >
        <FiMenu size={18} />
      </button>

      <div className={`sidebar-wrapper${sidebarOpen ? ' open' : ''}`}>
        <Sidebar
          state={state}
          setField={setField}
          setFont={setFont}
          setCustomFont={setCustomFont}
          addHighlight={addHighlight}
          removeHighlight={removeHighlight}
          setGradientPreset={setGradientPreset}
          loadCardState={loadCardState}
          applyPreset={applyPreset}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {sidebarOpen && (
        <div className="mobile-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <Preview
        state={state}
        onSignInClick={() => setAuthOpen(true)}
      />

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}

export default function App() {
  const {
    state,
    setField,
    setFont,
    setCustomFont,
    addHighlight,
    removeHighlight,
    setGradientPreset,
    loadCardState,
    applyPreset,
  } = useCardState();

  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={
            <Editor
              state={state}
              setField={setField}
              setFont={setFont}
              setCustomFont={setCustomFont}
              addHighlight={addHighlight}
              removeHighlight={removeHighlight}
              setGradientPreset={setGradientPreset}
              loadCardState={loadCardState}
              applyPreset={applyPreset}
            />
          } />
          <Route path="/showcase" element={<Showcase />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}
