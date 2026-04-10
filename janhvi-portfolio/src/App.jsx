import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/auth/Login';
import Navbar from './components/home/Navbar';
import Hero from './components/home/Hero';
import About from './components/home/About';
import Portfolio from './components/home/Portfolio';
import Skills from './components/home/Skills';
import Contact from './components/home/Contact';
import Footer from './components/home/Footer';
import AltBanner from './components/altHome/AltBanner';
import AltQuote from './components/altHome/AltQuote';
import AltAbout from './components/altHome/AltAbout';
import AltPortfolio from './components/altHome/AltPortfolio';
import AltSkills from './components/altHome/AltSkills';
import AltConnect from './components/altHome/AltConnect';
import ProjectDetail from './components/projectDetails/ProjectDetail';
import ScrollToTop from './components/ScrollToTop';

const MainPage = () => {
  const { logout, authEnabled } = useAuth();
  return (
    <>
      <Navbar onLogout={logout} showLogout={authEnabled} />
      <Hero />
      <About />
      <Portfolio />
      <Skills />
      <Contact />
      <Footer />
    </>
  );
};

const AltMainPage = () => {
  const { logout, authEnabled } = useAuth();
  return (
    <>
      <Navbar onLogout={logout} showLogout={authEnabled} />
      <AltBanner />
      <AltQuote />
      <AltAbout />
      <AltPortfolio />
      <AltSkills />
      <AltConnect />
      <Footer />
    </>
  );
};

const ProjectPage = () => {
  const { logout, authEnabled } = useAuth();
  return (
    <>
      <Navbar onLogout={logout} showLogout={authEnabled} />
      <ProjectDetail />
      <Footer />
    </>
  );
};

const AppRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Routes>
          <Route path="/" element={<AltMainPage />} />
          <Route path="/alt" element={<AltMainPage />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
