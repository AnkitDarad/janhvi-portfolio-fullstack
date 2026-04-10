import { Palette, Figma, Smartphone, Code, Lightbulb, Users } from 'lucide-react';
import './Skills.css';

const skills = [
  {
    icon: <Figma />,
    title: 'UI Design',
    description: 'Creating beautiful, intuitive interfaces using Figma, Sketch, and Adobe XD',
    tools: ['Figma', 'Sketch', 'Adobe XD'],
  },
  {
    icon: <Smartphone />,
    title: 'UX Research',
    description: 'Conducting user research, testing, and creating user personas',
    tools: ['User Testing', 'Surveys', 'Analytics'],
  },
  {
    icon: <Palette />,
    title: 'Graphic Design',
    description: 'Developing visual identities, illustrations, and marketing materials',
    tools: ['Illustrator', 'Photoshop', 'InDesign'],
  },
  {
    icon: <Code />,
    title: 'Prototyping',
    description: 'Building interactive prototypes to validate design concepts',
    tools: ['Figma', 'Principle', 'Framer'],
  },
  {
    icon: <Lightbulb />,
    title: 'Design Systems',
    description: 'Creating scalable design systems and component libraries',
    tools: ['Figma', 'Storybook', 'Documentation'],
  },
  {
    icon: <Users />,
    title: 'Collaboration',
    description: 'Working effectively with developers, product managers, and stakeholders',
    tools: ['Jira', 'Slack', 'Notion'],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="skills section">
      <div className="container">
        <div className="section-header">
          {/* <span className="section-subtitle">What I Do</span> */}
          <h2 className="section-title">Skills & Services</h2>
        </div>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-card">
              <div className="skill-icon">{skill.icon}</div>
              <h3 className="skill-title">{skill.title}</h3>
              <p className="skill-description">{skill.description}</p>
              <div className="skill-tools">
                {skill.tools.map((tool, idx) => (
                  <span key={idx} className="tool-badge">{tool}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* <div className="expertise-section">
          <h3 className="expertise-heading">Expertise Levels</h3>
          <div className="expertise-grid">
            {expertise.map((item, index) => (
              <div key={index} className="expertise-item">
                <div className="expertise-header">
                  <span className="expertise-name">{item.name}</span>
                  <span className="expertise-percentage">{item.level}%</span>
                </div>
                <div className="expertise-bar">
                  <div 
                    className="expertise-fill" 
                    style={{ width: `${item.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Skills;
