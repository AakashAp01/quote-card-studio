import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import Sidebar from './components/Sidebar/Sidebar';
import Preview from './components/Preview/Preview';
import AuthModal from './components/Auth/AuthModal';
import useCardState from './hooks/useCardState';

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
  } = useCardState();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}
