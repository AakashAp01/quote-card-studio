import { useState, useRef, useEffect } from 'react';
import { FiUser, FiLogOut, FiChevronDown, FiGrid } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './UserMenu.css';

export default function UserMenu({ onSignInClick }) {
  const { user, profile, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) {
    return (
      <button className="sign-in-btn" onClick={onSignInClick} type="button">
        <FiUser size={14} />
        <span>Sign In</span>
      </button>
    );
  }

  const displayName = profile?.username || user.email?.split('@')[0] || 'User';

  const handleSignOut = async () => {
    setOpen(false);
    await signOut();
  };

  return (
    <div className="user-menu" ref={menuRef}>
      <button
        className="user-menu-trigger"
        onClick={() => setOpen(!open)}
        type="button"
        title={displayName}
      >
        <div className="user-avatar">
          {displayName.charAt(0).toUpperCase()}
        </div>
        {/* <FiChevronDown size={14} className={`user-chevron${open ? ' open' : ''}`} /> */}
      </button>

      {open && (
        <div className="user-dropdown">
          <div className="user-dropdown-header">
            <div className="user-dropdown-name">{displayName}</div>
            <div className="user-dropdown-email">{user.email}</div>
          </div>
          <div className="user-dropdown-divider" />
          <button className="user-dropdown-item" onClick={handleSignOut} type="button">
            <FiLogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
}
