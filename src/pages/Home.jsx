import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ChevronRight, MapPin, Mountain, ArrowRight, Star, Calendar } from 'lucide-react';
import { getCategoryBadge, getStatusBadge } from '../utils/climbBadges';
import './Home.css';

const GALLERY = [
  'IMG_2384.jpg',
  'img1.jpg',
  'img2.jpg',
  'img3.jpg',
  'img4.jpg',
  'img5.jpg',
];

export default function Home() {
  const { climbs } = useAuth();
  const revealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });
    revealRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addReveal = (el) => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el); };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <img src='IMG_2384.jpg' alt="Mountain" />
          <div className="hero-overlay" />
        </div>
        <div className="hero-mountain-silhouette">
          <svg viewBox="0 0 1440 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,180 L180,80 L300,130 L480,40 L640,100 L800,30 L960,90 L1100,50 L1260,110 L1440,70 L1440,200 L0,200 Z" fill="rgba(0,0,0,0.3)"/>
          </svg>
        </div>
        <div className="hero-content fade-up">
          <div className="hero-badge"><Mountain size={14} /> Est. 1994</div>
          <h1>Metropolitan<br/>Mountaineering<br/>Society</h1>
          <p className="hero-subtitle">The Extraordinary Journey in Pursuit of Passion for Peaks<br/><span>1994 – 2025</span></p>
          <div className="hero-cta">
            <Link to="/open-climbs" className="btn btn-primary hero-btn">
              Join Open Climbs <ChevronRight size={18}/>
            </Link>
            <Link to="/about" className="btn hero-btn-outline">
              Learn More <ChevronRight size={18}/>
            </Link>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-indicator" />
        </div>
      </section>

      {/* About Section */}
      <section className="section about-section">
        <div className="container">
          <div className="about-grid reveal" ref={addReveal}>
            <div className="about-images">
              <div className="img-grid">
                {GALLERY.slice(0, 4).map((src, i) => (
                  <div key={i} className="img-item" style={{animationDelay: `${i*0.1}s`}}>
                    <img src={src} alt={`MMS ${i+1}`} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
            <div className="about-text about-card">
              <div className="section-label">Who We Are</div>
              <h2 className="section-title">About MMS</h2>
              <p>The Metropolitan Mountaineering Society (MMS) is a Manila-based outdoor organization officially registered at the Philippine Securities and Exchange Commission as a non-stock, non-profit organization.</p>
              <p style={{marginTop:'12px'}}>Founded in March 1994 at the summit of Mt. Makiling, MMS has grown into a vibrant community of passionate mountaineers, hikers, and outdoor enthusiasts committed to responsible and sustainable adventure.</p>
              <div className="about-stats">
                <div className="stat-item"><span className="stat-num">31+</span><span className="stat-label">Years Strong</span></div>
                <div className="stat-item"><span className="stat-num">8</span><span className="stat-label">Founders</span></div>
                <div className="stat-item"><span className="stat-num">100+</span><span className="stat-label">Members</span></div>
              </div>
              <Link to="/about" className="btn btn-primary" style={{marginTop:'8px'}}>Read More <ArrowRight size={16}/></Link>
            </div>
          </div>
        </div>
      </section>

      {/* BMC Section */}
      <section className="section bmc-section">
        <div className="bmc-bg">
          <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=1400&q=80" alt="BMC Training" />
          <div className="bmc-overlay" />
        </div>
        <div className="container">
          <div className="bmc-grid reveal" ref={addReveal}>
            <div className="bmc-card-wrap">
              <div className="bmc-video-card card">
                <div className="bmc-video-embed">
                  <iframe
                    src="https://www.youtube.com/embed/rc-jGWKuCk4?si=7xheq71gbWR1OQH3"
                    title="BMC Highlights (Sample)"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p className="bmc-video-caption">BMC Highlights (Sample)</p>
              </div>
              <div className="card bmc-event-card">
                <div className="bmc-event-header">
                  <Calendar size={18} /> <span>Upcoming BMC</span>
                </div>
                <h3>BMC 2027 </h3>
                <div className="bmc-event-details">
                  <div><MapPin size={14}/> Various Training Sites</div>
                  <div><Calendar size={14}/> Jan – Dec 2026</div>
                </div>
                <p style={{fontSize:'0.88rem', color:'var(--text-light)', margin:'12px 0'}}> NOT Open for registration.</p>
                <Link to="/bmc" className="btn btn-primary" style={{width:'100%', justifyContent:'center'}}>View Details</Link>
              </div>
            </div>
            <div className="bmc-text">
              <div className="bmc-text-card">
                <div className="section-label light">Training Program</div>
                <h2 className="section-title" style={{color:'white'}}>Basic Mountaineering Course</h2>
                <p style={{color:'rgba(255,255,255,0.8)', marginBottom:'18px'}}>
                  A beginner-friendly course that teaches responsible mountaineering skills through hands-on training and a culminating climb.
                </p>
                <div className="bmc-features">
                  {['Navigation & Safety', 'Leave No Trace', 'First Aid', 'Camp Skills'].map((f, i) => (
                    <div key={i} className="bmc-feature"><Star size={14}/> {f}</div>
                  ))}
                </div>
                <div className="bmc-actions">
                  <Link to="/bmc" className="btn btn-primary" style={{marginTop:'22px'}}>View BMC Schedule <ChevronRight size={16}/></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Climbs Section */}
      <section className="section climbs-section">
        <div className="container">
          <div className="section-header reveal" ref={addReveal}>
            <div className="section-label">Adventure Awaits</div>
            <h2 className="section-title">Open Climbs</h2>
            <p className="section-subtitle">Join our upcoming mountaineering expeditions across the Philippines</p>
          </div>
          <div className="climbs-grid reveal" ref={addReveal}>
            {[...climbs]
              .sort((a, b) => (a.sortDate || '').localeCompare(b.sortDate || ''))
              .slice(0, 4)
              .map((climb, i) => (
              <Link to={`/climb/${climb.id}`} key={climb.id} className="climb-card card" style={{animationDelay:`${i*0.1}s`}}>
                <div className="climb-img">
                  <img src={climb.thumbnail} alt={climb.name} loading="lazy" />
                  <div className="climb-overlay">
                    <span className={`badge ${getCategoryBadge(climb.category)}`}>{climb.category}</span>
                  </div>
                </div>
                <div className="climb-info">
                  <h3>{climb.name}</h3>
                  <div className="climb-meta">
                    <span><MapPin size={13}/> {climb.location}</span>
                    <span><Mountain size={13}/> {climb.elevation}</span>
                  </div>
                  <div className="climb-footer">
                    <span className={`badge ${getStatusBadge(climb.status)}`}>{climb.status}</span>
                    <span className="climb-link">View Details <ChevronRight size={14}/></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{textAlign:'center', marginTop:'40px'}}>
            <Link to="/open-climbs" className="btn btn-outline">See All Climbs <ArrowRight size={16}/></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
