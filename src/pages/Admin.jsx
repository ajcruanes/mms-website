import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, Users, LogOut, Plus, Mountain, Eye, Trash2,
  X, Search, ChevronDown, Check, XCircle, Edit2, Archive, BarChart2
} from 'lucide-react';
import './Admin.css';

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'participants', label: 'Participants', icon: Users },
];

const FIELD_DEFAULTS = { name:'', category:'Minor', elevation:'', location:'', schedule:'', limit:'', description:'', thumbnail:'' };

export default function Admin() {
  const { user, logout, climbs, addClimb, updateClimb, deleteClimb, joinRequests, updateRequest } = useAuth();
  const navigate = useNavigate();

  const [active, setActive] = useState('dashboard');
  const [createOpen, setCreateOpen] = useState(false);
  const [viewClimbId, setViewClimbId] = useState(null);
  const [form, setForm] = useState(FIELD_DEFAULTS);
  const [pFilter, setPFilter] = useState('All');
  const [pSearch, setPSearch] = useState('');
  const [climbSearch, setClimbSearch] = useState('');

  if (!user || user.role !== 'admin') { navigate('/login'); return null; }

  const handleLogout = () => { logout(); navigate('/'); };

  const handleCreate = (e) => {
    e.preventDefault();
    addClimb({ ...form, limit: Number(form.limit) });
    setForm(FIELD_DEFAULTS);
    setCreateOpen(false);
  };

  const totalPaid = joinRequests.filter(r => r.status === 'Approved').length;
  const totalPending = joinRequests.filter(r => r.status === 'Pending').length;
  const upcomingCount = climbs.filter(c => c.status === 'Open').length;

  const filteredParticipants = joinRequests.filter(r => {
    const matchFilter = pFilter === 'All' || r.status === pFilter;
    const matchSearch = r.userName.toLowerCase().includes(pSearch.toLowerCase()) ||
      r.userEmail.toLowerCase().includes(pSearch.toLowerCase()) ||
      r.contact.toLowerCase().includes(pSearch.toLowerCase());
    return matchFilter && matchSearch;
  });

  const viewClimb = climbs.find(c => c.id === viewClimbId);
  const viewParticipants = viewClimbId ? joinRequests.filter(r => r.climbId === viewClimbId) : [];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          <img src="/mmslogo.png" alt="MMS" onError={e=>{e.target.style.display='none';e.target.nextSibling.style.display='flex';}}/>
          <div className="sidebar-logo-fallback" style={{display:'none'}}><Mountain size={22}/><span>MMS</span></div>
          <span className="sidebar-title">Admin Panel</span>
        </div>
        <nav className="sidebar-nav">
          {NAV.map(n => (
            <button key={n.id} className={`sidebar-btn ${active === n.id ? 'active' : ''}`} onClick={() => { setActive(n.id); setViewClimbId(null); }}>
              <n.icon size={18}/> {n.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <Link to="/" className="sidebar-btn" target="_blank"><Mountain size={18}/> View Site</Link>
          <button className="sidebar-btn logout" onClick={handleLogout}><LogOut size={18}/> Logout</button>
        </div>
      </aside>

      {/* Main */}
      <main className="admin-main">
        {/* Dashboard */}
        {active === 'dashboard' && !viewClimbId && (
          <div className="admin-content">
            <div className="admin-header">
              <div>
                <h1>Dashboard</h1>
                <p>Welcome back, {user.name}! Here's an overview of MMS activities.</p>
              </div>
              <button className="btn btn-primary" onClick={() => setCreateOpen(true)}>
                <Plus size={16}/> Create New Climb
              </button>
            </div>

            {/* Analytics Cards */}
            <div className="analytics-grid">
              <div className="analytics-card">
                <div className="ac-icon"><Users size={22}/></div>
                <div className="ac-info">
                  <span className="ac-num">{joinRequests.length}</span>
                  <span className="ac-label">Total Participants</span>
                </div>
              </div>
              <div className="analytics-card">
                <div className="ac-icon green"><Mountain size={22}/></div>
                <div className="ac-info">
                  <span className="ac-num">{upcomingCount}</span>
                  <span className="ac-label">Upcoming Climbs</span>
                </div>
              </div>
              <div className="analytics-card">
                <div className="ac-icon sky"><Check size={22}/></div>
                <div className="ac-info">
                  <span className="ac-num">{totalPaid}</span>
                  <span className="ac-label">Paid Participants</span>
                </div>
              </div>
              <div className="analytics-card">
                <div className="ac-icon yellow"><BarChart2 size={22}/></div>
                <div className="ac-info">
                  <span className="ac-num">{totalPending}</span>
                  <span className="ac-label">Pending Participants</span>
                </div>
              </div>
            </div>

            {/* Climbs Table */}
            <div className="admin-section">
              <div className="section-top">
                <h2>Open Climbs Management</h2>
                <div className="search-bar" style={{maxWidth:'260px'}}>
                  <Search size={16}/>
                  <input placeholder="Search climbs..." value={climbSearch} onChange={e=>setClimbSearch(e.target.value)}/>
                </div>
              </div>
              <div className="table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Mountain</th>
                      <th>Schedule</th>
                      <th>Participants</th>
                      <th>Limit</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {climbs.filter(c => c.name.toLowerCase().includes(climbSearch.toLowerCase())).map(c => {
                      const count = joinRequests.filter(r => r.climbId === c.id && r.status === 'Approved').length;
                      return (
                        <tr key={c.id}>
                          <td className="td-name">
                            <img src={c.thumbnail} alt={c.name} className="table-thumb"/>
                            <div>
                              <strong>{c.name}</strong>
                              <span>{c.location}</span>
                            </div>
                          </td>
                          <td>{c.schedule}</td>
                          <td>{count}</td>
                          <td>{c.limit}</td>
                          <td><span className={`badge badge-open`}>{c.status}</span></td>
                          <td>
                            <div className="td-actions">
                              <button className="action-btn view" onClick={() => setViewClimbId(c.id)} title="View Participants"><Eye size={15}/></button>
                              <button className="action-btn danger" onClick={() => { if(window.confirm('Delete this climb?')) deleteClimb(c.id); }} title="Delete"><Trash2 size={15}/></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* View Climb Participants */}
        {active === 'dashboard' && viewClimbId && viewClimb && (
          <div className="admin-content">
            <div className="admin-header">
              <div>
                <button className="back-link-btn" onClick={() => setViewClimbId(null)}>← Back to Dashboard</button>
                <h1>{viewClimb.name}</h1>
                <p>{viewClimb.schedule} · {viewClimb.location}</p>
              </div>
            </div>
            <div className="admin-section">
              <h2>Participants ({viewParticipants.length})</h2>
              {viewParticipants.length === 0 ? (
                <div className="empty-admin">No participants have joined this climb yet.</div>
              ) : (
                <div className="table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr><th>Name</th><th>Contact</th><th>Email</th><th>FB Link</th><th>Registered</th><th>Payment</th><th>Status</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      {viewParticipants.map(r => (
                        <tr key={r.id}>
                          <td><strong>{r.userName}</strong></td>
                          <td>{r.contact}</td>
                          <td>{r.userEmail || '—'}</td>
                          <td>{r.fbLink ? <a href={r.fbLink} target="_blank" rel="noopener noreferrer" style={{color:'var(--sky)',fontSize:'0.82rem'}}>View FB</a> : '—'}</td>
                          <td>{r.registrationDate}</td>
                          <td>{r.paymentScreenshot ? <a href={r.paymentScreenshot} target="_blank" rel="noopener noreferrer" style={{color:'var(--green-forest)',fontSize:'0.82rem'}}>View</a> : '—'}</td>
                          <td><span className={`badge badge-${r.status.toLowerCase()}`}>{r.status}</span></td>
                          <td>
                            <div className="td-actions">
                              {r.status !== 'Approved' && <button className="action-btn approve" onClick={() => updateRequest(r.id, 'Approved')} title="Approve"><Check size={15}/></button>}
                              {r.status !== 'Rejected' && <button className="action-btn danger" onClick={() => updateRequest(r.id, 'Rejected')} title="Reject"><XCircle size={15}/></button>}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Participants Page */}
        {active === 'participants' && (
          <div className="admin-content">
            <div className="admin-header">
              <div>
                <h1>Participants</h1>
                <p>Manage all climb registrations and payment status.</p>
              </div>
            </div>
            <div className="admin-section">
              <div className="section-top">
                <div className="filter-tabs">
                  {['All', 'Pending', 'Approved', 'Rejected'].map(f => (
                    <button key={f} className={`filter-tab ${pFilter === f ? 'active' : ''}`} onClick={() => setPFilter(f)}>{f}</button>
                  ))}
                </div>
                <div className="search-bar" style={{maxWidth:'260px'}}>
                  <Search size={16}/>
                  <input placeholder="Search participants..." value={pSearch} onChange={e=>setPSearch(e.target.value)}/>
                </div>
              </div>
              {filteredParticipants.length === 0 ? (
                <div className="empty-admin">No participants found.</div>
              ) : (
                <div className="table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr><th>Name</th><th>Climb</th><th>Contact</th><th>Email</th><th>Registered</th><th>Payment</th><th>Status</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      {filteredParticipants.map(r => {
                        const climb = climbs.find(c => c.id === r.climbId);
                        return (
                          <tr key={r.id}>
                            <td><strong>{r.userName}</strong></td>
                            <td>{climb?.name || '—'}</td>
                            <td>{r.contact}</td>
                            <td>{r.userEmail || '—'}</td>
                            <td>{r.registrationDate}</td>
                            <td>{r.paymentScreenshot ? <a href={r.paymentScreenshot} target="_blank" rel="noopener noreferrer" style={{color:'var(--green-forest)',fontSize:'0.82rem'}}>View Screenshot</a> : 'None'}</td>
                            <td><span className={`badge badge-${r.status.toLowerCase()}`}>{r.status}</span></td>
                            <td>
                              <div className="td-actions">
                                {r.status !== 'Approved' && <button className="action-btn approve" onClick={() => updateRequest(r.id, 'Approved')}><Check size={15}/></button>}
                                {r.status !== 'Rejected' && <button className="action-btn danger" onClick={() => updateRequest(r.id, 'Rejected')}><XCircle size={15}/></button>}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Create Climb Modal */}
      {createOpen && (
        <div className="modal-overlay" onClick={() => setCreateOpen(false)}>
          <div className="modal-content create-modal" onClick={e => e.stopPropagation()}>
            <div className="create-modal-header">
              <h2>Create New Climb</h2>
              <button className="modal-close-btn" onClick={() => setCreateOpen(false)}><X size={20}/></button>
            </div>
            <form onSubmit={handleCreate} className="create-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Mountain Name *</label>
                  <input required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="e.g. Mt. Arayat"/>
                </div>
                <div className="form-group">
                  <label>Category *</label>
                  <select value={form.category} onChange={e=>setForm({...form, category:e.target.value})}>
                    <option>Minor</option><option>Major</option><option>Special</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Elevation</label>
                  <input value={form.elevation} onChange={e=>setForm({...form, elevation:e.target.value})} placeholder="e.g. 1,026 MASL"/>
                </div>
                <div className="form-group">
                  <label>Location *</label>
                  <input required value={form.location} onChange={e=>setForm({...form, location:e.target.value})} placeholder="Province, Region"/>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Schedule *</label>
                  <input required value={form.schedule} onChange={e=>setForm({...form, schedule:e.target.value})} placeholder="e.g. March 15–17, 2027"/>
                </div>
                <div className="form-group">
                  <label>Participant Limit *</label>
                  <input type="number" required value={form.limit} onChange={e=>setForm({...form, limit:e.target.value})} placeholder="e.g. 30"/>
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea value={form.description} onChange={e=>setForm({...form, description:e.target.value})} placeholder="Brief description of the climb..."/>
              </div>
              <div className="form-group">
                <label>Thumbnail Image URL</label>
                <input value={form.thumbnail} onChange={e=>setForm({...form, thumbnail:e.target.value})} placeholder="https://..."/>
              </div>
              <div className="create-form-actions">
                <button type="button" className="btn btn-outline" onClick={() => setCreateOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Climb</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
