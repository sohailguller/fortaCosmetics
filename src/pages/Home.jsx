import React, { useState, useRef } from "react";
import { base44 } from "@/api/base44Client";
import HeroSection from "@/components/home/HeroSection";
import EditorialSection from "@/components/home/EditorialSection";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowRight } from "lucide-react";


export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const emailFormRef = useRef(null);

  const scrollToEmailForm = () => {
    emailFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    if (!email || loading) return;
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const response = await base44.functions.invoke("joinWaitlist", { email });
      
      if (response.data.status === 'already_registered') {
        alert("You are already on the waitlist!");
        setSubmitted(true);
        return;
      }

      if (response.data.error) {
        throw new Error(response.data.error);
      }
      
      setSubmitted(true);
      setEmail("");
    } catch (error) {
      console.error("Error:", error);
      alert(`Something went wrong: ${error.message || "Please try again."}`);
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
      image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/e4c34cb15_ChatGPTImageNov21202510_39_57PM.png",
      price: "COMING SOON"
    },
    {
      id: 3,
      name: "PR-Proof",
      type: "Lip Stain",
      image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/8f13b61ea_ChatGPTImageNov21202510_39_51PM.png",
      price: "COMING SOON"
    }
  ];

  return (
    <div className="bg-[#FDFDFD] text-black overflow-x-hidden w-full">
      <Header />

      {/* Moving Banner */}
      <div className="fixed top-16 md:top-20 left-0 right-0 z-40 bg-black text-white py-1.5 overflow-hidden">
        <div className="flex animate-marquee">
          <div className="flex items-center whitespace-nowrap pr-8">
            {Array.from({ length: 20 }).map((_, i) => (
              <React.Fragment key={i}>
                <span className="text-xs font-bold tracking-widest">COMING 2026</span>
                <span className="mx-6">•</span>
              </React.Fragment>
            ))}
          </div>
          <div className="flex items-center whitespace-nowrap">
            {Array.from({ length: 20 }).map((_, i) => (
              <React.Fragment key={i}>
                <span className="text-xs font-bold tracking-widest">COMING 2026</span>
                <span className="mx-6">•</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <main className="pt-[80px] md:pt-[96px]">
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
                <div 
                  key={product.id}
                  className="min-w-[75vw] md:min-w-[350px] snap-center md:snap-start group cursor-pointer first:pl-0"
                >
                  <div className="relative aspect-[4/5] bg-[#F0F0F0] mb-4 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      loading="eager"
                      className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${idx > 0 ? 'blur-lg group-hover:blur-sm' : ''}`}
                    />
                    {idx === 0 && (
                      <div className="absolute top-3 left-3 bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                        Debut Product
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-lg uppercase">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-1">{product.type}</p>
                  <p className="font-medium text-sm tracking-wide">{product.price}</p>
                  <button 
                    onClick={scrollToEmailForm}
                    className="mt-4 w-full border border-black py-2 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                  >
                    Join Waitlist
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <EditorialSection />

        {/* Full Width Image/Banner */}
        <section id="waitlist" ref={emailFormRef} className="relative py-32 px-6 overflow-hidden">
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
              <div className="bg-black text-white px-8 py-3 font-bold text-sm uppercase tracking-widest inline-block">
                YOU'RE IN.
              </div>
            )}
          </div>
        </section>

        <Footer />
      </main>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}