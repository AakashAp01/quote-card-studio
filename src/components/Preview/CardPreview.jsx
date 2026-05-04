import { memo, useMemo, useEffect, useRef } from 'react';
import { SHADOWS, RATIO_MAP } from '../../constants';
import { applyHighlights, hexToRgba } from '../../utils';

function generatePatternCells(emoji, spacing, cardW, cardH) {
  const emojis = emoji.includes(' ') ? emoji.split(' ').filter(Boolean) : [emoji];
  const cols = Math.ceil((cardW * 1.6) / spacing) + 1;
  const rows = Math.ceil(((cardH || 500) * 1.6) / spacing) + 1;
  const total = cols * rows;
  const cells = [];
  for (let i = 0; i < total; i++) {
    cells.push(emojis[i % emojis.length]);
  }
  return { cells, cols };
}

const CardPreview = memo(function CardPreview({ state, cardRef, isThumbnail = false }) {
  const [w, h] = RATIO_MAP[state.ratio];
  const lastLoadedUrl = useRef(null);

  // Auto-load custom Google Font if provided in state
  useEffect(() => {
    if (state.gfontUrl && state.gfontUrl !== lastLoadedUrl.current) {
      // Use a unique ID for each font URL to avoid conflicts in a grid
      const linkId = `gfont-${state.gfontUrl.replace(/[^a-z0-9]/gi, '')}`;
      if (!document.getElementById(linkId)) {
        const link = document.createElement('link');
        link.id = linkId;
        link.rel = 'stylesheet';
        link.href = state.gfontUrl;
        document.head.appendChild(link);
      }
      lastLoadedUrl.current = state.gfontUrl;
    }
  }, [state.gfontUrl]);

  const background = useMemo(() => {
    if (state.bgTab === 'solid') return state.bgColor;
    if (state.bgTab === 'gradient') {
      return `linear-gradient(${state.gradAngle}deg, ${state.gradC1}, ${state.gradC2})`;
    }
    if (state.bgTab === 'pattern') return state.patternBgColor;
    if (state.bgTab === 'image' && state.bgImgUrl) {
      return `url('${state.bgImgUrl}') center/cover no-repeat`;
    }
    return '#f0f0f0';
  }, [
    state.bgTab, state.bgColor, state.gradAngle, state.gradC1,
    state.gradC2, state.bgImgUrl, state.patternBgColor,
  ]);

  const overlayBg = useMemo(() => {
    if (state.bgTab === 'image' && state.bgImgUrl) {
      return hexToRgba(state.overlayColor, state.overlayOpacity / 100);
    }
    return 'none';
  }, [state.bgTab, state.bgImgUrl, state.overlayColor, state.overlayOpacity]);

  const quoteHtml = useMemo(
    () => applyHighlights(state.quoteText, state.highlights, state.hlColor, state.hlOpacity),
    [state.quoteText, state.highlights, state.hlColor, state.hlOpacity]
  );

  const patternData = useMemo(() => {
    if (state.bgTab !== 'pattern' || !state.patternEmoji.trim()) return null;
    return generatePatternCells(state.patternEmoji, state.patternSpacing, w, h);
  }, [state.bgTab, state.patternEmoji, state.patternSpacing, w, h]);

  const cardStyle = {
    background,
    padding: state.padding,
    borderRadius: isThumbnail ? 0 : state.radius,
    width: w,
    height: h || 'auto',
    minHeight: h ? 'unset' : 200,
    boxShadow: isThumbnail ? 'none' : SHADOWS[state.shadow],
    border: (state.showBorder && !isThumbnail) ? `${state.borderWidth}px ${state.borderStyle} ${state.borderColor}` : 'none',
    color: state.textColor,
    fontFamily: `'${state.font}', serif`,
    textAlign: state.align,
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    wordBreak: 'break-word',
    margin: 0,
    boxSizing: 'border-box',
    flexShrink: 0,
  };

  return (
    <div id="card-preview" style={cardStyle} ref={cardRef}>
      {state.bgTab === 'pattern' && patternData && (
        <div
          className="pattern-layer"
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            borderRadius: 'inherit',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-30%',
              left: '-30%',
              width: '160%',
              height: '160%',
              display: 'grid',
              gridTemplateColumns: `repeat(${patternData.cols}, ${state.patternSpacing}px)`,
              alignContent: 'start',
              justifyContent: 'start',
              fontSize: state.patternSize,
              lineHeight: 1,
              opacity: state.patternOpacity / 100,
              transform: `rotate(${state.patternRotation}deg)`,
            }}
          >
            {patternData.cells.map((emoji, i) => (
              <span
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: state.patternSpacing,
                }}
              >
                {emoji}
              </span>
            ))}
          </div>
        </div>
      )}

      <div
        className="bg-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          background: overlayBg,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {state.showQuotes && (
          <div
            className="quote-mark"
            style={{
              fontSize: 80,
              fontFamily: 'inherit',
              lineHeight: 0.8,
              marginBottom: 8,
              color: state.textColor,
              textAlign: state.align,
              opacity: 0.15,
            }}
          >
            &ldquo;
          </div>
        )}
        <div
          style={{
            fontSize: state.fontSize,
            lineHeight: state.lineHeight / 100,
            fontWeight: state.fontWeight,
            fontStyle: state.italic ? 'italic' : 'normal',
            color: state.textColor,
          }}
          dangerouslySetInnerHTML={{ __html: quoteHtml }}
        />
        {state.authorText && (
          <div
            className="author-line"
            style={{
              color: state.textColor,
              textAlign: state.align,
            }}
          >
            {state.authorText}
          </div>
        )}
      </div>
      {state.showWatermark && (
        <div
          className="watermark-badge"
          style={{
            color: state.watermarkColor || state.textColor,
            fontSize: state.watermarkFontSize,
            opacity: state.watermarkOpacity / 100,
            ...(state.watermarkPosition === 'bottom-right' && { bottom: 10, right: 12 }),
            ...(state.watermarkPosition === 'bottom-left' && { bottom: 10, left: 12 }),
            ...(state.watermarkPosition === 'bottom-center' && { bottom: 10, left: '50%', transform: 'translateX(-50%)' }),
            ...(state.watermarkPosition === 'top-right' && { top: 10, right: 12 }),
            ...(state.watermarkPosition === 'top-left' && { top: 10, left: 12 }),
            ...(state.watermarkPosition === 'top-center' && { top: 10, left: '50%', transform: 'translateX(-50%)' }),
          }}
        >
          {state.watermarkText}
        </div>
      )}
    </div>
  );
});

export default CardPreview;
