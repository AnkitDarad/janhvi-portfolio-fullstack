import { useState } from 'react';
import { Send, Linkedin, Github, Twitter, Loader2, ArrowRight } from 'lucide-react';
import { api } from '../../utils/api';
import './AltConnect.css';

const AltConnect = () => {
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
    <section id="contact" className="alt-connect">
      <div className="container">
        <div className="alt-connect-grid">
          <div className="alt-connect-left">
            <h2 className="alt-connect-title">
              Let's<br />Connect
            </h2>
            <div className="alt-connect-info">
              <p className="alt-connect-subtitle">
                Have a project in mind or just want to chat? Feel free to reach out!
              </p>
              
              <div className="alt-contact-details">
                <div className="alt-contact-item">
                  <span className="alt-contact-label">Email</span>
                  <a href="mailto:gjsuryawanshi@gmail.com" className="alt-contact-value">gjsuryawanshi@gmail.com</a>
                </div>
                <div className="alt-contact-item">
                  <span className="alt-contact-label">Phone</span>
                  <a href="tel:+918208522091" className="alt-contact-value">+91 8208522091</a>
                </div>
                <div className="alt-contact-item">
                  <span className="alt-contact-label">Location</span>
                  <span className="alt-contact-value">Navi Mumbai, Maharashtra, India</span>
                </div>
              </div>

              <div className="alt-social-links">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><Linkedin size={20} /></a>
                <a href="https://www.behance.net/janhvisuryawa1" target="_blank" rel="noopener noreferrer" aria-label="Behance">
                  <img src="/behance.svg" alt="Behance" style={{ width: '22px', height: '22px' }} />
                </a>
              </div>
            </div>
          </div>

          <div className="alt-connect-right">
            <form className="alt-contact-form" onSubmit={handleSubmit}>
              <div className="alt-form-group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                />
              </div>

              <div className="alt-form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your Email"
                />
              </div>

              <div className="alt-form-group">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Subject"
                />
              </div>

              <div className="alt-form-group">
                <input
                  type="text"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Message"
                />
              </div>

              {status.message && (
                <div className={`alt-form-status ${status.type}`}>
                  {status.message}
                </div>
              )}

              <button type="submit" className="alt-submit-btn" disabled={sending}>
                {sending ? (
                  <Loader2 size={24} className="spin" />
                ) : (
                  <>
                    Send Message
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AltConnect;
