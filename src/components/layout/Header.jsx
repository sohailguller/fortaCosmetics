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
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-black rounded-full"></span>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100vh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-white flex flex-col p-6 overflow-hidden"
          >
            <div className="flex justify-between items-center mb-10">
              <span className="font-bold tracking-widest">MENU</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="space-y-4">
              <Link to={createPageUrl("Home")} className="block text-lg font-medium hover:opacity-60 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to={createPageUrl("About")} className="block text-lg font-medium hover:opacity-60 transition-opacity" onClick={() => setMobileMenuOpen(false)}>About</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}