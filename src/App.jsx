import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar/Sidebar';
import Preview from './components/Preview/Preview';
import AuthModal from './components/Auth/AuthModal';
import Showcase from './pages/Showcase';
import useCardState from './hooks/useCardState';

function Editor({ 
  state, 
  setField, 
  setFont, 
  setCustomFont, 
  addHighlight, 
  removeHighlight, 
  setGradientPreset, 
  loadCardState 
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { recoveryMode } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (recoveryMode) {
      setAuthOpen(true);
    }
  }, [recoveryMode]);

  useEffect(() => {
    if (location.state?.loadCard) {
      loadCardState(location.state.loadCard, location.state.autoDownload);
      // Clear state so it doesn't reload on every mount
      window.history.replaceState({}, document.title);
    }
  }, [location, loadCardState]);

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
  } = useCardState();

  return (
    <AuthProvider>
      <BrowserRouter>
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
            />
          } />
          <Route path="/showcase" element={<Showcase />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
