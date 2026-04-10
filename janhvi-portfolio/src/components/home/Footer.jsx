import { Heart } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-text">Janhvi</span>
            <span className="logo-dot">.</span>
          </div>
          
          <p className="footer-text">
            Crafting beautiful digital experiences with passion and precision.
          </p>

          <div className="footer-bottom">
            <p>
              Designed with <Heart size={16} className="heart-icon" /> by Janhvi Suryawanshi
            </p>
            <p>
              Developed by <a href="https://www.linkedin.com/in/ankit-darad" target="_blank" rel="noopener noreferrer">Ankit Darad</a>
            </p>
            <p>&copy; {currentYear} All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
