import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { base44 } from "@/api/base44Client";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.02]);

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
      {/* Hero - Full Screen */}
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
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        <div className="relative z-10 h-full flex flex-col p-6 md:p-10 lg:p-12">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/2616d000c_PrimaryLogo-_white-07.png"
            alt="FORTA"
            className="h-8 md:h-10 w-auto mb-auto"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-4xl mb-8 md:mb-12"
          >
            <h1 className="text-white text-5xl md:text-7xl lg:text-8xl xl:text-9xl mb-6 tracking-tight leading-[0.9]">
              You don't<br />have to sit<br />still to look<br />pretty.
            </h1>
            <p className="text-white/70 text-sm md:text-base tracking-[0.2em] uppercase">
              Coming 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tagline Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-[var(--linen)]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/d613bfc0b_Tagline-_black-16.jpg"
              alt="FOR THE ACTIVE"
              className="w-full max-w-5xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Product Hero - Split */}
      <section className="relative bg-white">
        <div className="grid lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative h-[70vh] lg:h-screen bg-[var(--oat)]"
          >
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/a4fa62c78_forta1.jpg"
              alt="Lock & Go Setting Spray"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center justify-center px-6 py-16 md:p-16 lg:p-20 xl:p-24"
          >
            <div className="max-w-xl">
              <p className="text-[var(--stone)] text-xs tracking-[0.3em] mb-6 uppercase">
                Hero Product
              </p>
              <h2 className="text-black text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight leading-[1.05]">
                Lock & Go<br />Setting Spray
              </h2>
              <p className="text-black/60 text-lg md:text-xl leading-relaxed">
                16-hour wear. Sweat-resistant. Transfer-proof.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Showcase - No Rounded Corners */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-6 md:gap-8">
            {/* Large Product Image */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              <div className="relative bg-[var(--linen)] overflow-hidden h-full min-h-[500px] md:min-h-[600px]">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/789d42f8b_forta2.jpg"
                  alt="Lock & Go"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Coming Soon Stack */}
            <div className="lg:col-span-5 space-y-6 md:space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <div className="bg-[var(--stone)] p-8 md:p-10 lg:p-12 h-full min-h-[240px] flex flex-col justify-end">
                  <p className="text-white/50 text-xs tracking-[0.3em] mb-3 uppercase">02</p>
                  <h3 className="text-white text-3xl md:text-4xl tracking-tight leading-tight">
                    EnduraLash<br />Mascara
                  </h3>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="bg-[var(--oat)] p-8 md:p-10 lg:p-12 h-full min-h-[240px] flex flex-col justify-end">
                  <p className="text-black/40 text-xs tracking-[0.3em] mb-3 uppercase">03</p>
                  <h3 className="text-black text-3xl md:text-4xl tracking-tight leading-tight">
                    PR-Proof<br />Lip Stain
                  </h3>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Grid - No Gaps */}
      <section>
        <div className="grid grid-cols-3 gap-0">
          {[
            "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/c44b0a46c_pexels-n-voitkevich-4944691.jpg",
            "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/96d4ec8c1_TheVaultStock-10216.jpg",
            "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/7eaf36d7e_TheVaultStock-10299.jpg"
          ].map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="aspect-square overflow-hidden"
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy - Dark with Overlay */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/ddbbe1ce2_TheVaultStock-10296.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative z-10 w-full px-6 md:px-10 lg:px-12 py-24 md:py-32">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-white text-4xl md:text-6xl lg:text-7xl xl:text-8xl mb-8 tracking-tight leading-[1.05]">
                Built for Motion.<br />Refined for Beauty.
              </h2>
              <p className="text-white/80 text-xl md:text-2xl lg:text-3xl leading-relaxed max-w-3xl">
                Every FORTA formula is engineered for endurance. Long-wear, durable, made-to-last.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section className="py-24 md:py-32 lg:py-40 bg-[var(--linen)]">
        <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-black text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight leading-[1.1]">
              Join the Waitlist
            </h2>
            <p className="text-black/60 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Be first to experience performance cosmetics for the active.
            </p>
          </motion.div>

          {!submitted ? (
            <form onSubmit={handleWaitlistSubmit} className="max-w-xl mx-auto">
              <div className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="w-full px-6 py-5 bg-white border border-black/10 text-black placeholder:text-black/40 focus:outline-none focus:border-black transition-colors text-base"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-8 py-5 bg-black text-white hover:bg-black/90 transition-colors disabled:opacity-50 text-sm tracking-[0.2em] uppercase font-medium"
                >
                  {loading ? "..." : "Join"}
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center text-black text-xl"
            >
              ✓ You're on the list
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start mb-12">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/2616d000c_PrimaryLogo-_white-07.png"
              alt="FORTA"
              className="h-6"
            />
            
            <div className="md:text-right space-y-2">
              <p className="text-white/60 text-sm">support@fortacosmetics.com</p>
              <p className="text-white/40 text-xs tracking-wide">© 2025 FORTA. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}