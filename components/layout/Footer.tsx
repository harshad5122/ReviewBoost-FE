import Link from "next/link";
import { Globe, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black px-6 py-14 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-4">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">ReviewBoost AI</h2>
            <p className="text-sm text-gray-400">
              AI-powered review growth and local SEO software for modern service businesses.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-semibold">Platform</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="transition hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/best/restaurant/new-york" className="transition hover:text-white">
                  SEO Demo
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="transition hover:text-white">
                  Dashboard
                </Link>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="font-semibold">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/about-us" className="transition hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="transition hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/privacy-policy" className="transition hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="transition hover:text-white">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="transition hover:text-white">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-gray-800 pt-8 md:flex-row md:items-center">
          <p className="text-sm text-gray-400">© 2026 ReviewBoost AI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="mailto:support@reviewboost.ai"
              className="text-gray-400 transition hover:text-white"
              aria-label="Email support"
            >
              <Mail size={18} />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 transition hover:text-white"
              aria-label="Company website"
            >
              <Globe size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
