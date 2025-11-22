import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function About() {
  return (
    <div className="bg-[#FDFDFD] text-black min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 md:pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Image Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/6cb7a40f6_founderImage.jpg" 
                  alt="Lexie Hull and Sarah Guller" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 bg-white p-4 md:p-6 shadow-xl max-w-xs hidden md:block">
                <p className="font-serif text-lg italic">"You never have to sit still to look pretty."</p>
              </div>
            </motion.div>

            {/* Text Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold uppercase mb-8 tracking-tight leading-none">
                Our Story
              </h1>
              
              <div className="space-y-6 text-lg md:text-xl font-light text-gray-800 leading-relaxed">
                <p>
                  Our brand was founded by WNBA star Lexie Hull and her former Stanford roommate, Sarah Guller. After graduating, we realized the beauty industry was missing products built for people whose lives don’t slow down.
                </p>
                <p>
                  We wanted makeup that could keep up with workouts, long workdays, and everything in between - without the constant need to reapply. That mission inspired us to create a brand made specifically for the active, with formulas designed to last through sweat, movement, and all the demands of a busy day (or night).
                </p>
                <p>
                  At the heart of our brand is a belief that confidence should carry you from morning to night. We want you to feel empowered, fresh, and unstoppable no matter what your schedule holds. Every product we create is meant to support your lifestyle, not restrict it. 
                </p>
                <p className="font-medium">
                  With our makeup, you don’t have to pause your life to look and feel your best - because you never have to sit still to look pretty.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}