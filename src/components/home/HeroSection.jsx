import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  // Parallax: Image moves slower than scroll (0 to 400px down as we scroll 0 to 1000px)
  const y = useTransform(scrollY, [0, 1000], [0, 400]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden bg-[#F5F5F5]">
      <motion.div 
        style={{ y }}
        className="absolute inset-0 flex"
      >
        <img
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/542f0db57_2-05636.jpg"
          alt="Hero Left"
          className="w-1/3 h-full object-cover"
        />
        <img
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/46dc5bbc1_2-04837.jpg"
          alt="Hero Center"
          className="w-1/3 h-full object-cover"
        />
        <img
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/f7d92cc35_2-05543.jpg"
          alt="Hero Right"
          className="w-1/3 h-full object-cover"
        />
      </motion.div>
      
      <div className="absolute inset-0 bg-black/10" />
      
      <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12 flex flex-col items-start text-left">
        <h1 className="text-white font-serif text-xl md:text-3xl font-normal tracking-tight mb-4 max-w-xl leading-[1.2]">
          You don't have to sit still to look pretty.
        </h1>
        <div>
          <button onClick={() => document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth'})} className="bg-white text-black px-5 py-2 font-bold text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors">
            Join the Waitlist
          </button>
        </div>
      </div>
    </section>
  );
}