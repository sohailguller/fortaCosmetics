
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);
  const containerRef = useRef(null);
  const scrollLockRef = useRef(null);
  const productRevealRef = useRef(null);
  const fourCardRef = useRef(null);
  const testimonialsRef = useRef(null);
  const bottleScrollRef = useRef(null);

  const productInView = useInView(productRevealRef, { once: true, margin: "-200px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const { scrollYProgress: bottleScrollProgress } = useScroll({
    target: bottleScrollRef,
    offset: ["start end", "end start"]
  });

  const bottleY = useTransform(bottleScrollProgress, [0, 0.5, 1], [200, -50, -200]); // Changed from -300 to -200
  const bottleRotate = useTransform(bottleScrollProgress, [0, 0.5, 1], [15, 0, -5]);
  const bottleScale = useTransform(bottleScrollProgress, [0, 0.5, 1], [0.8, 1.1, 1]);

  const { scrollYProgress: scrollLockProgress } = useScroll({
    target: scrollLockRef,
    offset: ["start end", "end start"]
  });

  const lockY = useTransform(scrollLockProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);
  const lockOpacity = useTransform(scrollLockProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const { scrollYProgress: fourCardProgress } = useScroll({
    target: fourCardRef,
    offset: ["start end", "end start"]
  });

  const cardY = useTransform(fourCardProgress, [0, 1], [100, -100]);

  const { scrollYProgress: productProgress } = useScroll({
    target: productRevealRef,
    offset: ["start end", "end start"]
  });

  const productTextY = useTransform(productProgress, [0, 1], [50, -50]);

  const { scrollYProgress: testimonialsProgress } = useScroll({
    target: testimonialsRef,
    offset: ["start end", "end start"]
  });

  const testimonialsY = useTransform(testimonialsProgress, [0, 1], [60, -60]);

  const { data: videos = [] } = useQuery({
    queryKey: ['hero-video'],
    queryFn: () => base44.entities.Video.list('-created_date', 1),
    initialData: []
  });

  const heroVideo = videos[0];

  const testimonials = [
  {
    quote: "Lock & Go is the only setting spray that actually works through my training sessions. Game changer.",
    author: "Sarah M.",
    role: "Marathon Runner"
  },
  {
    quote: "I've tried everything. This is the first product that stays put through hot yoga. Incredible.",
    author: "Jessica K.",
    role: "Yoga Instructor"
  },
  {
    quote: "Finally, makeup that doesn't quit when I'm pushing my limits. Forta delivers.",
    author: "Marcus T.",
    role: "CrossFit Athlete"
  }];


  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div ref={containerRef} className="bg-[#1a1a1a]">
      {/* Full-Screen Hero with Video Background */}
      <section className="relative h-screen overflow-hidden">
        <motion.div
          style={{ scale: heroScale }}
          className="absolute inset-0">

          {heroVideo ?
          <video
            key={heroVideo.id}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover">

              <source src={heroVideo.file_url} type="video/mp4" />
            </video> :

          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/091d182cc_TheVaultStock-10413.jpg"
            alt="Forta Hero"
            className="w-full h-full object-cover" />

          }
        </motion.div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 h-full flex items-center justify-center px-6">

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-4xl">

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="text-white mb-6 text-4xl font-light normal-case tracking-tight leading-[1.1] md:text-6xl lg:text-6xl"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 4px 40px rgba(0,0,0,0.6)' }}>

              You don't have to sit still to look pretty.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-[#ffffff] mb-12 mx-auto text-lg font-light uppercase md:text-xl max-w-2xl"
              style={{ textShadow: '0 2px 15px rgba(0,0,0,0.8), 0 4px 30px rgba(0,0,0,0.6)' }}>

              Performance cosmetics designed for those on the move
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}>

              <Link to={createPageUrl("Shop")}>
                <motion.button
                  whileHover={{
                    backgroundColor: "#ffffff",
                    color: "#1a1a1a",
                    scale: 1.05
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-12 py-5 bg-black/40 backdrop-blur-sm border-2 border-white text-white text-sm font-medium tracking-[0.2em] smooth-transition rounded-full"
                  style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>

                  <span className="flex items-center gap-3">
                    EXPLORE PRODUCTS
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}>

                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">

          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/92f95c900_Tagline-_white-17.png"
            alt="Move Boldly"
            className="h-6 md:h-8 object-contain opacity-70"
            style={{ filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.8))' }} />

        </motion.div>
      </section>

      {/* Bottle Scroll Animation Section - FOR THE ACTIVE */}
      <section ref={bottleScrollRef} className="relative min-h-[120vh] bg-[#f5f5f0] overflow-hidden flex items-center justify-center">
        <div className="relative w-full max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-[#1a1a1a]">
              FOR THE <span className="font-normal">ACTIVE</span>
            </h2>
          </motion.div>

          <div className="relative w-full max-w-2xl mx-auto overflow-hidden" style={{ height: '70vh' }}>
            <motion.div
              style={{ 
                y: bottleY,
                rotate: bottleRotate,
                scale: bottleScale
              }}
              className="relative w-full"
            >
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/1b237e6e6_Untitleddesign12.png"
                alt="Lock & Go Setting Spray"
                className="w-full h-auto object-contain"
                draggable={false}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Four-Card Grid with Parallax */}
      <section ref={fourCardRef} className="py-24 px-6 bg-[#0f0f0f] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
            { title: "Shop", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/5fb18a134_productImage.jpg", link: "Shop" },
            { title: "About", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/a38dfa5fb_TheVaultStock-10252.jpg", link: "About" },
            { title: "Performance", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/a91490198_TheVaultStock-10300.jpg", link: "ProductDetail" },
            { title: "Contact", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/277bebfa2_TheVaultStock-10219.jpg", link: "Contact" }].
            map((card, index) =>
            <motion.div
              key={`card-${index}`}
              variants={itemVariants}
              style={{ y: useTransform(cardY, (val) => val * (0.5 + index * 0.15)) }}>

                <Link to={createPageUrl(card.link)}>
                  <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative h-[400px] bg-[#2a2a2a] overflow-hidden cursor-pointer">

                    <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full">

                      <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover opacity-60" />

                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                      <motion.h3
                      initial={{ y: 10 }}
                      whileHover={{ y: 0 }}
                      className="text-white text-2xl font-light uppercase tracking-wide">

                        {card.title}
                      </motion.h3>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Scroll-Lock Section - Full Bleed */}
      <section ref={scrollLockRef} className="relative min-h-[80vh] flex items-center justify-center bg-[#1a1a1a]">
        <motion.div
          style={{ y: lockY, opacity: lockOpacity }}
          className="w-full grid lg:grid-cols-2 items-stretch"
        >
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-200px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center px-6 lg:px-16 py-16 lg:py-0"
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-[#8b7355] text-sm font-medium tracking-[0.3em] mb-6"
            >
              THE FORTA DIFFERENCE
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-white text-4xl md:text-6xl font-light tracking-tight mb-8 leading-tight"
            >
              Built for Motion.
              <br />
              <span className="text-[#a0a0a0]">Refined for Beauty.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-[#a0a0a0] text-lg font-light leading-relaxed mb-8"
            >
              Every Forta formula is engineered for endurance. Our products are long-wear, durable, and made-to-last.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <Link to={createPageUrl("About")}>
                <motion.button
                  whileHover={{
                    backgroundColor: "#8b7355",
                    scale: 1.05
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent border border-[#8b7355] text-[#8b7355] hover:text-white text-sm font-medium tracking-wider smooth-transition rounded-full"
                >
                  OUR STORY
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-200px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[500px] lg:h-auto overflow-hidden"
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/a38dfa5fb_TheVaultStock-10252.jpg"
              alt="Performance"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Product Section - Full Bleed */}
      <section ref={productRevealRef} className="bg-[#f5f5f0]">
        <div className="grid lg:grid-cols-2 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -60, rotate: -2 }}
            animate={productInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[600px] lg:h-auto overflow-hidden order-2 lg:order-1"
          >
            <motion.img
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/5fb18a134_productImage.jpg"
              alt="Lock & Go"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={productInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: productTextY }}
            className="order-1 lg:order-2 flex flex-col justify-center px-6 lg:px-16 py-16 lg:py-32"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={productInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-[#8b7355] text-sm font-medium tracking-[0.3em] mb-6"
            >
              HERO PRODUCT
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={productInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 1 }}
              className="text-[#1a1a1a] text-4xl md:text-6xl font-light tracking-tight mb-8 leading-tight"
            >
              Lock & Go
              <br />
              <span className="text-[#6b6b6b]">Setting Spray</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={productInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="text-[#4a4a4a] text-lg font-light leading-relaxed mb-8"
            >
              16-hour wear. Sweat-resistant. Transfer-proof. The setting spray that moves with you, tested in the most extreme of scenarios and trusted by anyone who demands more from their makeup.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={productInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="text-3xl font-light text-[#1a1a1a]">$30</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={productInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.3, duration: 0.8 }}
            >
              <Link to={createPageUrl("ProductDetail")}>
                <motion.button
                  whileHover={{
                    backgroundColor: "#1a1a1a",
                    color: "#ffffff",
                    scale: 1.05
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-[#8b7355] text-white text-sm font-medium tracking-wider smooth-transition rounded-full"
                >
                  SHOP NOW
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Carousel with Parallax */}
      <section ref={testimonialsRef} className="py-32 px-6 bg-[#0f0f0f]">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ y: testimonialsY }}
            className="text-[#8b7355] text-sm font-medium tracking-[0.3em] mb-12 text-center">

            TESTIMONIALS
          </motion.p>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`testimonial-${currentTestimonial}`}
                initial={{ opacity: 0, x: 100, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-center">

                <p className="text-white text-2xl md:text-3xl font-light leading-relaxed mb-8 italic">
                  "{testimonials[currentTestimonial].quote}"
                </p>
                <p className="text-[#a0a0a0] text-sm font-medium tracking-wider">
                  {testimonials[currentTestimonial].author}
                </p>
                <p className="text-[#6b6b6b] text-xs font-light mt-1">
                  {testimonials[currentTestimonial].role}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-4 mt-12">
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.9 }}
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border border-white/20 text-white hover:bg-white/10 smooth-transition flex items-center justify-center">

                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border border-white/20 text-white hover:bg-white/10 smooth-transition flex items-center justify-center">

                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA with Gradient Background */}
      <section className="relative py-32 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/25fb0a76d_Screenshot2025-10-28at60718PM.png"
            alt="Gradient Background"
            className="w-full h-full object-cover" />

        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto relative z-10">

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-white text-5xl md:text-7xl font-light tracking-tight mb-8">
            Coming Soon
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}>

            <Link to={createPageUrl("Shop")}>
              <motion.button
                whileHover={{
                  backgroundColor: "#1a1a1a",
                  scale: 1.05
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="px-12 py-5 bg-white text-[#1a1a1a] text-sm font-medium tracking-[0.2em] smooth-transition rounded-full">

                JOIN THE WAITLIST
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>);

}
