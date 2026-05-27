import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MapPin, Mountain, ChevronRight, Search, Filter } from 'lucide-react';
import './OpenClimbs.css';

function getDifficultyBadge(d) {
  const map = { 'Easy': 'badge-easy', 'Moderate': 'badge-moderate', 'Difficult': 'badge-difficult', 'Very Difficult': 'badge-very-difficult' };
  return map[d] || 'badge-moderate';
}

export default function OpenClimbs() {
  const { climbs } = useAuth();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const difficulties = ['All', 'Easy', 'Moderate', 'Difficult', 'Very Difficult'];
  const filtered = climbs.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.location.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || c.difficulty === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="open-climbs-page">
      <div className="page-hero" style={{backgroundImage:'url(https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1400&q=80)'}}>
        <div className="page-hero-overlay"/>
        <div className="page-hero-content fade-up">
          <div className="section-label light">Join the Adventure</div>
          <h1>Open Climbs</h1>
          <p>Discover upcoming mountaineering expeditions across the Philippines</p>
        </div>
      </div>

      <div className="container" style={{padding:'60px 24px'}}>
        {/* Search & Filter */}
        <div className="climbs-filters">
          <div className="search-bar">
            <Search size={18}/>
            <input
              type="text"
              placeholder="Search mountain or location..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-btns">
            <Filter size={16} style={{color:'var(--text-light)'}}/>
            {difficulties.map(d => (
              <button
                key={d}
                className={`filter-btn ${filter === d ? 'active' : ''}`}
                onClick={() => setFilter(d)}
              >{d}</button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="no-results">
            <Mountain size={48} style={{color:'var(--text-light)', marginBottom:'12px'}}/>
            <p>No climbs found matching your search.</p>
          </div>
        ) : (
          <div className="climbs-list-grid">
            {filtered.map((climb, i) => (
              <Link to={`/climb/${climb.id}`} key={climb.id} className="climb-list-card card" style={{animationDelay:`${i*0.07}s`}}>
                <div className="climb-list-img">
                  <img src={climb.thumbnail} alt={climb.name} loading="lazy"/>
                  <div className="climb-list-overlay">
                    <span className={`badge ${getDifficultyBadge(climb.difficulty)}`}>{climb.difficulty}</span>
                    <span className="badge badge-open">{climb.status}</span>
                  </div>
                </div>
                <div className="climb-list-body">
                  <h3>{climb.name}</h3>
                  <p className="climb-list-desc">{climb.description?.slice(0,100)}...</p>
                  <div className="climb-list-meta">
                    <span><MapPin size={13}/> {climb.location}</span>
                    <span><Mountain size={13}/> {climb.elevation}</span>
                  </div>
                  <div className="climb-list-footer">
                    <span className="schedule-tag">📅 {climb.schedule}</span>
                    <span className="view-link">View Details <ChevronRight size={14}/></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
