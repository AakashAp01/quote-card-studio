import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiLoader, FiEdit2 } from 'react-icons/fi';
import useSavedCards from '../hooks/useSavedCards';
import CardPreview from '../components/Preview/CardPreview';
import { RATIO_MAP } from '../constants';
import './Showcase.css';

const ShowcaseCard = ({ card }) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [autoHeight, setAutoHeight] = useState('auto');
  
  const state = card.card_state;
  const ratio = state.ratio || 'square';
  const [origW, origH] = RATIO_MAP[ratio] || [480, 480];
  const [isActive, setIsActive] = useState(false);

  const handleCardClick = (e) => {
    if (window.innerWidth <= 768) {
      if (!isActive) {
        e.preventDefault();
        e.stopPropagation();
        setIsActive(true);
      }
    } else {
      navigate('/', { state: { loadCard: card } });
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate('/', { state: { loadCard: card } });
  };



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
    <div className={`masonry-item ${isActive ? 'mobile-active' : ''}`}>
      <div className="card-wrapper" onClick={handleCardClick}>
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
          <div className="card-actions-mini">
            <button className="card-action-btn-mini edit" onClick={handleEdit} title="Edit Design">
              <FiEdit2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Showcase() {
  const navigate = useNavigate();
  const { loadPublicCards, loading } = useSavedCards();
  const [publicCards, setPublicCards] = useState([]);
  const [error, setError] = useState(null);
  const [columnCount, setColumnCount] = useState(4);
  const gridRef = useRef(null);

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

  const visibleCards = publicCards.slice(0, visibleCount);

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
        <div className="header-spacer" style={{ width: 140 }} />
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
            <div className="masonry-grid-flex">
              {columns.map((col, colIndex) => (
                <div key={colIndex} className="masonry-column">
                  {col.map((card) => (
                    <ShowcaseCard key={card.id} card={card} />
                  ))}
                </div>
              ))}
            </div>

            <div className="showcase-footer">
              {visibleCount < publicCards.length && (
                <button 
                  className="btn btn-primary load-more-btn"
                  onClick={() => setVisibleCount(prev => prev + 10)}
                >
                  <FiLoader size={16} style={{ marginRight: 5 }} />
                  <span>Load More</span>
                </button>
              )}
              <button 
                className="btn btn-ghost showcase-back-btn"
                onClick={() => navigate('/')}
              >
                <FiArrowLeft size={16} />
                <span> Back to Editor</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
