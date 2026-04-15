"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, PawPrint, Heart, Sparkles } from "lucide-react";

type Inputs = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Inputs>();
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(data);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section id="contact" className="py-24 relative bg-[#F1F5F9] overflow-hidden">
      {/* Decorative Floating Elements */}
      <div className="absolute top-10 left-10 opacity-[0.03] rotate-12 pointer-events-none">
        <PawPrint size={120} />
      </div>
      <div className="absolute bottom-20 right-10 opacity-[0.03] -rotate-12 pointer-events-none">
        <Heart size={150} />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto bg-white rounded-[3.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.03)] border border-primary/5 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            
            {/* Left Contact Info (Light & Cute) */}
            <div className="bg-transparent p-12 lg:col-span-2 flex flex-col justify-between relative overflow-hidden border-r border-primary/5">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-[#F1F5F9] self-start py-2 px-6 rounded-full shadow-sm border border-primary/10 mb-8">
                  <PawPrint size={16} className="text-primary" />
                  <span className="text-primary font-fredoka font-bold text-xs uppercase tracking-widest">Connect With Us</span>
                </div>
                
                <h3 className="text-5xl md:text-6xl font-briem font-bold text-dark mb-6 leading-tight">
                  Let's <span className="text-primary">Chat!</span>
                </h3>
                <p className="text-dark/60 font-fredoka text-lg mb-12 leading-relaxed">
                  Have questions about adopting your new best friend or want to volunteer? We're here for you! 🐾
                </p>

                <div className="space-y-8">
                  <motion.div whileHover={{ x: 5 }} className="flex items-center gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-fredoka font-bold text-primary uppercase tracking-widest mb-1">Email Us</p>
                      <span className="text-dark/80 font-fredoka font-medium">hello@rescueroutes.org</span>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ x: 5 }} className="flex items-center gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-fredoka font-bold text-primary uppercase tracking-widest mb-1">Call Us</p>
                      <span className="text-dark/80 font-fredoka font-medium">+91 7067223922</span>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ x: 5 }} className="flex items-center gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-fredoka font-bold text-primary uppercase tracking-widest mb-1">Visit Us</p>
                      <span className="text-dark/80 font-fredoka font-medium">Bhopal, Madhya Pradesh</span>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="mt-16 flex items-center gap-2 text-primary/30 font-briem text-2xl rotate-[-5deg]">
                Saving lives, one paw at a time <Heart size={20} fill="currentColor" />
              </div>
            </div>

            {/* Right Form (Clean & Modern) */}
            <div className="p-12 lg:col-span-3 bg-white">
              <div className="mb-10">
                <h3 className="text-3xl font-briem font-bold text-dark mb-2">Send a Message</h3>
                <div className="w-20 h-1.5 bg-primary/20 rounded-full" />
              </div>
              
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className="bg-green-50 text-green-700 p-6 rounded-[2rem] mb-8 font-fredoka font-medium text-center border-2 border-green-100 flex flex-col items-center gap-2 shadow-sm"
                  >
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-1">
                      <Sparkles className="text-green-600" />
                    </div>
                    Thank you! Your cute message has been delivered to our team! 💌
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-fredoka font-bold text-dark/60 ml-2">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      {...register("name", { required: "We'd love to know your name!" })}
                      className={`w-full px-6 py-4 rounded-2xl border-2 ${errors.name ? 'border-red-100 bg-red-50/10 focus:border-red-300' : 'border-[#F1F5F9] bg-[#F8FAFC] focus:border-primary/30'} outline-none transition-all font-fredoka text-dark`}
                      placeholder="Your lovely name"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1 ml-2">{errors.name.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-fredoka font-bold text-dark/60 ml-2">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      {...register("email", { 
                        required: "How can we reach back to you?",
                        pattern: { value: /\S+@\S+\.\S+/, message: "That email looks a bit unusual!" }
                      })}
                      className={`w-full px-6 py-4 rounded-2xl border-2 ${errors.email ? 'border-red-100 bg-red-50/10 focus:border-red-300' : 'border-[#F1F5F9] bg-[#F8FAFC] focus:border-primary/30'} outline-none transition-all font-fredoka text-dark`}
                      placeholder="hello@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1 ml-2">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-fredoka font-bold text-dark/60 ml-2">What's on your mind?</label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register("message", { required: "Please share a few words with us!" })}
                    className={`w-full px-6 py-4 rounded-[2rem] border-2 ${errors.message ? 'border-red-100 bg-red-50/10 focus:border-red-300' : 'border-[#F1F5F9] bg-[#F8FAFC] focus:border-primary/30'} outline-none transition-all font-fredoka text-dark resize-none`}
                    placeholder="Tell us about your interest in Rescue Routes..."
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-xs mt-1 ml-2">{errors.message.message}</p>}
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-secondary text-white font-fredoka font-bold py-5 px-8 rounded-[2rem] shadow-[0_15px_30px_rgba(249,115,22,0.2)] transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={20} />
                      </>
                    )}
                  </button>
                </motion.div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
