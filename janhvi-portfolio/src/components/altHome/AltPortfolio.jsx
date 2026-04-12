import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAccessibleProjects } from '../../hooks/useAccessibleProjects';
import './AltPortfolio.css';

const AltPortfolio = () => {
  const navigate = useNavigate();
  const { accessibleProjects } = useAccessibleProjects();

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <section id="portfolio" className="alt-portfolio">
      <div className="container">
        <h2 className="alt-portfolio-title">Projects</h2>

        <div className="alt-portfolio-grid">
          {accessibleProjects.map((project) => (
            <div
              key={project.id}
              className="alt-portfolio-card"
              onClick={() => handleProjectClick(project.id)}
            >
              <div className="alt-card-image">
                <img
                  src={project.homeImage || project.heroImage}
                  alt={project.title}
                  className="alt-card-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="alt-card-overlay">
                <button className="alt-card-action" aria-label="View project details">
                  <ArrowRight size={18} />
                  <span>View Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AltPortfolio;
