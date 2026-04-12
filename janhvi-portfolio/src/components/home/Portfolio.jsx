import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAccessibleProjects } from '../../hooks/useAccessibleProjects';
import './Portfolio.css';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();
  const { accessibleProjects } = useAccessibleProjects();

  const filters = ['all', 'UI/UX', 'Branding', 'Web Design', 'Mobile'];

  const filteredProjects = activeFilter === 'all' 
    ? accessibleProjects 
    : accessibleProjects.filter(project => project.category === activeFilter);

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <section id="portfolio" className="portfolio section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Portfolio</h2>
        </div>

        <div className="portfolio-filters">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="portfolio-card"
              onClick={() => handleProjectClick(project.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className={`portfolio-image bg-gradient-to-br ${project.color}`}>
                {project.heroImage ? (
                  <img 
                    src={project.heroImage} 
                    alt={project.title}
                    className="portfolio-project-image"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="project-placeholder">
                    <span>Project Image</span>
                  </div>
                )}
                <div className="portfolio-overlay">
                  <div className="portfolio-actions">
                    <button 
                      className="action-btn" 
                      aria-label="View project details"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProjectClick(project.id);
                      }}
                    >
                      <ArrowRight size={20} />
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="portfolio-content">
                <div className="portfolio-category">{project.category}</div>
                <h3 className="portfolio-title">{project.title}</h3>
                <p className="portfolio-description">{project.description}</p>
                
                <div className="portfolio-tags">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
