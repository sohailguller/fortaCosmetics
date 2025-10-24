
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Shop() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const leftY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rightY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div ref={containerRef} className="min-h-screen bg-black">
      {/* Split Screen Layout */}
      <div className="relative min-h-screen grid lg:grid-cols-2">
        {/* Left Side - Lifestyle Image */}
        <motion.div
          style={{ y: leftY }}
          className="relative h-screen lg:h-auto overflow-hidden"
        >
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-full"
          >
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/7b0fe5c86_TheVaultStock-10413.jpg"
              alt="Performance lifestyle"
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent lg:to-black/50" />
          
          {/* Text Overlay - Mobile */}
          <div className="absolute inset-0 flex items-center justify-center lg:hidden px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-white text-center"
            >
              <h1 className="text-5xl font-light tracking-tight mb-4">
                Lock & Go
              </h1>
              <p className="text-lg font-light tracking-wide">SETTING SPRAY</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Product */}
        <motion.div
          style={{ y: rightY }}
          className="relative bg-[#F8F8F8] flex items-center justify-center p-8 lg:p-16 min-h-screen"
        >
          <div className="max-w-xl w-full">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mb-12 group cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[3/4] overflow-hidden"
              >
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/436f3854d_productImage.jpg"
                  alt="Lock & Go Setting Spray"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </motion.div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="space-y-6"
            >
              <div>
                <p className="text-xs text-black/40 font-light tracking-[0.2em] mb-3">
                  SIGNATURE PRODUCT
                </p>
                <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#0A1A2F] mb-4">
                  Lock & Go Setting Spray
                </h2>
                <p className="text-2xl font-medium text-black mb-6">
                  $30
                </p>
                <p className="text-base text-black/70 font-light leading-relaxed">
                  Our award-winning setting spray that locks makeup in place for 
                  up to 16 hours. Sweat-resistant, transfer-proof, and weightless. 
                  The secret weapon of athletes and performers worldwide.
                </p>
              </div>

              {/* Features */}
              <div className="border-t border-black/10 pt-6">
                <ul className="space-y-3">
                  {[
                    "16-hour wear",
                    "Sweat & water resistant",
                    "Weightless formula",
                    "Dermatologist tested"
                  ].map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                      className="flex items-center gap-3 text-sm text-black/70 font-light"
                    >
                      <div className="w-1.5 h-1.5 bg-black" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <Link to={createPageUrl("ProductDetail")}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group w-full bg-black text-white px-10 py-5 text-sm font-medium tracking-[0.2em] hover:bg-[#0A1A2F] transition-colors flex items-center justify-center gap-3"
                  >
                    VIEW PRODUCT
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Additional Content Section */}
      <section className="bg-[#0A1A2F] text-white py-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">
              Engineered for Extreme Conditions
            </h2>
            <p className="text-lg text-white/70 font-light leading-relaxed max-w-3xl mx-auto mb-12">
              Lock & Go has been tested in the most demanding environments—from 
              marathon training in desert heat to high-intensity CrossFit workouts. 
              When your day demands everything, your makeup should give you nothing to worry about.
            </p>
            
            <div className="grid md:grid-cols-3 gap-12 mt-16">
              {[
                { stat: "16hrs", label: "Wear Time" },
                { stat: "100%", label: "Sweat-Proof" },
                { stat: "0g", label: "Feels Like" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                >
                  <div className="text-5xl font-light mb-3">{item.stat}</div>
                  <div className="text-sm text-white/60 font-light tracking-wide">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
