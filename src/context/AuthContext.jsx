import { createContext, useContext, useState, useEffect } from 'react';
import {
  OPEN_CLIMBS_2026,
  OPEN_CLIMBS_DATA_VERSION,
} from '../data/openClimbs2026';

const AuthContext = createContext(null);

const USERS = [
  { id: 1, username: 'Admin', password: 'Admin123', role: 'admin', name: 'MMS Admin' },
  { id: 2, username: 'Desiree Lagman', password: 'User123', role: 'hiker', name: 'Desiree Lagman', email: 'desiree@email.com', contact: '09171234567', emergency: 'Juan Lagman - 09179876543' },
];

const CLIMBS_KEY = 'mms_climbs';
const CLIMBS_VERSION_KEY = 'mms_climbs_version';
const JOIN_REQUESTS_KEY = 'mms_join_requests';

function loadClimbs() {
  const savedVersion = localStorage.getItem(CLIMBS_VERSION_KEY);
  const saved = localStorage.getItem(CLIMBS_KEY);
  if (saved && savedVersion === OPEN_CLIMBS_DATA_VERSION) {
    try {
      return JSON.parse(saved);
    } catch {
      /* fall through to defaults */
    }
  }
  localStorage.setItem(CLIMBS_VERSION_KEY, OPEN_CLIMBS_DATA_VERSION);
  return OPEN_CLIMBS_2026;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('mms_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [climbs, setClimbs] = useState(loadClimbs);

  const [joinRequests, setJoinRequests] = useState(() => {
    const saved = localStorage.getItem(JOIN_REQUESTS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(CLIMBS_KEY, JSON.stringify(climbs));
    localStorage.setItem(CLIMBS_VERSION_KEY, OPEN_CLIMBS_DATA_VERSION);
  }, [climbs]);

  useEffect(() => {
    localStorage.setItem(JOIN_REQUESTS_KEY, JSON.stringify(joinRequests));
  }, [joinRequests]);

  const login = (username, password) => {
    const found = USERS.find(u => u.username === username && u.password === password);
    if (found) {
      const { password: _, ...safeUser } = found;
      setUser(safeUser);
      localStorage.setItem('mms_user', JSON.stringify(safeUser));
      return { success: true, role: safeUser.role };
    }
    return { success: false };
  };

  const signup = (name, email, password, contact) => {
    const newUser = { id: Date.now(), username: name, role: 'hiker', name, email, contact, emergency: '' };
    setUser(newUser);
    localStorage.setItem('mms_user', JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mms_user');
  };

  const addClimb = (climbData) => {
    const newClimb = {
      ...climbData,
      id: Date.now(),
      status: climbData.status || 'Open',
      category: climbData.category || 'Minor',
      itinerary: climbData.itinerary || [],
      waterSources: climbData.waterSources || '',
      thingsToBring: climbData.thingsToBring || [],
      expenses: climbData.expenses || [],
      officers: [],
    };
    setClimbs(prev => [...prev, newClimb]);
  };

  const updateClimb = (id, data) => {
    setClimbs(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
  };

  const deleteClimb = (id) => {
    setClimbs(prev => prev.filter(c => c.id !== id));
  };

  const joinClimb = (climbId, details) => {
    const request = {
      id: Date.now(),
      climbId,
      userId: user.id,
      userName: user.name,
      userEmail: user.email || '',
      contact: details.contact,
      fbLink: details.fbLink,
      paymentScreenshot: details.paymentScreenshot,
      emergency: user.emergency || '',
      registrationDate: new Date().toLocaleDateString(),
      status: 'Pending',
    };
    setJoinRequests(prev => [...prev, request]);
  };

  const updateRequest = (id, status) => {
    setJoinRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const getUserRequests = () => joinRequests.filter(r => r.userId === user?.id);

  const getClimbRequests = (climbId) => joinRequests.filter(r => r.climbId === climbId);

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, climbs, addClimb, updateClimb, deleteClimb, joinClimb, joinRequests, updateRequest, getUserRequests, getClimbRequests }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
