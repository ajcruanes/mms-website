import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mountain, Calendar, MapPin, CheckCircle, Clock, XCircle, ChevronRight } from 'lucide-react';
import './MyClimbs.css';

function StatusIcon({ status }) {
  if (status === 'Approved') return <CheckCircle size={16} style={{color:'var(--green-mid)'}}/>;
  if (status === 'Rejected') return <XCircle size={16} style={{color:'#c0392b'}}/>;
  return <Clock size={16} style={{color:'#856404'}}/>;
}

export default function MyClimbs() {
  const { user, getUserRequests, climbs } = useAuth();
  const navigate = useNavigate();

  if (!user) { navigate('/login'); return null; }

  const requests = getUserRequests();
  const enriched = requests.map(r => ({
    ...r,
    climb: climbs.find(c => c.id === r.climbId),
  })).filter(r => r.climb);

  const upcoming = enriched.filter(r => r.status !== 'Rejected');
  const history = enriched.filter(r => r.status === 'Approved');
  const pending = enriched.filter(r => r.status === 'Pending');

  return (
    <div className="my-climbs-page">
      <div className="page-hero" style={{backgroundImage:'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80)', height:'280px'}}>
        <div className="page-hero-overlay"/>
        <div className="page-hero-content fade-up">
          <div className="section-label light">Your Dashboard</div>
          <h1>My Climbs</h1>
          <p>Welcome back, {user.name}!</p>
        </div>
      </div>

      <div className="container" style={{padding:'48px 24px'}}>
        {/* Stats */}
        <div className="my-stats">
          <div className="my-stat-card">
            <div className="my-stat-num">{enriched.length}</div>
            <div className="my-stat-label">Total Registrations</div>
          </div>
          <div className="my-stat-card">
            <div className="my-stat-num" style={{color:'var(--green-mid)'}}>{history.length}</div>
            <div className="my-stat-label">Approved</div>
          </div>
          <div className="my-stat-card">
            <div className="my-stat-num" style={{color:'#856404'}}>{pending.length}</div>
            <div className="my-stat-label">Pending</div>
          </div>
          <div className="my-stat-card">
            <div className="my-stat-num" style={{color:'#c0392b'}}>{enriched.filter(r=>r.status==='Rejected').length}</div>
            <div className="my-stat-label">Rejected</div>
          </div>
        </div>

        {enriched.length === 0 ? (
          <div className="empty-state">
            <Mountain size={56} style={{color:'var(--text-light)'}}/>
            <h3>No Climbs Yet</h3>
            <p>You haven't joined any climbs yet. Browse our open climbs and start your adventure!</p>
            <Link to="/open-climbs" className="btn btn-primary">Browse Open Climbs</Link>
          </div>
        ) : (
          <>
            <h2 className="my-section-title">All Registrations</h2>
            <div className="my-climbs-list">
              {enriched.map((r, i) => (
                <div key={i} className="my-climb-card card">
                  <div className="my-climb-img">
                    <img src={r.climb.thumbnail} alt={r.climb.name} loading="lazy"/>
                  </div>
                  <div className="my-climb-body">
                    <div className="my-climb-top">
                      <h3>{r.climb.name}</h3>
                      <div className={`badge ${r.status === 'Approved' ? 'badge-approved' : r.status === 'Rejected' ? 'badge-rejected' : 'badge-pending'}`}>
                        <StatusIcon status={r.status}/> {r.status}
                      </div>
                    </div>
                    <div className="my-climb-meta">
                      <span><MapPin size={13}/> {r.climb.location}</span>
                      <span><Calendar size={13}/> {r.climb.schedule}</span>
                      <span><Mountain size={13}/> {r.climb.elevation}</span>
                    </div>
                    <div className="my-climb-details">
                      <div className="detail-chip"><strong>Registered:</strong> {r.registrationDate}</div>
                      <div className="detail-chip"><strong>Contact:</strong> {r.contact}</div>
                      <div className="detail-chip">
                        <strong>Payment:</strong>
                        <span className={`payment-status ${r.status === 'Approved' ? 'paid' : 'pending'}`}>
                          {r.status === 'Approved' ? 'Verified' : 'Under Review'}
                        </span>
                      </div>
                    </div>
                    {r.status === 'Rejected' && (
                      <div className="rejected-note">
                        Your registration was rejected. Please contact the climb officer for more information.
                      </div>
                    )}
                  </div>
                  <Link to={`/climb/${r.climb.id}`} className="my-climb-arrow">
                    <ChevronRight size={20}/>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Browse More */}
        <div className="browse-more">
          <h3>Looking for more adventures?</h3>
          <Link to="/open-climbs" className="btn btn-outline">Browse Open Climbs <ChevronRight size={16}/></Link>
        </div>
      </div>
    </div>
  );
}
