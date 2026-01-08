import React from "react";
import LogoCarousel from "@/components/ui/LogoCarousel";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Instagram } from "lucide-react";

const TikTokIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative z-20 bg-white border-t border-black/10 pt-16 pb-8 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div>
            <h4 className="font-bold text-sm uppercase mb-6 tracking-wider">Shop</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link to={createPageUrl("Home")} className="hover:text-black">All Products</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase mb-6 tracking-wider">About</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link to={createPageUrl("About")} className="hover:text-black">Our Story</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase mb-6 tracking-wider">Social</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <a href="https://www.instagram.com/fortacosmetics" target="_blank" rel="noopener noreferrer" className="hover:text-black flex items-center gap-2">
                  <Instagram className="w-5 h-5" /> Instagram
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@fortacosmetics" target="_blank" rel="noopener noreferrer" className="hover:text-black flex items-center gap-2">
                  <TikTokIcon /> TikTok
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase mb-6 tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <a href="mailto:help@fortacosmetics.com" className="hover:text-black">
                  Email Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-black/5">
            <div className="relative mb-4 md:mb-0 inline-block">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/d218dcbf5_Screenshot2025-11-20at103436PM.png" 
                alt="FORTA" 
                className="h-10 md:h-12 object-contain mix-blend-multiply relative z-20 pointer-events-none" 
              />
              <div className="absolute top-[11%] bottom-[13%] left-[16%] w-[38%] z-30">
                <LogoCarousel className="w-full h-full" />
              </div>
            </div>
          <p className="text-xs text-gray-400">© 2026 FORTA COSMETICS. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}