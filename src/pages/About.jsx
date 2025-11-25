import React from "react";
import { motion } from "framer-motion";
import { Smile, Droplets, Sparkles, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function About() {
  const values = [
    {
      icon: <Smile className="w-10 h-10" />,
      title: "Trusted",
      description: "Backed by science, tested in real life.",
    },
    {
      icon: <Droplets className="w-10 h-10" />,
      title: "Seamless",
      description: "Fits right into your routine.",
    },
    {
      icon: <Sparkles className="w-10 h-10" />,
      title: "Radiant",
      description: "Ready for whatever the day brings.",
    },
  ];

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-black selection:text-white">
      <Header />
      
      <main className="pt-16 md:pt-20 relative">
        {/* Continuous Blurred Background for Hero and Values */}
        <div className="absolute inset-0 top-0 bottom-0 pointer-events-none">
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/5242c4b12_blur1.png"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Hero Section */}
        <section className="relative h-[40vh] flex items-center overflow-hidden z-0">
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full flex justify-start">
            <motion.img
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/985f7ecb5_Tagline-_white-17.png"
              alt="FORTA Tagline"
              className="h-16 md:h-24 object-contain"
            />
          </div>
        </section>

        {/* Story Section - Foreground */}
        <section className="relative z-10 grid grid-cols-1 md:grid-cols-2 min-h-[80vh] bg-white shadow-2xl">
          <div className="bg-white p-8 md:p-20 flex flex-col justify-center items-start order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-black text-3xl font-bold mb-8">Our Story</h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-light">
                <p>
                  Our brand was founded by WNBA star Lexie Hull and her former Stanford roommate, Sarah Guller. After graduating, we realized the beauty industry was missing products built for people whose lives don't slow down. We wanted makeup that could keep up with workouts, long workdays, and everything in between - without the constant need to reapply. That mission inspired us to create a brand made specifically for the active, with formulas designed to last through sweat, movement, and all the demands of a busy day (or night).
                </p>
                <p>
                  At the heart of our brand is a belief that confidence should carry you from morning to night. We want you to feel empowered, fresh, and unstoppable no matter what your schedule holds. Every product we create is meant to support your lifestyle, not restrict it. With our makeup, you don't have to pause your life to look and feel your best - because you never have to sit still to look pretty.
                </p>
              </div>
              <div className="mt-12 font-handwriting text-4xl text-black">
                Lexie + Sarah
              </div>
            </motion.div>
          </div>
          
          <div className="relative h-[50vh] md:h-auto order-1 md:order-2 overflow-hidden">
             <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/6cb7a40f6_founderImage.jpg" 
              alt="Lexie Hull and Sarah Guller" 
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-1000 hover:scale-105"
            />
          </div>
        </section>

        {/* Values Section */}
        <section className="relative z-0 text-white py-12 px-6">
          <div className="max-w-[1400px] mx-auto relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold uppercase tracking-wide text-center mb-16"
            >
              Our Values
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex flex-col items-center"
                >
                  <div className="mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold tracking-tight mb-4">{value.title}</h3>
                  <p className="text-white/80 max-w-xs mx-auto leading-relaxed font-light">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="relative z-10 grid grid-cols-1 md:grid-cols-2 min-h-[70vh] bg-white">
          <div className="bg-white p-8 md:p-20 flex flex-col justify-center items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-black text-3xl md:text-4xl font-bold mb-6">
                Rethinking Beauty Together
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-md">
                We're building a community that's excited about showing up for their skin and making the most of every day.
                <br/><br/>
                Be a part of it - use #InMotion to show us where FORTA takes you!
              </p>
              <a 
                href="https://www.instagram.com/fortacosmetics" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#E3B34D] text-black px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-[#D4A032] transition-colors"
              >
                Find us @fortacosmetics <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          <div className="relative h-[50vh] md:h-auto overflow-hidden">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/ccc580bcf_TheVaultStock-10299.jpg" 
              alt="Runner in Motion" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            />
          </div>
        </section>
      </main>

      <Footer />
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nothing+You+Could+Do&display=swap');
        .font-handwriting {
          font-family: 'Nothing You Could Do', cursive;
        }
      `}</style>
    </div>
  );
}