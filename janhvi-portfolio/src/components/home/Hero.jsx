import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            {/* <div className="hero-badge">
              <span className="badge-dot"></span>
              Available for freelance
            </div> */}
            
            <h1 className="hero-title">
              Hi, I'm <span className="highlight">Janhvi Suryawanshi</span>
              <br />
              <span className="hero-subtitle">UI/UX Designer</span>
            </h1>
            
            <p className="hero-description">
              I craft beautiful, intuitive digital experiences that blend creativity 
              with functionality. Specializing in user-centered design that makes 
              people's lives easier and more delightful.
            </p>

            <div className="hero-actions">
              <button className="btn-primary">
                View My Work
                <ArrowRight size={20} />
              </button>
              <button className="btn-secondary">
                <Download size={20} />
                Download CV
              </button>
            </div>

            <div className="hero-social">
              {/* <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github size={20} />
              </a> */}
              <a href="https://www.linkedin.com/in/janhvi-1658401a0/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="mailto:hello@example.com" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <div className="hero-image-bg"></div>
              <div className="hero-image">
                <div className="placeholder-image">
                  <span>Your Photo</span>
                </div>
              </div>
              <div className="floating-element element-1"></div>
              <div className="floating-element element-2"></div>
              <div className="floating-element element-3"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="scroll-line"></div>
        <span>Scroll Down</span>
      </div>
    </section>
  );
};

export default Hero;
