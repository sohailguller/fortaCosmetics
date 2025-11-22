import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const images = [
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/a5603e30f_Stocksy_comp_watermarked_13955321.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/338067502_Stocksy_comp_watermarked_47317291.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/0f3cec397_Stocksy_comp_watermarked_27722951.jpg"
];

export default function LogoCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  // Calculate previous index to show underneath the wiping image
  const prevIndex = (index - 1 + images.length) % images.length;

  return (
    <div className="relative h-8 w-20 md:h-10 md:w-24 rounded-full overflow-hidden mx-0.5 bg-gray-200">
      {/* Background Image (The one being wiped over) */}
      <img
        src={images[prevIndex]}
        className="absolute inset-0 w-full h-full object-cover"
        alt="Forta Lifestyle"
      />
      
      {/* Foreground Image (The one wiping in) */}
      <motion.img
        key={index}
        src={images[index]}
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={{ clipPath: 'inset(0 0 0 0)' }}
        transition={{ duration: 0.25, ease: "linear" }}
        className="absolute inset-0 w-full h-full object-cover z-10"
        alt="Forta Lifestyle"
      />
    </div>
  );
}