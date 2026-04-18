import Link from "next/link";
import { Camera, Mail, MapPin, Phone } from "lucide-react";

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
                href="https://www.instagram.com/rescueroutes?igsh=cG0zeGpkZHgwNGk="
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 transition hover:bg-white hover:text-[#2563EB]"
                aria-label="Instagram"
              >
                <Camera size={18} />
              </Link>
              <Link
                href="mailto:hello@rescueroutes.org"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 transition hover:bg-white hover:text-[#2563EB]"
                aria-label="Email"
              >
                <Mail size={18} />
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
            </div>
          </div>

          <div>
            <p className="text-sm font-fredoka font-semibold uppercase tracking-[0.22em] text-white/76">Support</p>
            <div className="mt-5 flex flex-col gap-3 text-sm font-poppins text-white/78">
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

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/18 bg-white/10 p-6 backdrop-blur-sm">
              <p className="text-sm font-fredoka font-semibold uppercase tracking-[0.22em] text-white/76">
                Contact
              </p>
              <div className="mt-5 space-y-4 text-sm leading-7 font-poppins text-white/78">
                <div className="flex items-start gap-3">
                  <Phone className="mt-1 h-4 w-4 flex-shrink-0 text-white" />
                  <p>+91 96300 57355</p>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-4 w-4 flex-shrink-0 text-white" />
                  <p>pawsonparade2020@gmail.com</p>
                </div>
                <div className="flex items-start gap-3">
                  <Camera className="mt-1 h-4 w-4 flex-shrink-0 text-white" />
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
              Membership
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
