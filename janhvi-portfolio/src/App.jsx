import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
  return (
    <>
      <Navbar showLogout={false} />
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
  return (
    <>
      <Navbar showLogout={false} />
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
  return (
    <>
      <Navbar showLogout={false} />
      <ProjectDetail />
      <Footer />
    </>
  );
};

function App() {
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
}

export default App;
