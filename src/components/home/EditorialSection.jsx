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
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section className="flex flex-col md:grid md:grid-cols-2 bg-[#F5F5F5] w-full max-w-full overflow-hidden">
      <div ref={containerRef} className="relative aspect-square md:aspect-auto min-h-[500px] w-full max-w-full overflow-hidden">
        <motion.div 
            style={{ y, scale: 1.2 }} 
            className="absolute inset-0 w-full h-full"
        >
            <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/ddbbe1ce2_TheVaultStock-10296.jpg"
                alt="Editorial"
                className="w-full h-full object-cover"
            />
        </motion.div>
      </div>
      <div className="flex flex-col justify-center p-6 md:p-20 bg-[#EBEBEB] w-full max-w-full z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase leading-tight break-words hyphens-auto">
          Makeup that's <br className="hidden md:block" />good for your <br className="hidden md:block" />sweat.
        </h2>
        <p className="text-gray-600 mb-8 max-w-md leading-relaxed font-light break-words">
          When you pair effective, performance-tested skincare with makeup that's formulated for motion, the result is simple: a look that lasts as long as you do.
        </p>
        <Link to={createPageUrl("About")} className="inline-flex items-center font-bold text-sm uppercase tracking-widest border-b border-black pb-1 self-start hover:opacity-60 transition-opacity max-w-full truncate">
          Read Our Philosophy <ArrowRight className="ml-2 w-4 h-4 shrink-0" />
        </Link>
      </div>
    </section>
  );
}