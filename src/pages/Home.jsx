import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { base44 } from "@/api/base44Client";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentAthleteImage, setCurrentAthleteImage] = useState(0);

  const athleteImages = [
    "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/bb4180e94_Stocksy_comp_watermarked_2772295.jpg",
    "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/20b40f83d_Stocksy_comp_watermarked_4731729.jpg",
    "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/ff656c12d_Stocksy_comp_watermarked_1395532.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAthleteImage((prev) => (prev + 1) % athleteImages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [athleteImages.length]);

  const { scrollY, scrollYProgress } = useScroll();
  
  // Hero parallax
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.05]);

  // Smooth spring animation
  const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 30 });

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

  return (
    <div className="bg-white">
      {/* Hero - Full Screen with Parallax */}
      <section className="relative h-screen overflow-hidden">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0"
        >
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/4fee4db6e_Stocksy_comp_watermarked_27722951.jpg"
            alt="FORTA"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        <div className="relative z-10 h-full flex flex-col p-6 md:p-10 lg:p-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-auto"
          >
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/2616d000c_PrimaryLogo-_white-07.png"
              alt="FORTA"
              className="h-8 md:h-10 object-contain"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-4xl mb-8 md:mb-12"
          >
            <h1 className="text-white text-5xl md:text-7xl lg:text-8xl xl:text-9xl mb-6 tracking-tight leading-[0.9]">
              You don't<br />have to sit<br />still to look<br />pretty.
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-white/70 text-sm md:text-base tracking-[0.2em] uppercase"
            >
              Coming 2026
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Tagline Section with Parallax */}
      <section className="relative py-16 md:py-24 lg:py-32 bg-white overflow-hidden">
        <motion.div
          style={{ y: useTransform(smoothScrollY, [400, 1200], [50, -50]) }}
          className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/d613bfc0b_Tagline-_black-16.jpg"
              alt="FOR THE ACTIVE"
              className="w-full max-w-5xl mix-blend-multiply"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Product Hero - Split with Overlap */}
      <section className="relative bg-black">
        <div className="grid lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative h-[70vh] lg:h-screen"
          >
            <motion.div
              style={{ y: useTransform(smoothScrollY, [1000, 2000], [0, -100]) }}
              className="h-full"
            >
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/789d42f8b_forta2.jpg"
                alt="Lock & Go Setting Spray"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center justify-center px-6 py-16 md:p-16 lg:p-20 xl:p-24 lg:-ml-20 relative z-10 bg-black"
          >
            <div className="max-w-xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-[var(--stone)] text-xs tracking-[0.3em] mb-6 uppercase"
              >
                Hero Product
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-white text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight leading-[1.05]"
              >
                Lock & Go<br />Setting Spray
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-white/60 text-lg md:text-xl leading-relaxed"
              >
                16-hour wear. Sweat-resistant. Transfer-proof.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Grid - 3 Cards like Healf */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl text-black mb-12 tracking-tight"
          >
            Coming Soon
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Product 1 - Lock & Go */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <div className="relative bg-white overflow-hidden mb-4 aspect-[3/4]">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/a4fa62c78_forta1.jpg"
                  alt="Lock & Go"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-[var(--stone)] text-xs tracking-[0.3em] mb-2 uppercase">01</p>
                <h4 className="text-black text-xl md:text-2xl tracking-tight mb-2">Lock & Go</h4>
                <p className="text-black/60 text-sm">Setting Spray</p>
              </div>
            </motion.div>

            {/* Product 2 - EnduraLash */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <div className="relative bg-[#E5DED3] overflow-hidden mb-4 aspect-[3/4] flex items-center justify-center">
                <div className="text-center px-6">
                  <p className="text-black/40 text-xs tracking-[0.3em] mb-3 uppercase">Coming Soon</p>
                  <h4 className="text-black text-2xl md:text-3xl tracking-tight">EnduraLash</h4>
                </div>
              </div>
              <div>
                <p className="text-[var(--stone)] text-xs tracking-[0.3em] mb-2 uppercase">02</p>
                <h4 className="text-black text-xl md:text-2xl tracking-tight mb-2">EnduraLash</h4>
                <p className="text-black/60 text-sm">Mascara</p>
              </div>
            </motion.div>

            {/* Product 3 - PR-Proof */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <div className="relative bg-[#C9C0B4] overflow-hidden mb-4 aspect-[3/4] flex items-center justify-center">
                <div className="text-center px-6">
                  <p className="text-white/40 text-xs tracking-[0.3em] mb-3 uppercase">Coming Soon</p>
                  <h4 className="text-white text-2xl md:text-3xl tracking-tight">PR-Proof</h4>
                </div>
              </div>
              <div>
                <p className="text-[var(--stone)] text-xs tracking-[0.3em] mb-2 uppercase">03</p>
                <h4 className="text-black text-xl md:text-2xl tracking-tight mb-2">PR-Proof</h4>
                <p className="text-black/60 text-sm">Lip Stain</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Grid - No Gaps with Stagger */}
      <section>
        <div className="grid grid-cols-3 gap-0">
          {[
            "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/c44b0a46c_pexels-n-voitkevich-4944691.jpg",
            "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/96d4ec8c1_TheVaultStock-10216.jpg",
            "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/7eaf36d7e_TheVaultStock-10299.jpg"
          ].map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="aspect-square overflow-hidden"
            >
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
                src={img}
                alt=""
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy - Dark with Overlay and Parallax */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div
          style={{ y: useTransform(smoothScrollY, [2500, 3500], [0, -200]) }}
          className="absolute inset-0"
        >
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/ddbbe1ce2_TheVaultStock-10296.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
        
        <div className="relative z-10 w-full px-6 md:px-10 lg:px-12 py-24 md:py-32">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
            >
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-white text-4xl md:text-6xl lg:text-7xl xl:text-8xl mb-8 tracking-tight leading-[1.05]"
              >
                Built for Motion.<br />Refined for Beauty.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-white/80 text-xl md:text-2xl lg:text-3xl leading-relaxed max-w-3xl"
              >
                Every FORTA formula is engineered for endurance. Long-wear, durable, made-to-last.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Waitlist with gradient background */}
      <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/25fb0a76d_Screenshot2025-10-28at60718PM.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight leading-[1.1]">
              Coming Soon
            </h2>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12">
              Join the waitlist for launch access
            </p>

            {!submitted ? (
              <form onSubmit={handleWaitlistSubmit} className="max-w-xl mx-auto">
                <div className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    className="w-full px-6 py-5 bg-white/90 backdrop-blur text-black placeholder:text-black/40 focus:outline-none focus:bg-white transition-colors text-base"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-8 py-5 bg-black text-white hover:bg-black/90 transition-colors disabled:opacity-50 text-sm tracking-[0.2em] uppercase font-medium"
                  >
                    {loading ? "..." : "Join the Waitlist"}
                  </button>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-white text-xl"
              >
                ✓ You're on the list
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer with Rotating Athlete Images */}
      <footer className="bg-black text-white py-16 md:py-20">
        <div className="w-full px-6 md:px-10 lg:px-12">
          {/* Expanded Bracket Logo with Rotating Image */}
          <div className="mb-12 md:mb-16 flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-lg">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/4f99d6659_ExpandedBracket-_white-12.png"
                alt="FORTA"
                className="w-full h-auto object-contain"
              />
              
              <div className="absolute top-1/2 left-[32%] -translate-x-1/2 -translate-y-1/2 w-[36%] h-[65%]">
                <motion.img
                  key={currentAthleteImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  src={athleteImages[currentAthleteImage]}
                  alt="Athlete"
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-12">
              <div>
                <h3 className="text-sm font-medium tracking-wider mb-4 md:mb-6 uppercase">Shop</h3>
                <p className="text-sm text-white/60">Coming 2026</p>
              </div>

              <div>
                <h3 className="text-sm font-medium tracking-wider mb-4 md:mb-6 uppercase">Company</h3>
                <p className="text-sm text-white/60">support@fortacosmetics.com</p>
              </div>

              <div>
                <h3 className="text-sm font-medium tracking-wider mb-4 md:mb-6 uppercase">Connect</h3>
                <p className="text-sm text-white/60">Instagram</p>
              </div>
            </div>

            <div className="pt-8 md:pt-12 border-t border-white/10 text-center">
              <p className="text-xs text-white/40 tracking-wide">
                © 2025 FORTA. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}