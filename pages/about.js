import Layout from '../components/Layout';

export default function About() {
  return (
    <Layout
      title="About This Project"
      description="About Duke's Brotherhood: Where Are They Now? — an independent documentary profile series."
      canonical="/about/"
    >
      <section className="bg-duke-slate text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-display text-4xl font-bold">About This Project</h1>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-10">
        <article className="font-body text-lg leading-relaxed space-y-6">
          <p>
            <strong className="font-display text-duke-navy">Duke&rsquo;s Brotherhood: Where Are They Now?</strong> is
            an independent documentary profile series covering every significant player across eight eras
            of Duke basketball &mdash; from Coach K&rsquo;s arrival in 1981 through the Jon Scheyer era.
          </p>
          <p>
            Each profile tells four stories: how the player got to Duke, what made them special
            in Durham, what happened after they left, and where they are now. The profiles are
            deeply researched, narrative-driven, and built around the human details that box
            scores can&rsquo;t capture &mdash; the families, the turning points, the moments that
            defined careers and lives.
          </p>
          <p>
            The project currently includes {80} players across {8} eras, with {51} full profiles
            complete and more in development. This is a living document that grows over time.
          </p>
          <p className="text-sm text-gray-500 italic">
            This project is not affiliated with Duke University, Duke Athletics, or the NCAA.
            All content is original research and commentary. Player statistics sourced from
            public records.
          </p>
        </article>
      </section>
    </Layout>
  );
}
