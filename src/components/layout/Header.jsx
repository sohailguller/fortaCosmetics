import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/5">
        <div className="flex items-center justify-between px-6 h-16 md:h-20">
          <div className="w-1/3 flex items-center">
            <button onClick={() => setMobileMenuOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
          <div className="w-1/3 flex justify-center">
            <Link to={createPageUrl("Home")}>
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/ea4583fe7_PrimaryLogo-_black-06.png" 
                alt="FORTA" 
                className="h-5 md:h-6 object-contain mix-blend-multiply"
              />
            </Link>
          </div>
          <div className="w-1/3 flex justify-end">
            <ShoppingBag className="w-5 h-5" />
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