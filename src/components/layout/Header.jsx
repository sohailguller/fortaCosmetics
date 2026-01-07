import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black/10">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 h-14 md:h-16">
          <nav className="flex items-center gap-8 md:gap-12">
            <Link to={createPageUrl("Home")} className="text-xs md:text-sm font-medium tracking-wider hover:opacity-60 transition-opacity">
              HOME
            </Link>
            <Link to={createPageUrl("About")} className="text-xs md:text-sm font-medium tracking-wider hover:opacity-60 transition-opacity">
              ABOUT
            </Link>
            <button onClick={() => setMobileMenuOpen(true)} className="text-xs md:text-sm font-medium tracking-wider hover:opacity-60 transition-opacity">
              FUTURE
            </button>
          </nav>
          <div className="flex justify-end">
            <Link to={createPageUrl("Home")}>
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/ea4583fe7_PrimaryLogo-_black-06.png" 
                alt="FORTA" 
                className="h-4 md:h-5 object-contain mix-blend-multiply"
              />
            </Link>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={{ left: 0.5, right: 0.05 }}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.x < -100 || velocity.x < -500) {
                  setMobileMenuOpen(false);
                }
              }}
              className="fixed top-0 left-0 bottom-0 w-[85vw] md:w-[400px] z-50 bg-white shadow-2xl p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="font-bold tracking-widest text-sm">MENU</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <nav className="space-y-6 flex-1">
                <Link 
                  to={createPageUrl("Home")} 
                  className="block text-3xl font-light tracking-tight hover:translate-x-2 transition-transform duration-300" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to={createPageUrl("About")} 
                  className="block text-3xl font-light tracking-tight hover:translate-x-2 transition-transform duration-300" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
              </nav>

              <div className="pt-8 border-t border-gray-100">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">Socials</p>
                <div className="flex gap-4 text-sm font-medium">
                  <a href="https://www.instagram.com/fortacosmetics" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}