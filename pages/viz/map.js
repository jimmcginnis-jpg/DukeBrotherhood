// pages/viz/map.js
// Recruiting map — where Duke gets its players

import { useState, useMemo } from 'react';
import Layout from '../../components/Layout';
import data from '../../data/players.json';

// Approximate geocoding for all known hometowns
const COORDS = {
  'Charlotte, NC': [35.23, -80.84], 'Fayetteville, NC': [35.05, -78.88],
  'Durham, NC': [35.99, -78.90], 'Drewry, NC': [36.45, -78.33],
  'Mt. Airy, NC': [36.50, -80.61], 'Burlington, NC': [36.10, -79.44],
  'Pinehurst, NC': [35.19, -79.47], 'Kinston, NC': [35.26, -77.58],
  'Raleigh, NC': [35.78, -78.64], 'High Point, NC': [35.96, -80.01],
  'Chapel Hill, NC': [35.91, -79.05], 'Greensboro, NC': [36.07, -79.79],
  'Morrisville, NC': [35.82, -78.83], 'Winston-Salem, NC': [36.10, -80.24],
  'Falls Church, VA': [38.88, -77.17], 'Sterling, VA': [39.01, -77.43],
  'Reston, VA': [38.97, -77.34], 'Leesburg, VA': [39.12, -77.56],
  'Herndon, VA': [38.97, -77.39], 'Manassas, VA': [38.75, -77.47],
  'Fredericksburg, VA': [38.30, -77.46], 'Richmond, VA': [37.54, -77.44],
  'Fairfax, VA': [38.85, -77.31], 'Shipman, VA': [37.73, -78.83],
  'Culpeper, VA': [38.47, -77.99], 'Chesapeake, VA': [36.77, -76.29],
  'Roanoke, VA': [37.27, -79.94], 'Virginia Beach, VA': [36.85, -75.98],
  'Arlington, VA': [38.88, -77.10],
  'Washington, DC': [38.91, -77.04], 'Bowie, MD': [38.94, -76.73],
  'Bladensburg, MD': [38.94, -76.93], 'Ft. Washington, MD': [38.73, -77.01],
  'Upper Marlboro, MD': [38.82, -76.75], 'Baltimore, MD': [39.29, -76.61],
  'Beltsville, MD': [39.03, -76.91], 'Clinton, MD': [38.76, -76.90],
  'Angola, NY': [42.64, -79.03], 'White Plains, NY': [41.03, -73.77],
  'West Orange, NJ': [40.80, -74.24], 'Clifton Park, NY': [42.84, -73.80],
  'Westtown, NY': [41.33, -74.54], 'Jersey City, NJ': [40.73, -74.08],
  'Haddonfield, NJ': [39.89, -75.04], 'Scotch Plains, NJ': [40.64, -74.39],
  'Red Bank, NJ': [40.35, -74.06], 'Bloomfield, NJ': [40.81, -74.19],
  'Newark, NJ': [40.74, -74.17], 'Somerset, NJ': [40.50, -74.49],
  'Plainfield, NJ': [40.63, -74.41], 'Trenton, NJ': [40.22, -74.76],
  'Stewartsville, NJ': [40.69, -75.11], 'Manhasset, NY': [40.80, -73.70],
  'Peekskill, NY': [41.29, -73.92], 'Syracuse, NY': [43.05, -76.15],
  'Bronx, NY': [40.84, -73.87],
  'Allentown, PA': [40.60, -75.49], 'Philadelphia, PA': [39.95, -75.17],
  'Lancaster, PA': [40.04, -76.31], 'Blue Bell, PA': [40.15, -75.27],
  'Wayne, PA': [40.04, -75.39], 'Norristown, PA': [40.12, -75.34],
  'Merion, PA': [40.00, -75.25],
  'Los Angeles, CA': [34.05, -118.24], 'Pacific Palisades, CA': [34.04, -118.53],
  'Rolling Hills, CA': [33.76, -118.36], 'Corona, CA': [33.88, -117.57],
  'Huntington Beach, CA': [33.66, -117.99], 'Elk Grove, CA': [38.41, -121.37],
  'San Francisco, CA': [37.77, -122.42], 'Oakland, CA': [37.80, -122.27],
  'Sherman Oaks, CA': [34.15, -118.45], 'Kentfield, CA': [37.95, -122.56],
  'Scottsdale, AZ': [33.49, -111.93], 'Phoenix, AZ': [33.45, -112.07],
  'El Paso, TX': [31.76, -106.49], 'Lancaster, TX': [32.59, -96.76],
  'DeSoto, TX': [32.59, -96.86], 'Houston, TX': [29.76, -95.37],
  'San Antonio, TX': [29.42, -98.49], 'St. Louis, MO': [38.63, -90.20],
  'Chicago, IL': [41.88, -87.63], 'Chicago Heights, IL': [41.51, -87.64],
  'Park Forest, IL': [41.49, -87.67], 'University Park, IL': [41.44, -87.68],
  'Westchester, IL': [41.85, -87.88], 'Yorkville, IL': [41.64, -88.45],
  'Lake Forest, IL': [42.26, -87.84], 'Northbrook, IL': [42.13, -87.83],
  'Joliet, IL': [41.53, -88.08], 'Lincoln, IL': [40.15, -89.36],
  'Warsaw, IN': [41.24, -85.85], 'New Castle, IN': [39.93, -85.37],
  'Carmel, IN': [39.98, -86.12], 'Indianapolis, IN': [39.77, -86.16],
  'Golden Valley, MN': [44.99, -93.35], 'Apple Valley, MN': [44.73, -93.22],
  'Rochester, MN': [44.02, -92.47], 'Minneapolis, MN': [44.98, -93.27],
  'Shoreview, MN': [45.08, -93.15],
  'Livonia, MI': [42.37, -83.35], 'Birmingham, MI': [42.55, -83.21],
  'Milwaukee, WI': [43.04, -87.91],
  'Shrewsbury, MA': [42.30, -71.71], 'Weston, MA': [42.37, -71.30],
  'Boston, MA': [42.36, -71.06], 'Belmont, MA': [42.40, -71.18],
  'Wakefield, RI': [41.44, -71.50],
  'Ridgefield, CT': [41.28, -73.50],
  'Mobile, AL': [30.69, -88.04], 'Macon, GA': [32.84, -83.63],
  'Atlanta, GA': [33.75, -84.39], 'Augusta, GA': [33.47, -81.97],
  'Roswell, GA': [34.02, -84.36], 'Alpharetta, GA': [34.08, -84.29],
  'Gainesville, GA': [34.30, -83.82], 'Buford, GA': [34.12, -83.99],
  'Baton Rouge, LA': [30.45, -91.19], 'Slidell, LA': [30.28, -89.78],
  'Jackson, MS': [32.30, -90.18], 'Meridian, MS': [32.36, -88.70],
  'Memphis, TN': [35.15, -90.05],
  'Jacksonville, FL': [30.33, -81.66], 'Winter Park, FL': [28.60, -81.34],
  'Southwest Ranches, FL': [26.06, -80.34], 'Windermere, FL': [28.50, -81.53],
  'Miami, FL': [25.76, -80.19], 'Tampa, FL': [27.95, -82.46],
  'Midwest City, OK': [35.45, -97.40],
  'Spartanburg, SC': [34.95, -81.93],
  'Hopkinsville, KY': [36.87, -87.49],
  'Lakewood, CO': [39.70, -105.08], 'Denver, CO': [39.74, -104.99],
  'Colorado Springs, CO': [38.83, -104.82],
  'Mercer Island, WA': [47.57, -122.22], 'Seattle, WA': [47.61, -122.33],
  'Alpine, UT': [40.45, -111.78], 'Medford, OR': [42.33, -122.87],
  'Lake Oswego, OR': [45.42, -122.67], 'Anchorage, AK': [61.22, -149.90],
  'Juneau, AK': [58.30, -134.42], 'Las Vegas, NV': [36.17, -115.14],
  'Columbus, OH': [39.96, -82.99], 'Whitehall, OH': [39.97, -82.89],
  'Franklin, OH': [39.56, -84.30],
  'Princeton, WV': [37.37, -81.10],
  'Newport, ME': [44.84, -69.27], 'New Castle, DE': [39.66, -75.57],
  'Kansas City, KS': [39.11, -94.63], 'Ottawa, KS': [38.62, -95.27],
  'O\'Fallon, MO': [38.81, -90.70],
  // International
  'St. Catharines, Ontario': [43.16, -79.24], 'London, England': [51.51, -0.13],
  'Melbourne, Australia': [-37.81, 144.96], 'Mississauga, Canada': [43.59, -79.64],
  'Kaduna, Nigeria': [10.52, 7.43], 'Zagreb, Croatia': [45.81, 15.98],
  'Traralgon, Australia': [-38.20, 146.54], 'Istanbul, Turkey': [41.01, 28.98],
  'Sydney, Australia': [-33.87, 151.21], 'Benin City, Nigeria': [6.34, 5.63],
  'Rumbek, South Sudan': [6.81, 29.68], 'Oderzo, Italy': [45.78, 12.49],
};

// Simple Mercator-ish projection for US lower 48
function projectUS(lat, lng) {
  const minLat = 24, maxLat = 50, minLng = -125, maxLng = -66;
  const x = ((lng - minLng) / (maxLng - minLng)) * 100;
  const y = ((maxLat - lat) / (maxLat - minLat)) * 100;
  return [x, y];
}

const eraColors = {
  foundation: '#8B4513',
  dynasty1: '#C5A258',
  transition: '#6B8E23',
  dynasty2: '#B22222',
  between: '#4169E1',
  resurgence: '#2E8B57',
  superteam: '#9932CC',
  scheyer: '#FF6347',
};

const eraNames = {
  foundation: 'Foundation', dynasty1: 'First Dynasty', transition: 'Transition',
  dynasty2: 'Second Dynasty', between: 'In Between', resurgence: 'Resurgence',
  superteam: 'Superteam', scheyer: 'Scheyer Era',
};

export default function RecruitingMap() {
  const [hovered, setHovered] = useState(null);
  const [filterEra, setFilterEra] = useState('all');

  const players = useMemo(() => {
    return data.players
      .filter(p => p.hometown && p.hometown !== '' && COORDS[p.hometown])
      .map(p => {
        const [lat, lng] = COORDS[p.hometown];
        const isUS = lat > 24 && lat < 62 && lng < -60 && lng > -170;
        return { ...p, lat, lng, isUS };
      });
  }, []);

  const filtered = filterEra === 'all' ? players : players.filter(p => p.era === filterEra);
  const usPlayers = filtered.filter(p => p.isUS);
  const intlPlayers = filtered.filter(p => !p.isUS);

  // Group overlapping pins
  const grouped = {};
  usPlayers.forEach(p => {
    const key = p.hometown;
    if (!grouped[key]) grouped[key] = { ...p, players: [] };
    grouped[key].players.push(p);
  });
  const pins = Object.values(grouped);

  // State counts for top states
  const stateCounts = {};
  usPlayers.forEach(p => {
    const st = p.hometown.split(',').pop().trim();
    stateCounts[st] = (stateCounts[st] || 0) + 1;
  });
  const topStates = Object.entries(stateCounts).sort((a, b) => b[1] - a[1]).slice(0, 8);

  return (
    <Layout
      title="Recruiting Map"
      description="Where Duke gets its players — hometown map of all 200+ Brotherhood members from 1981 to present."
      canonical="/viz/map/"
    >
      <div className="bg-duke-slate py-12">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="font-mono text-xs text-duke-goldLight mb-6 tracking-wider">
            <a href="/" className="hover:text-duke-gold">Home</a>
            <span className="mx-2">/</span>
            <span className="text-duke-gold">Recruiting Map</span>
          </nav>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-1">
            Where Duke Gets Its Players
          </h1>
          <p className="font-body text-duke-goldLight text-lg mb-6">
            {filtered.length} players mapped by hometown, 1981&ndash;2026
          </p>

          {/* Era filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setFilterEra('all')}
              className={`px-3 py-1 font-mono text-xs rounded-full transition-colors ${
                filterEra === 'all' ? 'bg-duke-gold text-duke-navyDark' : 'bg-white/10 text-duke-goldLight hover:bg-white/20'
              }`}
            >
              All Eras
            </button>
            {Object.entries(eraNames).map(([key, name]) => (
              <button
                key={key}
                onClick={() => setFilterEra(key)}
                className={`px-3 py-1 font-mono text-xs rounded-full transition-colors ${
                  filterEra === key ? 'text-duke-navyDark' : 'bg-white/10 text-duke-goldLight hover:bg-white/20'
                }`}
                style={filterEra === key ? { background: eraColors[key] } : {}}
              >
                {name}
              </button>
            ))}
          </div>

          {/* US Map */}
          <div className="relative rounded-lg overflow-hidden" style={{ background: '#0d1f3c', paddingBottom: '52%' }}>
            {/* Durham marker */}
            {(() => {
              const [dx, dy] = projectUS(35.99, -78.90);
              return (
                <div
                  className="absolute"
                  style={{ left: `${dx}%`, top: `${dy}%`, transform: 'translate(-50%, -50%)', zIndex: 5 }}
                >
                  <div className="w-4 h-4 rounded-full border-2 border-duke-gold bg-duke-gold/30 animate-pulse" />
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 font-mono text-[9px] text-duke-gold whitespace-nowrap font-bold">
                    DUKE
                  </div>
                </div>
              );
            })()}

            {/* Player pins */}
            {pins.map((pin, i) => {
              const [x, y] = projectUS(pin.lat, pin.lng);
              const count = pin.players.length;
              const size = Math.min(6 + count * 3, 20);
              const isHovered = hovered === pin.hometown;

              return (
                <div
                  key={pin.hometown}
                  className="absolute cursor-pointer transition-all duration-150"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: isHovered ? 50 : 10,
                  }}
                  onMouseEnter={() => setHovered(pin.hometown)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div
                    className="rounded-full transition-all duration-150"
                    style={{
                      width: size,
                      height: size,
                      background: count > 1 ? '#C5A258' : (pin.players[0].status === 'done' ? '#C5A258' : '#4a7ab5'),
                      opacity: isHovered ? 1 : 0.8,
                      boxShadow: isHovered ? '0 0 12px rgba(197,162,88,0.6)' : 'none',
                      border: isHovered ? '2px solid white' : 'none',
                    }}
                  />

                  {/* Tooltip */}
                  {isHovered && (
                    <div
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg shadow-xl pointer-events-none whitespace-nowrap"
                      style={{ background: '#1a2d4d', border: '1px solid #2a4a7f', zIndex: 100 }}
                    >
                      <div className="font-mono text-xs text-duke-gold font-bold">{pin.hometown}</div>
                      {pin.players.map(p => (
                        <div key={p.name} className="font-body text-xs text-white/80">
                          {p.name} <span className="text-white/50">({p.years})</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* International players */}
          {intlPlayers.length > 0 && (
            <div className="mt-6 rounded-lg p-4" style={{ background: '#111d33', border: '1px solid #2a4a7f' }}>
              <h3 className="font-mono text-xs text-duke-gold uppercase tracking-wider mb-3">
                International ({intlPlayers.length})
              </h3>
              <div className="flex flex-wrap gap-3">
                {intlPlayers.map(p => (
                  <div key={p.name} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: eraColors[p.era] }} />
                    {p.status === 'done' ? (
                      <a href={`/players/${p.slug}/`} className="font-body text-sm text-duke-gold hover:text-duke-goldLight">
                        {p.name}
                      </a>
                    ) : (
                      <span className="font-body text-sm text-white/60">{p.name}</span>
                    )}
                    <span className="font-mono text-xs text-white/40">{p.hometown}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top states */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {topStates.map(([st, count]) => (
              <div key={st} className="rounded-lg text-center py-3" style={{ background: '#111d33' }}>
                <div className="font-display text-duke-gold text-2xl font-bold">{count}</div>
                <div className="font-mono text-xs text-white/60">{st}</div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-6 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-duke-gold" />
              <span className="font-mono text-xs text-duke-goldLight">Profiled</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: '#4a7ab5' }} />
              <span className="font-mono text-xs text-white/60">Roster</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border-2 border-duke-gold bg-duke-gold/30" />
              <span className="font-mono text-xs text-duke-gold">Durham (Duke)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-duke-gold/60" />
              <span className="font-mono text-xs text-duke-goldLight">Multiple players</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
