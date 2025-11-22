import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function About() {
  return (
    <div className="bg-[#FDFDFD] text-black min-h-screen flex flex-col selection:bg-black selection:text-white">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Title Section */}
        <div className="pt-32 md:pt-48 pb-8 px-6 border-b border-black/5">
          <div className="max-w-[1400px] mx-auto">
             <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold tracking-tight uppercase text-center md:text-left"
            >
              Our Story
            </motion.h1>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-24">
          <div className="grid md:grid-cols-12 gap-8 md:gap-16">
            
            {/* Sticky Image Column - Widened to show both founders */}
            <div className="md:col-span-7 relative">
              <div className="sticky top-32">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative aspect-[16/11] overflow-hidden bg-gray-100"
                >
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/6cb7a40f6_founderImage.jpg" 
                    alt="Lexie Hull and Sarah Guller" 
                    className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700 ease-out"
                  />
                </motion.div>
                <div className="mt-4 hidden md:flex justify-between items-end border-t border-black pt-2">
                  <span className="text-xs font-bold uppercase tracking-widest">Founders</span>
                  <span className="text-xs text-gray-500">Lexie Hull & Sarah Guller</span>
                </div>
              </div>
            </div>

            {/* Content Column - Simplified Text */}
            <div className="md:col-span-5 flex flex-col justify-center space-y-8 md:space-y-12 py-8 md:py-12">
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <p className="text-lg md:text-xl font-light text-gray-800 leading-relaxed">
                  Our brand was founded by WNBA star Lexie Hull and her former Stanford roommate, Sarah Guller. After graduating, we realized the beauty industry was missing products built for people whose lives don’t slow down. We wanted makeup that could keep up with workouts, long workdays, and everything in between - without the constant need to reapply. That mission inspired us to create a brand made specifically for the active, with formulas designed to last through sweat, movement, and all the demands of a busy day (or night).
                </p>

                <p className="text-lg md:text-xl font-light text-gray-800 leading-relaxed">
                  At the heart of our brand is a belief that confidence should carry you from morning to night. We want you to feel empowered, fresh, and unstoppable no matter what your schedule holds. Every product we create is meant to support your lifestyle, not restrict it. With our makeup, you don’t have to pause your life to look and feel your best - because you never have to sit still to look pretty.
                </p>
              </motion.div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}