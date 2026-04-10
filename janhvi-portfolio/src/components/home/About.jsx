import { Award, Users, Coffee, Briefcase } from 'lucide-react';
import './About.css';

const About = () => {
  const stats = [
    { icon: <Briefcase />, value: '5+', label: 'Years Experience' },
    { icon: <Users />, value: '120+', label: 'Happy Clients' },
    { icon: <Award />, value: '15+', label: 'Awards Won' },
    { icon: <Coffee />, value: '500+', label: 'Projects Done' },
  ];

  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="section-header">
          {/* <span className="section-subtitle">Get to know me</span> */}
          <h2 className="section-title">About Me</h2>
        </div>

        <div className="about-content">
          <div className="about-image">
            <div className="about-image-wrapper">
              <div className="placeholder-about-image">
                <span>Professional Photo</span>
              </div>
              <div className="about-decoration"></div>
            </div>
          </div>

          <div className="about-text">
            <h3 className="about-heading">
              Passionate Designer Creating Digital Experiences
            </h3>
            
            <p className="about-paragraph">
              With over 5 years of experience in UI/UX design, I specialize in 
              creating intuitive and beautiful digital experiences. My design 
              philosophy centers around understanding user needs and translating 
              them into elegant, functional solutions.
            </p>

            <p className="about-paragraph">
              I believe that great design is not just about aesthetics—it's about 
              solving real problems and making technology accessible to everyone. 
              Every project I undertake is driven by research, empathy, and a 
              commitment to excellence.
            </p>

            <div className="about-highlights">
              <div className="highlight-item">
                <div className="highlight-icon">✓</div>
                <div>
                  <h4>User-Centered Design</h4>
                  <p>Putting users first in every design decision</p>
                </div>
              </div>
              
              <div className="highlight-item">
                <div className="highlight-icon">✓</div>
                <div>
                  <h4>Modern Tools & Methods</h4>
                  <p>Leveraging the latest design tools and methodologies</p>
                </div>
              </div>

              <div className="highlight-item">
                <div className="highlight-icon">✓</div>
                <div>
                  <h4>Continuous Learning</h4>
                  <p>Always staying updated with design trends</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default About;
