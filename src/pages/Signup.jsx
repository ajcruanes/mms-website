import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mountain, Eye, EyeOff, User, Lock, Mail, Phone } from 'lucide-react';
import './Auth.css';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', contact: '', password: '', confirmPassword: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    signup(form.name, form.email, form.password, form.contact);
    setLoading(false);
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80" alt="Mountain"/>
        <div className="auth-overlay"/>
      </div>
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-logo">
            <img src="/mmslogo.png" alt="MMS" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}/>
            <div className="auth-logo-fallback" style={{display:'none'}}><Mountain size={32}/><span>MMS</span></div>
          </div>
          <h1 className="auth-title">Join MMS</h1>
          <p className="auth-subtitle">Create your mountaineer account</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-icon">
                <User size={16}/>
                <input type="text" placeholder="Your full name" required value={form.name} onChange={e => setForm({...form, name: e.target.value})}/>
              </div>
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-icon">
                <Mail size={16}/>
                <input type="email" placeholder="your@email.com" required value={form.email} onChange={e => setForm({...form, email: e.target.value})}/>
              </div>
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <div className="input-icon">
                <Phone size={16}/>
                <input type="tel" placeholder="09XXXXXXXXX" required value={form.contact} onChange={e => setForm({...form, contact: e.target.value})}/>
              </div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="input-icon pass-input">
                <Lock size={16}/>
                <input type={showPass ? 'text' : 'password'} placeholder="Create a password" required value={form.password} onChange={e => setForm({...form, password: e.target.value})}/>
                <button type="button" className="toggle-pass" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <div className="input-icon">
                <Lock size={16}/>
                <input type="password" placeholder="Repeat your password" required value={form.confirmPassword} onChange={e => setForm({...form, confirmPassword: e.target.value})}/>
              </div>
            </div>
            <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
              {loading ? <span className="btn-loading"/> : 'Create Account'}
            </button>
          </form>
          <p className="auth-switch">Already have an account? <Link to="/login">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
}
