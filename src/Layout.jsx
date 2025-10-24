import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [cartCount, setCartCount] = React.useState(0);

  React.useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('forta-cart') || '[]');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);

    const handleCartUpdate = () => {
      const updatedCart = JSON.parse(localStorage.getItem('forta-cart') || '[]');
      const newCount = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(newCount);
    };

    window.addEventListener('cart-updated', handleCartUpdate);
    return () => window.removeEventListener('cart-updated', handleCartUpdate);
  }, [location]);

  const navigation = [
    { name: "Home", path: createPageUrl("Home") },
    { name: "Shop", path: createPageUrl("Shop") },
    { name: "About", path: createPageUrl("About") },
    { name: "Contact", path: createPageUrl("Contact") },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
          letter-spacing: -0.01em;
        }
        
        :root {
          --black: #000000;
          --off-white: #F8F8F8;
          --navy: #0A1A2F;
        }

        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-black text-white z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="text-2xl font-light tracking-wider">
              FORTA
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-12">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-light tracking-wide transition-opacity duration-300 ${
                    isActive(item.path) ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Cart & Mobile Menu */}
            <div className="flex items-center space-x-6">
              <Link
                to={createPageUrl("Cart")}
                className="relative group"
              >
                <ShoppingBag className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-white text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-white/10 overflow-hidden"
            >
              <nav className="px-6 py-6 space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block text-lg font-light ${
                      isActive(item.path) ? 'opacity-100' : 'opacity-60'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white mt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-light tracking-wider mb-4">FORTA</h3>
              <p className="text-sm text-white/60 font-light leading-relaxed max-w-md">
                High-performance cosmetics engineered for the modern individual. 
                Clean formulations, clinical results.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-4 tracking-wide">Shop</h4>
              <nav className="space-y-3">
                <Link to={createPageUrl("Shop")} className="block text-sm text-white/60 hover:text-white transition-colors">
                  All Products
                </Link>
                <Link to={createPageUrl("Shop") + "?category=face"} className="block text-sm text-white/60 hover:text-white transition-colors">
                  Face
                </Link>
                <Link to={createPageUrl("Shop") + "?category=body"} className="block text-sm text-white/60 hover:text-white transition-colors">
                  Body
                </Link>
              </nav>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-4 tracking-wide">Company</h4>
              <nav className="space-y-3">
                <Link to={createPageUrl("About")} className="block text-sm text-white/60 hover:text-white transition-colors">
                  About Us
                </Link>
                <Link to={createPageUrl("Contact")} className="block text-sm text-white/60 hover:text-white transition-colors">
                  Contact
                </Link>
              </nav>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 text-center">
            <p className="text-sm text-white/40 font-light">
              © 2025 Forta. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}