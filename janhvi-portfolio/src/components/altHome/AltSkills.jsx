import { Palette, Figma, Smartphone, Code, Lightbulb, Users } from 'lucide-react';
import './AltSkills.css';

const skills = [
  {
    icon: <Figma />,
    title: 'UI Design',
    description: 'Creating beautiful, intuitive interfaces using Figma, Sketch, and Adobe XD',
    tools: ['Figma'],
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
    tools: ['Figma', 'Illustrator', 'Photoshop'],
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
    tools: ['FigJam', 'Canva'],
  },
];

const AltSkills = () => {
  return (
    <section id="skills" className="alt-skills">
      <div className="container">
        <h2 className="alt-skills-title">Skills</h2>

        <div className="alt-skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="alt-skill-card">
              <div className="alt-skill-header">
                <div className="alt-skill-icon">{skill.icon}</div>
                <h3 className="alt-skill-name">{skill.title}</h3>
              </div>
              <p className="alt-skill-description">{skill.description}</p>
              <div className="alt-skill-tools">
                {skill.tools.map((tool, idx) => (
                  <span key={idx} className="alt-tool-badge">{tool}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AltSkills;
