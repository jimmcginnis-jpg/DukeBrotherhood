// pages/viz/nba.js
// Duke Players in the NBA by Season — bar chart visualization

import { useState, useMemo } from 'react';
import Layout from '../../components/Layout';
import data from '../../data/players.json';

const eraRanges = {
  foundation: ['1981-82','1985-86'],
  dynasty1: ['1986-87','1993-94'],
  transition: ['1994-95','1997-98'],
  dynasty2: ['1998-99','2003-04'],
  between: ['2004-05','2008-09'],
  resurgence: ['2009-10','2014-15'],
  superteam: ['2015-16','2021-22'],
  scheyer: ['2022-23','2025-26'],
};

function getEraForSeason(season) {
  for (const [era, [start, end]] of Object.entries(eraRanges)) {
    if (season >= start && season <= end) return era;
  }
  return 'scheyer';
}

const eraColors = {
  foundation: '#8B4513', dynasty1: '#C5A258', transition: '#6B8E23',
  dynasty2: '#B22222', between: '#4169E1', resurgence: '#2E8B57',
  superteam: '#9932CC', scheyer: '#FF6347',
};

export default function NBAViz() {
  const [hoveredSeason, setHoveredSeason] = useState(null);

  // Build per-season data with deduplication
  const seasonData = useMemo(() => {
    const seasons = {};

    data.players.forEach(p => {
      if (!p.nba || !p.nba.teams || !Array.isArray(p.nba.teams)) return;
      const seenSeasons = new Set();
      p.nba.teams.forEach(t => {
        if (!t.seasons || !Array.isArray(t.seasons)) return;
        t.seasons.forEach(s => {
          // Skip malformed entries
          if (!s || s.length < 7) return;
          if (seenSeasons.has(s)) return; // deduplicate within player
          seenSeasons.add(s);
          if (!seasons[s]) seasons[s] = [];
          seasons[s].push({
            name: p.name,
            slug: p.slug,
            status: p.status,
            team: t.team,
          });
        });
      });
    });

    // Sort by season and filter to valid NBA seasons
    return Object.entries(seasons)
      .filter(([s]) => s.match(/^\d{4}-\d{2,4}$/))
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([season, players]) => ({
        season,
        count: players.length,
        players,
        era: getEraForSeason(season),
        label: season.split('-')[0] + '-' + season.split('-')[1].slice(-2),
      }));
  }, []);

  const maxCount = Math.max(...seasonData.map(s => s.count));
  const hoveredData = hoveredSeason ? seasonData.find(s => s.season === hoveredSeason) : null;

  // Stats
  const currentSeason = seasonData[seasonData.length - 1];
  const peak = seasonData.reduce((a, b) => b.count > a.count ? b : a, seasonData[0]);
  const totalPlayerSeasons = seasonData.reduce((sum, s) => sum + s.count, 0);

  return (
    <Layout
      title="Duke in the NBA"
      description="How many Duke players were in the NBA each season from 1986 to present."
      canonical="/viz/nba/"
    >
      <div className="bg-duke-slate py-12">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="font-mono text-xs text-duke-goldLight mb-6 tracking-wider">
            <a href="/" className="hover:text-duke-gold">Home</a>
            <span className="mx-2">/</span>
            <a href="/viz/" className="hover:text-duke-gold">Viz</a>
            <span className="mx-2">/</span>
            <span className="text-duke-gold">Duke in the NBA</span>
          </nav>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-1">
            Duke in the NBA
          </h1>
          <p className="font-body text-duke-goldLight text-lg mb-6">
            {seasonData.length} seasons of Brotherhood representation in the league
          </p>

          {/* Stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <div className="rounded-lg text-center py-3" style={{ background: '#111d33' }}>
              <div className="font-display text-duke-gold text-2xl font-bold">{currentSeason?.count}</div>
              <div className="font-mono text-xs text-white/60">Current ({currentSeason?.label})</div>
            </div>
            <div className="rounded-lg text-center py-3" style={{ background: '#111d33' }}>
              <div className="font-display text-duke-gold text-2xl font-bold">{peak.count}</div>
              <div className="font-mono text-xs text-white/60">Peak ({peak.label})</div>
            </div>
            <div className="rounded-lg text-center py-3" style={{ background: '#111d33' }}>
              <div className="font-display text-duke-gold text-2xl font-bold">{totalPlayerSeasons}</div>
              <div className="font-mono text-xs text-white/60">Total Player-Seasons</div>
            </div>
            <div className="rounded-lg text-center py-3" style={{ background: '#111d33' }}>
              <div className="font-display text-duke-gold text-2xl font-bold">{seasonData.length}</div>
              <div className="font-mono text-xs text-white/60">Consecutive Seasons</div>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="rounded-lg p-4 md:p-6" style={{ background: '#0d1f3c' }}>
            {/* Y-axis labels */}
            <div className="flex items-end gap-1" style={{ height: 350 }}>
              <div className="flex flex-col justify-between h-full w-8 shrink-0 text-right pr-1">
                {[maxCount, Math.round(maxCount * 0.75), Math.round(maxCount * 0.5), Math.round(maxCount * 0.25), 0].map((v, i) => (
                  <span key={i} className="font-mono text-[10px] text-white/30">{v}</span>
                ))}
              </div>

              {/* Bars */}
              <div className="flex-1 flex items-end gap-[1px] md:gap-[2px] h-full relative">
                {/* Grid lines */}
                {[0.25, 0.5, 0.75, 1].map(pct => (
                  <div
                    key={pct}
                    className="absolute left-0 right-0 border-t border-white/5"
                    style={{ bottom: `${pct * 100}%` }}
                  />
                ))}

                {seasonData.map(s => {
                  const heightPct = (s.count / maxCount) * 100;
                  const isHovered = hoveredSeason === s.season;
                  return (
                    <div
                      key={s.season}
                      className="flex-1 flex flex-col justify-end h-full cursor-pointer relative group"
                      onMouseEnter={() => setHoveredSeason(s.season)}
                      onMouseLeave={() => setHoveredSeason(null)}
                    >
                      <div
                        className="w-full rounded-t-sm transition-all duration-150"
                        style={{
                          height: `${heightPct}%`,
                          background: isHovered ? '#C5A258' : eraColors[s.era],
                          opacity: isHovered ? 1 : 0.8,
                          boxShadow: isHovered ? '0 0 8px rgba(197,162,88,0.4)' : 'none',
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* X-axis labels — show every 5th season */}
            <div className="flex ml-8 mt-1">
              <div className="flex-1 flex gap-[1px] md:gap-[2px]">
                {seasonData.map((s, i) => (
                  <div key={s.season} className="flex-1 text-center">
                    {i % 5 === 0 && (
                      <span className="font-mono text-[8px] md:text-[10px] text-white/30 whitespace-nowrap">
                        {s.season.split('-')[0].slice(-2)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Era legend */}
            <div className="flex flex-wrap gap-3 mt-4 justify-center">
              {Object.entries(eraColors).map(([era, color]) => (
                <div key={era} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
                  <span className="font-mono text-[10px] text-white/50 capitalize">
                    {era === 'dynasty1' ? 'Dynasty I' : era === 'dynasty2' ? 'Dynasty II' : era}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Hover detail panel */}
          <div
            className="mt-4 rounded-lg p-4 transition-all duration-200"
            style={{
              background: '#111d33',
              border: '1px solid #2a4a7f',
              minHeight: 120,
              opacity: hoveredData ? 1 : 0.5,
            }}
          >
            {hoveredData ? (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-display text-xl text-duke-gold font-bold">{hoveredData.season}</span>
                  <span className="font-mono text-sm text-white/60">{hoveredData.count} Duke players in the NBA</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {hoveredData.players.map((p, i) => (
                    p.status === 'done' ? (
                      <a
                        key={i}
                        href={`/players/${p.slug}/`}
                        className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-mono transition-colors bg-duke-gold/10 text-duke-gold hover:bg-duke-gold/20"
                      >
                        {p.name}
                      </a>
                    ) : (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-mono bg-white/5 text-white/50"
                      >
                        {p.name}
                      </span>
                    )
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <span className="font-mono text-sm text-white/30">Hover over a bar to see who was in the NBA that season</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
