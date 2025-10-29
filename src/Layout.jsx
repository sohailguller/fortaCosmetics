import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [cartCount, setCartCount] = React.useState(0);
  const [scrolled, setScrolled] = React.useState(false);
  const [currentAthleteImage, setCurrentAthleteImage] = React.useState(0);

  const athleteImages = [
    "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/bb4180e94_Stocksy_comp_watermarked_2772295.jpg",
    "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/20b40f83d_Stocksy_comp_watermarked_4731729.jpg",
    "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/ff656c12d_Stocksy_comp_watermarked_1395532.jpg"
  ];

  React.useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("forta-cart") || "[]");
    setCartCount(cart.reduce((s, i) => s + i.quantity, 0));
    const onUpdate = () => {
      const c = JSON.parse(localStorage.getItem("forta-cart") || "[]");
      setCartCount(c.reduce((s, i) => s + i.quantity, 0));
    };
    window.addEventListener("cart-updated", onUpdate);
    return () => window.removeEventListener("cart-updated", onUpdate);
  }, [location]);

  React.useEffect(() => {
    const id = setInterval(() => setCurrentAthleteImage(p => (p + 1) % athleteImages.length), 3000);
    return () => clearInterval(id);
  }, [athleteImages.length]);

  const navigation = [
    { name: "Home", path: createPageUrl("Home") },
    { name: "Shop", path: createPageUrl("Shop") },
    { name: "About", path: createPageUrl("About") },
    { name: "Contact", path: createPageUrl("Contact") },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <style>{`
        /* FONTS */
        @font-face {
          font-family: 'GT Sectra';
          src: url('https://dl.dropboxusercontent.com/scl/fi/7ehv7fa316dfnoh8ovgor/GT-Sectra-Fine-Book.otf?rlkey=n9x18qjoy7y30be19n8aujath&st=3qvzhkw3') format('opentype');
          font-weight: 400; font-style: normal; font-display: swap;
        }
        @font-face {
          font-family: 'Aktiv Grotesk';
          src: url('https://dl.dropboxusercontent.com/scl/fi/35sm2m0albyt6gofq2t3s/AktivGrotesk_Rg.ttf?rlkey=36puj9mfxck45sv5e76pgw1j9&st=m46vqfqm') format('truetype');
          font-weight: 400; font-style: normal; font-display: swap;
        }
        * { font-family: 'Aktiv Grotesk', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif; letter-spacing: -0.01em; }
        h1, h2 { font-family: 'GT Sectra', Georgia, serif; font-weight: 400; letter-spacing: -0.02em; }

        :root {
          --dark: #1a1a1a; --darker: #0f0f0f; --light: #f5f5f0; --accent: #8b7355; --muted: #6b6b6b;
          /* --- SLOT TUNING (PERCENTAGES OF THE LOGO BOX) --- */
          /* Center of the parentheses gap (x), plus slot size */
          --slot-center: 41.8%;   /* 👈 tweak this if needed */
          --slot-width: 32%;      /* width of rounded image area */
          --slot-height: 34%;     /* height of rounded image area */
          --slot-radius: 24px;    /* corner radius of the slot */
        }
        @media (min-width: 768px) {
          :root { --slot-center: 41.2%; --slot-width: 31%; --slot-height: 34%; }
        }
        @media (min-width: 1024px) {
          :root { --slot-center: 41.9%; --slot-width: 32%; --slot-height: 35%; }
        }

        body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; background: var(--dark); }
        .smooth-transition { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
      `}</style>

      {/* Promo Bar */}
      <div className="bg-[#4A6FA5] text-white text-center py-2 text-xs font-light tracking-wider overflow-hidden">
        <motion.div animate={{ x: [0, -500] }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }} className="whitespace-nowrap">
          {Array(8).fill("FREE SHIPPING ON ORDERS OVER $50").map((t, i) => (<span key={i} className="mx-12">{t}</span>))}
        </motion.div>
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-50 smooth-transition ${scrolled ? "bg-[#1a1a1a]/95 backdrop-blur-md shadow-lg" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-20">
            <nav className="hidden md:flex items-center space-x-10">
              {navigation.map((item) => (
                <Link key={item.name} to={item.path}
                  className={`text-sm font-light tracking-wider smooth-transition ${isActive(item.path) ? "text-white" : "text-[#6b6b6b] hover:text-white"}`}>
                  {item.name}
                </Link>
              ))}
            </nav>

            <Link to={createPageUrl("Home")} className="absolute left-1/2 -translate-x-1/2">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/2616d000c_PrimaryLogo-_white-07.png"
                alt="FORTA"
                className="h-6 md:h-7 object-contain"
              />
            </Link>

            <div className="flex items-center space-x-6">
              <Link to={createPageUrl("Cart")} className="relative group">
                <ShoppingBag className="w-5 h-5 text-white smooth-transition group-hover:scale-110" />
                {cartCount > 0 && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-[#8b7355] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                    {cartCount}
                  </motion.span>
                )}
              </Link>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-white/10 overflow-hidden bg-[#1a1a1a]">
              <nav className="px-6 py-6 space-y-4">
                {navigation.map((item) => (
                  <Link key={item.name} to={item.path} onClick={() => setMobileMenuOpen(false)}
                    className={`block text-lg font-light ${isActive(item.path) ? "text-white" : "text-[#6b6b6b]"}`}>
                    {item.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-[#0f0f0f] text-white border-t border-white/5">
        <div className="w-full px-6 lg:px-12 xl:px-16 py-12 md:py-16 lg:py-20">
          {/* Bracket block */}
          <div className="mb-12 md:mb-16 lg:mb-20 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
              {/* Bracket Logo (background) */}
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/4f99d6659_ExpandedBracket-_white-12.png"
                alt="FORTA"
                className="w-full h-auto object-contain"
              />

              {/* EXACTLY centered in parentheses gap via CSS vars */}
              <div className="absolute inset-0 pointer-events-none">
                <div
                  className="
                    absolute
                    top-1/2 -translate-y-1/2
                    -translate-x-1/2
                    rounded-[var(--slot-radius)]
                    overflow-hidden
                  "
                  style={{
                    left: "var(--slot-center)",
                    width: "var(--slot-width)",
                    height: "var(--slot-height)"
                  }}
                >
                  <img
                    src={athleteImages[currentAthleteImage]}
                    alt="Athlete"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer nav */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 xl:gap-24 mb-12 md:mb-16">
            <div>
              <h3 className="text-sm font-medium tracking-wider mb-4 md:mb-6">SHOP</h3>
              <nav className="space-y-3 md:space-y-4">
                <Link to={createPageUrl("Shop")} className="block text-sm text-[#6b6b6b] hover:text-white smooth-transition">All Products</Link>
                <Link to={createPageUrl("ProductDetail")} className="block text-sm text-[#6b6b6b] hover:text-white smooth-transition">Lock & Go Setting Spray</Link>
              </nav>
            </div>
            <div>
              <h3 className="text-sm font-medium tracking-wider mb-4 md:mb-6">COMPANY</h3>
              <nav className="space-y-3 md:space-y-4">
                <Link to={createPageUrl("About")} className="block text-sm text-[#6b6b6b] hover:text-white smooth-transition">About Us</Link>
                <Link to={createPageUrl("Contact")} className="block text-sm text-[#6b6b6b] hover:text-white smooth-transition">Contact</Link>
              </nav>
            </div>
            <div>
              <h3 className="text-sm font-medium tracking-wider mb-4 md:mb-6">CONNECT</h3>
              <p className="text-sm text-[#6b6b6b] mb-3 md:mb-4">support@fortacosmetics.com</p>
              <a href="https://instagram.com/forta" target="_blank" rel="noopener noreferrer" className="text-sm text-[#6b6b6b] hover:text-white smooth-transition">Instagram</a>
            </div>
          </div>

          <div className="pt-8 md:pt-12 border-t border-white/5 text-center">
            <p className="text-xs text-[#6b6b6b] font-light">© 2025 FORTA. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
