import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiLoader, FiEdit2, FiShare2, FiDownload, FiMoreVertical, FiCheck, FiPlay, FiSearch, FiFilter } from 'react-icons/fi';
import { toPng } from 'html-to-image';
import gifshot from 'gifshot';
import useSavedCards from '../hooks/useSavedCards';
import CardPreview from '../components/Preview/CardPreview';
import { RATIO_MAP } from '../constants';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/ui/Footer';
import './Showcase.css';

const ShowcaseCard = ({ card, isFocused, onFocus }) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [autoHeight, setAutoHeight] = useState('auto');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState('');
  const [copied, setCopied] = useState(false);
  
  const state = card.card_state;
  const ratio = state.ratio || 'square';
  const [origW, origH] = RATIO_MAP[ratio] || [480, 480];

  const handleCardClick = (e) => {
    if (window.innerWidth <= 768) {
      if (!isFocused) {
        e.preventDefault();
        e.stopPropagation();
        onFocus();
      }
    } else {
      navigate('/', { state: { loadCard: card } });
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate('/', { state: { loadCard: card } });
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}${window.location.pathname}#/?cardId=${card.id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out this design: ${card.name}`,
          text: `I found this amazing quote card design by ${card.profiles?.username || 'a creator'} on Quote Card Studio!`,
          url: shareUrl,
        });
      } catch (err) {
        if (err.name !== 'AbortError') console.error('Share failed:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Copy failed:', err);
      }
    }
    setIsMenuOpen(false);
  };

  const handleDownload = async (e) => {
    e.stopPropagation();
    if (!cardRef.current || downloading) return;
    
    setDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 3,
        cacheBust: true,
        style: { margin: 0, transform: 'none' },
      });
      
      const link = document.createElement('a');
      link.download = `${card.name.replace(/\s+/g, '-').toLowerCase() || 'quote-card'}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setDownloading(false);
      setIsMenuOpen(false);
    }
  };

  const handleDownloadGif = async (e) => {
    e.stopPropagation();
    if (!cardRef.current || downloading) return;
    
    setDownloading(true);
    const frames = [];
    const numFrames = 12;
    const captureInterval = 150;

    try {
      for (let i = 0; i < numFrames; i++) {
        setProgress(`${i + 1}/${numFrames}`);
        const frame = await toPng(cardRef.current, { 
          quality: 1, 
          pixelRatio: 1.2,
          style: { margin: 0, transform: 'none' }
        });
        frames.push(frame);
        await new Promise(r => setTimeout(r, captureInterval));
      }

      setProgress('...');
      gifshot.createGIF({
        images: frames,
        gifWidth: origW || 480,
        gifHeight: ratio === 'free' ? (cardRef.current.scrollHeight) : (origH || 480),
        interval: 0.12,
        numFrames: numFrames,
        frameDuration: 1,
        sampleInterval: 10,
      }, (obj) => {
        if (!obj.error) {
          const link = document.createElement('a');
          link.download = `${card.name.replace(/\s+/g, '-').toLowerCase() || 'quote-card'}.gif`;
          link.href = obj.image;
          link.click();
        } else {
          console.error('GIF failed:', obj.error);
        }
        setDownloading(false);
        setProgress('');
        setIsMenuOpen(false);
      });
    } catch (err) {
      console.error('GIF error:', err);
      setDownloading(false);
      setProgress('');
    }
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (!isFocused) setIsMenuOpen(false);
  }, [isFocused]);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const actualWidth = containerRef.current.offsetWidth;
        const baseW = origW || 480;
        const newScale = actualWidth / baseW;
        setScale(newScale);
        
        if (ratio === 'free' && cardRef.current) {
          setAutoHeight(cardRef.current.scrollHeight * newScale);
        }
      }
    };

    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) observer.observe(containerRef.current);
    if (cardRef.current) observer.observe(cardRef.current);
    
    updateScale();
    const timer = setTimeout(updateScale, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [origW, ratio]);

  const containerStyle = ratio === 'free' 
    ? { height: autoHeight } 
    : { aspectRatio: `${origW} / ${origH}` };

  return (
    <div className={`masonry-item ${isFocused ? 'mobile-active' : ''}`}>
      <div className={`card-wrapper ${isMenuOpen ? 'menu-open' : ''}`} onClick={handleCardClick}>
        <div 
          className={`card-preview-container ratio-${ratio}`} 
          ref={containerRef}
          style={containerStyle}
        >
          <div 
            className="card-scaler" 
            style={{ 
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              width: origW || 480,
              height: ratio === 'free' ? 'auto' : (origH || 480),
              position: 'absolute',
              top: 0,
              left: 0
            }}
          >
            <CardPreview state={state} isThumbnail={true} cardRef={cardRef} />
          </div>
        </div>
        <div className="card-overlay">
          <div className="card-info">
            <span className="card-name">{card.name}</span>
            <span className="card-author">by <span className="showcase-username">{card.profiles?.username || card.user_email?.split('@')[0] || 'User'}</span></span>
          </div>
          
          <div className={`card-actions-mini ${isMenuOpen ? 'menu-active' : ''}`}>
            <button 
              className={`card-action-btn-mini menu-toggle-btn ${isMenuOpen ? 'active' : ''}`} 
              onClick={toggleMenu}
              title="Actions"
            >
              <FiMoreVertical size={18} />
            </button>
            
            <div className={`actions-dropdown ${isMenuOpen ? 'open' : ''}`}>
              <button className="action-item edit" onClick={handleEdit} title="Edit Design">
                <FiEdit2 size={16} />
                <span>Edit</span>
              </button>
              <button className="action-item share" onClick={handleShare} title="Share Design">
                {copied ? <FiCheck size={16} /> : <FiShare2 size={16} />}
                <span>{copied ? 'Copied' : 'Share'}</span>
              </button>
              <button className="action-item download" onClick={handleDownload} title="Download PNG" disabled={downloading}>
                {downloading && !progress ? <FiLoader className="spinner-mini" size={16} /> : <FiDownload size={16} />}
                <span>{downloading && !progress ? '...' : 'Save'}</span>
              </button>
              {(state.bgImgUrl?.toLowerCase().includes('.gif') || state.bgImgUrl?.startsWith('data:image/gif')) && (
                <button className="action-item download" onClick={handleDownloadGif} title="Download GIF" disabled={downloading}>
                  {downloading && progress ? <span style={{fontSize: '10px', fontWeight: 'bold'}}>{progress}</span> : <FiPlay size={16} />}
                  <span>{downloading && progress ? 'Saving...' : 'Save GIF'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Showcase() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { loadPublicCards, loading } = useSavedCards();
  const [publicCards, setPublicCards] = useState([]);
  const [error, setError] = useState(null);
  const [columnCount, setColumnCount] = useState(4);
  const [focusedCardId, setFocusedCardId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [userFilter, setUserFilter] = useState('all');
  const gridRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (gridRef.current && !gridRef.current.contains(e.target)) {
        setFocusedCardId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await loadPublicCards();
        setPublicCards(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCards();
  }, [loadPublicCards]);

  // Filter cards based on search and user selection
  const filteredCards = publicCards.filter(card => {
    const matchesSearch = 
      card.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.card_state?.quoteText?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesUser = 
      userFilter === 'all' || 
      (userFilter === 'self' && card.user_id === user?.id) ||
      (userFilter === card.user_id);

    return matchesSearch && matchesUser;
  });

  // Extract unique users for the dropdown
  const uniqueUsers = Array.from(new Set(publicCards.map(c => c.user_id)))
    .map(id => {
      const card = publicCards.find(c => c.user_id === id);
      return {
        id,
        name: card.profiles?.username || card.user_email?.split('@')[0] || 'User'
      };
    })
    .filter(u => u.id !== user?.id);

  // Infinite scroll logic
  useEffect(() => {
    const handleScroll = () => {
      // Load more when 500px from bottom
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        if (visibleCount < filteredCards.length) {
          setVisibleCount(prev => prev + 10);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleCount, filteredCards.length]);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 380) setColumnCount(1);
      else if (width < 800) setColumnCount(2);
      else if (width < 1200) setColumnCount(3);
      else setColumnCount(4);
    };

    window.addEventListener('resize', updateColumns);
    updateColumns();
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const visibleCards = filteredCards.slice(0, visibleCount);

  const columns = Array.from({ length: columnCount }, () => []);
  visibleCards.forEach((card, index) => {
    columns[index % columnCount].push(card);
  });

  return (
    <div className="showcase-page">
      <div className="showcase-header">
        <div className="showcase-title-area">
          <h1>Community <span className="accent">Showcase</span></h1>
          <p>Inspiring designs from our creators</p>
        </div>
        
        <div className="showcase-search-area">
          <button 
            className="btn btn-ghost showcase-back-btn header-back-btn"
            onClick={() => navigate('/')}
          >
            <FiArrowLeft size={16} />
            <span>Editor</span>
          </button>
          <div className="search-container-pill">
            <div className="filter-group">
              <FiSearch className="search-pill-icon" size={18} />
              <select 
                value={userFilter} 
                onChange={(e) => setUserFilter(e.target.value)}
                className="pill-select"
              >
                <option value="all">All Creators</option>
                {user && <option value="self">My Cards</option>}
                {uniqueUsers.length > 0 && (
                  <optgroup label="Creators">
                    {uniqueUsers.map(u => (
                      <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                  </optgroup>
                )}
              </select>
            </div>
            
            <div className="divider-vertical" />
            
            <div className="search-group">
              
              <input 
                type="text" 
                placeholder="Search designs or quotes..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pill-input"
              />
            </div>
          </div>
        </div>
        
        <div className="header-spacer" />
      </div>

      <div className="showcase-content">
        {loading ? (
          <div className="showcase-loading">
            <FiLoader className="spinner" size={40} />
            <p>Loading inspiration...</p>
          </div>
        ) : error ? (
          <div className="showcase-error">
            <p>Error: {error}</p>
          </div>
        ) : publicCards.length === 0 ? (
          <div className="showcase-empty">
            <p>No public designs found.</p>
            <p className="empty-subtitle">Be the first to share your creativity with the community!</p>
          </div>
        ) : (
          <>
            <div className="masonry-grid-flex" ref={gridRef}>
              {columns.map((col, colIndex) => (
                <div key={colIndex} className="masonry-column">
                  {col.map((card) => (
                    <ShowcaseCard 
                      key={card.id} 
                      card={card} 
                      isFocused={focusedCardId === card.id}
                      onFocus={() => setFocusedCardId(card.id)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
