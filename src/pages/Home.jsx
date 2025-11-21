import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { base44 } from "@/api/base44Client";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

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
      {/* Hero Section - Full Screen */}
      <section className="relative h-screen overflow-hidden bg-black">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0"
        >
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/4fee4db6e_Stocksy_comp_watermarked_27722951.jpg"
            alt="FORTA"
            className="w-full h-full object-cover opacity-60"
          />
        </motion.div>

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-center"
          >
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/2616d000c_PrimaryLogo-_white-07.png"
              alt="FORTA"
              className="h-10 md:h-12 mx-auto mb-12"
            />
            <h1 className="text-white text-4xl md:text-7xl lg:text-8xl mb-6 tracking-tight leading-[0.95]">
              You don't have to<br />sit still to<br />look pretty.
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-white/80 text-sm md:text-base tracking-[0.2em] uppercase mt-8"
            >
              Coming 2026
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Tagline Section */}
      <section className="py-16 md:py-24 bg-[var(--linen)]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/d613bfc0b_Tagline-_black-16.jpg"
              alt="FOR THE ACTIVE"
              className="w-full max-w-4xl mx-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Split Product Section */}
      <section className="relative">
        <div className="grid md:grid-cols-2">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative h-[60vh] md:h-screen bg-[var(--oat)]"
          >
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/a4fa62c78_forta1.jpg"
              alt="Lock & Go Setting Spray"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center justify-center p-8 md:p-16 lg:p-24 bg-white"
          >
            <div className="max-w-lg">
              <p className="text-[var(--stone)] text-xs tracking-[0.3em] mb-6 uppercase">
                Hero Product
              </p>
              <h2 className="text-black text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight leading-[1.1]">
                Lock & Go<br />Setting Spray
              </h2>
              <p className="text-black/70 text-base md:text-lg leading-relaxed mb-8">
                16-hour wear. Sweat-resistant. Transfer-proof. The setting spray that moves with you.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-24 md:py-32 bg-[var(--linen)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-3 gap-8 md:gap-12"
          >
            {/* Lock & Go - Featured */}
            <div className="md:col-span-2 relative">
              <div className="aspect-[4/5] md:aspect-[16/9] bg-white overflow-hidden">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/789d42f8b_forta2.jpg"
                  alt="Lock & Go"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-6">
                <h3 className="text-2xl md:text-3xl text-black mb-2">Lock & Go</h3>
                <p className="text-[var(--stone)] text-sm tracking-wide">Setting Spray</p>
              </div>
            </div>

            {/* Coming Soon Products */}
            <div className="space-y-8">
              <div className="relative">
                <div className="aspect-square bg-[var(--stone)] overflow-hidden flex items-center justify-center">
                  <div className="text-center px-6">
                    <p className="text-white/40 text-xs tracking-[0.3em] mb-3 uppercase">Coming Soon</p>
                    <h4 className="text-white text-xl">EnduraLash<br />Mascara</h4>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square bg-[var(--oat)] overflow-hidden flex items-center justify-center">
                  <div className="text-center px-6">
                    <p className="text-black/40 text-xs tracking-[0.3em] mb-3 uppercase">Coming Soon</p>
                    <h4 className="text-black text-xl">PR-Proof<br />Lip Stain</h4>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lifestyle Grid */}
      <section className="py-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {[
            "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/fcea49e32_Stocksy_comp_watermarked_13955321.jpg",
            "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/7eaf36d7e_TheVaultStock-10299.jpg",
            "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/ce9854577_TheVaultStock-10247.jpg",
            "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/ff97ecad3_TheVaultStock-10250.jpg"
          ].map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="aspect-square overflow-hidden"
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 md:py-32 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl mb-8 tracking-tight leading-[1.1]">
              Built for Motion.<br />Refined for Beauty.
            </h2>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Every FORTA formula is engineered for endurance. Our products are long-wear, durable, and made-to-last.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section className="py-24 md:py-32 bg-[var(--linen)]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-black mb-6 tracking-tight">
              Join the Waitlist
            </h2>
            <p className="text-black/60 text-base md:text-lg mb-12 leading-relaxed">
              Secure your spot for our launch. Be the first to experience performance cosmetics designed for those on the move.
            </p>

            {!submitted ? (
              <form onSubmit={handleWaitlistSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-6 py-4 bg-white border-2 border-black text-black placeholder:text-black/40 focus:outline-none text-sm tracking-wide"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-4 bg-black text-white hover:bg-black/90 transition-colors disabled:opacity-50 text-sm tracking-[0.2em] uppercase font-medium whitespace-nowrap"
                  >
                    {loading ? "..." : "Join"}
                  </button>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-black text-lg"
              >
                ✓ You're on the list
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center space-y-8">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/2616d000c_PrimaryLogo-_white-07.png"
              alt="FORTA"
              className="h-8"
            />
            <p className="text-white/40 text-xs tracking-[0.3em] uppercase">
              Coming 2026
            </p>
            <p className="text-white/60 text-sm">
              support@fortacosmetics.com
            </p>
            <p className="text-white/30 text-xs">
              © 2025 FORTA. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}