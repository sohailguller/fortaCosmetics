import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Future() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-16 md:pt-20">
        {/* Hero Section with Foundation Info */}
        <section className="max-w-4xl mx-auto px-6 py-20 md:py-32">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black">
              Forta Impact Foundation
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-light">
              From day one, Forta committed to giving back—pledging 1% of all proceeds to organizations that help children in underprivileged communities gain access to sports. We believe that the opportunity to play, move, and be part of a team at a young age can be life-changing. Every child deserves the chance to experience the joy and empowerment that sports can bring, regardless of their background or circumstances.
            </p>
          </div>
        </section>

        {/* Image Section */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="aspect-[16/9] bg-gray-200 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?w=1200&h=675&fit=crop"
              alt="Children playing sports"
              className="w-full h-full object-cover grayscale"
            />
          </div>
        </section>

        {/* Support Section */}
        <section className="max-w-4xl mx-auto px-6 py-20 md:py-32">
          <div className="text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">
              Want to Support?
            </h2>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center pt-8">
              <a
                href="mailto:help@fortacosmetics.com?subject=Donation%20Inquiry"
                className="bg-black text-white px-12 py-4 font-bold text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors"
              >
                Donate
              </a>
              <a
                href="mailto:help@fortacosmetics.com"
                className="border-2 border-black text-black px-12 py-4 font-bold text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
              >
                Write to Us
              </a>
            </div>
            <p className="text-sm text-gray-500 pt-4">
              help@fortacosmetics.com
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}