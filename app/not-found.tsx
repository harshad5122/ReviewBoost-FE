import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-white px-6 py-20">
      <section className="mx-auto max-w-xl rounded-2xl border border-gray-200 p-10 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">Error 404</p>
        <h1 className="mb-4 text-4xl font-bold text-black">Page not found</h1>
        <p className="mb-8 text-gray-700">
          The page you requested doesn&apos;t exist or may have moved.
        </p>
        <Link
          href="/"
          className="inline-flex rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-900"
        >
          Back to Homepage
        </Link>
      </section>
    </main>
  );
}
