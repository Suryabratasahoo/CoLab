import Link from "next/link"
import { Youtube, Twitter, Linkedin, Facebook, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          <div className="lg:col-span-1">
            <Link href="/" className="text-2xl font-bold text-white mb-4 block">
              Colab.
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              Building the future of student collaboration, one team at a time.
            </p>
            <p className="text-sm mb-2">help@colab.com</p>
            <p className="text-sm mb-6">+1 (555) 123-4567</p>

            <div className="flex gap-3">
              <Link
                href="#"
                className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Features</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Team Matching
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Project Spaces
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Skill Tags
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Campus Network
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Use Cases</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Hackathons
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Group Projects
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Startup Ideas
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Tech Clubs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Campus List
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm">
          © {new Date().getFullYear()} Colab Inc. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
