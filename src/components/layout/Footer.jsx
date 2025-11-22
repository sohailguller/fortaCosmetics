import React from "react";
import LogoCarousel from "@/components/ui/LogoCarousel";

export default function Footer() {
  return (
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