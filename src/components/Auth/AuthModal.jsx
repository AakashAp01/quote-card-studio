import { useState, useEffect } from 'react';
import { FiX, FiMail, FiLock, FiLogIn, FiUserPlus } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import './AuthModal.css';

export default function AuthModal({ open, onClose }) {
  const { signIn, signUp, resetPassword, updatePassword, recoveryMode, setRecoveryMode } = useAuth();
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (recoveryMode && open) {
      setMode('update-password');
    }
  }, [recoveryMode, open]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (mode === 'signin') {
        await signIn(identifier, password);
        onClose();
      } else if (mode === 'signup') {
        if (!username.trim()) throw new Error('Username is required');
        await signUp(email, password, username.trim());
        setSuccess('Check your email for a confirmation link!');
      } else if (mode === 'reset') {
        await resetPassword(email);
        setSuccess('Password reset link sent to your email!');
      } else if (mode === 'update-password') {
        await updatePassword(password);
        setSuccess('Password updated successfully!');
        setTimeout(() => {
          setRecoveryMode(false);
          onClose();
        }, 2000);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }

    setLoading(false);
  };

  const toggleMode = (newMode) => {
    setMode(newMode);
    setError('');
    setSuccess('');
    setIdentifier('');
    setUsername('');
    setEmail('');
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose} type="button">
          <FiX size={18} />
        </button>

        <div className="auth-header">
          <div className="auth-title">
            {mode === 'signin' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : mode === 'reset' ? 'Reset Password' : 'New Password'}
          </div>
          <div className="auth-subtitle">
            {mode === 'signin'
              ? 'Sign in to access your saved cards'
              : mode === 'signup'
                ? 'Sign up to start saving your designs'
                : mode === 'reset'
                  ? 'Enter your email to receive a reset link'
                  : 'Set a secure new password for your account'}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'signin' ? (
            <div className="auth-input-group">
              <FiMail className="auth-input-icon" size={16} />
              <input
                type="text"
                placeholder="Username or Email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
          ) : mode === 'signup' || mode === 'reset' ? (
            <>
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
              {mode === 'signup' && (
                <div className="auth-input-group">
                  <FiUserPlus className="auth-input-icon" size={16} />
                  <input
                    type="text"
                    placeholder="Username (unique)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength={3}
                    pattern="[a-zA-Z0-9_]+"
                    title="Only letters, numbers, and underscores allowed"
                  />
                </div>
              )}
            </>
          ) : null}

          {(mode !== 'reset') && (
            <div className="auth-input-group">
              <FiLock className="auth-input-icon" size={16} />
              <input
                type="password"
                placeholder={mode === 'update-password' ? 'New Password' : 'Password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              />
            </div>
          )}

          {mode === 'signin' && (
            <div className="auth-forgot">
              <button type="button" onClick={() => toggleMode('reset')}>
                Forgot password?
              </button>
            </div>
          )}

          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          <button className="auth-submit" type="submit" disabled={loading}>
            {mode === 'signin' ? <FiLogIn size={16} /> : mode === 'update-password' ? <FiLock size={16} /> : <FiUserPlus size={16} />}
            <span>
              {loading
                ? 'Please wait...'
                : mode === 'signin'
                  ? 'Sign In'
                  : mode === 'signup'
                    ? 'Sign Up'
                    : mode === 'reset'
                      ? 'Send Reset Link'
                      : 'Update Password'}
            </span>
          </button>
        </form>

        <div className="auth-toggle">
          {mode === 'signin' 
            ? "Don't have an account?" 
            : mode === 'signup' 
              ? 'Already have an account?' 
              : mode === 'reset'
                ? 'Remember your password?'
                : 'Changed your mind?'}
          <button type="button" onClick={() => toggleMode(mode === 'signin' ? 'signup' : 'signin')}>
            {mode === 'signin' ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
}
