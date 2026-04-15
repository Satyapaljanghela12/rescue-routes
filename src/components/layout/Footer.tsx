"use client";

import Link from "next/link";
import { PawPrint, Camera, MapPin } from "lucide-react";

export default function Footer() {
  const blueColor = '#2563EB';
  
  return (
    <footer style={{ backgroundColor: blueColor, color: 'white', paddingTop: '5rem', paddingBottom: '2.5rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          
          {/* Brand & Mission */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', textDecoration: 'none' }}>
              <div style={{ backgroundColor: 'white', color: blueColor, padding: '0.625rem', borderRadius: '1rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
                <PawPrint size={28} />
              </div>
              <span style={{ fontFamily: 'var(--font-fredoka)', fontWeight: 'bold', fontSize: '1.875rem', color: 'white' }}>
                Rescue Routes
              </span>
            </Link>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontFamily: 'var(--font-poppins)', fontSize: '1rem', marginBottom: '2rem', lineHeight: '1.625', maxWidth: '28rem' }}>
              We're on a mission to bring hope, healing, and forever homes to every stray heart. Join our journey! 🐾
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link 
                href="https://www.instagram.com/rescueroutes?igsh=cG0zeGpkZHgwNGk="
                target="_blank"
                rel="noopener noreferrer"
                style={{ width: '3rem', height: '3rem', borderRadius: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.3s' }}
                aria-label="Instagram"
              >
                <Camera size={20} />
              </Link>
              <Link 
                href="https://youtube.com/@rescueroutes?si=hTewtsvMPLYYC4SU"
                target="_blank"
                rel="noopener noreferrer"
                style={{ width: '3rem', height: '3rem', borderRadius: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.3s' }}
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
                style={{ width: '3rem', height: '3rem', borderRadius: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.3s' }}
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
          <div>
            <h4 style={{ fontFamily: 'var(--font-fredoka)', fontWeight: 'bold', fontSize: '1.25rem', color: 'white', marginBottom: '1.5rem' }}>
              Explore
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', listStyle: 'none', padding: 0 }}>
              <li>
                <Link href="/about" style={{ color: 'rgba(255, 255, 255, 0.8)', fontFamily: 'var(--font-poppins)', fontSize: '0.875rem', textDecoration: 'none' }}>
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/stories" style={{ color: 'rgba(255, 255, 255, 0.8)', fontFamily: 'var(--font-poppins)', fontSize: '0.875rem', textDecoration: 'none' }}>
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/campaigns" style={{ color: 'rgba(255, 255, 255, 0.8)', fontFamily: 'var(--font-poppins)', fontSize: '0.875rem', textDecoration: 'none' }}>
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/volunteers" style={{ color: 'rgba(255, 255, 255, 0.8)', fontFamily: 'var(--font-poppins)', fontSize: '0.875rem', textDecoration: 'none' }}>
                  Volunteer
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-fredoka)', fontWeight: 'bold', fontSize: '1.25rem', color: 'white', marginBottom: '1.5rem' }}>
              Support
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', listStyle: 'none', padding: 0 }}>
              <li>
                <Link href="/donate" style={{ color: 'rgba(255, 255, 255, 0.8)', fontFamily: 'var(--font-poppins)', fontSize: '0.875rem', textDecoration: 'none' }}>
                  Donate
                </Link>
              </li>
              <li>
                <Link href="/volunteers" style={{ color: 'rgba(255, 255, 255, 0.8)', fontFamily: 'var(--font-poppins)', fontSize: '0.875rem', textDecoration: 'none' }}>
                  Foster Care
                </Link>
              </li>
              <li>
                <Link href="#" style={{ color: 'rgba(255, 255, 255, 0.8)', fontFamily: 'var(--font-poppins)', fontSize: '0.875rem', textDecoration: 'none' }}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/about" style={{ color: 'rgba(255, 255, 255, 0.8)', fontFamily: 'var(--font-poppins)', fontSize: '0.875rem', textDecoration: 'none' }}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Card */}
          <div>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', borderRadius: '1.5rem', padding: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', backgroundColor: 'white', color: blueColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin size={20} />
                </div>
                <h5 style={{ fontFamily: 'var(--font-fredoka)', fontWeight: 'bold', color: 'white', margin: 0 }}>Contact</h5>
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontFamily: 'var(--font-poppins)', fontSize: '0.875rem', margin: 0 }}>
                Rescue Routes Animal Welfare Foundation, India
              </p>
            </div>
          </div>

        </div>

        <div style={{ paddingTop: '2.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'var(--font-poppins)', fontSize: '0.875rem', margin: 0 }}>
            © {new Date().getFullYear()} Rescue Routes. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Link href="#" style={{ color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'var(--font-poppins)', fontSize: '0.875rem', textDecoration: 'none' }}>Privacy</Link>
            <Link href="#" style={{ color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'var(--font-poppins)', fontSize: '0.875rem', textDecoration: 'none' }}>Terms</Link>
            <Link href="#" style={{ color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'var(--font-poppins)', fontSize: '0.875rem', textDecoration: 'none' }}>Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
