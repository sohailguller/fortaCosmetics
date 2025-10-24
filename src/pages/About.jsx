import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* Hero */}
      <section className="relative h-[60vh] bg-[#0A1A2F] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1920&q=80"
            alt="About"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-light tracking-tight text-center"
          >
            Our Story
          </motion.h1>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div>
            <h2 className="text-3xl font-light tracking-tight text-[#0A1A2F] mb-6">
              Performance-Driven Beauty
            </h2>
            <p className="text-lg text-black/70 font-light leading-relaxed">
              Founded in 2023, Forta was born from a simple belief: cosmetics should work. 
              Not just look good on a shelf, but deliver real, measurable results backed by science.
            </p>
          </div>

          <div className="border-l-2 border-black pl-8">
            <p className="text-lg text-black/70 font-light leading-relaxed">
              "We were tired of empty promises and marketing buzzwords. So we built something different — 
              a brand where every ingredient earns its place, every formula is tested rigorously, 
              and every product delivers on its promise."
            </p>
            <p className="text-sm text-black/40 mt-4 font-light">
              — Sarah Chen, Founder & Chief Formulator
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-light tracking-tight text-[#0A1A2F] mb-6">
              Our Approach
            </h2>
            <div className="space-y-6 text-base text-black/70 font-light leading-relaxed">
              <p>
                Every Forta product begins in our lab, not a marketing meeting. Our team of chemists, 
                dermatologists, and researchers collaborate to create formulations that actually work.
              </p>
              <p>
                We test extensively — through clinical trials, dermatological studies, and real-world use. 
                We're transparent about our ingredients and never compromise on quality for profit margins.
              </p>
              <p>
                The result? Cosmetics that perform. That deliver visible improvements. That you can trust.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Values Grid */}
      <section className="bg-black text-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl font-light tracking-tight mb-16 text-center">
            What We Stand For
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: "Science First",
                description: "Every ingredient is chosen for efficacy, backed by research and clinical testing."
              },
              {
                title: "Clean Formulas",
                description: "Free from harmful chemicals. We exclude over 2,000 questionable ingredients."
              },
              {
                title: "Sustainable Practice",
                description: "Eco-conscious packaging, cruelty-free testing, ethically sourced materials."
              },
              {
                title: "Full Transparency",
                description: "Complete ingredient lists, sourcing information, and testing results available."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border-l-2 border-white/20 pl-6"
              >
                <h3 className="text-xl font-medium mb-3">{value.title}</h3>
                <p className="text-white/70 font-light leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}