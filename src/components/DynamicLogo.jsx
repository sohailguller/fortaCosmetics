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
    <div className="flex items-center justify-center h-12 select-none overflow-hidden">
      <span className="text-4xl md:text-5xl font-normal tracking-tighter mr-1">F</span>
      <div className="relative flex items-center justify-center">
         <span className="text-5xl md:text-6xl font-light -mt-2 mr-[-2px]">(</span>
         
         <div className="relative w-20 md:w-32 h-8 md:h-10 overflow-hidden rounded-full mx-0">
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

         <span className="text-5xl md:text-6xl font-light -mt-2 ml-[-2px]">)</span>
      </div>
      <span className="text-4xl md:text-5xl font-normal tracking-tighter ml-1">RTA</span>
    </div>
  );
}