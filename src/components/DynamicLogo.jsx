import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/d88e8a5a2_Stocksy_comp_watermarked_47317291.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/7d875e9b0_Stocksy_comp_watermarked_27722951.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/b083d143e_Stocksy_comp_watermarked_13955321.jpg"
];

export default function DynamicLogo() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative inline-block w-[160px] md:w-[220px]">
      {/* Cycling Image Background - Positioned to align with the 'O' in FORTA */}
      <div className="absolute inset-0 flex items-center" style={{ paddingLeft: '27%' }}>
        <div className="relative w-[28%] aspect-[1.4/1] rounded-full overflow-hidden">
           <AnimatePresence mode="popLayout">
             <motion.img
               key={index}
               src={images[index]}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.8 }}
               className="absolute inset-0 w-full h-full object-cover"
               alt="Forta Lifestyle"
             />
           </AnimatePresence>
        </div>
      </div>

      {/* The Logo Overlay - Using mix-blend-multiply to let image show through transparent/white parts if needed, 
          but mainly relying on z-index if the logo has transparency in the 'O' */}
      <img 
        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/ea4583fe7_PrimaryLogo-_black-06.png"
        alt="FORTA"
        className="relative z-10 w-full h-auto mix-blend-multiply block"
      />
    </div>
  );
}