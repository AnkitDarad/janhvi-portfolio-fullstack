import { Linkedin } from 'lucide-react';
import './AltHero.css';

const AltHero = () => {
  return (
    <section id="home" className="alt-hero">
      <div className="container">
        <div className="alt-hero-top">
          <div className="alt-hero-social">
            <a href="https://www.linkedin.com/in/janhvi-1658401a0/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="https://www.linkedin.com/in/janhvi-1658401a0/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="https://www.behance.net/janhvi-suryawanshi" target="_blank" rel="noopener noreferrer" aria-label="Behance">
              <svg 
                viewBox="0 0 24 24" 
                width="18" 
                height="18" 
                stroke="currentColor" 
                strokeWidth="2" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              >
                <path d="M9 12a3 3 0 1 1-3-3h3z"></path>
                <path d="M12 9c0 3-1 4-2 4h-1v-4h1c1 0 2 1 2 4z"></path>
                <path d="M3 9v6h3a3 3 0 0 0 0-6H3z"></path>
                <path d="M14 12h7"></path>
                <path d="M21 15v-3c0-3-2-4-4-4s-4 1-4 4 1 4 3 4c1 0 2 0 3-1"></path>
              </svg>
            </a>
          </div>
        </div>

        <div className="alt-hero-content">
          <div className="alt-hero-left">
            <div className="alt-hero-photo">
              <img src="/images/Janhvi.png" alt="Janhvi" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
            </div>

            <div className="alt-hero-intro">
              <h1 className="alt-hero-greeting">
                <span className="greeting-hello">Hello,</span> <span className="greeting-myself">Myself</span>{' '}
                <span className="greeting-name">Janhvi Suryawanshi</span>
              </h1>
              <h2 className="alt-hero-role">
                <span className="role-prefix">And I am</span>{' '}
                <span className="role-title">Ui/Ux and visual designer</span>
              </h2>

              <div className="alt-hero-note">
                <p className="note-text">
                  wait,<br />
                  something feels off,<br />
                  right? <span className="note-lowercase">Lower case</span>
                </p>
                <p className="note-aside">
                  We don't notice good designs until something feels off.
                </p>
              </div>
            </div>
          </div>

          <div className="alt-hero-right">
            <div className="alt-hero-quote">
              <h2 className="quote-main">
                <span className="quote-muted">That feeling is where</span><br />
                <span className="quote-muted">design</span> <span className="quote-bold">begins.</span>
              </h2>
            </div>
            <p className="alt-hero-description">
              So let me take you through my journey, working across<br />
              diverse projects as a UI/UX designer, where each experience<br />
              has shaped the way I think about design.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AltHero;
