import './GlassButton.css';

const GlassButton = ({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'medium',
  className = '' 
}) => {
  return (
    <button 
      className={`glass-button glass-button--${variant} glass-button--${size} ${className}`}
      onClick={onClick}
    >
      <span className="glass-button__text">{children}</span>
      <span className="glass-button__shine"></span>
    </button>
  );
};

export default GlassButton;
