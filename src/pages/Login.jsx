import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mountain, Eye, EyeOff, User, Lock, AlertCircle } from 'lucide-react';
import './Auth.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', password: '', remember: false });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const result = login(form.fullName, form.password);
    setLoading(false);
    if (result.success) {
      if (result.role === 'admin') navigate('/admin');
      else navigate('/');
    } else {
      setError('Invalid full name or password. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80" alt="Mountain"/>
        <div className="auth-overlay"/>
      </div>
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-logo">
            <img src="/mmslogo.png" alt="MMS" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}/>
            <div className="auth-logo-fallback" style={{display:'none'}}><Mountain size={32}/><span>MMS</span></div>
          </div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your MMS account</p>

          {error && (
            <div className="auth-error">
              <AlertCircle size={16}/> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-icon">
                <User size={16}/>
                <input type="text" placeholder="Enter your full name" required value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})}/>
              </div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="input-icon pass-input">
                <Lock size={16}/>
                <input type={showPass ? 'text' : 'password'} placeholder="Enter your password" required value={form.password} onChange={e => setForm({...form, password: e.target.value})}/>
                <button type="button" className="toggle-pass" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </div>
            <div className="auth-row">
              <label className="remember-label">
                <input type="checkbox" checked={form.remember} onChange={e => setForm({...form, remember: e.target.checked})}/>
                <span>Remember me</span>
              </label>
            </div>
            <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
              {loading ? <span className="btn-loading"/> : 'Sign In'}
            </button>
          </form>

          <p className="auth-switch">Don't have an account? <Link to="/signup">Sign Up</Link></p>

          <div className="demo-accounts">
            <p>Demo Accounts:</p>
            <div className="demo-list">
              <div className="demo-item" onClick={() => setForm({...form, fullName:'Admin', password:'Admin123'})}>
                <span className="demo-role admin">Admin</span>
                <span>Admin / Admin123</span>
              </div>
              <div className="demo-item" onClick={() => setForm({...form, fullName:'Desiree Lagman', password:'User123'})}>
                <span className="demo-role hiker">Hiker</span>
                <span>Desiree Lagman / User123</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
