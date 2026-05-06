import { FiLinkedin, FiGithub, FiTwitter } from 'react-icons/fi';
import './Footer.css';

export default function Footer({ children, className = "" }) {
  return (
    <div className={`app-footer ${className}`}>
      <div className="footer-content">
        {children && <div className="footer-extra">{children}</div>}
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
