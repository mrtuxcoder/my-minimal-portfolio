export default function Loading() {
  return (
    <section>
      <div className="container">
        <div className="section-surface border-x border-primary/10">
          <article className="mx-auto max-w-4xl space-y-6 sm:space-y-10 px-4 py-6 sm:px-7 sm:py-12 md:py-16 animate-pulse">
            <header className="space-y-2 sm:space-y-3">
              <div className="h-3.5 w-24 rounded bg-primary/10" />
              <div className="h-8 w-3/4 rounded bg-primary/10" />
              <div className="h-4 w-1/2 rounded bg-primary/10" />
            </header>
            <div className="space-y-4 border-t border-primary/10 pt-8">
              <div className="h-6 w-48 rounded bg-primary/10" />
              <div className="h-4 w-full rounded bg-primary/10" />
              <div className="h-4 w-5/6 rounded bg-primary/10" />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
