import { useRef, useCallback, useState, useEffect } from 'react';
import { FiDownload, FiLinkedin, FiGithub, FiTwitter, FiGrid, FiMenu } from 'react-icons/fi';
import { toPng, toJpeg, toSvg } from 'html-to-image';
import gifshot from 'gifshot';
import CardPreview from './CardPreview';
import Footer from '../ui/Footer';
import { RATIO_MAP } from '../../constants';
import './Preview.css';

const FORMATS = [
  { key: 'png', label: 'PNG', ext: 'png' },
  { key: 'jpg', label: 'JPG', ext: 'jpg' },
  { key: 'svg', label: 'SVG', ext: 'svg' },
  { key: 'webp', label: 'WebP', ext: 'webp' },
  { key: 'gif', label: 'GIF', ext: 'gif' },
];

export default function Preview({ state, onSignInClick, onToggleSidebar }) {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [format, setFormat] = useState('png');
  const [scale, setScale] = useState(1);
  const [autoHeight, setAutoHeight] = useState('auto');
  const [progress, setProgress] = useState('');

  const [showFormats, setShowFormats] = useState(false);

  const handleDownload = useCallback(async (selectedFormat = format) => {
    if (!cardRef.current) return;
    setDownloading(true);
    setShowFormats(false);

    const options = {
      quality: 1,
      pixelRatio: 3,
      cacheBust: true,
      skipAutoScale: true,
      style: { margin: 0, transform: 'none' },
    };

    try {
      let dataUrl;

      if (selectedFormat === 'png') {
        dataUrl = await toPng(cardRef.current, options);
      } else if (selectedFormat === 'jpg') {
        dataUrl = await toJpeg(cardRef.current, { ...options, backgroundColor: '#ffffff' });
      } else if (selectedFormat === 'svg') {
        dataUrl = await toSvg(cardRef.current, options);
      } else if (selectedFormat === 'webp') {
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
      } else if (selectedFormat === 'gif') {
        const frames = [];
        const numFrames = 15;
        const captureInterval = 120;

        for (let i = 0; i < numFrames; i++) {
          setProgress(`Capturing ${i + 1}/${numFrames}...`);
          const frame = await toPng(cardRef.current, { ...options, pixelRatio: 1.5 });
          frames.push(frame);
          await new Promise(r => setTimeout(r, captureInterval));
        }

        setProgress('Encoding...');
        
        const [w, h] = RATIO_MAP[state.ratio];
        const baseW = w || 480;
        const baseH = state.ratio === 'free' ? (cardRef.current.scrollHeight) : (h || 480);

        gifshot.createGIF({
          images: frames,
          gifWidth: baseW,
          gifHeight: baseH,
          interval: 0.1,
          numFrames: numFrames,
          frameDuration: 1,
          sampleInterval: 10,
        }, (obj) => {
          if (!obj.error) {
            const link = document.createElement('a');
            link.download = `quote-card.gif`;
            link.href = obj.image;
            link.click();
          } else {
            console.error('GIF encoding failed:', obj.error);
            alert('GIF encoding failed. Try a different background.');
          }
          setDownloading(false);
          setProgress('');
        });
        return;
      }

      const link = document.createElement('a');
      link.download = `quote-card.${FORMATS.find((f) => f.key === selectedFormat).ext}`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download failed:', err);
      alert('Download failed. Try with a solid/gradient background.');
    }

    setDownloading(false);
  }, [format, state.ratio]);

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
      <div className="floating-actions">
        <button
          className="mobile-sidebar-toggle"
          onClick={onToggleSidebar}
          type="button"
        >
          <FiMenu size={16} />
        </button>
        
        <div className={`download-dropdown ${showFormats ? 'active' : ''}`}>
          <button 
            className="download-btn"
            onClick={() => setShowFormats(!showFormats)}
            disabled={downloading}
          >
            <FiDownload size={16} />
            <span>{downloading ? (progress || 'Saving...') : 'Download'}</span>
          </button>

          {showFormats && (
            <div className="dropdown-menu">
              <div className="dropdown-header">Select Format</div>
              {FORMATS.map((f) => (
                <button 
                  key={f.key} 
                  className={`menu-item ${format === f.key ? 'active' : ''}`}
                  onClick={() => {
                    setFormat(f.key);
                    handleDownload(f.key);
                  }}
                >
                  <span className="format-label">{f.label}</span>
                  <span className="format-desc">{f.ext.toUpperCase()} file</span>
                </button>
              ))}
            </div>
          )}
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

      <Footer className="preview-footer">
        <div className="footer-left">
          <span className="footer-info">{w} × {h || 'auto'}</span>
          <span className="footer-sep">|</span>
          <span className="footer-info">Font: {state.font}</span>
        </div>
      </Footer>
    </div>
  );
}
