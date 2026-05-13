"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">ReviewBoost AI</h3>
            <p className="text-gray-400 text-sm">
              AI-powered Google review and local SEO platform for modern businesses
            </p>
            {/* <div className="flex gap-4">
              <a href="#" className="hover:text-blue-400 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <Github size={20} />
              </a>
            </div> */}
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-semibold">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/features" className="hover:text-white transition">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-white transition">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/about-us" className="hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-gray-400">
              © 2024 ReviewBoost AI. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <a
                href="mailto:support@reviewboost.ai"
                className="text-sm text-gray-400 hover:text-white transition flex items-center gap-2"
              >
                <Mail size={16} />
                support@reviewboost.ai
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
