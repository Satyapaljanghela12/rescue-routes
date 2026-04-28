import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer style={{ backgroundColor: '#2563EB' }} className="border-t border-white/10 pb-10 pt-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.7fr_0.8fr_1fr]">
          <div>
            <p className="text-xs font-fredoka font-semibold uppercase tracking-[0.28em] text-white/76">
              Rescue Routes
            </p>
            <h2 className="mt-4 font-fredoka text-5xl leading-none text-white">
              Building safer streets and softer landings for animals in need.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 font-poppins text-white/78">
              Rescue Routes exists to bring urgency, dignity, and community participation into
              every rescue, recovery, and adoption journey.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link
                href="https://www.facebook.com/rescueroutes/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 transition hover:bg-white hover:text-[#2563EB]"
                aria-label="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Link>
              <Link
                href="https://www.instagram.com/rescueroutes?igsh=cG0zeGpkZHgwNGk="
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 transition hover:bg-white hover:text-[#2563EB]"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
              <Link
                href="mailto:rescueroutes2020@gmail.com"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 transition hover:bg-white hover:text-[#2563EB]"
                aria-label="Email"
              >
                <Mail size={18} />
              </Link>
              <Link
                href="https://www.linkedin.com/company/rescue-routes/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 transition hover:bg-white hover:text-[#2563EB]"
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-fredoka font-semibold uppercase tracking-[0.22em] text-white/76">Explore</p>
            <div className="mt-5 flex flex-col gap-3 text-sm font-poppins text-white/78">
              <Link href="/about" className="transition hover:text-white">
                About Us
              </Link>
              <Link href="/mission" className="transition hover:text-white">
                Mission
              </Link>
              <Link href="/campaigns" className="transition hover:text-white">
                Campaigns
              </Link>
              <Link href="/stories" className="transition hover:text-white">
                Stories
              </Link>
              <Link href="/resources" className="transition hover:text-white">
                Resources & Guides
              </Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-fredoka font-semibold uppercase tracking-[0.22em] text-white/76">Support</p>
            <div className="mt-5 flex flex-col gap-3 text-sm font-poppins text-white/78">
              <Link href="/donate" className="transition hover:text-white">
                Donate
              </Link>
              <Link href="/membership" className="transition hover:text-white">
                Support Program
              </Link>
              <Link href="/volunteers" className="transition hover:text-white">
                Volunteer
              </Link>
              <Link href="/store" className="transition hover:text-white">
                Store
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/18 bg-white/10 p-6 backdrop-blur-sm">
              <p className="text-sm font-fredoka font-semibold uppercase tracking-[0.22em] text-white/76">
                Contact
              </p>
              <div className="mt-5 space-y-4 text-sm leading-7 font-poppins text-white/78">
                <div className="flex items-start gap-3">
                  <Phone className="mt-1 h-4 w-4 flex-shrink-0 text-white" />
                  <div>
                   
                    <p>+91 70672 23922</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-4 w-4 flex-shrink-0 text-white" />
                  <p>rescueroutes2020@gmail.com</p>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="mt-1 h-4 w-4 flex-shrink-0 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <p>@rescueroutes</p>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-white" />
                  <p>HIG-HC-7, Abhiruchi Parisar Old Subhash Nagar, Bhopal, (M.P.)</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/18 bg-white/10 p-4 backdrop-blur-sm overflow-hidden h-[280px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.4!2d77.4!3d23.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDE1JzAwLjAiTiA3N8KwMjQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '1.5rem' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Rescue Routes Location"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/16 pt-6 text-sm font-poppins text-white/68 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} Rescue Routes. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/about" className="transition hover:text-white">
              About
            </Link>
            <Link href="/donate" className="transition hover:text-white">
              Donate
            </Link>
            <Link href="/membership" className="transition hover:text-white">
              Support Program
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
