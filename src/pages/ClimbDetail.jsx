import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MapPin, Mountain, Calendar, Users, Droplets, Package, DollarSign, Phone, ChevronLeft, X, Upload, CheckCircle } from 'lucide-react';
import './ClimbDetail.css';

function getDifficultyBadge(d) {
  const map = { 'Easy': 'badge-easy', 'Moderate': 'badge-moderate', 'Difficult': 'badge-difficult', 'Very Difficult': 'badge-very-difficult' };
  return map[d] || 'badge-moderate';
}

export default function ClimbDetail() {
  const { id } = useParams();
  const { climbs, user, joinClimb, joinRequests } = useAuth();
  const navigate = useNavigate();
  const climb = climbs.find(c => c.id === Number(id));

  const [joinOpen, setJoinOpen] = useState(false);
  const [form, setForm] = useState({ contact: '', fbLink: '', paymentScreenshot: '' });
  const [submitted, setSubmitted] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  if (!climb) return (
    <div style={{padding:'120px 24px', textAlign:'center'}}>
      <h2>Climb not found.</h2>
      <Link to="/open-climbs" className="btn btn-primary" style={{marginTop:'16px'}}>Back to Open Climbs</Link>
    </div>
  );

  const images = [climb.thumbnail,
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
  ];

  const alreadyJoined = joinRequests.some(r => r.climbId === climb.id && r.userId === user?.id);

  const handleJoin = (e) => {
    e.preventDefault();
    if (!form.contact || !form.fbLink) return;
    joinClimb(climb.id, form);
    setSubmitted(true);
  };

  const totalJoined = joinRequests.filter(r => r.climbId === climb.id && r.status === 'Approved').length;

  return (
    <div className="climb-detail-page">
      {/* Hero Image Carousel */}
      <div className="detail-hero">
        <img src={images[activeImg]} alt={climb.name} />
        <div className="detail-hero-overlay"/>
        <div className="detail-hero-content fade-up">
          <Link to="/open-climbs" className="back-link"><ChevronLeft size={18}/> Open Climbs</Link>
          <h1>{climb.name}</h1>
          <div className="detail-badges">
            <span className={`badge ${getDifficultyBadge(climb.difficulty)}`}>{climb.difficulty}</span>
            <span className="badge badge-open">{climb.status}</span>
          </div>
        </div>
        <div className="carousel-dots">
          {images.map((_, i) => (
            <button key={i} className={`dot ${activeImg === i ? 'active' : ''}`} onClick={() => setActiveImg(i)}/>
          ))}
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="thumb-strip container">
        {images.map((src, i) => (
          <div key={i} className={`thumb-item ${activeImg === i ? 'active' : ''}`} onClick={() => setActiveImg(i)}>
            <img src={src} alt={`view ${i+1}`}/>
          </div>
        ))}
      </div>

      <div className="container detail-body">
        {/* Quick Info */}
        <div className="quick-info card">
          <div className="quick-item"><MapPin size={18}/><div><strong>Location</strong><span>{climb.location}</span></div></div>
          <div className="quick-item"><Mountain size={18}/><div><strong>Elevation</strong><span>{climb.elevation}</span></div></div>
          <div className="quick-item"><Calendar size={18}/><div><strong>Schedule</strong><span>{climb.schedule}</span></div></div>
          <div className="quick-item"><Users size={18}/><div><strong>Participants</strong><span>{totalJoined} / {climb.limit} joined</span></div></div>
        </div>

        <div className="detail-grid">
          <div className="detail-main">
            {/* Overview */}
            <section className="detail-section">
              <h2><Mountain size={20}/> Mountain Profile</h2>
              <p>{climb.description}</p>
            </section>

            {/* Itinerary */}
            {climb.itinerary?.length > 0 && (
              <section className="detail-section">
                <h2><Calendar size={20}/> Climb Itinerary</h2>
                <div className="itinerary-timeline">
                  {climb.itinerary.map((item, i) => (
                    <div key={i} className="timeline-item">
                      <div className="timeline-marker"><span>{i+1}</span></div>
                      <div className="timeline-content">
                        <div className="tl-day">{item.day}</div>
                        <div className="tl-activity">{item.activity}</div>
                        <div className="tl-details">{item.details}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Water Sources */}
            {climb.waterSources && (
              <section className="detail-section">
                <h2><Droplets size={20}/> Water Source Information</h2>
                <p>{climb.waterSources}</p>
              </section>
            )}

            {/* Map */}
            <section className="detail-section">
              <h2><MapPin size={20}/> Map & Route</h2>
              <div className="map-placeholder">
                <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${climb.location}&zoom=10&size=800x300&key=DEMO`}
                  alt="Route Map" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}/>
                <div className="map-fallback" style={{display:'flex'}}>
                  <MapPin size={40} style={{color:'var(--text-light)'}}/>
                  <p>Interactive route map for {climb.name}</p>
                  <p style={{fontSize:'0.82rem', color:'var(--text-light)'}}>Map view coming soon</p>
                </div>
              </div>
            </section>

            {/* Weather */}
            <section className="detail-section">
              <h2>☁️ Weather Forecast</h2>
              <div className="weather-cards">
                {['Mon','Tue','Wed','Thu','Fri'].map((day, i) => (
                  <div key={i} className="weather-card">
                    <span className="w-day">{day}</span>
                    <span className="w-icon">{['⛅','🌤','🌧','☁️','🌤'][i]}</span>
                    <span className="w-temp">{[22,24,18,20,23][i]}°C</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="detail-sidebar">
            {/* Things to Bring */}
            {climb.thingsToBring?.length > 0 && (
              <div className="card sidebar-card">
                <h3><Package size={18}/> Things to Bring</h3>
                <ul className="bring-list">
                  {climb.thingsToBring.map((item, i) => <li key={i}><CheckCircle size={14}/>{item}</li>)}
                </ul>
              </div>
            )}

            {/* Expenses */}
            {climb.expenses?.length > 0 && (
              <div className="card sidebar-card">
                <h3><DollarSign size={18}/> Estimated Expenses</h3>
                <div className="expense-list">
                  {climb.expenses.map((e, i) => (
                    <div key={i} className="expense-row">
                      <span>{e.item}</span><span className="expense-cost">{e.cost}</span>
                    </div>
                  ))}
                  <div className="expense-row total">
                    <span>Total</span>
                    <span>{climb.expenses.reduce((sum, e) => {
                      const num = parseInt(e.cost.replace(/[₱,]/g,''));
                      return sum + (isNaN(num) ? 0 : num);
                    }, 0).toLocaleString('en-PH', {style:'currency',currency:'PHP',minimumFractionDigits:0})}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Officers */}
            {climb.officers?.length > 0 && (
              <div className="card sidebar-card">
                <h3><Phone size={18}/> Climb Officers & Contacts</h3>
                {climb.officers.map((o, i) => (
                  <div key={i} className="officer-item">
                    <div className="officer-avatar">{o.name.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
                    <div>
                      <strong>{o.name}</strong>
                      <span className="officer-role">{o.role}</span>
                      <span className="officer-contact">{o.contact}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Join Button */}
            <div className="join-cta card sidebar-card">
              {!user ? (
                <>
                  <p>Sign in to join this climb</p>
                  <Link to="/login" className="btn btn-primary" style={{width:'100%',justifyContent:'center'}}>Login to Join</Link>
                  <Link to="/signup" className="btn btn-outline" style={{width:'100%',justifyContent:'center',marginTop:'8px'}}>Create Account</Link>
                </>
              ) : alreadyJoined ? (
                <div className="joined-msg">
                  <CheckCircle size={28} style={{color:'var(--green-mid)'}}/>
                  <p>You've already joined this climb! Check your status in <Link to="/my-climbs">My Climbs</Link>.</p>
                </div>
              ) : (
                <>
                  <p>Ready to conquer {climb.name}?</p>
                  <button className="btn btn-primary" style={{width:'100%',justifyContent:'center'}} onClick={() => setJoinOpen(true)}>
                    Join This Climb
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Join Modal */}
      {joinOpen && (
        <div className="modal-overlay" onClick={() => { setJoinOpen(false); setSubmitted(false); }}>
          <div className="modal-content join-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => { setJoinOpen(false); setSubmitted(false); }}><X size={20}/></button>
            {submitted ? (
              <div className="join-success">
                <CheckCircle size={56} style={{color:'var(--green-mid)'}}/>
                <h3>Registration Submitted!</h3>
                <p>Your request to join <strong>{climb.name}</strong> has been submitted. The climb officer will review your payment and approve your registration.</p>
                <p>Check your status in <Link to="/my-climbs" onClick={() => setJoinOpen(false)}>My Climbs</Link>.</p>
              </div>
            ) : (
              <>
                <h2>Join {climb.name}</h2>
                <p style={{color:'var(--text-light)',marginBottom:'24px',fontSize:'0.9rem'}}>{climb.schedule} · {climb.location}</p>
                <form onSubmit={handleJoin}>
                  <div className="form-group">
                    <label>Mobile Number *</label>
                    <input type="tel" placeholder="e.g. 09171234567" required value={form.contact} onChange={e => setForm({...form, contact: e.target.value})}/>
                  </div>
                  <div className="form-group">
                    <label>Facebook Profile Link *</label>
                    <input type="url" placeholder="https://facebook.com/yourprofile" required value={form.fbLink} onChange={e => setForm({...form, fbLink: e.target.value})}/>
                  </div>
                  <div className="form-group">
                    <label>Pay via GCash</label>
                    <div className="gcash-info">
                      <div className="gcash-placeholder">
                        <img src="/gcash-qr.png" alt="GCash QR" onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }}/>
                        <div style={{display:'block', padding:'20px', background:'var(--beige)', borderRadius:'8px', textAlign:'center'}}>
                          <p style={{fontWeight:'600', color:'var(--green-dark)'}}>GCash Payment</p>
                          <p style={{fontSize:'0.85rem', color:'var(--text-light)'}}>Upload the QR code image to this section via Admin</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Upload Payment Screenshot (URL or filename)</label>
                    <div className="upload-area">
                      <Upload size={24} style={{color:'var(--text-light)'}}/>
                      <input type="text" placeholder="Paste image URL or filename" value={form.paymentScreenshot} onChange={e => setForm({...form, paymentScreenshot: e.target.value})}/>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{width:'100%',justifyContent:'center',marginTop:'8px'}}>Submit Registration</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
