import { useEffect } from 'react';
import { useAccessibleProjects } from '../../hooks/useAccessibleProjects';
import './LogofolioDetail.css';

const PrakritiHerbal = ({ section }) => {
  return (
    <section className="lfi-logo-section lfi-prakriti-herbal">
      <div className="lfi-container">
        <header className="lfi-logo-header">
          <h3 className="lfi-logo-title">{section.title}</h3>
          {section.description && (
            <p className="lfi-logo-description">{section.description}</p>
          )}
        </header>
        {section.heroImage && (
          <div className="lfi-logo-hero">
            <img
              src={section.heroImage.src}
              alt={section.heroImage.alt || section.title}
            />
          </div>
        )}
        {section.images && (
          <div className="lfi-ph-flex-row">
            {section.images.map((img, index) => (
              <div key={index} className="lfi-ph-thumb">
                <img src={img.src} alt={img.alt || ''} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const AcraftGallery = ({ section }) => {
  return (
    <section className="lfi-logo-section lfi-acraft-gallery">
      <div className="lfi-container">
        <header className="lfi-logo-header">
          <h3 className="lfi-logo-title">{section.title}</h3>
          {section.description && (
            <p className="lfi-logo-description">{section.description}</p>
          )}
        </header>
        {section.images && (
          <div className="lfi-ag-flex-row">
            {section.images.map((img, index) => (
              <div key={index} className="lfi-ag-thumb">
                <img src={img.src} alt={img.alt || ''} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const LogofolioDetail = ({ project }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [project.id]);

  if (!project) return null;

  const { accessibleProjects } = useAccessibleProjects();
  const projectIndex = accessibleProjects.findIndex(p => p.id === project.id) + 1;
  const projectNumber = String(projectIndex).padStart(2, '0');

  const renderLogoSection = (section, sectionIndex) => {
    const titleMatchPrakriti = section.title.toLowerCase().includes('prakriti');
    const titleMatchAcraft = section.title.toLowerCase().includes('acraft');

    if (titleMatchPrakriti) return <PrakritiHerbal key={sectionIndex} section={section} />;
    if (titleMatchAcraft) return <AcraftGallery key={sectionIndex} section={section} />;

    return (
      <section key={sectionIndex} className="lfi-logo-section">
        <div className="lfi-container">
          <header className="lfi-logo-header">
            <h3 className="lfi-logo-title">{section.title}</h3>
            {section.description && (
              <p className="lfi-logo-description">{section.description}</p>
            )}
          </header>
          {section.heroImage && (
            <div className="lfi-logo-hero">
              <img
                src={section.heroImage.src}
                alt={section.heroImage.alt || section.title}
                loading={sectionIndex === 0 ? undefined : 'lazy'}
              />
            </div>
          )}
          {section.images && section.images.length > 0 && (
            <div
              className={`lfi-logo-thumbs lfi-logo-thumbs--count-${section.images.length > 4 ? 'many' : section.images.length}`}
            >
              {section.images.map((img, imgIndex) => (
                <div key={imgIndex} className="lfi-logo-thumb">
                  <img
                    src={img.src}
                    alt={img.alt || ''}
                    loading={
                      sectionIndex === 0 && !section.heroImage && imgIndex === 0
                        ? undefined
                        : 'lazy'
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  };

  return (
    <div className="lfi-page">
      <section className="lfi-hero">
        <div className="lfi-container">
          <div className="lfi-hero-content">
            <div className="lfi-hero-text">
              <div className="lfi-hero-title-wrapper">
                <p className="lfi-hero-title">{project.heroTitle || project.title}</p>
              </div>
              <div className="lfi-hero-number">{projectNumber}</div>
            </div>
          </div>
        </div>
      </section>

      {project.logoHeading && (
        <section className="lfi-block-heading" aria-label={project.logoHeading}>
          <div className="lfi-container">
            <h2 className="lfi-block-title">{project.logoHeading}</h2>
          </div>
        </section>
      )}

      {project.logoSections?.map((section, sectionIndex) => (
        renderLogoSection(section, sectionIndex)
      ))}

      {project.illustrationSections?.map((section, sectionIndex) => (
        <section key={sectionIndex} className="lfi-illustration-block">
          {section.mainHeading && (
            <div className="lfi-block-heading">
              <div className="lfi-container lfi-container--main-header">
                <h2 className="lfi-block-title">{section.mainHeading}</h2>
                {section.mainDescription && (
                  <p className="lfi-block-description">{section.mainDescription}</p>
                )}
              </div>
            </div>
          )}

          <div className="lfi-container">
            {section.groups?.map((group, groupIndex) => (
              <div key={groupIndex} className={`lfi-illustration-group ${group.layout || ''}`}>
                {group.title && (
                  <div className="lfi-group-header-wrapper">
                    <h3 className="lfi-group-header-pill">{group.title}</h3>
                  </div>
                )}

                <div className="lfi-illustration-grid-wrapper">
                  <div className={`lfi-illustration-grid lfi-grid--${group.images?.length || 3}`}>
                    {group.images?.map((img, imgIndex) => (
                      <div key={imgIndex} className="lfi-illustration-cell">
                        <img src={img.src} alt={img.alt || ''} />
                      </div>
                    ))}
                  </div>
                </div>

                {group.subLabels && (
                  <div className={`lfi-illustration-sublabels lfi-grid--${group.images?.length || 3}`}>
                    {group.subLabels.map((sub, subIndex) => (
                      <div
                        key={subIndex}
                        className="lfi-sublabel-pill"
                        style={{ gridColumn: `span ${sub.span || 1}` }}
                      >
                        {sub.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default LogofolioDetail;
