import { useState, useEffect, useRef } from 'react';
import './AltAbout.css';

const Counter = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);
  
  // Extract number and suffix (e.g. "200+" -> 200, "+")
  const targetNumber = parseInt(value, 10);
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTimestamp = null;
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * targetNumber));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [targetNumber, duration, hasAnimated]);

  return <span ref={elementRef}>{count}{suffix}</span>;
};

const AltAbout = () => {
  const stats = [
    { value: '5+', label: 'Worked on', sublabel: 'Products' },
    { value: '200+', label: 'Delivered', sublabel: 'Social media creatives' },
    { value: '150+', label: 'Designed', sublabel: 'Visual assest' },
  ];

  return (
    <section id="about" className="alt-about">
      <div className="container">
        <div className="alt-about-grid">
          <div className="alt-about-left">
            <h2 className="alt-about-title">About me</h2>
          </div>

          <div className="alt-about-right">
            <div className="alt-about-text">
              <p>
                I design digital experiences that balance usability with strong visual direction. My work
                is driven by a deep understanding of user behavior and a structured design approach
                rooted in core principles.
              </p>
              <p>
                From concept to execution, I focus on creating interfaces that are intuitive, scalable,
                and purposeful. I believe the best designs are the ones users don't have to think about
                they just work.
              </p>
            </div>

            <div className="alt-about-stats">
              {stats.map((stat, index) => (
                <div key={index} className="alt-stat-item">
                  <span className="alt-stat-label">{stat.label}</span>
                  <span className="alt-stat-value">
                    <Counter value={stat.value} />
                  </span>
                  <span className="alt-stat-sublabel">{stat.sublabel}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AltAbout;
