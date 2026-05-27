import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, User, ChevronDown, LogOut, Mountain } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropdownOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const handleLogout = () => { logout(); navigate('/'); setDropdownOpen(false); };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img src="/mmslogo.png" alt="MMS Logo" className="logo-img" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
          <span className="logo-fallback" style={{display:'none'}}>
            <Mountain size={28} />
            <span>MMS</span>
          </span>
        </Link>

        <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
          <Link to="/about" className={`nav-link ${isActive('/about')}`}>About MMS</Link>
          <Link to="/bmc" className={`nav-link ${isActive('/bmc')}`}>BMC</Link>
          <Link to="/open-climbs" className={`nav-link ${isActive('/open-climbs')}`}>Open Climbs</Link>
          {user && user.role === 'hiker' && (
            <Link to="/my-climbs" className={`nav-link ${isActive('/my-climbs')}`}>My Climbs</Link>
          )}
          {!user && (
            <div className="nav-auth-mobile">
              <Link to="/login" className="btn btn-outline" style={{padding:'8px 20px'}}>Login</Link>
              <Link to="/signup" className="btn btn-primary" style={{padding:'8px 20px'}}>Sign Up</Link>
            </div>
          )}
        </div>

        <div className="nav-right">
          {user ? (
            <div className="user-dropdown" ref={dropRef}>
              <button className="user-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <div className="user-avatar"><User size={16} /></div>
                <span className="user-name">{user.name}</span>
                <ChevronDown size={14} />
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  {user.role === 'admin' && (
                    <Link to="/admin" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                      <Mountain size={15} /> Dashboard
                    </Link>
                  )}
                  {user.role === 'hiker' && (
                    <Link to="/my-climbs" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                      <Mountain size={15} /> My Climbs
                    </Link>
                  )}
                  <button className="dropdown-item danger" onClick={handleLogout}>
                    <LogOut size={15} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="nav-auth">
              <Link to="/login" className="btn btn-outline" style={{padding:'9px 22px',fontSize:'0.88rem'}}>Login</Link>
              <Link to="/signup" className="btn btn-primary" style={{padding:'9px 22px',fontSize:'0.88rem'}}>Sign Up</Link>
            </div>
          )}
          <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
