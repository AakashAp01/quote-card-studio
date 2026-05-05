import { useRef, useCallback, useState, useEffect } from 'react';
import { FiDownload, FiLinkedin, FiGithub, FiTwitter, FiGrid } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { toPng, toJpeg, toSvg } from 'html-to-image';
import CardPreview from './CardPreview';
import UserMenu from '../Auth/UserMenu';
import { RATIO_MAP } from '../../constants';
import './Preview.css';

const FORMATS = [
  { key: 'png', label: 'PNG', ext: 'png' },
  { key: 'jpg', label: 'JPG', ext: 'jpg' },
  { key: 'svg', label: 'SVG', ext: 'svg' },
  { key: 'webp', label: 'WebP', ext: 'webp' },
];

export default function Preview({ state, onSignInClick }) {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [format, setFormat] = useState('png');
  const [scale, setScale] = useState(1);
  const [autoHeight, setAutoHeight] = useState('auto');

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    setDownloading(true);

    const options = {
      quality: 1,
      pixelRatio: 3,
      cacheBust: true,
      skipAutoScale: true,
      style: { margin: 0, transform: 'none' },
    };

    try {
      let dataUrl;

      if (format === 'png') {
        dataUrl = await toPng(cardRef.current, options);
      } else if (format === 'jpg') {
        dataUrl = await toJpeg(cardRef.current, { ...options, backgroundColor: '#ffffff' });
      } else if (format === 'svg') {
        dataUrl = await toSvg(cardRef.current, options);
      } else if (format === 'webp') {
        const canvas = document.createElement('canvas');
        const png = await toPng(cardRef.current, options);
        const img = new Image();
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = png;
        });
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        dataUrl = canvas.toDataURL('image/webp', 0.95);
      }

      const link = document.createElement('a');
      link.download = `quote-card.${FORMATS.find((f) => f.key === format).ext}`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download failed:', err);
      alert('Download failed. Try with a solid/gradient background.');
    }

    setDownloading(false);
  }, [format]);

  const [w, h] = RATIO_MAP[state.ratio];

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const actualWidth = containerRef.current.offsetWidth;
        const baseW = w || 480;
        const newScale = actualWidth / baseW;
        setScale(newScale);
        
        if (state.ratio === 'free' && cardRef.current) {
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
  }, [w, state.ratio]);

  const containerStyle = state.ratio === 'free' 
    ? { height: autoHeight } 
    : { aspectRatio: `${w} / ${h}` };

  return (
    <div className="preview-area">
      <div className="preview-topbar">
        <div className="preview-actions">
          <select
            className="format-select"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            {FORMATS.map((f) => (
              <option key={f.key} value={f.key}>{f.label}</option>
            ))}
          </select>
          <button
            className="download-btn"
            onClick={handleDownload}
            disabled={downloading}
            type="button"
          >
            <FiDownload size={14} />
            <span>{downloading ? 'Rendering...' : 'Download'}</span>
          </button>
          <a
            href="https://github.com/AakashAp01/quote-card-studio"
            target="_blank"
            rel="noopener noreferrer"
            className="download-btn github-btn"
          >
            <FiGithub size={14} />
            <span>Star</span>
          </a>
        </div>
        <div className="topbar-right">
          <Link 
            to="/showcase" 
            className="download-btn showcase-link" 
          >
            <FiGrid size={14} />
            <span>Showcase</span>
          </Link>
          <UserMenu onSignInClick={onSignInClick} />
        </div>
      </div>

      <div className="preview-canvas">
        <div 
          className="preview-card-container" 
          ref={containerRef}
          style={containerStyle}
        >
          <div 
            className="preview-card-scaler" 
            style={{ 
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              width: w || 480,
              height: state.ratio === 'free' ? 'auto' : (h || 480),
              position: 'absolute',
              top: 0,
              left: 0
            }}
          >
            <CardPreview state={state} cardRef={cardRef} />
          </div>
        </div>
      </div>

      <div className="preview-footer">
        <div className="footer-left">
          <span className="footer-info">{w} × {h || 'auto'}</span>
          <span className="footer-sep">|</span>
          <span className="footer-info">Font: {state.font}</span>
        </div>
        <div className="footer-credit">
          <span>Made with <span className="heart-emoji">❤️</span> by <strong>AkashAp</strong></span>
          <div className="footer-socials">
            <a href="https://www.linkedin.com/in/aakashap/" target="_blank" rel="noopener noreferrer" title="LinkedIn"><FiLinkedin size={14} /></a>
            <a href="https://github.com/AakashAp01" target="_blank" rel="noopener noreferrer" title="GitHub"><FiGithub size={14} /></a>
            <a href="https://x.com/_akash_ap_" target="_blank" rel="noopener noreferrer" title="X"><FiTwitter size={14} /></a>
          </div>
        </div>
      </div>
    </div>
  );
}
