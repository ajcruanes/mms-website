import { Mountain, Target, Eye, BookOpen, Shield } from 'lucide-react';
import './About.css';

const OBJECTIVES = [
  'Educate people by conducting trainings, seminars, forums, and conferences related to outdoor activities.',
  'Undertake social, civic, and environmental projects.',
  'Advocate and be a role model of values and wilderness ethics.',
  'Foster friendship and camaraderie.',
  'Establish national and global presence through networking and coordination with other organizations.',
  'Generate funds and resources and acquire and sell properties.',
];

const FOUNDERS = [
  'Dennis Sacro', 'Ed Ocampo', 'Long Henson', 'Anne Sacro',
  'Jeric Yaya', 'Joey Avila', 'Richard Kahulugan', 'Boying Amio'
];

const CREED = [
  'We the members of the Metropolitan Mountaineering Society protect and preserve nature. We share in that responsibility by engaging and promoting outdoor related activities by actively practicing an environment friendly lifestyle.',
  'We the members of the Metropolitan Mountaineering Society abide by and uphold the MMS Constitution. We respect and follow our leaders, our culture and our traditions. We commit ourselves to the organization. We support its projects and activities.',
  'We the members of the Metropolitan Mountaineering Society value camaraderie. We respect each other and we complement our differences. We will always be responsible for each other at all times.',
  'We the members of the Metropolitan Mountaineering Society believe that we have a responsibility to ourselves. We practice and cultivate a healthy physical, mental and spiritual way of life. We continuously enrich ourselves with the skills related to our sports and the environment.',
];

export default function About() {
  return (
    <div className="about-page">
      {/* Hero */}
      <div className="page-hero" style={{backgroundImage:'url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1400&q=80)'}}>
        <div className="page-hero-overlay"/>
        <div className="page-hero-content fade-up">
          <div className="section-label light">Our Story</div>
          <h1>About MMS</h1>
          <p>Founded 1994 · Mt. Makiling, Laguna</p>
        </div>
      </div>

      <div className="container" style={{padding:'80px 24px'}}>

        {/* About Us */}
        <div className="about-block fade-up">
          <div className="about-icon-wrap"><Mountain size={28}/></div>
          <div>
            <h2 className="block-title">About Us</h2>
            <p>The Metropolitan Mountaineering Society, also known as <strong>MMS</strong> or <em>MetropolitanMS</em>, is a Manila (Philippine) based outdoor organization officially registered at the Philippine Securities and Exchange Commission (SEC) as a non-stock, non-profit organization. Though the organization started out in Metro Manila where majority of the members come from; currently there are already members outside of the city and even the country. Wherever there are significant numbers of members located in a physical geography, an informal chapter arises like the MMS-US chapter to celebrate the long lasting bond that ties each member.</p>
            <p style={{marginTop:'16px'}}>The organization was founded on <strong>March of 1994</strong> at the summit of <strong>Mt. Makiling in Laguna</strong>. It was founded by what now is considered the eight founding members.</p>
            <div className="founders-grid">
              {FOUNDERS.map((f, i) => (
                <div key={i} className="founder-chip">
                  <div className="founder-avatar">{f.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mvg-grid">
          {/* Mission */}
          <div className="mvg-card">
            <div className="mvg-icon"><Target size={24}/></div>
            <h3>Mission</h3>
            <p>We commit to develop ourselves in protecting the environment by promoting responsible mountaineering and other outdoor related activities.</p>
          </div>
          {/* Vision */}
          <div className="mvg-card">
            <div className="mvg-icon"><Eye size={24}/></div>
            <h3>Vision</h3>
            <p className="vision-quote">"Shaping people for nature."</p>
          </div>
          {/* Objectives */}
          <div className="mvg-card objectives-card">
            <div className="mvg-icon"><BookOpen size={24}/></div>
            <h3>Objectives</h3>
            <ul>
              {OBJECTIVES.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Creed */}
        <div className="creed-section">
          <div className="creed-header">
            <Shield size={32}/>
            <h2>MMS Creed</h2>
          </div>
          <div className="creed-body">
            {CREED.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p className="creed-closing">"Once an MMS! Forever an MMS!"</p>
          </div>
        </div>

        {/* Gallery */}
        <div className="about-gallery-section">
          <h2 style={{textAlign:'center', color:'var(--green-dark)', marginBottom:'32px'}}>Our Community</h2>
          <div className="about-gallery">
            {[
              'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&q=80',
              'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&q=80',
              'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80',
              'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&q=80',
              'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=500&q=80',
              'https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&q=80',
            ].map((src, i) => (
              <div key={i} className="gallery-item card">
                <img src={src} alt={`MMS Gallery ${i+1}`} loading="lazy"/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
