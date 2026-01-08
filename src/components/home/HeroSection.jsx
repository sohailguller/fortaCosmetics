import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <section ref={containerRef} className="relative w-full overflow-hidden mb-0">
            <motion.div style={{ y }} className="relative z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-[70vh] md:h-auto object-cover md:object-contain"
            >
              <source src="https://res.cloudinary.com/dihudketx/video/upload/MOV_9179_c0vews.mp4" type="video/mp4" />
            </video>
          </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent md:bg-black/10 z-0" />

            <div className="absolute bottom-8 left-6 md:bottom-16 md:left-16 flex flex-col items-start text-left z-10 max-w-[90%] md:max-w-xl">
              <h1 className="text-white font-serif text-lg md:text-3xl font-normal tracking-tight mb-4 leading-[1.2] drop-shadow-lg md:drop-shadow-none">
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