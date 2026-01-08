import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="relative max-w-full mx-auto h-14 md:h-16 px-6 md:px-8">
          <div className="grid grid-cols-3 items-center h-full gap-4">
            {/* Left: Hamburger (Mobile) / Nav Links (Desktop) */}
            <div className="flex items-center justify-start">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded transition-colors touch-manipulation"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <Menu className="w-5 h-5 pointer-events-none" />
              </button>

              <nav className="hidden md:flex items-center gap-8 md:gap-12">
                <Link to={createPageUrl("Home")} className="text-xs md:text-sm font-medium tracking-wider hover:opacity-60 transition-opacity">
                  HOME
                </Link>
                <Link to={createPageUrl("About")} className="text-xs md:text-sm font-medium tracking-wider hover:opacity-60 transition-opacity">
                  ABOUT
                </Link>
                <Link to={createPageUrl("Future")} className="text-xs md:text-sm font-medium tracking-wider hover:opacity-60 transition-opacity">
                  FUTURE
                </Link>
              </nav>
            </div>

            {/* Center: Logo */}
            <div className="flex items-center justify-center">
              <Link 
                to={createPageUrl("Home")} 
                className="inline-block py-3 px-2 touch-manipulation"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/ea4583fe7_PrimaryLogo-_black-06.png" 
                  alt="FORTA" 
                  className="h-4 md:h-5 object-contain mix-blend-multiply pointer-events-none"
                />
              </Link>
            </div>

            {/* Right: Shopping Bag */}
            <div className="flex items-center justify-end">
              <button 
                disabled
                className="w-10 h-10 flex items-center justify-center cursor-not-allowed touch-manipulation"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <ShoppingBag className="w-5 h-5 text-black pointer-events-none" />
              </button>
            </div>
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
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            />

            {/* Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-14 left-0 w-full z-50 bg-white shadow-xl border-b border-black/10"
            >
              <nav className="flex flex-col">
                <Link 
                  to={createPageUrl("Home")} 
                  className="px-8 py-4 text-sm font-medium tracking-wider hover:bg-gray-50 transition-colors border-b border-black/5" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  HOME
                </Link>
                <Link 
                  to={createPageUrl("About")} 
                  className="px-8 py-4 text-sm font-medium tracking-wider hover:bg-gray-50 transition-colors border-b border-black/5" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ABOUT
                </Link>
                <Link 
                  to={createPageUrl("Future")} 
                  className="px-8 py-4 text-sm font-medium tracking-wider hover:bg-gray-50 transition-colors" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  FUTURE
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}