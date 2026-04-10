import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import DatabaseIcon from '../../assets/icons/DatabaseIcon';
import GamepadIcon from '../../assets/icons/GamepadIcon';
import StructureIcon from '../../assets/icons/StructureIcon';
import SketchIcon from '../../assets/icons/SketchIcon';
import './AiGamesDetail.css';

const ICON_MAP = {
  layers: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
    </svg>
  ),
  database: <DatabaseIcon size={48} />,
  gamepad: <GamepadIcon size={48} />,
  structure: <StructureIcon size={48} />,
  wireframe: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M3 9h18"/>
      <path d="M9 21V9"/>
    </svg>
  ),
  sketch: <SketchIcon size={48} />,
};


const AiGamesDetail = ({ project }) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const scrollToPortfolio = () => {
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('portfolio');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    }, 100);
  };

  const details = project.projectDetails || {};
  const games = project.games || [];

  return (
    <div className="cs-page">

      {/* ===== HERO SECTION ===== */}
      <section className="cs-hero">
        <div className="cs-container">
          <div className="cs-hero-content">
            <div className="cs-hero-text">
              <div className="cs-hero-title-wrapper">
                <p className="cs-hero-title">{project.title}</p>
                <p className="cs-subtitle-text">
                  {project.subtitle || project.description}
                </p>
              </div>
              <div className="cs-hero-number">{project.heroNumber || '02'}</div>
            </div>
          </div>

          <div className="cs-hero-mockup">
            <img 
              src={project.heroImage} 
              alt={project.title}
              className="cs-hero-img"
            />
          </div>

          {/* Project Details Section */}
          <div className="cs-project-details">
            <div className="cs-details-row-game">
              {details.type && (
                <div className="cs-detail-item-game">
                  <span className="cs-detail-label-game">Type:</span>
                  <span className="cs-detail-value-game">{details.type}</span>
                </div>
              )}
              {details.platform && (
                <div className="cs-detail-item-game">
                  <span className="cs-detail-label-game">Platform:</span>
                  <span className="cs-detail-value-game">{details.platform}</span>
                </div>
              )}
              {details.status && (
                <div className="cs-detail-item-game">
                  <span className="cs-detail-label-game">Status:</span>
                  <span className="cs-detail-value-game">{details.status}</span>
                </div>
              )}
              {details.duration && (
                <div className="cs-detail-item-game">
                  <span className="cs-detail-label-game">Duration:</span>
                  <span className="cs-detail-value-game">{details.duration}</span>
                </div>
              )}
              {details.team && (
                <div className="cs-detail-item-game" style={{ paddingRight: '0rem' }}>
                  <span className="cs-detail-label-game">Team:</span>
                  <span className="cs-detail-value-game" dangerouslySetInnerHTML={{ __html: details.team.replace('designer,', 'designer,<br /> ') }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== MY ROLE & RESPONSIBILITIES ===== */}
      {project.roleItems && project.roleItems.length > 0 && (
        <section className="cs-role-section">
          <div className="cs-container">
            <h2 className="cs-role-title">My Role & Responsibilities</h2>
            <p className="cs-role-description">
              {project.roleDescription}
            </p>

            <div className="cs-role-grid">
              {project.roleItems.map((item, index) => (
                <div key={index} className="cs-role-item">
                  <div className="cs-role-icon">
                    {ICON_MAP[item.iconType] || null}
                  </div>
                  <h3 className="cs-role-item-title" dangerouslySetInnerHTML={{ __html: item.title.replace(/\n/g, '<br />') }} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== BASIC INFORMATION ARCHITECTURE ===== */}
      {project.architectureCards && project.architectureCards.length > 0 && (
        <section className="cs-architecture-section">
          <div className="cs-container">
            <div className="cs-architecture-grid">
              <div className="cs-architecture-left">
                <h2 className="cs-architecture-title">Basic Information Architecture</h2>
                <p className="cs-architecture-description">
                  {project.architectureDescription}
                </p>
              </div>

              <div className="cs-architecture-right">
                {project.architectureCards.map((card, index) => (
                  <div key={index} className="cs-architecture-card-wrapper">
                    <div className="cs-card-number">{card.number}</div>
                    <div className="cs-architecture-card">
                      <h3 className="cs-card-title">{card.title}</h3>
                      <p className="cs-card-description">{card.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== GAME SECTIONS ===== */}
      {games.map((game, gameIndex) => (
        <div key={game.id || gameIndex}>
          {/* Game Overview */}
          <section className="cs-game-section">
            <div className="cs-container">
              <div className="cs-game-grid">
                {game.imagePosition === 'left' ? (
                  <>
                    <div className="cs-game-right">
                      <img 
                        src={game.image}
                        alt={game.imageAlt}
                        className="cs-game-img"
                       
                      />
                    </div>
                    <div className="cs-game-left">
                      <h2 className="cs-game-title" dangerouslySetInnerHTML={{ __html: game.title.replace(/\n/g, '<br />') }} />
                      <div className="cs-game-body">
                        {game.body.map((paragraph, i) => (
                          <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }} />
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="cs-game-left">
                      <h2 className="cs-game-title" dangerouslySetInnerHTML={{ __html: game.title.replace(/\n/g, '<br />') }} />
                      <div className="cs-game-body">
                        {game.body.map((paragraph, i) => (
                          <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }} />
                        ))}
                      </div>
                    </div>
                    <div className="cs-game-right">
                      <img 
                        src={game.image}
                        alt={game.imageAlt}
                        className="cs-game-img"
                       
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>

          {/* How the Game Works */}
          {game.workflow && (
            <section className="cs-workflow-section">
              <div className="cs-container">
                <div className="cs-workflow-grid">
                  <div className="cs-workflow-left">
                    <h2 className="cs-workflow-title">{game.workflow.title}</h2>
                    
                    {game.workflow.items.map((item, i) => (
                      <div key={i} className="cs-workflow-item">
                        <h3 className="cs-workflow-subtitle">{item.subtitle}</h3>
                        <p className="cs-workflow-text">{item.text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="cs-workflow-right">
                    <img 
                      src={game.workflow.image}
                      alt={game.workflow.imageAlt}
                      className="cs-workflow-img"
                     
                    />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Design Challenges */}
          {game.designChallenges && game.designChallenges.length > 0 && (
            <section className="cs-challenges-section">
              <div className="cs-container">
                <h2 className="cs-challenges-section-title">Design challenges</h2>
                
                <div className="cs-challenges-grid">
                  {game.designChallenges.map((challenge, i) => (
                    <div key={i} className="cs-challenge-item">
                      <span className="cs-challenge-bullet">•</span>
                      <p className="cs-challenge-text">{challenge}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Final Designs */}
          {game.finalDesignImages && game.finalDesignImages.length > 0 && (
            <section className="cs-final-designs-section">
              <div className="cs-container">
                <h2 className="cs-final-designs-title">Final designs (Live screens)</h2>
                <div className="cs-final-designs-grid">
                  {game.finalDesignImages.map((img, i) => (
                    <img 
                      key={i}
                      src={img.src}
                      alt={img.alt}
                      className="cs-final-design-img"
                     
                    />
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      ))}
      
    </div>
  );
};

export default AiGamesDetail;
