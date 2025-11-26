import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  // Parallax: Image moves slower than scroll (0 to 400px down as we scroll 0 to 1000px)
  const y = useTransform(scrollY, [0, 1000], [0, 400]);

  return (
    <section ref={ref} className="relative h-[80vh] w-full overflow-hidden bg-[#F5F5F5]">
      <motion.div 
        style={{ y }}
        className="absolute inset-0"
      >
        <img
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/7de5db18c_Stocksy_comp_watermarked_27722951-Edited.jpg"
          alt="Hero"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>
      
      <div className="absolute inset-0 bg-black/10" />
      
      <div className="absolute inset-0 flex flex-col justify-end items-start text-left p-6 md:p-12 pb-16 md:pb-20">
        <h1 className="text-white font-serif text-4xl md:text-7xl font-normal tracking-tight mb-6 max-w-2xl leading-[1.1]">
          You don't have to sit still to look pretty.
        </h1>
        <div>
          <button onClick={() => document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth'})} className="bg-white text-black px-8 py-3 font-bold text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-colors">
            Join the Waitlist
          </button>
        </div>
      </div>
    </section>
  );
}