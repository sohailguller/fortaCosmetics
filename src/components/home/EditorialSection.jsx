import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function EditorialSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax effect: Image moves vertically within its container
  // We scale it up slightly (1.2) so edges aren't visible during movement
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={containerRef} className="relative w-full min-h-[600px] md:min-h-[80vh] flex items-center overflow-hidden bg-[#F5F5F5]">
      <motion.div 
          style={{ y, scale: 1.2 }} 
          className="absolute inset-0 w-full h-full z-0"
      >
          <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/ddbbe1ce2_TheVaultStock-10296.jpg"
              alt="Editorial"
              className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10" /> {/* Slight overlay for better contrast if needed, or remove if image is light enough/dark enough */}
      </motion.div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-20">
        <div className="max-w-xl bg-white/90 backdrop-blur-sm p-8 md:p-12 shadow-sm">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase leading-tight break-words hyphens-auto">
            Makeup that's <br className="hidden md:block" />good for your <br className="hidden md:block" />sweat.
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed break-words">
            When you pair effective, performance-tested skincare with makeup that's formulated for motion, the result is simple: a look that lasts as long as you do.
          </p>
          <Link to={createPageUrl("About")} className="inline-flex items-center font-bold text-sm uppercase tracking-widest border-b border-black pb-1 self-start hover:opacity-60 transition-opacity max-w-full truncate">
            Read Our Philosophy <ArrowRight className="ml-2 w-4 h-4 shrink-0" />
          </Link>
        </div>
      </div>
    </section>
  );
}