import Link from "next/link";
import { PawPrint, Globe, MessageCircle, Camera, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-primary/5 pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-6 group inline-flex">
              <div className="bg-primary text-white p-2.5 rounded-2xl group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
                <PawPrint size={28} />
              </div>
              <span className="font-briem font-bold text-3xl text-dark tracking-tight">
                Rescue Routes
              </span>
            </Link>
            <p className="text-dark/60 font-fredoka text-lg mb-8 leading-relaxed max-w-sm">
              We're on a mission to bring hope, healing, and forever homes to every stray heart. Join our journey! 🐾
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: <Globe size={20} />, label: "Website" },
                { icon: <MessageCircle size={20} />, label: "Chat" },
                { icon: <Camera size={20} />, label: "Instagram" }
              ].map((social, i) => (
                <Link 
                  key={i} 
                  href="#" 
                  className="w-12 h-12 rounded-2xl bg-[#F1F5F9] text-primary flex items-center justify-center hover:bg-primary hover:text-white hover:scale-110 hover:rotate-3 transition-all shadow-sm"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-briem font-bold text-2xl text-dark mb-8">
              Explore
            </h4>
            <ul className="flex flex-col gap-4">
              {['Our Story', 'Success Stories', 'Programs', 'Volunteer'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-dark/60 font-fredoka hover:text-primary transition-colors hover:translate-x-1 inline-block">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="lg:col-span-2">
            <h4 className="font-briem font-bold text-2xl text-dark mb-8">
              Support
            </h4>
            <ul className="flex flex-col gap-4">
              {['Donate', 'Foster Care', 'Privacy Policy', 'Contact Us'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-dark/60 font-fredoka hover:text-primary transition-colors hover:translate-x-1 inline-block">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Map Card */}
          <div className="lg:col-span-4">
            <div className="bg-[#F1F5F9] rounded-[2.5rem] p-6 border-2 border-white shadow-xl shadow-black/5 relative overflow-hidden group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
                  <MapPin size={20} />
                </div>
                <h5 className="font-fredoka font-bold text-dark">Our Headquarters</h5>
              </div>
              
              {/* Stylized Map Placeholder */}
              <div className="aspect-[16/9] w-full bg-white rounded-2xl overflow-hidden relative border border-primary/5">
                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <PawPrint size={40} className="text-primary animate-bounce" />
                    <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-8 h-2 bg-black/10 rounded-full blur-sm" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-white/80 backdrop-blur-md py-2 px-4 rounded-xl border border-white text-[10px] font-fredoka text-dark/60">
                  123 Compassion Way, Animal City, AC 90210
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-10 border-t border-[#F1F5F9] flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-dark/40 font-fredoka font-medium">
            © {new Date().getFullYear()} Rescue Routes. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-dark/40 font-fredoka text-sm hover:text-primary transition-colors">Privacy</Link>
            <Link href="#" className="text-dark/40 font-fredoka text-sm hover:text-primary transition-colors">Terms</Link>
            <Link href="#" className="text-dark/40 font-fredoka text-sm hover:text-primary transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
