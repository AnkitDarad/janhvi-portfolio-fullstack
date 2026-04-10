import { Linkedin } from 'lucide-react';
import './AltHero.css';

const AltBanner = () => {
  return (
    <div className="alt-hero-top-banner">
      <div className="container">
        <div className="alt-hero-top">
          <div className="alt-hero-social">
            <a href="https://www.linkedin.com/in/janhvi-1658401a0/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="https://www.behance.net/janhvisuryawa1" target="_blank" rel="noopener noreferrer" aria-label="Behance">
              <img src="/behance.svg" alt="Behance" style={{ width: '32px', height: '32px' }} />
            </a>
          </div>
        </div>

        <div className="alt-hero-left">
          <div className="alt-hero-photo">
            {/* Add an img here if you have one, or keep the placeholder */}
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
                right? <span className="note-lowercase">Lower case in <br />UI/UX</span>
              </p>
              <p className="note-aside">
                We don't notice good designs until<br />
                something feels off.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AltBanner;
