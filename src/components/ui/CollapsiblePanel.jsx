import { useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import './CollapsiblePanel.css';

export default function CollapsiblePanel({ title, icon: Icon, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`panel collapsible-panel${open ? ' open' : ''}`}>
      <button
        className="collapsible-header"
        onClick={() => setOpen(!open)}
        type="button"
        aria-expanded={open}
      >
        <div className="collapsible-title">
          {Icon && <Icon size={14} className="collapsible-icon" />}
          <span className="section-label" style={{ marginBottom: 0 }}>{title}</span>
        </div>
        <FiChevronRight className={`chevron-icon${open ? ' open' : ''}`} size={14} />
      </button>
      <div className={`collapsible-body${open ? ' open' : ''}`}>
        <div className="collapsible-content">
          {children}
        </div>
      </div>
    </div>
  );
}
