import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-5 pt-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Error 404</p>
      <h1 className="mt-4 font-display text-5xl font-semibold text-fg md:text-6xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-muted">
        The page you are looking for does not exist or the property may have been removed.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn-gold">
          Back to home
        </Link>
        <Link href="/properties" className="btn-outline">
          Browse properties
        </Link>
      </div>
    </section>
  );
}