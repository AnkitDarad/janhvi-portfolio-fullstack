import { useParams, useNavigate } from 'react-router-dom';
import { useAccessibleProjects } from '../../hooks/useAccessibleProjects';

import JioStreamDetail from './JioStreamDetail';
import AiGamesDetail from './AiGamesDetail';
import ArtMarketplaceDetail from './ArtMarketplaceDetail';
import SocialMediaDetail from './SocialMediaDetail';
import BrandMarketingDetail from './BrandMarketingDetail';
import LogofolioDetail from './LogofolioDetail';
import FallbackGeneral from './GeneralProjectDetail';

const LAYOUT_COMPONENTS = {
  jiostream: JioStreamDetail,
  'ai-games': AiGamesDetail,
  'art-marketplace': ArtMarketplaceDetail,
  'social-media': SocialMediaDetail,
  'brand-marketing': BrandMarketingDetail,
  logofolio: LogofolioDetail,
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProject, canAccessProject, loading } = useAccessibleProjects();
  const project = getProject(id);

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>Loading project...</div>;
  }

  if (!project || !canAccessProject(parseInt(id))) {
    return (
      <div className="project-not-found" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Project Not Found</h1>
          <p style={{ fontSize: '1.125rem', marginBottom: '2rem' }}>The project you're looking for doesn't exist or you don't have access to view it.</p>
          <button onClick={() => navigate('/')} className="btn-primary" style={{ padding: '1rem 2rem', background: 'linear-gradient(135deg, #6366f1, #4f46e5)', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '1rem', fontWeight: '600' }}>
            Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  const LayoutComponent = LAYOUT_COMPONENTS[project.layoutType] || FallbackGeneral;

  return (
    <LayoutComponent project={project} />
  );
};

export default ProjectDetail;
