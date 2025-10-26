
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);
  const containerRef = useRef(null);
  const scrollLockRef = useRef(null);
  const timelineRef = useRef(null);
  const productRevealRef = useRef(null);
  
  const timelineInView = useInView(timelineRef, { once: true, margin: "-100px" });
  const productInView = useInView(productRevealRef, { once: true, margin: "-200px" });

  // Parallax effects for hero
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Scroll-lock section animations
  const { scrollYProgress: scrollLockProgress } = useScroll({
    target: scrollLockRef,
    offset: ["start end", "end start"]
  });

  const lockY = useTransform(scrollLockProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);
  const lockOpacity = useTransform(scrollLockProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

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
    }
  ];

  const timeline = [
    { year: "2023", title: "Founded", description: "Forta launches with a mission to revolutionize performance cosmetics" },
    { year: "2024", title: "Lock & Go", description: "Our flagship setting spray tested by 1000+ athletes" },
    { year: "2025", title: "Expansion", description: "Growing our line with new performance-driven formulas" }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Stagger animation variants
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
      {/* Full-Screen Hero with Parallax */}
      <section className="relative h-screen overflow-hidden">
        <motion.div
          style={{ scale: heroScale }}
          className="absolute inset-0"
        >
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/091d182cc_TheVaultStock-10413.jpg"
            alt="Forta Hero"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/60 via-[#1a1a1a]/40 to-[#1a1a1a]" />
        </motion.div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 h-full flex items-center justify-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-4xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="text-white text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6 leading-[1.1]"
            >
              Performance That
              <br />
              <span className="font-normal">Doesn't Quit</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-[#a0a0a0] text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto"
            >
              Engineered for athletes. Designed for endurance. Built for beauty that moves with you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              <Link to={createPageUrl("Shop")}>
                <motion.button
                  whileHover={{ 
                    backgroundColor: "#ffffff", 
                    color: "#1a1a1a",
                    scale: 1.05
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-12 py-5 bg-transparent border-2 border-white text-white text-sm font-medium tracking-[0.2em] smooth-transition rounded-full"
                >
                  <span className="flex items-center gap-3">
                    EXPLORE PRODUCTS
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Tagline instead of scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.img
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/92f95c900_Tagline-_white-17.png"
            alt="Move Boldly"
            className="h-6 md:h-8 object-contain opacity-70"
          />
        </motion.div>
      </section>

      {/* Four-Card Grid with Stagger Animation */}
      <section className="py-24 px-6 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { title: "Shop", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/5fb18a134_productImage.jpg", link: "Shop" },
              { title: "About", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/a38dfa5fb_TheVaultStock-10252.jpg", link: "About" },
              { title: "Performance", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/091d182cc_TheVaultStock-10413.jpg", link: "ProductDetail" },
              { title: "Contact", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/7b0fe5c86_TheVaultStock-10413.jpg", link: "Contact" }
            ].map((card, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
              >
                <Link to={createPageUrl(card.link)}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative h-[400px] bg-[#2a2a2a] rounded-2xl overflow-hidden cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full"
                    >
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover opacity-60"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                      <motion.h3
                        initial={{ y: 10 }}
                        whileHover={{ y: 0 }}
                        className="text-white text-2xl font-light tracking-wide"
                      >
                        {card.title}
                      </motion.h3>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Scroll-Lock Section with Internal Animation */}
      <section ref={scrollLockRef} className="relative min-h-screen flex items-center justify-center bg-[#1a1a1a] py-32">
        <motion.div
          style={{ y: lockY, opacity: lockOpacity }}
          className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-200px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
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
              Every Forta formula is engineered for endurance. Tested in extreme conditions, 
              trusted by athletes, designed for anyone who refuses to compromise between 
              performance and aesthetics.
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
            className="relative h-[600px] rounded-3xl overflow-hidden"
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

      {/* Product Section with Reveal Animation */}
      <section ref={productRevealRef} className="py-32 px-6 bg-[#f5f5f0]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60, rotate: -2 }}
            animate={productInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[600px] rounded-3xl overflow-hidden order-2 lg:order-1"
          >
            <motion.img
              whileHover={{ scale: 1.08, rotate: 1 }}
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
            className="order-1 lg:order-2"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={productInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-[#8b7355] text-sm font-medium tracking-[0.3em] mb-6"
            >
              SIGNATURE PRODUCT
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
              16-hour wear. Sweat-resistant. Transfer-proof. The setting spray that moves with you, 
              tested by elite athletes and trusted by anyone who demands more from their makeup.
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

      {/* The Forta Difference - Staggered Grid */}
      <section className="bg-black text-white py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-light tracking-tight mb-20 text-center"
          >
            The Forta Difference
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-16">
            {[
              {
                number: "(1)",
                title: "Sweat-Proof",
                description: "Tested in extreme conditions. Stays put through workouts, heat, and humidity."
              },
              {
                number: "(2)",
                title: "Clean Formula",
                description: "No parabens, sulfates, or questionable ingredients. Just what works."
              },
              {
                number: "(3)",
                title: "All-Day Wear",
                description: "From morning training to evening events. One application, zero touch-ups."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60, rotate: index % 2 === 0 ? -3 : 3 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.2, duration: 0.6, type: "spring" }}
                  className="mb-6"
                >
                  <span className="text-4xl font-light text-white/60">{value.number}</span>
                </motion.div>
                <h3 className="text-xl font-medium tracking-wide mb-4">
                  {value.title}
                </h3>
                <p className="text-white/60 font-light leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-32 px-6 bg-[#0f0f0f]">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#8b7355] text-sm font-medium tracking-[0.3em] mb-12 text-center"
          >
            TESTIMONIALS
          </motion.p>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
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
                className="w-12 h-12 rounded-full border border-white/20 text-white hover:bg-white/10 smooth-transition flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border border-white/20 text-white hover:bg-white/10 smooth-transition flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section with Scroll-Activated Animation */}
      <section ref={timelineRef} className="py-32 px-6 bg-[#1a1a1a]">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white text-4xl md:text-5xl font-light tracking-tight mb-20 text-center"
          >
            Our Journey
          </motion.h2>

          <div className="space-y-16">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -60 }}
                animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                transition={{ 
                  delay: index * 0.3, 
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="flex gap-8 items-start"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={timelineInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ 
                    delay: index * 0.3 + 0.2, 
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="flex-shrink-0"
                >
                  <div className="w-16 h-16 rounded-full bg-[#8b7355] flex items-center justify-center">
                    <span className="text-white text-sm font-medium">{item.year}</span>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.3 + 0.4, duration: 0.8 }}
                  className="flex-1 pt-2"
                >
                  <h3 className="text-white text-2xl font-light tracking-wide mb-2">{item.title}</h3>
                  <p className="text-[#a0a0a0] font-light leading-relaxed">{item.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA with Hover Effect */}
      <section className="py-32 px-6 bg-[#8b7355] text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto relative z-10"
        >
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-white text-5xl md:text-7xl font-light tracking-tight mb-8"
          >
            Ready to Experience
            <br />
            Performance Beauty?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link to={createPageUrl("Shop")}>
              <motion.button
                whileHover={{ 
                  backgroundColor: "#1a1a1a",
                  scale: 1.05
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="px-12 py-5 bg-white text-[#1a1a1a] text-sm font-medium tracking-[0.2em] smooth-transition rounded-full"
              >
                SHOP FORTA
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating background elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-20 w-32 h-32 bg-white/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 10,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 left-20 w-40 h-40 bg-white/5 rounded-full blur-3xl"
        />
      </section>
    </div>
  );
}
