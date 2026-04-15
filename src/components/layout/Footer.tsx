import Link from "next/link";
import { PawPrint, Globe, MessageCircle, Camera, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-6 group inline-flex">
              <div className="bg-white text-primary p-2.5 rounded-2xl group-hover:scale-110 transition-transform shadow-lg">
                <PawPrint size={28} />
              </div>
              <span className="font-fredoka font-bold text-3xl text-white tracking-tight">
                Rescue Routes
              </span>
            </Link>
            <p className="text-white/80 font-poppins text-base mb-8 leading-relaxed max-w-sm">
              We're on a mission to bring hope, healing, and forever homes to every stray heart. Join our journey! 🐾
            </p>
            <div className="flex items-center gap-4">
              <Link 
                href="https://www.instagram.com/rescueroutes?igsh=cG0zeGpkZHgwNGk="
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center hover:bg-white hover:text-primary hover:scale-110 hover:rotate-3 transition-all"
                aria-label="Instagram"
              >
                <Camera size={20} />
              </Link>
              <Link 
                href="https://youtube.com/@rescueroutes?si=hTewtsvMPLYYC4SU"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center hover:bg-white hover:text-primary hover:scale-110 hover:rotate-3 transition-all"
                aria-label="YouTube"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </Link>
              <Link 
                href="https://www.linkedin.com/company/rescue-routes"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center hover:bg-white hover:text-primary hover:scale-110 hover:rotate-3 transition-all"
                aria-label="LinkedIn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-fredoka font-bold text-xl text-white mb-6">
              Explore
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/about" className="text-white/80 font-poppins text-sm hover:text-white transition-colors hover:translate-x-1 inline-block">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/stories" className="text-white/80 font-poppins text-sm hover:text-white transition-colors hover:translate-x-1 inline-block">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/campaigns" className="text-white/80 font-poppins text-sm hover:text-white transition-colors hover:translate-x-1 inline-block">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/volunteers" className="text-white/80 font-poppins text-sm hover:text-white transition-colors hover:translate-x-1 inline-block">
                  Volunteer
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="lg:col-span-2">
            <h4 className="font-fredoka font-bold text-xl text-white mb-6">
              Support
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/donate" className="text-white/80 font-poppins text-sm hover:text-white transition-colors hover:translate-x-1 inline-block">
                  Donate
                </Link>
              </li>
              <li>
                <Link href="/volunteers" className="text-white/80 font-poppins text-sm hover:text-white transition-colors hover:translate-x-1 inline-block">
                  Foster Care
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 font-poppins text-sm hover:text-white transition-colors hover:translate-x-1 inline-block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/80 font-poppins text-sm hover:text-white transition-colors hover:translate-x-1 inline-block">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Map Card */}
          <div className="lg:col-span-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary">
                  <MapPin size={20} />
                </div>
                <h5 className="font-fredoka font-bold text-white">Our Headquarters</h5>
              </div>
              
              {/* Stylized Map Placeholder */}
              <div className="aspect-[16/9] w-full bg-white/5 rounded-2xl overflow-hidden relative border border-white/10">
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <PawPrint size={40} className="text-white animate-bounce" />
                    <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-8 h-2 bg-black/10 rounded-full blur-sm" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md py-2 px-4 rounded-xl text-[10px] font-poppins text-gray-700">
                  123 Compassion Way, Animal City, AC 90210
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-10 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/60 font-poppins text-sm">
            © {new Date().getFullYear()} Rescue Routes. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-white/60 font-poppins text-sm hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="text-white/60 font-poppins text-sm hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="text-white/60 font-poppins text-sm hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
