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
    description: "Backed by science, tested in real life."
  },
  {
    icon: <Droplets className="w-10 h-10" />,
    title: "Seamless",
    description: "Fits right into your routine."
  },
  {
    icon: <Sparkles className="w-10 h-10" />,
    title: "Radiant",
    description: "Ready for whatever the day brings."
  }];


  return (
    <div className="bg-white min-h-screen font-sans selection:bg-black selection:text-white">
      <Header />
      
      <main className="pt-14 md:pt-16 relative">
        {/* Continuous Blurred Background for Hero and Values */}
        <div className="absolute inset-0 top-0 bottom-0 pointer-events-none">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/5242c4b12_blur1.png"
            alt="Background"
            className="w-full h-full object-cover" />

        </div>

        {/* Story Section - Foreground */}
        <section className="relative z-20 grid grid-cols-1 md:grid-cols-2 min-h-[80vh] bg-white shadow-2xl">
          <div className="bg-white p-8 md:p-20 flex flex-col justify-center items-start order-2 md:order-1">
            <div>
              <h2 className="text-black text-3xl md:text-4xl font-bold mb-8">Our Story</h2>
              <div className="space-y-6 text-gray-700 text-base md:text-lg leading-relaxed">
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
            </div>
          </div>
          
          <div className="relative h-[50vh] md:h-auto order-1 md:order-2 overflow-hidden">
             <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/77e0495c9_2-04310.jpg"
              alt="Lexie Hull and Sarah Guller"
              className="absolute inset-0 w-full h-full object-cover object-[center_35%] transition-transform duration-1000 hover:scale-105" />

          </div>
        </section>

        {/* Hero Section */}
        <section className="relative h-[15vh] flex items-center justify-center overflow-hidden z-0">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/985f7ecb5_Tagline-_white-17.png"
            alt="FORTA Tagline"
            className="h-10 md:h-14 object-contain relative z-10"
          />
        </section>

        {/* Community Section */}
        <section className="relative z-20 flex flex-col md:flex-row min-h-[40vh] bg-white">
          <div className="relative h-[50vh] md:h-auto md:w-[60%] overflow-hidden">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/e071df351_2-04926.jpg"
              alt="Beauty in Motion"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            />
          </div>

          <div className="bg-white p-8 md:p-20 flex flex-col justify-center items-start md:w-[40%]">
            <div>
              <h2 className="text-black text-3xl md:text-4xl font-bold mb-6">Join Our Community</h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-10 max-w-md">
                We're building a community that refuses to slow down.
                <br /><br />
                If Forta's mission in blending performance and beauty resonates, we'd love to hear from you!
              </p>
              <a
                href="https://www.instagram.com/fortacosmetics"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1e3a5f] text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-[#2a4d7f] transition-colors"
              >
                Find us @fortacosmetics <ArrowRight className="w-4 h-4" />
              </a>
            </div>
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
    </div>);

}