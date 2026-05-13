import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b sticky top-0 bg-white z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          ReviewBoost AI
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/">Home</Link>

          <Link href="/about-us">About</Link>

          <Link href="/contact-us">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
