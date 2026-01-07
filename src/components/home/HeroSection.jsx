import React from "react";

export default function HeroSection() {
  return (
    <section className="relative h-[70vh] md:h-screen w-full overflow-hidden mb-0">
      <div className="fixed top-0 left-0 right-0 h-[70vh] md:h-screen flex z-0">
        <img
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/542f0db57_2-05636.jpg"
          alt="Hero Left"
          className="w-1/3 h-full object-cover"
        />
        <img
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/46dc5bbc1_2-04837.jpg"
          alt="Hero Center"
          className="w-1/3 h-full object-cover"
        />
        <img
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/f7d92cc35_2-05543.jpg"
          alt="Hero Right"
          className="w-1/3 h-full object-cover"
        />
      </div>
      
      <div className="fixed top-0 left-0 right-0 h-[70vh] md:h-screen bg-gradient-to-t from-black/50 via-black/10 to-transparent md:bg-black/10 z-0" />
      
      <div className="absolute bottom-20 left-8 md:bottom-24 md:left-16 flex flex-col items-start text-left z-10">
        <h1 className="text-white font-serif text-xl md:text-3xl font-normal tracking-tight mb-4 max-w-xl leading-[1.2] drop-shadow-lg md:drop-shadow-none">
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