// pages/lists/charities.js

import Head from 'next/head';
import Link from 'next/link';
import playersData from '../../data/players.json';

const players = playersData.players.filter(p => p.status === 'done' && p.charity);
const customCharities = players.filter(p => !p.charity.isDefault);
const defaultCharities = players.filter(p => p.charity.isDefault);

// Deduplicate defaults into the 3 foundations with player counts
const defaultGroups = {};
defaultCharities.forEach(p => {
  const key = p.charity.name;
  if (!defaultGroups[key]) {
    defaultGroups[key] = { ...p.charity, players: [] };
  }
  defaultGroups[key].players.push(p);
});
const defaultList = Object.values(defaultGroups);

// Group custom charities — some charities are shared (e.g. Luol Deng Foundation)
const customGroups = {};
customCharities.forEach(p => {
  const key = p.charity.url;
  if (!customGroups[key]) {
    customGroups[key] = { ...p.charity, players: [] };
  }
  customGroups[key].players.push(p);
});
const customList = Object.values(customGroups);

function ExternalIcon() {
  return (
    <svg className="inline w-3.5 h-3.5 ml-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg className="w-5 h-5 text-[#C5A258]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  );
}

function CharityCard({ charity, featured }) {
  const playerNames = charity.players.map(p => ({
    name: p.name,
    slug: p.slug,
    status: p.status,
  }));

  return (
    <div className={`rounded-xl border ${featured ? 'border-[#C5A258] bg-gradient-to-br from-[#001A57]/[0.02] to-[#C5A258]/[0.04]' : 'border-gray-200 bg-white'} p-6 hover:shadow-lg transition-shadow`}>
      <div className="flex items-start justify-between mb-3">
        <h3 className={`text-lg font-bold ${featured ? 'text-[#001A57]' : 'text-gray-800'}`}>
          {charity.name}
        </h3>
        {featured && <HeartIcon />}
      </div>

      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        {charity.description}
      </p>

      <div className="mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          {featured ? 'Connected to' : 'Supporting'}
        </span>
        <div className="flex flex-wrap gap-1.5 mt-1.5">
          {playerNames.length <= 8 ? (
            playerNames.map(p => (
              p.status === 'done' ? (
                <Link
                  key={p.slug}
                  href={`/players/${p.slug}`}
                  className="inline-block text-xs bg-[#001A57]/10 text-[#001A57] px-2 py-0.5 rounded-full hover:bg-[#001A57] hover:text-white transition-colors"
                >
                  {p.name}
                </Link>
              ) : (
                <span key={p.name} className="inline-block text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                  {p.name}
                </span>
              )
            ))
          ) : (
            <span className="text-sm text-gray-500">
              {playerNames.length} Brotherhood players
            </span>
          )}
        </div>
      </div>

      <a
        href={charity.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center text-sm font-semibold ${featured ? 'text-[#C5A258] hover:text-[#001A57]' : 'text-[#001A57] hover:text-[#C5A258]'} transition-colors`}
      >
        {charity.label}
        <ExternalIcon />
      </a>
    </div>
  );
}

export default function CharitiesPage() {
  const totalOrgs = customList.length + defaultList.length;

  return (
    <>
      <Head>
        <title>Charities the Brotherhood Supports | Duke&apos;s Brotherhood: Where Are They Now?</title>
        <meta name="description" content={`${totalOrgs} charitable organizations supported by Duke's Brotherhood — from player-specific foundations to Duke-connected causes. Every profile links to a way to give back.`} />
      </Head>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#001A57]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/lists" className="hover:text-[#001A57]">Lists</Link>
          <span className="mx-2">/</span>
          <span className="text-[#001A57]">Charities</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-[#001A57] mb-2">
          Charities the Brotherhood Supports
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          The Brotherhood isn&apos;t just about basketball. Every profiled player links to a charitable
          organization — some deeply personal to their story, others connected to Duke&apos;s legacy of giving back.
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-10 pb-6 border-b border-gray-200">
          <span className="flex items-center gap-2">
            <HeartIcon />
            <span><strong className="text-[#001A57]">{customList.length}</strong> player-specific foundations</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full bg-[#001A57]"></span>
            <span><strong className="text-[#001A57]">{defaultList.length}</strong> Duke-connected charities</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full bg-gray-300"></span>
            <span><strong className="text-gray-700">{players.length}</strong> total players with charity links</span>
          </span>
        </div>

        {/* ── Player-Specific Charities ── */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-[#001A57] mb-1">Player-Specific Foundations</h2>
          <p className="text-gray-500 mb-6">
            These charities are directly tied to a Brotherhood player&apos;s personal story — causes they
            founded, survived, or championed.
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            {customList.map(c => (
              <CharityCard key={c.url} charity={c} featured />
            ))}
          </div>
        </section>

        {/* ── Duke-Connected Charities ── */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-[#001A57] mb-1">Duke-Connected Charities</h2>
          <p className="text-gray-500 mb-6">
            For players without a specific personal foundation, we rotate among three organizations
            with deep ties to the Duke basketball family. As we uncover more individual stories,
            these will be replaced with player-specific causes.
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            {defaultList.map(c => (
              <div key={c.url} className="rounded-xl border border-gray-200 bg-white p-5 hover:shadow-lg transition-shadow">
                <h3 className="text-base font-bold text-gray-800 mb-2">{c.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  {c.description}
                </p>
                <p className="text-xs text-gray-400 mb-3">
                  Featured on <strong className="text-gray-600">{c.players.length}</strong> Brotherhood profiles
                </p>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-semibold text-[#001A57] hover:text-[#C5A258] transition-colors"
                >
                  {c.label}
                  <ExternalIcon />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="bg-[#001A57]/[0.03] rounded-xl p-6 md:p-8 mb-10">
          <h2 className="text-xl font-bold text-[#001A57] mb-3">How Charity Links Work on This Site</h2>
          <div className="text-sm text-gray-600 space-y-2 leading-relaxed">
            <p>
              Every profiled Brotherhood player has a charity link at the bottom of their profile page.
              When we can tie a player to a specific cause — a foundation they started, a disease they or their
              family faced, or an organization that shaped their journey — we feature that charity directly.
            </p>
            <p>
              For players where we haven&apos;t yet identified a personal cause, we rotate among three
              Duke-connected organizations: <strong>Duke Children&apos;s Hospital</strong>,
              the <strong>Emily Krzyzewski Center</strong>, and <strong>The V Foundation for Cancer Research</strong>.
              These defaults are marked internally so we can replace them with player-specific charities as
              the project grows.
            </p>
            <p>
              The Duke Brotherhood project is not affiliated with any of these organizations.
              All links go directly to each charity&apos;s official donation page.
            </p>
          </div>
        </section>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <Link href="/lists" className="text-[#001A57] hover:text-[#C5A258] font-medium">
            &larr; All Lists &amp; Rankings
          </Link>
        </div>
      </div>
    </>
  );
}
