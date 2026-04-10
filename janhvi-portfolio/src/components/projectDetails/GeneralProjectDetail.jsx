import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, User, ExternalLink, CheckCircle } from 'lucide-react';
import './GeneralProjectDetail.css';

const GeneralProjectDetail = ({ project }) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [project.id]);

  if (!project) {
    return (
      <div className="project-not-found">
        <div className="container">
          <h1>Project Not Found</h1>
          <p>The project you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  const scrollToPortfolio = () => {
    navigate('/');
    setTimeout(() => {
      const portfolioSection = document.getElementById('portfolio');
      if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="project-detail-type1">
      <div className="project-hero" style={{ 
        background: `linear-gradient(135deg, var(--from), var(--to))`,
        '--from': project.color.includes('blue') ? '#3b82f6' : 
                  project.color.includes('pink') ? '#ec4899' :
                  project.color.includes('green') ? '#10b981' :
                  project.color.includes('orange') ? '#f97316' :
                  project.color.includes('indigo') ? '#6366f1' :
                  project.color.includes('red') ? '#ef4444' : '#6366f1',
        '--to': project.color.includes('purple') ? '#9333ea' :
                project.color.includes('rose') ? '#f43f5e' :
                project.color.includes('teal') ? '#14b8a6' :
                project.color.includes('yellow') ? '#eab308' :
                project.color.includes('blue') ? '#3b82f6' :
                project.color.includes('pink') ? '#ec4899' : '#9333ea'
      }}>
        <div className="container">
          <button onClick={scrollToPortfolio} className="back-button">
            <ArrowLeft size={20} />
            Back to Portfolio
          </button>

          <div className="hero-content">
            <span className="project-category">{project.category}</span>
            <h1 className="project-title">{project.title}</h1>
            <p className="project-tagline">{project.description}</p>
            
            <div className="project-meta">
              <div className="meta-item">
                <User size={18} />
                <span>{project.role}</span>
              </div>
              <div className="meta-item">
                <Calendar size={18} />
                <span>{project.year}</span>
              </div>
              <div className="meta-item">
                <Clock size={18} />
                <span>{project.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="project-content">
        <div className="container">
          <div className="content-grid">
            <div className="main-content">
              <section className="content-section">
                <h2>Overview</h2>
                <p className="overview-text">{project.fullDescription}</p>
              </section>

              <section className="content-section">
                <h2>The Challenge</h2>
                <p>{project.challenge}</p>
              </section>

              <section className="content-section">
                <h2>The Solution</h2>
                <p>{project.solution}</p>
              </section>

              <section className="content-section">
                <h2>Key Features</h2>
                <ul className="features-list">
                  {project.features.map((feature, index) => (
                    <li key={index}>
                      <CheckCircle size={20} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="content-section">
                <h2>Results & Impact</h2>
                <div className="results-grid">
                  {project.results.map((result, index) => (
                    <div key={index} className="result-card">
                      <CheckCircle size={24} />
                      <p>{result}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="content-section project-images">
                <h2>Project Visuals</h2>
                <div className="images-grid">
                  <div className="image-placeholder large">
                    <span>Main Project Screenshot</span>
                  </div>
                  <div className="image-placeholder">
                    <span>Detail View 1</span>
                  </div>
                  <div className="image-placeholder">
                    <span>Detail View 2</span>
                  </div>
                </div>
              </section>
            </div>

            <aside className="sidebar">
              <div className="sidebar-card">
                <h3>Project Info</h3>
                <div className="info-item">
                  <span className="info-label">Client</span>
                  <span className="info-value">{project.client}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Year</span>
                  <span className="info-value">{project.year}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Duration</span>
                  <span className="info-value">{project.duration}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Role</span>
                  <span className="info-value">{project.role}</span>
                </div>
              </div>

              <div className="sidebar-card">
                <h3>Tools Used</h3>
                <div className="tools-list">
                  {project.tools.map((tool, index) => (
                    <span key={index} className="tool-badge">{tool}</span>
                  ))}
                </div>
              </div>

              <div className="sidebar-card">
                <h3>Tags</h3>
                <div className="tags-list">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>

              <a href={project.link} target="_blank" rel="noopener noreferrer" className="view-project-btn">
                <ExternalLink size={18} />
                View Live Project
              </a>
            </aside>
          </div>

          <div className="next-project">
            <h2>More Projects</h2>
            <button onClick={scrollToPortfolio} className="btn-secondary">
              View All Projects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralProjectDetail;
