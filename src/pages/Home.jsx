import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <div className="bg-black">
      {/* Sliding Announcement Banner */}
      <div className="bg-white text-black overflow-hidden border-b border-black/10">
        <motion.div
          animate={{
            x: [0, -1000],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
          className="flex whitespace-nowrap py-3"
        >
          {Array(10).fill(0).map((_, i) => (
            <span key={i} className="inline-flex items-center mx-8 text-sm font-light tracking-[0.2em]">
              LOCK IN YOUR EDGE
              <span className="mx-8 text-black/40">●</span>
              FORTA PERFORMANCE COSMETICS
              <span className="mx-8 text-black/40">●</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Full-Screen Hero Section */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div
          style={{ opacity, scale }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/4c90d3f27_fortaMosaic.jpg"
            alt="Forta Performance"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="relative z-20 h-full flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-5xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-white text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-8 leading-[1.1]"
            >
              Performance That Persists.
              <br />
              <span className="font-normal">Makeup That Moves With You.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to={createPageUrl("Shop")}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative bg-white text-black px-12 py-5 text-sm font-medium tracking-[0.2em] overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    SHOP NOW
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-black"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity gap-3">
                    SHOP NOW
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Brand Statement */}
      <section className="bg-[#F8F8F8] py-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl font-light tracking-tight text-[#0A1A2F] mb-8 leading-tight">
              Built for Athletes.
              <br />
              <span className="font-normal">Designed for Everyone.</span>
            </h2>
            <p className="text-lg md:text-xl text-black/60 font-light max-w-3xl mx-auto leading-relaxed">
              Forta cosmetics are engineered for high-performance lifestyles. 
              Sweat-resistant, long-lasting, and always comfortable—makeup that keeps up with your ambitions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-black text-white py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-light tracking-tight mb-20 text-center"
          >
            The Forta Difference
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-16">
            {[
              {
                title: "Sweat-Proof",
                description: "Tested in extreme conditions. Stays put through workouts, heat, and humidity."
              },
              {
                title: "Clean Formula",
                description: "No parabens, sulfates, or questionable ingredients. Just what works."
              },
              {
                title: "All-Day Wear",
                description: "From morning training to evening events. One application, zero touch-ups."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 border border-white/20 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white" />
                </div>
                <h3 className="text-xl font-medium tracking-wide mb-4">
                  {value.title}
                </h3>
                <p className="text-white/60 font-light leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#F8F8F8] py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-6 lg:px-8 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-light tracking-tight text-[#0A1A2F] mb-12">
            Ready to Elevate Your Routine?
          </h2>
          <Link to={createPageUrl("Shop")}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white px-12 py-5 text-sm font-medium tracking-[0.2em] hover:bg-black/90 transition-colors inline-flex items-center gap-3"
            >
              EXPLORE PRODUCTS
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}