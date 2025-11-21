import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { base44 } from "@/api/base44Client";
import HeroSection from "@/components/home/HeroSection";
import EditorialSection from "@/components/home/EditorialSection";
import { ArrowRight, Menu, ShoppingBag, X } from "lucide-react";


export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Removed unused scroll ref that was causing hydration errors

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    try {
      await base44.integrations.Core.SendEmail({
        to: "support@fortacosmetics.com",
        subject: "New Waitlist Signup",
        body: `New waitlist signup: ${email}`
      });
      setSubmitted(true);
      setEmail("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const products = [
    {
      id: 1,
      name: "Lock & Go",
      type: "Setting Spray",
      image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/a4fa62c78_forta1.jpg",
      price: "COMING SOON"
    },
    {
      id: 2,
      name: "EnduraLash",
      type: "Mascara",
      image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/789d42f8b_forta2.jpg",
      price: "COMING SOON"
    },
    {
      id: 3,
      name: "PR-Proof",
      type: "Lip Stain",
      image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/c44b0a46c_pexels-n-voitkevich-4944691.jpg",
      price: "COMING SOON"
    }
  ];

  return (
    <div className="bg-[#FDFDFD] text-black overflow-x-hidden w-full">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/5">
        <div className="flex items-center justify-between px-6 h-16 md:h-20">
          <div className="w-1/3 flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
          <div className="w-1/3 flex justify-center">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/ea4583fe7_PrimaryLogo-_black-06.png" 
              alt="FORTA" 
              className="h-5 md:h-6 object-contain mix-blend-multiply"
            />
          </div>
          <div className="w-1/3 flex justify-end">
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-black rounded-full"></span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col p-6">
          <div className="flex justify-between items-center mb-10">
            <span className="font-bold">MENU</span>
            <button onClick={() => setMobileMenuOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="space-y-6 text-2xl font-bold">
            <a href="#" className="block">SHOP ALL</a>
            <a href="#" className="block">SKINCARE</a>
            <a href="#" className="block">MAKEUP</a>
            <a href="#" className="block">SETS</a>
          </nav>
        </div>
      )}

      <main className="pt-16 md:pt-20">
        <HeroSection />



        {/* Products Row - Horizontal Scroll */}
        <section id="products" className="relative z-10 py-16 md:py-24 bg-white border-t border-black/5">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide">Coming Soon</h2>
              <div className="hidden md:flex gap-2">
                <button className="p-2 border border-black/10 hover:bg-black hover:text-white transition-colors rounded-full"><ArrowRight className="rotate-180 w-4 h-4" /></button>
                <button className="p-2 border border-black/10 hover:bg-black hover:text-white transition-colors rounded-full"><ArrowRight className="w-4 h-4" /></button>
              </div>
            </div>
            
            <div className="flex overflow-x-auto pb-10 gap-4 md:gap-8 hide-scrollbar snap-x snap-mandatory px-6 md:px-0 -mx-6 md:mx-0">
              {/* Spacer for first item padding on mobile */}
              <div className="w-2 md:hidden shrink-0" />
              {products.map((product, idx) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="min-w-[75vw] md:min-w-[350px] snap-center md:snap-start group cursor-pointer first:pl-0"
                >
                  <div className="relative aspect-[4/5] bg-[#F0F0F0] mb-4 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {idx === 0 && (
                      <div className="absolute top-3 left-3 bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                        Best Seller
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-lg uppercase">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-1">{product.type}</p>
                  <p className="font-medium text-sm tracking-wide">{product.price}</p>
                  <button className="mt-4 w-full border border-black py-2 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                    Join Waitlist
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <EditorialSection />

        {/* Full Width Image/Banner */}
        <section className="relative py-32 px-6 overflow-hidden">
          <div className="absolute inset-0">
             <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/8f284f176_Stocksy_comp_watermarked_13955321.jpg"
              alt="Texture"
              className="w-full h-full object-cover opacity-40"
            />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 uppercase tracking-tight">
              Built for Motion.<br/>Refined for Beauty.
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Join the waitlist to be the first to experience the future of active beauty.
            </p>
            
            {!submitted ? (
              <form onSubmit={handleWaitlistSubmit} className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="ENTER YOUR EMAIL" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent border-b border-black py-3 px-2 focus:outline-none placeholder:text-black/40 font-medium"
                  required
                />
                <button 
                  type="submit" 
                  disabled={loading}
                  className="bg-black text-white px-8 py-3 font-bold text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors"
                >
                  {loading ? "..." : "Join"}
                </button>
              </form>
            ) : (
              <div className="text-lg font-bold text-green-600">WELCOME TO THE CLUB.</div>
            )}
          </div>
        </section>

        {/* Footer - Minimal */}
        <footer className="bg-white border-t border-black/10 pt-16 pb-8 px-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
              <div>
                <h4 className="font-bold text-sm uppercase mb-6 tracking-wider">Shop</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li><a href="#" className="hover:text-black">All Products</a></li>
                  <li><a href="#" className="hover:text-black">Sets</a></li>
                  <li><a href="#" className="hover:text-black">Gift Cards</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase mb-6 tracking-wider">About</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li><a href="#" className="hover:text-black">Our Story</a></li>
                  <li><a href="#" className="hover:text-black">Ingredients</a></li>
                  <li><a href="#" className="hover:text-black">Sustainability</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase mb-6 tracking-wider">Support</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li><a href="#" className="hover:text-black">FAQ</a></li>
                  <li><a href="#" className="hover:text-black">Contact</a></li>
                  <li><a href="#" className="hover:text-black">Returns</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase mb-6 tracking-wider">Social</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li><a href="#" className="hover:text-black">Instagram</a></li>
                  <li><a href="#" className="hover:text-black">TikTok</a></li>
                  <li><a href="#" className="hover:text-black">Twitter</a></li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-black/5">
               <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/d218dcbf5_Screenshot2025-11-20at103436PM.png" 
                  alt="FORTA" 
                  className="h-10 mb-4 md:mb-0 mix-blend-multiply"
                />
              <p className="text-xs text-gray-400">© 2026 FORTA COSMETICS. ALL RIGHTS RESERVED.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}