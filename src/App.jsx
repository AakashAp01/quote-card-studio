import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { FiMenu, FiGithub, FiGrid } from 'react-icons/fi';
import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar/Sidebar';
import Preview from './components/Preview/Preview';
import UserMenu from './components/Auth/UserMenu';
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
  applyPreset,
  onSignInClick
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [stars, setStars] = useState(null);
  const { recoveryMode } = useAuth();
  const location = useLocation();

  const { loadCard } = useSavedCards();

  useEffect(() => {
    fetch('https://api.github.com/repos/AakashAp01/quote-card-studio')
      .then(res => res.json())
      .then(data => {
        if (data.stargazers_count) {
          setStars(data.stargazers_count);
        }
      })
      .catch(err => console.error('Failed to fetch stars:', err));
  }, []);

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
    <div className="app-container">
      <nav className="full-navbar">
        <div className="nav-left">
          <div className="navbar-logo">
            <div className="logo-title">
              Quote <span className="accent">Studio</span>
            </div>
          </div>
        </div>
        <div className="nav-right">
          <Link 
            to="/showcase" 
            className="download-btn showcase-link" 
          >
            <FiGrid size={14} />
            <span>Showcase</span>
          </Link>
          <a
            href="https://github.com/AakashAp01/quote-card-studio"
            target="_blank"
            rel="noopener noreferrer"
            className="download-btn github-btn"
          >
            <FiGithub size={14} />
            <span>Star {stars ? `· ${stars}` : ''}</span>
          </a>
          <UserMenu onSignInClick={() => setAuthOpen(true)} />
        </div>
      </nav>

      <div className="app-layout">
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
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      </div>
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
