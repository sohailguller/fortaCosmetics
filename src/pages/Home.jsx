import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { base44 } from "@/api/base44Client";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.05]);

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
    <div className="bg-white overflow-x-hidden">
      {/* Hero - Full bleed with text overlay */}
      <section className="relative h-screen">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0"
        >
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/4fee4db6e_Stocksy_comp_watermarked_27722951.jpg"
            alt="FORTA"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </motion.div>

        <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-12">
          <motion.img
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/2616d000c_PrimaryLogo-_white-07.png"
            alt="FORTA"
            className="h-8 md:h-10 w-auto"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-4xl"
          >
            <h1 className="text-white text-5xl md:text-7xl lg:text-8xl xl:text-9xl mb-4 tracking-tight leading-[0.9]">
              You don't<br />have to sit<br />still to look<br />pretty.
            </h1>
            <p className="text-white/70 text-sm md:text-base tracking-[0.25em] uppercase mt-6">
              Coming 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tagline with asymmetric layout */}
      <section className="relative py-20 md:py-32 bg-[var(--linen)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl"
          >
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/d613bfc0b_Tagline-_black-16.jpg"
              alt="FOR THE ACTIVE"
              className="w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Layered Product Section with overlapping elements */}
      <section className="relative py-0 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Product image with color block background */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="md:col-span-7 relative"
            >
              <div className="relative bg-[var(--oat)] rounded-3xl overflow-hidden aspect-[3/4] md:aspect-[4/5]">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/a4fa62c78_forta1.jpg"
                  alt="Lock & Go"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Text content overlapping on desktop */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="md:col-span-5 md:-ml-20 bg-white md:shadow-2xl rounded-3xl p-8 md:p-12 relative z-10"
            >
              <p className="text-[var(--stone)] text-xs tracking-[0.3em] mb-4 uppercase">
                Hero Product
              </p>
              <h2 className="text-black text-3xl md:text-4xl lg:text-5xl mb-4 tracking-tight leading-[1.1]">
                Lock & Go<br />Setting Spray
              </h2>
              <p className="text-black/60 text-base md:text-lg leading-relaxed">
                16-hour wear. Sweat-resistant. Transfer-proof.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Coming Soon Grid - Asymmetric */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl text-black mb-12 tracking-tight"
          >
            Coming Soon
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Product 1 - Larger */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:row-span-2"
            >
              <div className="relative bg-[var(--stone)] rounded-3xl overflow-hidden aspect-[3/4] flex items-end p-8 md:p-12">
                <div>
                  <p className="text-white/50 text-xs tracking-[0.3em] mb-3 uppercase">02</p>
                  <h4 className="text-white text-3xl md:text-4xl tracking-tight">EnduraLash<br />Mascara</h4>
                </div>
              </div>
            </motion.div>

            {/* Product 2 - Smaller on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:row-span-1"
            >
              <div className="relative bg-[var(--oat)] rounded-3xl overflow-hidden aspect-square flex items-end p-8">
                <div>
                  <p className="text-black/40 text-xs tracking-[0.3em] mb-3 uppercase">03</p>
                  <h4 className="text-black text-2xl md:text-3xl tracking-tight">PR-Proof<br />Lip Stain</h4>
                </div>
              </div>
            </motion.div>

            {/* Lifestyle image */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="rounded-3xl overflow-hidden aspect-square">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/fcea49e32_Stocksy_comp_watermarked_13955321.jpg"
                  alt="Lifestyle"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full Width Image Strip */}
      <section className="py-0">
        <div className="grid grid-cols-3 gap-0">
          {[
            "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/7eaf36d7e_TheVaultStock-10299.jpg",
            "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/ce9854577_TheVaultStock-10247.jpg",
            "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/ff97ecad3_TheVaultStock-10250.jpg"
          ].map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="aspect-square overflow-hidden"
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy - Text on dark with image */}
      <section className="relative min-h-screen flex items-center bg-black">
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/ddbbe1ce2_TheVaultStock-10296.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-white text-4xl md:text-6xl lg:text-7xl mb-8 tracking-tight leading-[1.05]">
              Built for Motion.<br />Refined for Beauty.
            </h2>
            <p className="text-white/70 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl">
              Every FORTA formula is engineered for endurance. Long-wear, durable, made-to-last.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Waitlist - Clean and minimal */}
      <section className="py-24 md:py-40 bg-[var(--linen)]">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-black text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight leading-[1.1]">
              Join the Waitlist
            </h2>
            <p className="text-black/60 text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
              Be first to experience performance cosmetics for the active.
            </p>
          </motion.div>

          {!submitted ? (
            <form onSubmit={handleWaitlistSubmit} className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="flex-1 px-6 py-5 bg-white rounded-full text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-black text-sm"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-10 py-5 bg-black text-white hover:bg-black/90 rounded-full transition-all disabled:opacity-50 text-sm tracking-[0.15em] uppercase font-medium whitespace-nowrap"
                >
                  {loading ? "..." : "Join"}
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center text-black text-xl"
            >
              ✓ You're on the list
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="bg-black text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/2616d000c_PrimaryLogo-_white-07.png"
              alt="FORTA"
              className="h-6"
            />
            
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 text-sm">
              <p className="text-white/60">support@fortacosmetics.com</p>
              <p className="text-white/40">© 2025 FORTA</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}