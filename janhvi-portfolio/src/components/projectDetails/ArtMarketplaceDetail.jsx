import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import VideoPlayer from '../common/VideoPlayer';
import 'swiper/css';
import './ArtMarketplaceDetail.css';

const LaptopScreen = ({ src, alt, scrollable }) => {
  const screenRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (!scrollable) return;
    const screen = screenRef.current;
    if (!screen) return;

    let animationId;
    let startTime;
    const duration = 4000;
    const numberOfCycles = 1;

    const animate = (time) => {
      if (hasInteracted) return;
      if (!startTime) startTime = time;
      const elapsed = time - startTime;

      if (elapsed > duration * numberOfCycles) return;

      const maxScroll = (screen.scrollHeight - screen.clientHeight) * 0.12;
      const progress = (elapsed % duration) / duration;
      const scrollPos = (1 - Math.cos(progress * Math.PI * 2)) / 2 * maxScroll;

      screen.scrollTop = scrollPos;
      animationId = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasInteracted) {
          animationId = requestAnimationFrame(animate);
        } else {
          cancelAnimationFrame(animationId);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(screen);

    const handleUserInteraction = () => {
      setHasInteracted(true);
      cancelAnimationFrame(animationId);
    };

    screen.addEventListener('wheel', handleUserInteraction, { passive: true });
    screen.addEventListener('touchstart', handleUserInteraction, { passive: true });
    screen.addEventListener('mousedown', handleUserInteraction, { passive: true });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationId);
      screen.removeEventListener('wheel', handleUserInteraction);
      screen.removeEventListener('touchstart', handleUserInteraction);
      screen.removeEventListener('mousedown', handleUserInteraction);
    };
  }, [hasInteracted, scrollable]);

  if (scrollable) {
    return (
      <div className="cs4-laptop-screen" ref={screenRef}>
        <img src={src} alt={alt} className="cs4-laptop-screen-content" />
      </div>
    );
  }

  return (
    <div className="cs4-laptop-screen">
      <img src={src} alt={alt} className="cs4-laptop-screen-content" />
    </div>
  );
};

const ArtMarketplaceDetail = ({ project }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const tabs = project.tabs || [];
  const tabContents = project.tabContents || {};
  const pagerPages = project.pagerPages || [];
  const showcaseScreens = project.showcaseScreens || [];
  const resultPanels = project.resultPanels || [];
  const dd = project.designDirection || {};

  const renderTabContent = () => {
    const content = tabContents[activeTab];
    if (!content) return null;

    if (content.type === 'text') {
      return <p className="cs4-tab-text">{content.text}</p>;
    }

    if (content.type === 'list') {
      return (
        <>
          {content.intro && <p className="cs4-tab-intro">{content.intro}</p>}
          {content.listIntro && <p className="cs4-tab-intro">{content.listIntro}</p>}
          <ul className="cs4-tab-list">
            {content.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </>
      );
    }

    if (content.type === 'uxDecisions') {
      return (
        <>
          {content.items.map((item, i) => (
            <div key={i} className="cs4-ux-decision-item">
              <h4 className="cs4-ux-decision-title">{item.title}</h4>
              <p className="cs4-ux-decision-desc">{item.description}</p>
            </div>
          ))}
        </>
      );
    }

    return null;
  };

  return (
    <div className="cs4-page">

      {/* ===== HERO SECTION ===== */}
      <section className="cs4-hero">
        <div className="cs4-container">
          <div className="cs4-hero-content">
            <div className="cs4-hero-text">
              <div className="cs4-hero-title-wrapper">
                <p className="cs4-hero-title" dangerouslySetInnerHTML={{ __html: (project.heroTitle || project.title).replace(/\n/g, '<br />') }} />
              </div>
              <div className="cs4-hero-number">{project.heroNumber || '03'}</div>
            </div>
          </div>

          <div className="cs4-hero-mockup">
            <img
              src={project.heroImageUrl || project.heroImage}
              alt={project.title}
              className="cs4-hero-img"
            />
          </div>

          {/* Timeline + Role Bar */}
          <div className="cs-project-details">
            <div className="cs-details-row-art">
              {project.timeline && (
                <div className="cs-detail-item-art">
                  <span className="cs-detail-label-art">Timeline:</span>
                  <span className="cs-detail-value-art">{project.timeline}</span>
                </div>
              )}
              <div className="cs-detail-item-art">
                <span className="cs-detail-label-art">Role:</span>
                <span className="cs-detail-value-art">{project.role}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROJECT OVERVIEW ===== */}
      {project.projectOverview && project.projectOverview.length > 0 && (
        <section className="cs4-overview-section">
          <div className="cs4-container">
            <h2 className="cs4-overview-title">Project Overview</h2>
            {project.projectOverview.map((paragraph, i) => (
              <p key={i} className="cs4-overview-text">{paragraph}</p>
            ))}
          </div>
        </section>
      )}

      {/* ===== TABS SECTION ===== */}
      {tabs.length > 0 && (
        <section className="cs4-tabs-section">
          <div className="cs4-container">
            <div className="cs4-tabs-bar">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  className={`cs4-tab-button ${activeTab === index ? 'active' : ''}`}
                  onClick={() => setActiveTab(index)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="cs4-tab-content">
              {renderTabContent()}
            </div>
          </div>
        </section>
      )}

      {/* ===== DESIGN DIRECTION ===== */}
      {dd.colorSystem && (
        <section className="cs4-design-direction">
          <div className="cs4-container">
            <h2 className="cs4-design-direction-title">Design Direction</h2>

            <div className="cs4-design-direction-grid">
              {/* Color System */}
              {dd.colorSystem && (
                <div className="cs4-dd-subsection">
                  <h3 className="cs4-dd-subtitle">{dd.colorSystem.title}</h3>
                  <p className="cs4-dd-description">{dd.colorSystem.description}</p>
                  <img
                    className="cs4-dd-image-img"
                    src={dd.colorSystem.image}
                    alt={dd.colorSystem.imageAlt}
                   
                  />
                </div>
              )}

              {/* Typography */}
              {dd.typography && (
                <div className="cs4-dd-subsection">
                  <h3 className="cs4-dd-subtitle">{dd.typography.title}</h3>
                  <p className="cs4-dd-description">{dd.typography.description}</p>
                  <img
                    className="cs4-dd-image-img"
                    src={dd.typography.image}
                    alt={dd.typography.imageAlt}
                   
                  />
                </div>
              )}
            </div>

            {/* Design Layout */}
            {dd.layout && (
              <div className="cs4-dd-layout-section">
                <h3 className="cs4-dd-subtitle">{dd.layout.title}</h3>
                <p className="cs4-dd-layout-description">{dd.layout.description}</p>
                <div className="cs4-dd-layout-grid">
                  {dd.layout.images.map((img, i) => (
                    <img
                      key={i}
                      className="cs4-dd-image-img"
                      src={img.src}
                      alt={img.alt}
                     
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ===== PRIMARY USER FLOW ===== */}
      {project.userFlowImage && (
        <section className="cs4-userflow-section">
          <div className="cs4-container">
            <h2 className="cs4-userflow-title">{project.userFlowTitle}</h2>
            <div className="cs4-userflow-image-wrapper">
              <img
                src={project.userFlowImage}
                alt={project.userFlowTitle}
               
              />
            </div>
          </div>
        </section>
      )}

      {/* ===== PAGER SECTION ===== */}
      {pagerPages.length > 0 && (
        <section className="cs4-pager-section">
          <div className="cs4-container">
            <h2 className="cs4-pager-heading">Key Screens</h2>
            <div className="cs4-pager-outer">
              <Swiper
                modules={[Mousewheel]}
                mousewheel={{
                  forceToAxis: true,
                  sensitivity: 0.1,
                  thresholdDelta: 10,
                  thresholdTime: 0,
                }}
                grabCursor={true}
                slidesPerView={1.2}
                centeredSlides={false}
                spaceBetween={0}
                speed={500}
                touchStartPreventDefault={true}
                className="cs4-pager-swiper"
              >
                {pagerPages.map((page, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="cs4-pager-card">
                      <div className="cs4-pager-text">
                        <h3 className="cs4-pager-title">{page.title}</h3>
                        <ul className="cs4-pager-list">
                          {page.bullets.map((b, i) => (
                            <li key={i}>
                              <strong>{b.label}</strong> {b.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="cs4-pager-image">
                        <img
                          src={page.image}
                          alt={page.title}
                         
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>
      )}

      {/* ===== SCREEN SHOWCASE ===== */}
      {showcaseScreens.length > 0 && (
        <section className="cs4-showcase-section">
          <div className="cs4-container">
            <h2 className="cs4-showcase-title">Results</h2>
            <p className="cs4-showcase-subtitle"></p>

            {showcaseScreens.map((screen, idx) => (
              <div key={idx} className={`cs4-laptop-wrapper ${screen.align === 'right' ? 'cs4-laptop-wrapper--right' : ''}`}>
                <div className="cs4-mockup-bg">
                  <div className="cs4-mockup-bg-text" dangerouslySetInnerHTML={{ __html: screen.label.replace(/\n/g, '<br />') }} />
                </div>
                <div className="cs4-laptop-inner">
                  <img
                    src={screen.laptopFrame}
                    alt=""
                    className="cs4-laptop-frame"
                   
                  />
                  <LaptopScreen
                    src={screen.screenImage}
                    alt={screen.screenAlt}
                    scrollable={screen.scrollable}
                  />
                </div>
              </div>
            ))}

            {resultPanels.length > 0 && (
              <div className="cs4-result-panels">
                {resultPanels.map((panel, idx) => (
                  <div key={idx} className="cs4-result-panel">
                    <img src={panel.image} alt={panel.alt} className="cs4-result-image" />
                    <div className="cs4-result-label">{panel.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ===== VIDEO DEMO SECTION ===== */}
      {project.videoDemo && (
        <section className="cs4-video-section">
          <div className="cs4-container">
            <h2 className="cs4-pager-heading">{project.videoDemo.title}</h2>
            <VideoPlayer
              src={project.videoDemo.src}
              poster={project.videoDemo.poster}
              alwaysShowControls={false}
              showMuteButton={false}
            />
          </div>
        </section>
      )}

    </div>
  );
};

export default ArtMarketplaceDetail;
