import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollAnimatedSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax animation:
  // As user scrolls down the container, the bottle moves from y:300 (below frame) to y:0 (in frame)
  const bottleY = useTransform(scrollYProgress, [0, 1], [300, 0]);

  return (
    <div ref={containerRef} className="relative h-[140vh] bg-[#FDFDFD]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-start pt-32 md:pt-48">
        <div className="max-w-6xl mx-auto px-6 w-full relative flex flex-col items-center justify-start">
            
            {/* The Glow */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#F5E6D8] opacity-60 blur-[100px] z-0" />

            {/* The Tagline Text Image */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10 w-full max-w-3xl mb-[-60px] md:mb-[-100px] mix-blend-multiply"
            >
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/8e804f5ad_Tagline-_black-16.jpg"
                alt="(FOR)(T)HE(A)CTIVE"
                className="w-full mix-blend-multiply"
              />
            </motion.div>

            {/* The Bottle - Animated with Scroll */}
            <motion.div 
              style={{ y: bottleY, rotate: 12 }}
              className="relative z-20 w-64 md:w-80 lg:w-96 translate-y-12 md:translate-y-16"
            >
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/087b1449c_Untitleddesign12.png" 
                alt="Lock & Go Setting Spray"
                className="w-full h-auto drop-shadow-2xl"
              />
            </motion.div>

        </div>
      </div>
    </div>
  );
}