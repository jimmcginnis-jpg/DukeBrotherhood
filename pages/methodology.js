import Link from 'next/link';
import Layout from '../components/Layout';

export default function Methodology() {
  return (
    <Layout
      title="Sources & Methodology"
      description="How Duke's Brotherhood profiles are researched and written — our sources, our process, and our commitment to accuracy."
      canonical="/methodology/"
    >
      <section className="bg-duke-slate text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-display text-4xl font-bold mb-4">Sources &amp; Methodology</h1>
          <p className="font-body text-duke-goldLight text-lg italic">
            How these profiles are researched, written, and verified.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-10">
        <article className="font-body text-lg leading-relaxed space-y-6 text-duke-slate">

          <h2 className="font-display text-2xl text-duke-navy mt-8 mb-3">What This Project Is</h2>
          <p>
            Duke&rsquo;s Brotherhood is an independent narrative journalism project. Each profile
            is a deeply researched biographical essay that synthesizes dozens of sources into a
            coherent story &mdash; following a player from their childhood through their Duke
            career, their professional life, and where they are today. The goal is to tell human
            stories, not to produce encyclopedia entries.
          </p>
          <p>
            The writing style is narrative and literary, in the tradition of longform sports
            journalism. Think Wright Thompson, Marc Spears at Andscape, or the best profiles
            in Sports Illustrated and The Athletic. The profiles use specific detail, direct
            quotes, and emotional texture to bring these stories to life.
          </p>

          <h2 className="font-display text-2xl text-duke-navy mt-8 mb-3">Our Sources</h2>
          <p>
            Every profile is built from multiple published sources. We do not conduct original
            interviews (yet), but we draw on an extensive range of published material, including:
          </p>

          <div className="bg-duke-cream border border-gray-200 p-6 my-6">
            <div className="grid md:grid-cols-2 gap-4 text-base">
              <div>
                <p className="font-display text-duke-navy font-semibold mb-2">Primary Sources</p>
                <p className="text-gray-600">
                  Official Duke Athletics player bios and stats (GoDuke.com), 
                  Basketball Reference and Sports Reference for career statistics,
                  NBA.com draft profiles and official team pages,
                  USA Basketball athlete profiles,
                  university press releases and official statements
                </p>
              </div>
              <div>
                <p className="font-display text-duke-navy font-semibold mb-2">Feature Reporting</p>
                <p className="text-gray-600">
                  ESPN features and E60 documentaries,
                  The Athletic and Andscape profiles,
                  local newspaper coverage (Philadelphia Inquirer, Charlotte Observer, 
                  Chicago Tribune, Bangor Daily News, Milwaukee Journal Sentinel),
                  The Ringer, Grantland, Sports Illustrated longform
                </p>
              </div>
              <div>
                <p className="font-display text-duke-navy font-semibold mb-2">Broadcast &amp; Video</p>
                <p className="text-gray-600">
                  Player interviews on ESPN, CBS, FOX Sports, TNT,
                  press conference transcripts,
                  YouTube documentaries and docuseries,
                  podcast appearances and player-produced content
                </p>
              </div>
              <div>
                <p className="font-display text-duke-navy font-semibold mb-2">Historical &amp; Archival</p>
                <p className="text-gray-600">
                  Duke Chronicle archives,
                  obituaries and memorial tributes,
                  Hall of Fame induction materials,
                  recruiting service evaluations (247Sports, ESPN, Rivals),
                  Wikimedia Commons for historical imagery
                </p>
              </div>
            </div>
          </div>

          <h2 className="font-display text-2xl text-duke-navy mt-8 mb-3">How Quotes Are Handled</h2>
          <p>
            Every direct quote in a profile comes from a published source &mdash; a newspaper
            article, a broadcast interview, a press conference, a social media post, or an
            official statement. We do not fabricate or reconstruct quotes. When a profile says
            a player or coach said something, that quote appeared in a published source that
            we identified during research.
          </p>
          <p>
            Quotes are sometimes lightly edited for clarity (removing verbal tics like
            &ldquo;you know&rdquo; or &ldquo;um&rdquo;) but never altered in meaning. When
            we paraphrase rather than quote directly, we indicate this through narrative
            framing rather than quotation marks.
          </p>

          <h2 className="font-display text-2xl text-duke-navy mt-8 mb-3">How Statistics Are Verified</h2>
          <p>
            Career and season statistics come from official sources: Basketball Reference
            for professional careers, Sports Reference for college careers, and GoDuke.com
            for Duke-specific records. When sources conflict on minor statistical points,
            we default to the official university or league source.
          </p>

          <h2 className="font-display text-2xl text-duke-navy mt-8 mb-3">Source Lists Per Profile</h2>
          <p>
            Each completed profile includes a curated list of key sources at the bottom of
            the page. These are not exhaustive bibliographies &mdash; they represent the
            most significant sources that informed the narrative. We prioritize original
            reporting (newspaper features, longform profiles, documentaries) over aggregator
            sites, and we link to source material where available so readers can go deeper.
          </p>

          <h2 className="font-display text-2xl text-duke-navy mt-8 mb-3">Corrections &amp; Contact</h2>
          <p>
            We take accuracy seriously. If you find an error in a profile &mdash; a wrong
            date, a misattributed quote, a factual inaccuracy &mdash; we want to hear about it.
            We will correct it promptly and note the correction. These stories matter to the
            players and families involved, and getting them right is our responsibility.
          </p>
          <div className="bg-duke-cream border border-duke-gold p-6 my-4 text-center">
            <p className="font-display text-duke-navy text-lg font-semibold mb-2">
              Have a correction, a story tip, or a memory to share?
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeoKBfk-yt_EugBh61OVTvhqzxiSvHZRApTaDrwIwt-S7HIfA/viewform?usp=publish-editor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-duke-navy text-duke-gold font-display font-bold px-6 py-3 mt-2 hover:bg-duke-slate transition-colors"
            >
              Contact Us &rarr;
            </a>
            <p className="text-sm text-gray-500 mt-2 italic">Opens a Google Form in a new tab</p>
          </div>
          <p>
          </p>

          <h2 className="font-display text-2xl text-duke-navy mt-8 mb-3">A Note on Completeness</h2>
          <p>
            This is a living project. As of March 2026, we have completed {63} of {85} profiles
            across eight eras of Duke basketball. New profiles are added regularly, and existing
            profiles are updated as players&rsquo; careers and lives evolve. The &ldquo;Where Is
            He Now&rdquo; section of each profile reflects the most recent information available
            at the time of writing.
          </p>

          <div className="era-divider my-8" />

          <p className="text-sm text-gray-500 italic">
            Duke&rsquo;s Brotherhood is an independent project and is not affiliated with Duke
            University, Duke Athletics, or the NCAA. All content is original research and
            commentary. Player statistics are sourced from public records.
          </p>

        </article>
      </section>
    </Layout>
  );
}
