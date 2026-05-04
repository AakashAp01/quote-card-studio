import { FiX } from 'react-icons/fi';
import './Sidebar.css';
import QuoteSection from './QuoteSection';
import HighlightSection from './HighlightSection';
import FontSection from './FontSection';
import BackgroundSection from './BackgroundSection';
import TextSection from './TextSection';
import CardStyleSection from './CardStyleSection';
import WatermarkSection from './WatermarkSection';
import SavedCardsPanel from './SavedCardsPanel';

export default function Sidebar({
  state,
  setField,
  setFont,
  setCustomFont,
  addHighlight,
  removeHighlight,
  setGradientPreset,
  loadCardState,
  onClose,
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div>
          <div className="sidebar-title">
            Quote Card <span className="accent">Studio</span>
          </div>
          <div className="sidebar-subtitle">Design beautiful quote cards</div>
        </div>
        {onClose && (
          <button className="sidebar-close-btn" onClick={onClose} type="button">
            <FiX size={18} />
          </button>
        )}
      </div>

      <SavedCardsPanel state={state} onLoadCard={loadCardState} />

      <QuoteSection
        quoteText={state.quoteText}
        authorText={state.authorText}
        setField={setField}
      />

      <HighlightSection
        highlights={state.highlights}
        hlColor={state.hlColor}
        hlOpacity={state.hlOpacity}
        addHighlight={addHighlight}
        removeHighlight={removeHighlight}
        setField={setField}
      />

      <FontSection
        font={state.font}
        customFontName={state.customFontName}
        gfontUrl={state.gfontUrl}
        fontSize={state.fontSize}
        lineHeight={state.lineHeight}
        fontWeight={state.fontWeight}
        italic={state.italic}
        align={state.align}
        setField={setField}
        setFont={setFont}
        setCustomFont={setCustomFont}
      />

      <BackgroundSection
        bgTab={state.bgTab}
        bgColor={state.bgColor}
        gradC1={state.gradC1}
        gradC2={state.gradC2}
        gradAngle={state.gradAngle}
        bgImgUrl={state.bgImgUrl}
        overlayColor={state.overlayColor}
        overlayOpacity={state.overlayOpacity}
        patternEmoji={state.patternEmoji}
        patternSize={state.patternSize}
        patternSpacing={state.patternSpacing}
        patternOpacity={state.patternOpacity}
        patternRotation={state.patternRotation}
        patternBgColor={state.patternBgColor}
        setField={setField}
        setGradientPreset={setGradientPreset}
      />

      <TextSection
        textColor={state.textColor}
        showQuotes={state.showQuotes}
        setField={setField}
      />

      <CardStyleSection
        ratio={state.ratio}
        padding={state.padding}
        radius={state.radius}
        shadow={state.shadow}
        showBorder={state.showBorder}
        borderColor={state.borderColor}
        borderWidth={state.borderWidth}
        borderStyle={state.borderStyle}
        setField={setField}
      />

      <WatermarkSection
        showWatermark={state.showWatermark}
        watermarkText={state.watermarkText}
        watermarkColor={state.watermarkColor}
        watermarkFontSize={state.watermarkFontSize}
        watermarkOpacity={state.watermarkOpacity}
        watermarkPosition={state.watermarkPosition}
        setField={setField}
      />

      <div style={{ height: 8 }} />
    </aside>
  );
}
