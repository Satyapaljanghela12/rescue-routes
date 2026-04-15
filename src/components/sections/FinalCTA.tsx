"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PawPrint, ArrowRight } from "lucide-react";

export default function FinalCTA() {
  const blueColor = '#2563EB';
  
  return (
    <section style={{ padding: '8rem 0', backgroundColor: blueColor, position: 'relative', overflow: 'hidden' }}>
      {/* Subtle Background Paws */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.05 }}>
        <PawPrint size={100} style={{ position: 'absolute', top: '2.5rem', left: '10%', transform: 'rotate(12deg)', color: 'white' }} />
        <PawPrint size={80} style={{ position: 'absolute', bottom: '5rem', left: '20%', transform: 'rotate(-12deg)', color: 'white' }} />
        <PawPrint size={120} style={{ position: 'absolute', top: '10rem', right: '15%', transform: 'rotate(45deg)', color: 'white' }} />
        <PawPrint size={90} style={{ position: 'absolute', bottom: '2.5rem', right: '5%', transform: 'rotate(-6deg)', color: 'white' }} />
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ maxWidth: '56rem', margin: '0 auto' }}
        >
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontFamily: 'var(--font-fredoka)', fontWeight: 'bold', lineHeight: 1.2, marginBottom: '2rem', color: 'white' }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)', display: 'block', fontFamily: 'var(--font-poetsen)', fontSize: 'clamp(1.5rem, 3vw, 1.875rem)', marginBottom: '1rem' }}>
              Every paw deserves
            </span>
            <span style={{ color: 'white', display: 'block' }}>a happy ending.</span>
          </h2>
          
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'rgba(255, 255, 255, 0.9)', fontFamily: 'var(--font-poppins)', marginBottom: '3.5rem', maxWidth: '42rem', margin: '0 auto 3.5rem', lineHeight: 1.625 }}>
            Your love and support are the building blocks of their forever homes. Join our mission today! 🐾
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'center', alignItems: 'center' }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/donate"
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '0.75rem', 
                  backgroundColor: 'white', 
                  color: blueColor, 
                  fontFamily: 'var(--font-fredoka)', 
                  fontWeight: 'bold', 
                  padding: '1.25rem 3rem', 
                  borderRadius: '9999px', 
                  fontSize: '1.125rem', 
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', 
                  textDecoration: 'none',
                  transition: 'all 0.3s'
                }}
              >
                <span>Donate Now</span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#volunteer"
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '0.75rem', 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                  backdropFilter: 'blur(10px)', 
                  color: 'white', 
                  border: '2px solid rgba(255, 255, 255, 0.3)', 
                  fontFamily: 'var(--font-fredoka)', 
                  fontWeight: 'bold', 
                  padding: '1.25rem 3rem', 
                  borderRadius: '9999px', 
                  fontSize: '1.125rem', 
                  textDecoration: 'none',
                  transition: 'all 0.3s'
                }}
              >
                <span>Become a volunteer</span>
                <ArrowRight size={22} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
