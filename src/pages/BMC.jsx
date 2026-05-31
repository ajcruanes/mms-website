import { useState } from 'react';
import { Calendar, MapPin, Users, Clock, CheckCircle, ChevronDown, ChevronUp, Play, X } from 'lucide-react';
import './BMC.css';

// Replace this sample with your final BMC YouTube video link when ready.
const BMC_VIDEO_EMBED ="https://www.youtube.com/embed/rc-jGWKuCk4?si=7xheq71gbWR1OQH3"

// Updated from your attached BMC program table (Target dates + locations).
const SCHEDULE = [
  { event: 'Basic Mountaineering Course for Members (BMCM) Orientation', date: '03 JAN 2026', location: 'Patio De Conchita, Intramuros, Manila' },
  { event: 'Basic Mountaineering Course (BMC)', date: '17-18 JAN 2026', location: 'To be announced' },
  { event: 'Basic Life Support (BLS), First Aid Response, and Blood Letting', date: '24-25 JAN 2026', location: 'Powerlink, Roxas Boulevard' },
  { event: 'Map Reading, Orienteering', date: '07-08 FEB 2026', location: 'Mt. 387, Carrangalan, Nueva Ecija' },
  { event: 'Team Building', date: '—', location: '—' },
  { event: 'First Minor Training Hike', date: '21-22 FEB 2026', location: 'Mt. LANTIK - Mt. TALAMITAM, Nasugbu, Batangas' },
  { event: 'Cook Fest', date: '21-22 FEB 2026', location: 'Mt. LANTIK - Mt. TALAMITAM, Nasugbu, Batangas' },
  { event: 'Second Minor Training Hike', date: '07-08 MAR 2026', location: 'Mt. MANABU, Sto. Tomas, Batangas' },
  { event: 'Night Trek', date: '07-08 MAR 2026', location: 'Mt. MANABU, Sto. Tomas, Batangas' },
  { event: 'Morning: Outreach Activity', date: '14 MAR 2026', location: 'To be announced' },
  { event: 'Afternoon: MMS 32nd Anniversary Celebration/Tribe Drafting', date: '14 MAR 2026', location: 'To be announced' },
  { event: 'Indoor Wall climb', date: '15 MAR 2026', location: 'R.O.X., BGC, Taguig City' },
  { event: 'First Major Training Hike', date: '28-29 MAR 2026', location: 'PANTINGAN PEAK, Bagac, Bataan' },
  { event: 'Outdoor Repelling', date: '11 APR 2026', location: 'Wawa, Rodriguez, Rizal' },
  { event: 'Rock Climb', date: '12 APR 2026', location: 'Wawa, Rodriguez, Rizal' },
  { event: 'Second Major Training Hike', date: '25-26 APR 2026', location: 'Mt. SUTOT (Sawtooth Peak), Iba, Zambales' },
  { event: 'Sports Fest', date: '09 MAY 2026', location: 'To be announced' },
  { event: 'Beachengineering and Beachengineering Rites of Passage', date: '23-24 MAY 2026', location: 'Maragaha Campsite, Botolan, Zambales' },
  { event: 'Graduation Program and Graduation Rites', date: '06-07 JUN 2026', location: 'Batch 2026 Choice of Venue' },
  { event: 'Induction Rites (during Open Hike Schedules)', date: 'JUL - DEC 2026', location: 'Open Hikes Schedule 2026' },
  { event: 'Oath Taking (during MMS Christmas Party)', date: '05 DEC 2026', location: 'To be announced' },
];

const REQUIREMENTS = [
  'Must be 18 years old and above (minors require parental consent)',
  'Accomplished registration form',
  'Medical certificate from a licensed physician',
  'Proof of payment of registration fee',
  'Emergency contact information',
  'Basic physical fitness (must pass fitness assessment)',
  'Willingness to follow MMS rules and wilderness ethics',
];

const INSTRUCTORS = [
  { name: 'TBA', role: 'TBA', expertise: 'TBA' },
  { name: 'TBA', role: 'TBA', expertise: 'TBA' },
  { name: 'TBA', role: 'TBA', expertise: 'TBA' },
  { name: 'TBA', role: 'TBA', expertise: 'TBA' },
];

const GALLERY = [
  'img1.jpg',
  'img2.jpg',
  'img6.jpg',
  'img4.jpg',
  'img3.jpg',
  'img5.jpg',
];

export default function BMC() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);

  const faqs = [
    { q: 'Who can join the BMC?', a: 'Anyone 18 years old and above who has a passion for the outdoors. Beginners are welcome — no prior mountaineering experience required.' },
    { q: 'How much is the registration fee?', a: 'The registration fee for BMC 2026 is ₱3,500, which covers all training materials, field training expenses, and certification upon completion.' },
    { q: 'What do I get after completing the BMC?', a: 'Graduates receive an MMS BMC Certificate of Completion, official MMS membership eligibility, and the skills to safely participate in future open climbs.' },
    { q: 'Is physical fitness required?', a: 'Basic fitness is required. Participants must be able to walk for extended periods and carry a light pack. A simple fitness assessment will be conducted before the program.' },
  ];

  return (
    <div className="bmc-page">
      {/* Hero */}
      <div className="page-hero" style={{backgroundImage:'url(https://images.unsplash.com/photo-1551632811-561732d1e306?w=1400&q=80)'}}>
        <div className="page-hero-overlay"/>
        <div className="page-hero-content fade-up">
          <div className="section-label light">Training Program</div>
          <h1>Basic Mountaineering Course</h1>
          <p>Equipping the next generation of responsible mountaineers</p>
        </div>
      </div>

      <div className="container" style={{padding:'80px 24px'}}>

        {/* Overview & Video */}
        <div className="bmc-overview">
          <div className="bmc-desc">
            <h2 className="section-title">What is BMC?</h2>
            <p>The <strong>Basic Mountaineering Course (BMC)</strong> is MMS's flagship training program designed to introduce participants to the fundamentals of mountaineering. From navigation and knot-tying to wilderness first aid and Leave No Trace principles, BMC prepares you for safe and responsible outdoor adventures.</p>
            <p style={{marginTop:'12px'}}>The course runs over 1 year with a mix of minor/major hikes, practical training, and culminating with an actual climb. Upon completion, participants are eligible for full MMS membership.</p>
            <div className="bmc-highlights">
              <div className="highlight-item"><CheckCircle size={16}/> 1 Year Program</div>
              <div className="highlight-item"><CheckCircle size={16}/> Certificate of Completion</div>
              <div className="highlight-item"><CheckCircle size={16}/> MMS Membership Eligibility</div>
              <div className="highlight-item"><CheckCircle size={16}/> Culminating Climb</div>
            </div>
          </div>
          <div className="bmc-video-wrap">
            <div className="bmc-yt-thumb" onClick={() => setVideoOpen(true)}>
              <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80" alt="BMC Video" />
              <div className="yt-overlay">
                <div className="yt-play-btn"><Play size={36} fill="white"/></div>
                <p>BMC Highlights (Sample)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Event Card */}
        <div className="event-card-section">
          <div className="bmc-event-big card">
            <div className="event-big-left">
              <div className="event-tag"><Calendar size={14}/> Upcoming Event</div>
              <h2>BMC 2027</h2>
              <p>Registration is NOT YET open for the Metropolitan Mountaineering Society's Basic Mountaineering Course 2026. Join us for an exciting journey of learning, camaraderie, and adventure.</p>
              <div className="event-meta-grid">
                <div className="event-meta-item"><Calendar size={16}/><div><strong>Schedule</strong><span>Jan – Dec 2026</span></div></div>
                <div className="event-meta-item"><MapPin size={16}/><div><strong>Venue</strong><span>See program 2026 below </span></div></div>
                <div className="event-meta-item"><Users size={16}/><div><strong>Slots</strong><span>Limited to 30 participants</span></div></div>
                <div className="event-meta-item"><Clock size={16}/><div><strong>Duration</strong><span>1 Year Program </span></div></div>
              </div>
            </div>
            <div className="event-big-right">
              <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&q=80" alt="BMC" />
              <a href="https://www.facebook.com/share/g/1CkqCdAgRg/" target="_blank" rel="noopener noreferrer" className="btn btn-primary event-reg-btn">
                Register for BMC 2027
              </a>
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="section-block">
          <h2 className="section-title" style={{marginBottom:'24px'}}>Program Schedule</h2>
          <div className="schedule-table">
            <div className="schedule-header">
              <span>Event</span><span>Target Date(s)</span><span>Location</span>
            </div>
            {SCHEDULE.map((s, i) => (
              <div key={i} className={`schedule-row ${i % 2 === 0 ? 'even' : ''}`}>
                <span className="sched-event">{s.event}</span>
                <span className="sched-date">{s.date}</span>
                <span className="sched-location">{s.location}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="section-block">
          <h2 className="section-title" style={{marginBottom:'24px'}}>Requirements</h2>
          <div className="requirements-grid">
            {REQUIREMENTS.map((r, i) => (
              <div key={i} className="req-item"><CheckCircle size={16}/><span>{r}</span></div>
            ))}
          </div>
        </div>

        {/* Instructors */}
        <div className="section-block">
          <h2 className="section-title" style={{marginBottom:'24px'}}>Instructors</h2>
          <div className="instructors-grid">
            {INSTRUCTORS.map((ins, i) => (
              <div key={i} className="instructor-card card">
                <div className="instructor-avatar">
                  {ins.name.split(' ').map(w=>w[0]).join('').slice(0,2)}
                </div>
                <h4>{ins.name}</h4>
                <p className="ins-role">{ins.role}</p>
                <p className="ins-expertise">{ins.expertise}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div className="section-block">
          <h2 className="section-title" style={{marginBottom:'24px'}}>Photo Gallery</h2>
          <div className="bmc-gallery">
            {GALLERY.map((src, i) => (
              <div key={i} className="bmc-gallery-item card"><img src={src} alt={`BMC ${i+1}`} loading="lazy"/></div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="section-block">
          <h2 className="section-title" style={{marginBottom:'24px'}}>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div key={i} className={`faq-item ${faqOpen === i ? 'open' : ''}`}>
                <button className="faq-q" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                  <span>{f.q}</span>
                  {faqOpen === i ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
                </button>
                {faqOpen === i && <div className="faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {videoOpen && (
        <div className="modal-overlay" onClick={() => setVideoOpen(false)}>
          <div className="modal-content video-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setVideoOpen(false)}><X size={22}/></button>
            <div className="yt-embed-wrap">
              <iframe
                src={`${BMC_VIDEO_EMBED}?autoplay=1`}
                title="BMC Highlights"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
