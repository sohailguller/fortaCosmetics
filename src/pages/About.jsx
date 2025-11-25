import React from "react";
import { motion } from "framer-motion";
import { Smile, Droplets, Sparkles, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function About() {
  const values = [
    {
      icon: <Smile className="w-8 h-8 mb-4" />,
      title: "Trusted",
      description: "Backed by science, tested in real life.",
    },
    {
      icon: <Droplets className="w-8 h-8 mb-4" />,
      title: "Seamless",
      description: "Fits right into your routine.",
    },
    {
      icon: <Sparkles className="w-8 h-8 mb-4" />,
      title: "Radiant",
      description: "Ready for whatever the day brings.",
    },
  ];

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-[#0A1E36] selection:text-white">
      <Header />
      
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[60vh] bg-white flex items-center overflow-hidden">
          {/* Blurred Background */}
          <div className="absolute inset-0">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/af665d005_blur10.png"
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full flex justify-center">
            <motion.img
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/5dba06792_Tagline-_black-16.png"
              alt="FORTA Tagline"
              className="h-16 md:h-24 object-contain"
            />
          </div>
        </section>

        {/* Story Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh]">
          <div className="bg-white p-8 md:p-20 flex flex-col justify-center items-start order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-[#0A1E36] text-3xl font-bold mb-8">Our Story</h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-light">
                <p>
                  Our brand was founded by WNBA star Lexie Hull and her former Stanford roommate, Sarah Guller. After graduating, we realized the beauty industry was missing products built for people whose lives don't slow down. We wanted makeup that could keep up with workouts, long workdays, and everything in between - without the constant need to reapply. That mission inspired us to create a brand made specifically for the active, with formulas designed to last through sweat, movement, and all the demands of a busy day (or night).
                </p>
                <p>
                  At the heart of our brand is a belief that confidence should carry you from morning to night. We want you to feel empowered, fresh, and unstoppable no matter what your schedule holds. Every product we create is meant to support your lifestyle, not restrict it. With our makeup, you don't have to pause your life to look and feel your best - because you never have to sit still to look pretty.
                </p>
              </div>
              <div className="mt-12 font-handwriting text-4xl text-[#0A1E36]">
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
        <section className="bg-[#0A1E36] text-white py-24 px-6">
          <div className="max-w-[1400px] mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-medium text-center mb-16"
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
                  <div className="mb-6 p-4 rounded-full bg-white/5 border border-white/10">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-white/70 max-w-xs mx-auto leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 min-h-[70vh]">
          <div className="bg-white p-8 md:p-20 flex flex-col justify-center items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[#0A1E36] text-3xl md:text-4xl font-bold mb-6">
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
                className="inline-flex items-center gap-2 bg-[#E3B34D] text-[#0A1E36] px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-[#D4A032] transition-colors"
              >
                Find us @fortacosmetics <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          <div className="relative h-[50vh] md:h-auto overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1621891370930-396e575c5e95?q=80&w=2070&auto=format&fit=crop" 
              alt="Community Hands" 
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