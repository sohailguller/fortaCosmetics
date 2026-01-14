import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Future() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-16 md:pt-20">
        {/* Foundation Section - Image Left, Text Right */}
        <section className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
          <div className="relative h-[50vh] md:h-auto overflow-hidden">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/d95166f34_Screenshot2026-01-08at102546AM.png"
              alt="Children playing sports"
              className="w-full h-full object-cover object-[center_45%] grayscale"
            />
          </div>
          
          <div className="bg-white p-8 md:p-16 lg:p-24 flex flex-col justify-center">
            <div className="max-w-lg">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 tracking-tight">
                Forta Impact Foundation
              </h1>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-8">
                From day one, Forta committed to giving back—pledging 1% of all proceeds to organizations that help children in underprivileged communities gain access to sports.
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-12">
                We believe that the opportunity to play, move, and be part of a team at a young age can be life-changing. Every child deserves the chance to experience the joy and empowerment that sports can bring, regardless of their background or circumstances.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
                Want to Support?
              </h2>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:help@fortacosmetics.com?subject=Donation%20Inquiry"
                  className="w-full sm:w-40 bg-black text-white px-8 py-3 font-bold text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors text-center"
                >
                  Donate
                </a>
                <a
                  href="mailto:help@fortacosmetics.com"
                  className="w-full sm:w-40 border-2 border-black text-black px-8 py-3 font-bold text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors text-center"
                >
                  Write to Us
                </a>
              </div>
            </div>
          </div>
        </section>


      </main>
      
      <Footer />
    </div>
  );
}