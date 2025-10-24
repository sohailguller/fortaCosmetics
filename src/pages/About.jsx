
import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function About() {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts (on navigation)
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="bg-black">
      {/* Hero Section with Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full"
          >
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/a38dfa5fb_TheVaultStock-10252.jpg"
              alt="Macro texture"
              className="w-full h-full object-cover"
            />
          </motion.div>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-xs text-white/60 font-light tracking-[0.3em] mb-12"
            >
              OUR STORY
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white mb-16 leading-tight"
            >
              Forta was born from motion—
              <br />
              <span className="text-white/80">
                the belief that performance and beauty
              </span>
              <br />
              <span className="text-white/80">shouldn't compete.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="space-y-8 text-xl md:text-2xl font-light leading-relaxed text-white/90 max-w-3xl mx-auto"
            >
              <p>
                Every formula is engineered for endurance,
                <br className="hidden md:block" />
                every design refined for strength.
              </p>
              <p>
                We make cosmetics that don't quit—
                <br className="hidden md:block" />
                so you don't either.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <p className="text-xs text-white/50 font-light tracking-[0.3em]">SCROLL</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-[#F8F8F8] py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="space-y-12"
          >
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#0A1A2F]">
              Our Philosophy
            </h2>
            
            <div className="space-y-8 text-lg md:text-xl font-light leading-relaxed text-black/70">
              <p>
                Beauty products have been asking you to compromise for too long. 
                Either it works or it looks good. Either it lasts or it feels comfortable.
              </p>
              <p>
                We rejected that choice.
              </p>
              <p>
                Forta cosmetics are built on the principle that high performance and 
                premium aesthetics are not opposing forces—they're requirements.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-black text-white py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-light tracking-tight mb-20 text-center"
          >
            What Drives Us
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-16">
            {[
              {
                number: "(1)",
                title: "Endurance",
                description: "Every product is tested in real-world conditions. If it can't handle heat, sweat, and time, it doesn't make the cut."
              },
              {
                number: "(2)",
                title: "Integrity",
                description: "Clean formulas, honest claims, transparent ingredients. No marketing fluff, just what works."
              },
              {
                number: "(3)",
                title: "Innovation",
                description: "We don't follow trends—we engineer solutions. Performance cosmetics built by athletes, for everyone."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="text-center space-y-4"
              >
                {/* Updated number display */}
                <div className="mb-6">
                  <span className="text-4xl font-light text-white/60">{value.number}</span>
                </div>
                <h3 className="text-2xl font-light tracking-wide">
                  {value.title}
                </h3>
                <p className="text-white/70 font-light leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="bg-[#F8F8F8] py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="space-y-12"
          >
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#0A1A2F]">
              Our Commitment
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 text-left">
              {[
                {
                  title: "Tested by Athletes",
                  description: "Every formula undergoes rigorous testing with professional athletes across disciplines."
                },
                {
                  title: "Clean Ingredients",
                  description: "No parabens, sulfates, phthalates, or synthetic fragrances. Just performance-driven actives."
                },
                {
                  title: "Sustainable Practice",
                  description: "Eco-conscious packaging, cruelty-free testing, and carbon-neutral shipping."
                },
                {
                  title: "Made to Last",
                  description: "Concentrated formulas designed for longevity. Less waste, more impact."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="border-l-2 border-black/20 pl-6"
                >
                  <h3 className="text-xl font-medium text-[#0A1A2F] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-black/70 font-light leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final Statement */}
      <section className="bg-black text-white py-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto px-6 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-light tracking-tight leading-tight">
            Performance is our DNA.
            <br />
            <span className="font-normal text-white/80">Beauty is our art.</span>
          </h2>
        </motion.div>
      </section>

      {/* Closing Banner */}
      <div className="bg-white border-t border-black/10">
        <motion.div
          animate={{
            x: [0, -1000],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
          className="flex whitespace-nowrap py-4"
        >
          {Array(12).fill(0).map((_, i) => (
            <span key={i} className="inline-flex items-center mx-6 text-sm font-light tracking-[0.2em] text-black/60">
              BUILT FOR MOTION
              <span className="mx-6 text-black/20">●</span>
              DESIGNED FOR LIFE
              <span className="mx-6 text-black/20">●</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
