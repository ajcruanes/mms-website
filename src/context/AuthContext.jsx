import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const USERS = [
  { id: 1, username: 'Admin', password: 'Admin123', role: 'admin', name: 'MMS Admin' },
  { id: 2, username: 'Desiree Lagman', password: 'User123', role: 'hiker', name: 'Desiree Lagman', email: 'desiree@email.com', contact: '09171234567', emergency: 'Juan Lagman - 09179876543' },
];

const CLIMBS_KEY = 'mms_climbs';
const JOIN_REQUESTS_KEY = 'mms_join_requests';

const defaultClimbs = [
  {
    id: 1, name: 'Mt. Kapigpiglatan', difficulty: 'Difficult', elevation: '2,938 MASL',
    location: 'Quezon Province', schedule: 'March 15–17, 2027', limit: 30, status: 'Open',
    description: 'A challenging multi-day traverse known for its beautiful mossy forests and panoramic summit views. Mt. Kapigpiglatan offers a true wilderness experience for seasoned mountaineers.',
    itinerary: [
      { day: 'Day 1', activity: 'Jump-off point → Camp 1 (4–5 hrs)', details: 'Register at DENR, cross river, forest trail to campsite.' },
      { day: 'Day 2', activity: 'Camp 1 → Summit → Camp 2 (6–7 hrs)', details: 'Early morning summit push, descend to Camp 2 for night.' },
      { day: 'Day 3', activity: 'Camp 2 → Exit Point (3–4 hrs)', details: 'Final descent, debrief, return to Manila.' },
    ],
    waterSources: 'Stream at km 3, spring near Camp 1, river crossing at Day 2 start.',
    thingsToBring: ['Tent', 'Sleeping bag', 'Rain gear', '3-day food supply', 'Water purifier', 'First aid kit', 'Trekking poles', 'Headlamp'],
    expenses: [
      { item: 'Registration / DENR Fee', cost: '₱200' },
      { item: 'Guide Fee', cost: '₱600' },
      { item: 'Transportation (roundtrip)', cost: '₱800' },
      { item: 'Food & Supplies', cost: '₱800' },
    ],
    officers: [{ name: 'Dennis Sacro', role: 'Climb Leader', contact: '09171110001' }, { name: 'Ed Ocampo', role: 'Safety Officer', contact: '09172220002' }],
    thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80',
  },
  {
    id: 2, name: 'Mt. Pulag', difficulty: 'Moderate', elevation: '2,922 MASL',
    location: 'Benguet, Cordillera', schedule: 'April 5–7, 2027', limit: 25, status: 'Open',
    description: 'The highest peak in Luzon and the third highest in the Philippines. Famous for its sea of clouds and dwarf bamboo grasslands. A bucket-list climb for every Filipino mountaineer.',
    itinerary: [
      { day: 'Day 1', activity: 'Arrival at Ambangeg Ranger Station', details: 'Registration, briefing, set up camp.' },
      { day: 'Day 2', activity: 'Summit Assault (2–3 hrs)', details: 'Pre-dawn hike to catch sunrise above the clouds, descend by morning.' },
      { day: 'Day 3', activity: 'Return to Manila', details: 'Breakfast, pack up, travel back.' },
    ],
    waterSources: 'Ranger station has water source. Bring at least 3L per day.',
    thingsToBring: ['Thermal wear', 'Gloves', 'Beanie', 'Sleeping bag (-5°C)', 'Tent', 'Camera', 'Snacks'],
    expenses: [
      { item: 'DENR / Park Fee', cost: '₱1,000' },
      { item: 'Guide Fee', cost: '₱500' },
      { item: 'Transportation', cost: '₱1,500' },
      { item: 'Food', cost: '₱600' },
    ],
    officers: [{ name: 'Long Henson', role: 'Climb Leader', contact: '09173330003' }, { name: 'Anne Sacro', role: 'Medic', contact: '09174440004' }],
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
  },
  {
    id: 3, name: 'Mt. Makiling', difficulty: 'Moderate', elevation: '1,090 MASL',
    location: 'Laguna', schedule: 'May 10, 2027', limit: 20, status: 'Open',
    description: 'The birthplace of MMS. A sacred forest mountain in Laguna known for its rich biodiversity. The lush forest trails and mystical atmosphere make it a meaningful climb for all MMS members.',
    itinerary: [
      { day: 'Day 1', activity: 'UP Los Baños → Trail Head → Peak 2 (5–6 hrs)', details: 'Permit at UPLB, guided trail through old-growth forest to peak.' },
    ],
    waterSources: 'Streams along the trail. Potable water at registration point.',
    thingsToBring: ['Day pack', 'Rain jacket', '2L water', 'Energy snacks', 'Trekking shoes', 'Insect repellent'],
    expenses: [
      { item: 'UPLB Permit', cost: '₱150' },
      { item: 'Guide Fee', cost: '₱400' },
      { item: 'Transportation', cost: '₱400' },
    ],
    officers: [{ name: 'Jeric Yaya', role: 'Climb Leader', contact: '09175550005' }, { name: 'Joey Avila', role: 'Sweep', contact: '09176660006' }],
    thumbnail: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80',
  },
  {
    id: 4, name: 'Mt. Apo', difficulty: 'Very Difficult', elevation: '2,954 MASL',
    location: 'Davao del Sur / Cotabato', schedule: 'June 20–24, 2027', limit: 15, status: 'Open',
    description: 'The highest peak in the Philippines. A multi-day epic requiring high fitness level, crossing volcanic terrain, sulfuric vents, and mossy forests on the roof of the Philippines.',
    itinerary: [
      { day: 'Day 1', activity: 'Manila → Davao, travel to jump-off', details: 'Flight, land transfer, overnight at base.' },
      { day: 'Day 2', activity: 'Jump-off → Camp 1 (5–6 hrs)', details: 'Rainforest trail, river crossing, campsite setup.' },
      { day: 'Day 3', activity: 'Camp 1 → Camp 2 → Boulder Field (6–8 hrs)', details: 'Volcanic terrain, crater lake view.' },
      { day: 'Day 4', activity: 'Summit → Descent to Camp 1 (full day)', details: 'Summit at dawn, begin descent.' },
      { day: 'Day 5', activity: 'Exit → Davao → Manila', details: 'Final descent, flight back.' },
    ],
    waterSources: 'Streams on lower slopes. No reliable water above Camp 2 — carry 4L minimum.',
    thingsToBring: ['Full mountaineering gear', 'Gas stove', 'Water filter', 'Heavy-duty rain gear', 'Extra food', 'Gaiters'],
    expenses: [
      { item: 'Airfare (roundtrip)', cost: '₱4,000' },
      { item: 'DENR / Park Fee', cost: '₱1,500' },
      { item: 'Guide & Porter', cost: '₱3,000' },
      { item: 'Transportation & Accommodation', cost: '₱2,000' },
      { item: 'Food & Supplies', cost: '₱2,000' },
    ],
    officers: [{ name: 'Richard Kahulugan', role: 'Climb Leader', contact: '09177770007' }, { name: 'Boying Amio', role: 'Route Master', contact: '09178880008' }],
    thumbnail: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80',
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('mms_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [climbs, setClimbs] = useState(() => {
    const saved = localStorage.getItem(CLIMBS_KEY);
    return saved ? JSON.parse(saved) : defaultClimbs;
  });

  const [joinRequests, setJoinRequests] = useState(() => {
    const saved = localStorage.getItem(JOIN_REQUESTS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(CLIMBS_KEY, JSON.stringify(climbs));
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
    const newClimb = { ...climbData, id: Date.now(), status: 'Open', itinerary: [], waterSources: '', thingsToBring: [], expenses: [], officers: [] };
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
