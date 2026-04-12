import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Linkedin, Github, Twitter, Loader2 } from 'lucide-react';
import { api } from '../../utils/api';
import './Contact.css';

const contactInfo = [
  {
    icon: <Mail />,
    title: 'Email',
    value: 'gjsuryawanshi@gmail.com',
    link: 'mailto:gjsuryawanshi@gmail.com',
  },
  {
    icon: <Phone />,
    title: 'Phone',
    value: '+91 820-8522091',
    link: 'tel:+918208522091',
  },
  {
    icon: <MapPin />,
    title: 'Location',
    value: 'Navi Mumbai, Maharashtra, India',
    link: null,
  },
];

const socialLinks = [
  { icon: <Linkedin />, label: 'LinkedIn', url: 'https://linkedin.com' },
  { icon: <Github />, label: 'GitHub', url: 'https://github.com' },
  { icon: <Twitter />, label: 'Twitter', url: 'https://twitter.com' },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus({ type: '', message: '' });

    try {
      await api.sendMessage(formData);
      setStatus({ type: 'success', message: 'Thank you! Your message has been sent.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Something went wrong. Please try again.' });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <div className="section-header">
          {/* <span className="section-subtitle">Get In Touch</span> */}
          <h2 className="section-title">Contact Me</h2>
          <p className="section-description">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h3 className="contact-info-title">Let's talk about your project</h3>
            <p className="contact-info-text">
              I'm always open to discussing new projects, creative ideas,
              or opportunities to be part of your vision.
            </p>

            <div className="contact-details">
              {contactInfo.map((item, index) => (
                <div key={index} className="contact-item">
                  <div className="contact-item-icon">{item.icon}</div>
                  <div className="contact-item-content">
                    <div className="contact-item-title">{item.title}</div>
                    {item.link ? (
                      <a href={item.link} className="contact-item-value">
                        {item.value}
                      </a>
                    ) : (
                      <div className="contact-item-value">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-social">
              <h4>Follow Me</h4>
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="social-link"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="How can I help you?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Your Message"
              ></textarea>
            </div>

            {status.message && (
              <div className={`form-status ${status.type}`}>
                {status.message}
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={sending}>
              {sending ? (
                <>Sending...<Loader2 size={20} className="spin" /></>
              ) : (
                <>Send Message<Send size={20} /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
