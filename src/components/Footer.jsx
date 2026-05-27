import { Link } from 'react-router-dom';
import { Mountain, MapPin, Mail, Phone } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-mountain">
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,80 L120,30 L240,70 L400,10 L560,60 L720,20 L880,55 L1040,15 L1200,50 L1320,25 L1440,45 L1440,120 L0,120 Z" fill="#1a3d2b"/>
        </svg>
      </div>
      <div className="footer-body">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <img src="/mmslogo.png" alt="MMS" className="footer-logo-img" onError={(e)=>{e.target.style.display='none';e.target.nextSibling.style.display='flex';}} />
                <span className="footer-logo-fallback" style={{display:'none'}}><Mountain size={28}/><span>MMS</span></span>
              </div>
              <p className="footer-tagline">Metropolitan Mountaineering Society</p>
              <p className="footer-desc">Founded in 1994 at the summit of Mt. Makiling. A non-stock, non-profit organization promoting responsible mountaineering and outdoor activities.</p>
              <div className="footer-social">
              <a href="https://www.facebook.com/share/g/1CkqCdAgRg/" target="_blank" rel="noopener noreferrer" className="social-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> Facebook
              </a>
              <a href="https://www.instagram.com/mmssince1994/" target="_blank" rel="noopener noreferrer" className="social-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> Instagram
              </a>
              </div>
            </div>

            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About MMS</Link></li>
                <li><Link to="/bmc">BMC</Link></li>
                <li><Link to="/open-climbs">Open Climbs</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Contact</h4>
              <div className="footer-contact">
                <div className="contact-item"><MapPin size={15}/> Manila, Philippines</div>
                <div className="contact-item"><Mail size={15}/> info@mms1994.org</div>
                <div className="contact-item"><Phone size={15}/> +63 917 000 0000</div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2025 Metropolitan Mountaineering Society. All rights reserved.</p>
            <p className="footer-dev">
              Website Development by: Ruanes, Alexa Jena C. · Cabatbat, John Robert M. · De Leon, Michael John B. · Figueras, Jean-Luc B. · Lagman, Desiree Angeline D.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
