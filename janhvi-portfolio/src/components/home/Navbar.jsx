import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ onLogout, showLogout = true }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    // Check if we're on a project detail page
    const isProjectPage = location.pathname.startsWith('/project/');
    
    if (isProjectPage) {
      // Navigate to home page first, then scroll to section
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Already on home page, just scroll to section
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoutClick = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-content">
          <a href="#home" className="logo" onClick={(e) => handleNavClick(e, '#home')}>
            <span className="logo-text">Janhvi</span>
            <span className="logo-dot">.</span>
          </a>

          <div className="nav-right">
            <ul className="nav-links desktop">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a href={item.href} onClick={(e) => handleNavClick(e, item.href)}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {showLogout && (
              <button
                className="logout-btn desktop"
                onClick={handleLogoutClick}
                aria-label="Logout"
                title="Logout"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            )}
          </div>

          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <ul className="nav-links mobile">
            {navItems.map((item) => (
              <li key={item.label}>
                <a href={item.href} onClick={(e) => handleNavClick(e, item.href)}>
                  {item.label}
                </a>
              </li>
            ))}
            {showLogout && (
              <li>
                <button
                  className="logout-btn mobile"
                  onClick={handleLogoutClick}
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
