import {
  DEFAULT_EXPENSES,
  DEFAULT_THINGS_TO_BRING,
} from '../constants/leaveNoTrace';

function climb(overrides) {
  return {
    status: 'Open',
    limit: 30,
    officers: [],
    thingsToBring: [...DEFAULT_THINGS_TO_BRING],
    expenses: DEFAULT_EXPENSES.map((e) => ({ ...e })),
    ...overrides,
  };
}

/** MMS Open Climbs 2026 — source of truth for default climb listings */
export const OPEN_CLIMBS_2026 = [
  climb({
    id: 1,
    category: 'Minor',
    name: 'Mt. Kapigpiglatan',
    location: 'San Narciso, Zambales',
    schedule: '04–05 Jul 2026',
    sortDate: '2026-07-04',
    elevation: '~985 MASL',
    description:
      'Mt. Kapigpiglatan is a coastal-range day hike in San Narciso, Zambales, popular for rolling grassland ridges, sea-breeze views toward the West Philippine Sea, and a straightforward trail suited to beginners building endurance. The jump-off is typically reached from Manila via Olongapo and San Narciso town proper, with a guided forest-and-grassland approach to the summit area.',
    itinerary: [
      {
        day: 'Day 1 (Sat)',
        activity: 'Manila → San Narciso → Jump-off → Camp / summit approach',
        details:
          'Early assembly, land transfer to jump-off, registration with local guides, trek to designated camp or summit zone. Briefing on water, LNT, and night routine.',
      },
      {
        day: 'Day 2 (Sun)',
        activity: 'Summit / ridge exploration → Descent → Return to Manila',
        details:
          'Sunrise trek if applicable, pack up, descend to jump-off, wash-up, debrief, and travel back to Metro Manila.',
      },
    ],
    waterSources:
      'Sample: seasonal streams and guide-identified sources near the trail; treat or filter all water unless confirmed potable by climb officers at briefing.',
    expenses: [
      { item: 'Transportation (round trip from Manila)', cost: 'TBA' },
      { item: 'Registration / Guide Fee', cost: 'TBA' },
      { item: 'Bunkhouse / Campsite Fee', cost: 'TBA' },
      { item: 'Food & Meals', cost: 'TBA' },
    ],
    thumbnail:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
  }),
  climb({
    id: 2,
    category: 'Major',
    name: 'Mt. Irid',
    location: 'Tanay, Rizal',
    schedule: '18–19 Jul 2026',
    sortDate: '2026-07-18',
    elevation: '~1,472 MASL',
    limit: 25,
    description:
      'Mt. Irid (also spelled Irid) rises in the Sierra Madre of Tanay, Rizal, and is known for long forest approaches, mossy sections, and a rewarding summit on clear days. It is considered a major MMS-style climb due to trail length, elevation gain, and full-day trekking demands. Common access involves coordination with local guides and barangay registration.',
    itinerary: [
      {
        day: 'Day 1 (Sat)',
        activity: 'Assembly → Cogeo–Sta. Ines (Monster Jeep) → Jump-off → Trek to camp',
        details:
          'Early meet-up, jeep transfer to jump-off, register, begin ascent through forest trails to designated campsite.',
      },
      {
        day: 'Day 2 (Sun)',
        activity: 'Summit push → Descent → Exit → Return to Manila',
        details:
          'Pre-dawn or morning summit assault, photos and descent, final briefing, transport back.',
      },
    ],
    waterSources:
      'Sample: streams along the lower and mid trail; availability varies by season—carry sufficient water and purification as directed by officers.',
    expenses: [
      {
        item: 'Transportation — Round trip, Cogeo–Sta. Ines (Monster Jeep)',
        cost: 'TBA',
      },
      { item: 'Registration / Guide Fee', cost: 'TBA' },
      { item: 'Bunkhouse / Campsite Fee', cost: 'TBA' },
      { item: 'Food & Meals', cost: 'TBA' },
    ],
    thumbnail:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80',
  }),
  climb({
    id: 3,
    category: 'Minor',
    name: 'Mt. Kalisungan & Mt. Mabilog (Twin-Hike)',
    location: 'Laguna',
    schedule: '01–02 Aug 2026',
    sortDate: '2026-08-01',
    elevation: '~750 MASL / ~450 MASL',
    description:
      'The twin hike of Mt. Kalisungan and Mt. Mabilog in Laguna is a classic beginner-friendly weekend featuring two summits in one trip, scenic views of Laguna de Bay, and well-established local trails. Kalisungan offers a steeper grassland finish while Mabilog is a shorter, rolling hike—together they introduce pacing, navigation, and multi-summit logistics.',
    itinerary: [
      {
        day: 'Day 1 (Sat)',
        activity: 'Mt. Kalisungan summit day hike',
        details:
          'Register at jump-off, trek to Kalisungan summit, descend to base or transfer to Mabilog area per final MMS itinerary.',
      },
      {
        day: 'Day 2 (Sun)',
        activity: 'Mt. Mabilog summit → Descent → Return',
        details:
          'Second summit push, lunch, descent, debrief, travel back to Manila.',
      },
    ],
    waterSources:
      'Sample: limited sources on Kalisungan grassland—carry 2–3 L; verify Mabilog water points with guides at jump-off.',
    thumbnail:
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80',
  }),
  climb({
    id: 4,
    category: 'Minor',
    name: 'Tarak Ridge',
    location: 'Mt. Mariveles, Mariveles, Bataan',
    schedule: '15–16 Aug 2026',
    sortDate: '2026-08-15',
    elevation: '~1,130 MASL (ridge)',
    description:
      'Tarak Ridge is the iconic grassland spine above Mariveles, Bataan, offering dramatic views of Corregidor, Manila Bay, and the South China Sea on clear days. The climb typically pairs forest trail with an exposed ridge walk—windy, sunny, and memorable for intermediate hikers comfortable with sun exposure and long ridge trekking.',
    itinerary: [
      {
        day: 'Day 1 (Sat)',
        activity: 'Jump-off → Papaya River / camps → Ridge camp',
        details:
          'River crossings and forest trek; set camp near ridge approach per guide plan.',
      },
      {
        day: 'Day 2 (Sun)',
        activity: 'Ridge traverse → Peak / turnaround → Descent',
        details:
          'Early ridge hike, summit photos, descent via agreed exit trail, return transport.',
      },
    ],
    waterSources:
      'Sample: Papaya River and guide-known springs; ridge section has no reliable water—fill up before exposed traverse.',
    thumbnail:
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=600&q=80',
  }),
  climb({
    id: 5,
    category: 'Major',
    name: 'Mt. Pinatubo (Sapang Uwak)',
    location: 'Porac, Pampanga',
    schedule: '29–31 Aug 2026',
    sortDate: '2026-08-29',
    elevation: '~960 MASL (crater lake rim)',
    limit: 25,
    description:
      'The Sapang Uwak trail to Mt. Pinatubo’s crater lake crosses lahar canyons, volcanic sand, and 4×4-access roads before a final hike to the turquoise crater lake—one of the Philippines’ most dramatic landscapes. This major climb emphasizes heat management, hydration, and Aeta/community guide coordination in Porac, Pampanga.',
    itinerary: [
      {
        day: 'Day 1 (Fri)',
        activity: 'Travel to Porac → Base camp / staging',
        details: 'Assembly, land transfer, briefing, early rest.',
      },
      {
        day: 'Day 2 (Sat)',
        activity: '4×4 / trek segment → Crater lake visit',
        details:
          'Jeep or trek through lahar fields per permit; lake rim activities; return to camp or lodge.',
      },
      {
        day: 'Day 3 (Sun)',
        activity: 'Buffer / exit → Return to Manila',
        details: 'Contingency weather day or descent and travel home.',
      },
    ],
    waterSources:
      'Sample: bring full supply for exposed lahar sections; limited natural sources—officers will confirm at briefing.',
    thumbnail:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80',
  }),
  climb({
    id: 6,
    category: 'Minor',
    name: 'Mt. Manalmon',
    location: 'San Miguel, Bulacan',
    schedule: '12–13 Sep 2026',
    sortDate: '2026-09-12',
    elevation: '~196 MASL',
    description:
      'Mt. Manalmon in San Miguel, Bulacan is a beginner staple combining a short forest summit, Madlum River activities, and optional spelunking nearby. Low elevation makes it ideal for first-time open climbers while still teaching river safety, group pacing, and Leave No Trace along popular weekend routes.',
    itinerary: [
      {
        day: 'Day 1 (Sat)',
        activity: 'Manila → San Miguel → Manalmon summit → River / camp',
        details: 'Register, summit hike, optional river swim per safety briefing.',
      },
      {
        day: 'Day 2 (Sun)',
        activity: 'Optional side trips → Descent → Return',
        details: 'Pack up, final activities per MMS plan, travel home.',
      },
    ],
    waterSources:
      'Sample: Madlum River for cooling only unless treated; carry drinking water from jump-off.',
    thumbnail:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80',
  }),
  climb({
    id: 7,
    category: 'Special',
    name: 'Mt. Apo',
    location: 'Bansalan, Davao del Sur',
    schedule: '18–22 Sep 2026',
    sortDate: '2026-09-18',
    elevation: '2,954 MASL',
    limit: 15,
    status: 'Few Slots Left',
    description:
      'Mt. Apo is the highest peak in the Philippines (2,954 MASL), a dormant stratovolcano spanning Davao del Sur and Cotabato. The Bansalan–Kapatagan routes pass mossy forest, boulder fields, and the famous crater lake. This special expedition demands strong endurance, cold-weather gear, and respect for indigenous and park regulations. Experience the highest peak in the Philippines!',
    itinerary: [
      {
        day: 'Day 1',
        activity: 'Manila → Davao → Transfer to jump-off community',
        details: 'Flights, permits check, overnight near trailhead.',
      },
      {
        day: 'Day 2',
        activity: 'Jump-off → Forest camp',
        details: 'Registration with guides/porters; steady ascent.',
      },
      {
        day: 'Day 3',
        activity: 'High camp → Boulder / crater zone',
        details: 'Alpine scrub and volcanic terrain; early sleep for summit.',
      },
      {
        day: 'Day 4',
        activity: 'Summit assault → Descent to lower camp',
        details: 'Pre-dawn push to summit; sulfur vents and crater views.',
      },
      {
        day: 'Day 5',
        activity: 'Exit → Davao → Manila',
        details: 'Descent, debrief, flights home.',
      },
    ],
    waterSources:
      'Sample: streams on lower slopes only; carry capacity increases above treeline—officers will issue final water plan.',
    expenses: [
      { item: 'Airfare / Transportation (round trip)', cost: 'TBA' },
      { item: 'Registration / Guide & Porter Fee', cost: 'TBA' },
      { item: 'Bunkhouse / Campsite Fee', cost: 'TBA' },
      { item: 'Food & Meals', cost: 'TBA' },
    ],
    thumbnail:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80',
  }),
  climb({
    id: 8,
    category: 'Major',
    name: 'Mt. Arayat (Magalang–Arayat)',
    location: 'Pampanga',
    schedule: '26–27 Sep 2026',
    sortDate: '2026-09-26',
    elevation: '~1,026 MASL',
    limit: 25,
    description:
      'Mt. Arayat is a solitary volcanic cone rising from the Central Luzon plain, sacred in Kapampangan folklore and protected as a national park. The Magalang–Arayat traverse features forest trails, steep sections, and summit views of Pampanga, Nueva Ecija, and on clear days the Zambales ranges.',
    itinerary: [
      {
        day: 'Day 1 (Sat)',
        activity: 'Jump-off → Camp / mid-mountain',
        details: 'DENR registration, guided ascent, camp setup.',
      },
      {
        day: 'Day 2 (Sun)',
        activity: 'Summit → Traverse exit → Return',
        details: 'Summit sunrise, descent on agreed exit trail.',
      },
    ],
    waterSources:
      'Sample: seasonal springs mid-trail; treat all water; officers confirm active sources before climb.',
    thumbnail:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
  }),
  climb({
    id: 9,
    category: 'Minor',
    name: 'Mt. Marami',
    location: 'Maragondon, Cavite',
    schedule: '10–11 Oct 2026',
    sortDate: '2026-10-10',
    elevation: '~405 MASL',
    description:
      'Mt. Marami in Maragondon, Cavite is known for its “silyang bato” (stone chair) rock formations, open grassland sections, and views toward Nasugbu and Batangas coastlines. A solid minor climb for hikers building confidence on rocky trails and sun-exposed ridges.',
    itinerary: [
      {
        day: 'Day 1 (Sat)',
        activity: 'Manila → Maragondon → Summit → Camp',
        details: 'Register, day hike to summit and photo stops, overnight at camp.',
      },
      {
        day: 'Day 2 (Sun)',
        activity: 'Descent → Side trail options → Return',
        details: 'Breakfast, pack out trash, descend, travel home.',
      },
    ],
    waterSources:
      'Sample: limited; carry full day water plus camp reserve.',
    thumbnail:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80',
  }),
  climb({
    id: 10,
    category: 'Major',
    name: 'Kibungan Cross Country',
    location: 'Kibungan, Benguet',
    schedule: '24–26 Oct 2026',
    sortDate: '2026-10-24',
    elevation: 'Variable (Cordillera traverse)',
    limit: 20,
    description:
      'Kibungan Cross Country is a multi-day Cordillera trek linking scenic highland villages, pine ridges, and Kibungan’s famed “Swiss Alps of the Philippines” profiles—steep gullies, knife-edge viewpoints, and cool climate. Expect long hiking days, early camps, and rope-assist sections depending on the MMS route variant.',
    itinerary: [
      {
        day: 'Day 1 (Fri)',
        activity: 'Manila → Kibungan → Trailhead camp',
        details: 'Long travel, acclimatization walk if time permits.',
      },
      {
        day: 'Day 2 (Sat)',
        activity: 'Cross-country ridge / village traverse',
        details: 'Full pack trek between camps; guides lead pacing.',
      },
      {
        day: 'Day 3 (Sun)',
        activity: 'Final descent → Transport home',
        details: 'Exit trail, certificates, return to Manila.',
      },
    ],
    waterSources:
      'Sample: mountain springs in villages; cold climate reduces dehydration risk but still filter or boil.',
    thumbnail:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
  }),
  climb({
    id: 11,
    category: 'Minor',
    name: 'Mt. Timbak–Mt. Tabayoc (Twin-Hike)',
    location: 'Kabayan, Benguet',
    schedule: '07–08 Nov 2026',
    sortDate: '2026-11-07',
    elevation: '~2,717 MASL / ~2,842 MASL',
    description:
      'Mt. Timbak and Mt. Tabayoc are among the easier “3,000ers” of Benguet when approached from the Kabayan side, often paired as a twin-hike for sea-of-clouds sunrises and cultural immersion in Ibaloi communities. Cool temperatures and road-to-ridge access make this a popular minor climb before bigger Cordillera expeditions.',
    itinerary: [
      {
        day: 'Day 1 (Sat)',
        activity: 'Manila → Kabayan → Mt. Timbak sunset / camp',
        details: 'Vehicle to jump-off, short ascent to Timbak summit area.',
      },
      {
        day: 'Day 2 (Sun)',
        activity: 'Mt. Tabayoc → Descent → Return',
        details: 'Early trek to Tabayoc, descent, travel back.',
      },
    ],
    waterSources:
      'Sample: bring capacity from Kabayan town; summit areas have no reliable sources.',
    thumbnail:
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80',
  }),
  climb({
    id: 12,
    category: 'Major',
    name: 'Mt. Pulag (Tawangan–Akiki Trail)',
    location: 'Kabayan, Benguet',
    schedule: '20–22 Nov 2026',
    sortDate: '2026-11-20',
    elevation: '2,922 MASL',
    limit: 25,
    description:
      'Mt. Pulag is the highest peak in Luzon (2,922 MASL), famous for dwarf bamboo grasslands and the sea of clouds. The Akiki (Killer) trail from Kabayan is a major route with steep, long ascent and descent through mossy forest—requiring strong legs, cold-weather gear, and DENR permits.',
    itinerary: [
      {
        day: 'Day 1 (Fri)',
        activity: 'Manila → Baguio / Kabayan → Akiki jump-off camp',
        details: 'Travel, permit check, camp at lower elevations.',
      },
      {
        day: 'Day 2 (Sat)',
        activity: 'Akiki trail ascent → Grassland camp',
        details: 'Steady climb through mossy forest to saddle camp.',
      },
      {
        day: 'Day 3 (Sun)',
        activity: 'Summit sunrise → Descent via agreed exit',
        details: 'Pre-dawn summit, photos, long descent, return transport.',
      },
    ],
    waterSources:
      'Sample: sources along Akiki at known camps; none on grassland—fill at last forest camp.',
    thumbnail:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
  }),
  climb({
    id: 13,
    category: 'Special',
    name: 'Mt. Kinabalu',
    location: 'Kota Kinabalu, Sabah, Malaysia',
    schedule: '29 Nov – 02 Dec 2026',
    sortDate: '2026-11-29',
    elevation: '4,095 MASL',
    limit: 12,
    status: 'Closed',
    description:
      'Mount Kinabalu (4,095 MASL) in Sabah, Malaysia is Southeast Asia’s highest walkable peak via Laban Rata, featuring granite peaks, alpine meadow zones, and a UNESCO World Heritage setting. MMS 2026 international expedition—our climb to Sabah! Registration for this event is closed; contact coordinators for future international climbs.',
    itinerary: [
      {
        day: 'Day 1',
        activity: 'Manila → Kota Kinabalu → Park registration',
        details: 'International travel, permit and guide check-in.',
      },
      {
        day: 'Day 2',
        activity: 'Timpohon Gate → Laban Rata',
        details: '6 km ascent to mountain hut; acclimatization.',
      },
      {
        day: 'Day 3',
        activity: 'Summit Low’s Peak → Descent to Kinabalu Park',
        details: '2:30 AM summit push; return to base.',
      },
      {
        day: 'Day 4',
        activity: 'Travel home / optional KK city day',
        details: 'Per final MMS international itinerary.',
      },
    ],
    waterSources:
      'Sample: hut potable water at Laban Rata; carry bottles for summit push.',
    expenses: [
      { item: 'International airfare', cost: 'TBA' },
      { item: 'Park / Guide / Hut Fees', cost: 'TBA' },
      { item: 'Accommodation (KK & mountain hut)', cost: 'TBA' },
      { item: 'Food & Meals', cost: 'TBA' },
    ],
    thumbnail:
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=600&q=80',
  }),
  climb({
    id: 14,
    category: 'Major',
    name: 'Bakun Trilogy',
    location: 'Bakun, Benguet',
    schedule: '29 Nov – 02 Dec 2026',
    sortDate: '2026-11-29',
    elevation: 'Mt. Kabunian · Mt. Tenglawan · Mt. Lobo',
    limit: 20,
    description:
      'The Bakun Trilogy covers three prominent peaks of Bakun, Benguet—typically Mt. Kabunian (rock formations and prayer sites), Mt. Tenglawan (dramatic cliffs), and Mt. Lobo—over a multi-day itinerary. Expect Cordillera weather, pine forests, and steep ascents with panoramic views of the Bakun trio profile.',
    itinerary: [
      {
        day: 'Day 1 (Sat)',
        activity: 'Manila → Bakun → Mt. Kabunian',
        details: 'Travel, register, first summit push.',
      },
      {
        day: 'Day 2 (Sun)',
        activity: 'Mt. Tenglawan',
        details: 'Second peak, camp transfer per route plan.',
      },
      {
        day: 'Day 3 (Mon)',
        activity: 'Mt. Lobo → Descent',
        details: 'Final peak and descent to village.',
      },
      {
        day: 'Day 4 (Tue)',
        activity: 'Return to Manila',
        details: 'Travel day and debrief.',
      },
    ],
    waterSources:
      'Sample: village and trail springs; verify with guides each morning.',
    thumbnail:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80',
  }),
  climb({
    id: 15,
    category: 'Minor',
    name: 'Nasugbu Trilogy',
    location: 'Nasugbu, Batangas',
    schedule: '12–13 Dec 2026',
    sortDate: '2026-12-12',
    elevation: 'Multiple peaks (Nasugbu range)',
    description:
      'The Nasugbu Trilogy typically combines three popular Batangas day peaks—often including Mt. Batulao, Mt. Talamitam, and Mt. Apayang (exact sequence set by MMS officers)—offering rolling grasslands, windy ridges, and coastal views. A year-end minor climb celebrating mileage and camaraderie.',
    itinerary: [
      {
        day: 'Day 1 (Sat)',
        activity: 'Peak 1 & Peak 2 (per MMS route order)',
        details: 'Register at jump-offs, two summits with vehicle transfers between trails.',
      },
      {
        day: 'Day 2 (Sun)',
        activity: 'Peak 3 → Descent → Return to Manila',
        details: 'Final summit, awarding, travel home.',
      },
    ],
    waterSources:
      'Sample: buy water at jump-offs; minimal trail sources on grassland peaks.',
    thumbnail:
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80',
  }),
];

export const OPEN_CLIMBS_DATA_VERSION = 'open-climbs-2026-v1';

export const CATEGORY_ORDER = ['Major', 'Minor', 'Special'];

export const CATEGORY_INFO = {
  Major: {
    title: 'Major Climbs',
    subtitle:
      'Long multi-day treks, challenging terrain, and significant elevation gain—true tests of endurance and skill.',
  },
  Minor: {
    title: 'Minor Climbs',
    subtitle:
      'Beautiful views with accessible trails—ideal introductions to mountaineering.',
  },
  Special: {
    title: 'Special & International Expeditions',
    subtitle:
      'The ultimate challenges—including the highest peak in the Philippines and iconic international journeys.',
  },
};
