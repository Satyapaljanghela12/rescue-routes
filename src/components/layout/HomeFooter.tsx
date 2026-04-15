import Link from "next/link";
import { Camera, Mail, MapPin, Phone } from "lucide-react";

export default function HomeFooter() {
  return (
    <footer className="border-t border-black/10 bg-[#2f241b] pb-10 pt-16 text-[#f7efe4]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.7fr_0.8fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#dcb189]">
              Rescue Routes
            </p>
            <h2 className="mt-4 font-heading text-5xl leading-none">
              Building safer streets and softer landings for animals in need.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-[#f7efe4]/72">
              Rescue Routes exists to bring urgency, dignity, and community participation into
              every rescue, recovery, and adoption journey.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link
                href="https://www.instagram.com/rescueroutes?igsh=cG0zeGpkZHgwNGk="
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/6 transition hover:bg-primary"
                aria-label="Instagram"
              >
                <Camera size={18} />
              </Link>
              <Link
                href="mailto:hello@rescueroutes.org"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/6 transition hover:bg-primary"
                aria-label="Email"
              >
                <Mail size={18} />
              </Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#dcb189]">Explore</p>
            <div className="mt-5 flex flex-col gap-3 text-sm text-[#f7efe4]/72">
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
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#dcb189]">Support</p>
            <div className="mt-5 flex flex-col gap-3 text-sm text-[#f7efe4]/72">
              <Link href="/donate" className="transition hover:text-white">
                Donate
              </Link>
              <Link href="/membership" className="transition hover:text-white">
                Membership
              </Link>
              <Link href="/volunteers" className="transition hover:text-white">
                Volunteer
              </Link>
              <Link href="/store" className="transition hover:text-white">
                Store
              </Link>
            </div>
          </div>

          <div>
            <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#dcb189]">
                Contact
              </p>
              <div className="mt-5 space-y-4 text-sm leading-7 text-[#f7efe4]/72">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 text-[#dcb189]" />
                  <p>Rescue Routes Animal Welfare Foundation, India</p>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-1 h-4 w-4 text-[#dcb189]" />
                  <p>+91 support line and volunteer coordination</p>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-4 w-4 text-[#dcb189]" />
                  <p>hello@rescueroutes.org</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-[#f7efe4]/55 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Rescue Routes. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/about" className="transition hover:text-white">
              About
            </Link>
            <Link href="/donate" className="transition hover:text-white">
              Donate
            </Link>
            <Link href="/membership" className="transition hover:text-white">
              Membership
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
