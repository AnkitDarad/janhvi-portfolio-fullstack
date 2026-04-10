import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAccessibleProjects } from '../../hooks/useAccessibleProjects';
import GlassButton from '../common/GlassButton';
import './JioStreamDetail.css';

const JioStreamDetail = ({ project }) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [project.id]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!project) return null;

  const scrollToPortfolio = () => {
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('portfolio');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    }, 100);
  };

  const { accessibleProjects } = useAccessibleProjects();
  const projectIndex = accessibleProjects.findIndex(p => p.id === project.id) + 1;
  const projectNumber = String(projectIndex).padStart(2, '0');

  return (
    <div className="cs-page">

      {/* ===== HERO SECTION ===== */}
      <section className="cs-hero">
        <div className="cs-container">
          <div className="cs-hero-content">
            <div className="cs-hero-text">
              <p className="cs-hero-title">{project.heroTitle || project.title}</p>
              <div className="cs-hero-number">{projectNumber}</div>
            </div>
          </div>

          <div className="cs-hero-mockup">
            <img
              src={'/images/jiostream/jiostream_home_image.png'}
              alt={project.title}
              className="cs-hero-img"
            />
          </div>

          {/* Project Details Section */}
          <div className="cs-project-details">
            <div className="cs-details-row">
              <div className="cs-detail-item" style={{ paddingRight: '12rem' }}>
                <span className="cs-detail-label">Role:</span>
                <span className="cs-detail-value">{project.role}</span>
              </div>
              {project.team && (
                <div className="cs-detail-item" style={{ paddingRight: '12rem' }}>
                  <span className="cs-detail-label">Team:</span>
                  <span className="cs-detail-value">{project.team}</span>
                </div>
              )}
              {project.status && (
                <div className="cs-detail-item" style={{ paddingRight: '4rem' }}>
                  <span className="cs-detail-label">Status:</span>
                  <span className="cs-detail-value">{project.status}</span>
                </div>
              )}
            </div>

            <div className="cs-about-section">
              <div className="cs-about-left">
                <h2 className="cs-about-title">About</h2>
                {project.aboutDescription && (
                  <p className="cs-about-description" dangerouslySetInnerHTML={{ __html: project.aboutDescription }} />
                )}
                {project.aboutList && project.aboutList.length > 0 && (
                  <>
                    <p className="cs-about-description">The platform consists of:</p>
                    <ul className="cs-about-list">
                      {project.aboutList.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              {project.aboutMe && project.aboutMe.length > 0 && (
                <div className="cs-about-right">
                  <h2 className="cs-about-title">About me</h2>
                  <ul className="cs-about-me-list">
                    {project.aboutMe.map((item, index) => (
                      <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES OVERVIEW ===== */}
      {project.featuresOverview && project.featuresOverview.length > 0 && (
        <section className="cs-features-overview">
          <div className="cs-container">
            <h2 className="cs-features-title">Features I worked on (Overview)</h2>

            <div className="cs-features-grid">
              {project.featuresOverview.map((feature, index) => (
                <div key={index} className="cs-feature-card">
                  <h3 className="cs-feature-card-title">{feature.title}</h3>
                  <span className="cs-feature-card-tag">{feature.tag}</span>
                  <p className="cs-feature-card-description">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== DESIGN APPROACH ===== */}
      {project.designApproachItems && project.designApproachItems.length > 0 && (
        <section className="cs-design-approach">
          <div className="cs-container">
            <div className="cs-approach-grid">
              <div className="cs-approach-left">
                <h2 className="cs-approach-heading">Design Approach</h2>

                {project.designApproachItems.map((item, index) => (
                  <div key={index} className="cs-approach-item">
                    <p className="cs-approach-text" dangerouslySetInnerHTML={{ __html: item }} />
                  </div>
                ))}
              </div>

              {project.designApproachImage && (
                <div className="cs-approach-right">
                  <div className="cs-approach-image">
                    <img
                      src={project.designApproachImage}
                      alt="Design Approach"
                      className="cs-approach-img"

                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ===== CHALLENGES ===== */}
      {project.challenges && project.challenges.length > 0 && (
        <section className="cs-challenges">
          <div className="cs-container">
            <h2 className="cs-challenges-title">Challenges</h2>

            <div className="cs-challenges-grid">
              {project.challenges.map((challenge, index) => (
                <div key={index} className="cs-challenge-card">
                  <p className="cs-challenge-text">
                    {challenge}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== OUTCOMES ===== */}
      <section className="cs-outcomes">
        <div className="cs-container">
          <h2 className="cs-outcomes-title">Outcomes</h2>

          {project.outcomesHero && (
            <div className="cs-outcomes-hero">
              <h3 className="cs-outcomes-hero-title">{project.outcomesHero.title}</h3>
              <p className="cs-outcomes-hero-description">
                {project.outcomesHero.description}
              </p>
            </div>
          )}

          {project.outcomeImages && project.outcomeImages.length > 0 && (
            <div className="cs-outcomes-grid">
              {project.outcomeImages.map((img, index) => (
                <div
                  key={index}
                  className={`cs-outcome-showcase-card ${index === 0 ? 'cs-outcome-showcase-card-large' : ''}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="cs-outcome-img"

                  />
                </div>
              ))}
            </div>
          )}

          {/* Other Important Features */}
          {project.otherFeaturesImages && project.otherFeaturesImages.length > 0 && (
            <div className="cs-other-features">
              <h3 className="cs-other-features-title">Other Important features</h3>

              <div className="cs-other-features-scroll">
                {project.otherFeaturesImages.map((img, index) => (
                  <div key={index} className={`cs-other-features-card ${img.type === 'label' ? 'cs-other-features-card--label' : ''}`}>
                    {img.type === 'label' ? (
                      <span className="cs-other-features-card-label">{img.label}</span>
                    ) : (
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="cs-other-features-card-img"

                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Confidential Project */}
          {project.confidentialSection && (
            <div className="cs-confidential-section">
              <div className="cs-confidential-grid">
                <div className="cs-confidential-text">
                  <p className="cs-confidential-description">
                    {project.confidentialSection.description}
                  </p>
                  {project.confidentialSection.note && (
                    <div className="cs-confidential-note">
                      <p className="cs-note-title" dangerouslySetInnerHTML={{ __html: project.confidentialSection.note }} />
                    </div>
                  )}
                </div>

                {project.confidentialSection.image && (
                  <div className="cs-confidential-image">
                    <img
                      src={project.confidentialSection.image}
                      alt={project.confidentialSection.imageAlt || 'Confidential project'}
                      className="cs-confidential-img"

                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Small Features */}
          {project.smallFeatures && (
            <div className="cs-small-features">
              <h3 className="cs-small-features-title">{project.smallFeatures.title}</h3>
              <p className="cs-small-features-description">
                {project.smallFeatures.description}
              </p>
              {project.smallFeatures.images && project.smallFeatures.images.length > 0 && (
                <div className="cs-small-features-images">
                  {project.smallFeatures.images.map((img, index) => (
                    <div key={index} className="cs-outcome-showcase-card">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="cs-small-feature-img"

                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Full Width Image */}
        {project.fullWidthImage && (
          <div className="cs-full-width-image">
            <img
              src={project.fullWidthImage}
              alt={project.fullWidthImageAlt || project.title}
              className="cs-full-width-img"

            />
            {isMobile ? (
              <button
                className="cs-visit-btn"
                onClick={() => window.open('https://stream.jio/', '_blank')}
              >
                Visit Website: stream.jio
              </button>
            ) : (
              <div className="cs-glass-button-overlay">
                <GlassButton
                  variant="secondary"
                  size="medium"
                  onClick={() => window.open('https://stream.jio/', '_blank')}
                >
                  Visit Website: stream.jio
                </GlassButton>
              </div>
            )}
          </div>
        )}
      </section>

    </div>
  );
};

export default JioStreamDetail;
