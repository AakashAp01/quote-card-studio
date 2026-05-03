import { memo } from 'react';

const GradientSwatch = memo(function GradientSwatch({ c1, c2, angle, isActive, onClick, index }) {
  return (
    <button
      className={`gradient-preset${isActive ? ' active' : ''}`}
      style={{ background: `linear-gradient(${angle}deg, ${c1}, ${c2})` }}
      title={`Gradient ${index + 1}`}
      onClick={onClick}
      type="button"
      aria-label={`Gradient preset ${index + 1}`}
    />
  );
});

export default GradientSwatch;
