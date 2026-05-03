import { memo } from 'react';

const FontChip = memo(function FontChip({ name, isActive, onClick }) {
  return (
    <button
      className={`font-chip${isActive ? ' active' : ''}`}
      style={{ fontFamily: `'${name}', serif` }}
      onClick={onClick}
      type="button"
    >
      {name}
    </button>
  );
});

export default FontChip;
