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
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/23cd346df_TheVaultStock-10414.jpg"
              alt="Children playing sports"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="bg-white p-8 md:p-16 lg:p-24 flex flex-col justify-center">
            <div className="max-w-lg">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 tracking-tight">
                Forta Impact Foundation
              </h1>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed font-light mb-8">
                From day one, Forta committed to giving back—pledging 1% of all proceeds to organizations that help children in underprivileged communities gain access to sports.
              </p>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed font-light">
                We believe that the opportunity to play, move, and be part of a team at a young age can be life-changing. Every child deserves the chance to experience the joy and empowerment that sports can bring, regardless of their background or circumstances.
              </p>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-2xl mx-auto text-center space-y-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Want to Support?
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:help@fortacosmetics.com?subject=Donation%20Inquiry"
                className="w-full sm:w-auto bg-black text-white px-10 py-4 font-bold text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors"
              >
                Donate
              </a>
              <a
                href="mailto:help@fortacosmetics.com"
                className="w-full sm:w-auto border-2 border-black text-black px-10 py-4 font-bold text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
              >
                Write to Us
              </a>
            </div>
            
            <p className="text-sm text-gray-500 tracking-wide">
              help@fortacosmetics.com
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}