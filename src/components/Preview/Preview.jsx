import { useRef, useCallback, useState } from 'react';
import { FiDownload, FiLinkedin, FiGithub, FiTwitter } from 'react-icons/fi';
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
  const cardRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [format, setFormat] = useState('png');

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
        </div>
        <UserMenu onSignInClick={onSignInClick} />
      </div>

      <div className="preview-canvas">
        <CardPreview state={state} cardRef={cardRef} />
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
