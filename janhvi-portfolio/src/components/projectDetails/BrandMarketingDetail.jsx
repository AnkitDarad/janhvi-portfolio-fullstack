import { useEffect } from 'react';
import { useAccessibleProjects } from '../../hooks/useAccessibleProjects';
import './BrandMarketingDetail.css';

const BrandMarketingDetail = ({ project }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [project.id]);

  if (!project) return null;

  const { accessibleProjects } = useAccessibleProjects();
  const projectIndex = accessibleProjects.findIndex(p => p.id === project.id) + 1;
  const projectNumber = String(projectIndex).padStart(2, '0');

  const sections = project.sections || [];

  return (
    <div className="cs-page">
      {/* ===== HERO SECTION ===== */}
      <section className="cs-hero">
        <div className="cs-container">
          <div className="cs-hero-content">
            <div className="bmc-hero-text">
              <div className="bmc-hero-title-wrapper">
                <p className="bmc-hero-title">{project.heroTitle || project.title}</p>
                {project.heroSubtitle && (
                  <p className="bmc-hero-subtitle">{project.heroSubtitle}</p>
                )}
              </div>
              <div className="bmc-hero-number">{projectNumber}</div>
            </div>
          </div>
        </div>
      </section>

      {sections.map((section, sectionIndex) => (
        <section key={sectionIndex} className="bmc-section">
          <div className={`bmc-container ${['In App banners', 'LinkedIn Cover images'].includes(section.title) ? 'bmc-container--padded' : ''}`}>
            <h2 className="bmc-section-title">{section.title}</h2>
            <div className={`bmc-creative-grid 
              ${section.title === 'Emailers' ? 'bmc-creative-grid--row' : ''} 
              ${['In App banners', 'LinkedIn Cover images'].includes(section.title) ? 'bmc-creative-grid--featured' : ''}
              ${section.title === 'Brochures' ? 'bmc-creative-grid--brochures' : ''}
              ${['Internal Brand promotion banner'].includes(section.title) ? 'bmc-creative-grid--even' : ''}
              ${(section.images || []).length < 3 && !['Emailers', 'Brochures', 'Internal Brand promotion banner', 'In App banners', 'LinkedIn Cover images'].includes(section.title) ? 'bmc-creative-grid--wide' : ''}
            `}>
              {(section.images || []).map((img, imgIndex) => (
                <div key={imgIndex} className="bmc-creative-item">
                  {img.header && <h4 className="bmc-item-header">{img.header}</h4>}
                  <img src={img.src} alt={img.alt || section.title} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default BrandMarketingDetail;
