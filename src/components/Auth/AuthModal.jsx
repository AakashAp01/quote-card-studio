import { useState } from 'react';
import { FiX, FiMail, FiLock, FiLogIn, FiUserPlus } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import './AuthModal.css';

export default function AuthModal({ open, onClose }) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (mode === 'signin') {
        await signIn(email, password);
        onClose();
      } else {
        await signUp(email, password);
        setSuccess('Check your email for a confirmation link!');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }

    setLoading(false);
  };

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setError('');
    setSuccess('');
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose} type="button">
          <FiX size={18} />
        </button>

        <div className="auth-header">
          <div className="auth-title">
            {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
          </div>
          <div className="auth-subtitle">
            {mode === 'signin'
              ? 'Sign in to access your saved cards'
              : 'Sign up to start saving your designs'}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-input-group">
            <FiMail className="auth-input-icon" size={16} />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="auth-input-group">
            <FiLock className="auth-input-icon" size={16} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            />
          </div>

          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          <button className="auth-submit" type="submit" disabled={loading}>
            {mode === 'signin' ? <FiLogIn size={16} /> : <FiUserPlus size={16} />}
            <span>
              {loading
                ? 'Please wait...'
                : mode === 'signin'
                  ? 'Sign In'
                  : 'Sign Up'}
            </span>
          </button>
        </form>

        <div className="auth-toggle">
          {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}
          <button type="button" onClick={toggleMode}>
            {mode === 'signin' ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
}
