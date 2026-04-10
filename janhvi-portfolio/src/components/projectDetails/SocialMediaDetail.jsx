import { useEffect } from 'react';
import { useAccessibleProjects } from '../../hooks/useAccessibleProjects';
import './SocialMediaDetail.css';

const SocialMediaDetail = ({ project }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [project.id]);

  if (!project) return null;

  const { accessibleProjects } = useAccessibleProjects();
  const projectIndex = accessibleProjects.findIndex(p => p.id === project.id) + 1;
  const projectNumber = String(projectIndex).padStart(2, '0');

  return (
    <div className="smc-page">

      {/* ===== HERO SECTION ===== */}
      <section className="smc-hero">
        <div className="smc-container">
          <div className="smc-hero-content">
            <div className="smc-hero-text">
              <div className="smc-hero-title-wrapper">
                <p className="smc-hero-title">{project.heroTitle || project.title}</p>
                {project.heroSubtitle && (
                  <p className="smc-hero-subtitle">{project.heroSubtitle}</p>
                )}
              </div>
              <div className="smc-hero-number">{projectNumber}</div>
            </div>
          </div>

          {project.heroCollageImage && (
            <div className="smc-hero-collage">
              <img
                src={project.heroCollageImage}
                alt={project.title}
              />
              {project.stats && project.stats.length > 0 && (
                <div className="smc-hero-stats">
                  {project.stats.map((stat, index) => (
                    <div key={index} className="smc-stat-item">
                      {stat.number && (
                        <div className="smc-stat-number">{stat.number}</div>
                      )}
                      <div className="smc-stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ===== DESCRIPTION ===== */}
      {project.descriptionParagraphs && project.descriptionParagraphs.length > 0 && (
        <section className="smc-description">
          <div className="smc-container">
            <div className="smc-description-text">
              {project.descriptionParagraphs.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== INFO CARDS ===== */}
      <section className="smc-info-cards">
        <div className="smc-container">
          <div className="smc-info-row">
            {project.roleDescription && (
              <div className="smc-info-card smc-info-card--role">
                <div className="smc-info-card-label">Role</div>
                <div className="smc-info-card-text">{project.roleDescription}</div>
              </div>
            )}
            {project.toolsList && project.toolsList.length > 0 && (
              <div className="smc-info-card smc-info-card--tools">
                <div className="smc-info-card-label">Tools</div>
                <div className="smc-tools-grid">
                  {project.toolsList.map((tool, index) => (
                    <div key={index} className="smc-tool-icon">
                      <img src={tool.icon} alt={tool.name} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {project.skillsDescription && (
            <div className="smc-info-row" style={{ marginTop: '1.5rem' }}>
              <div className="smc-info-card smc-info-card--skills">
                <div className="smc-info-card-label">Skills</div>
                <div className="smc-info-card-text">{project.skillsDescription}</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== PRODUCT SECTIONS ===== */}
      {project.productSections && project.productSections.map((section, sectionIndex) => (
        <section key={sectionIndex} className="smc-product-section">
          <div className="smc-container">
            <div className="smc-product-header">
              <h2 className="smc-product-title">{section.title}</h2>
              <p className="smc-product-description">{section.description}</p>
            </div>

            <div className="smc-creative-grid">
              {section.images.map((img, imgIndex) => (
                <div key={imgIndex} className={`smc-creative-item ${img.size || ''}`}>
                  <img src={img.src} alt={img.alt} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ===== THANK YOU SECTION ===== */}
      {project.thankYou && (
        <section className="smc-thankyou">
          <div className="smc-container">
            <div className="smc-thankyou-card-container">
              <div className="smc-thankyou-card">
                <div className="smc-thankyou-line smc-thankyou-line--top" />
                <div className="smc-thankyou-line smc-thankyou-line--bottom" />
                <div className="smc-thankyou-border smc-thankyou-border--left" />
                <div className="smc-thankyou-border smc-thankyou-border--right" />
                <div className="smc-thankyou-pill smc-thankyou-pill--left" />
                <div className="smc-thankyou-pill smc-thankyou-pill--right" />
                <h2 className="smc-thankyou-title">{project.thankYou.title}</h2>
                <p className="smc-thankyou-subtitle">{project.thankYou.subtitle}</p>
                <p className="smc-thankyou-text">{project.thankYou.text}</p>
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

export default SocialMediaDetail;
