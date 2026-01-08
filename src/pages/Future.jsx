import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Future() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center pt-16 md:pt-20">
        <h1 className="text-4xl md:text-6xl font-bold tracking-widest text-black">
          COMING SOON
        </h1>
      </main>
      
      <Footer />
    </div>
  );
}