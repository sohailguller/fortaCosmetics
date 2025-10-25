
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);
  const timelineRef = React.useRef(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: "-100px" });

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

  return (
    <div className="bg-[#1a1a1a]">
      {/* Full-Screen Hero */}
      <section className="relative h-screen overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0"
        >
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/091d182cc_TheVaultStock-10413.jpg"
            alt="Forta Hero"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/60 via-[#1a1a1a]/40 to-[#1a1a1a]" />
        </motion.div>

        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-center max-w-4xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-white text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6 leading-[1.1]"
            >
              Performance That
              <br />
              <span className="font-normal">Doesn't Quit</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="text-[#a0a0a0] text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto"
            >
              Engineered for athletes. Designed for endurance. Built for beauty that moves with you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              <Link to={createPageUrl("Shop")}>
                <motion.button
                  whileHover={{ backgroundColor: "#ffffff", color: "#1a1a1a" }}
                  className="group px-12 py-5 bg-transparent border-2 border-white text-white text-sm font-medium tracking-[0.2em] smooth-transition rounded-full"
                >
                  <span className="flex items-center gap-3">
                    EXPLORE PRODUCTS
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Four-Card Grid */}
      <section className="py-24 px-6 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Shop", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/5fb18a134_productImage.jpg", link: "Shop" },
              { title: "About", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/a38dfa5fb_TheVaultStock-10252.jpg", link: "About" },
              { title: "Performance", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/091d182cc_TheVaultStock-10413.jpg", link: "ProductDetail" },
              { title: "Contact", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/7b0fe5c86_TheVaultStock-10413.jpg", link: "Contact" }
            ].map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Link to={createPageUrl(card.link)}>
                  <div className="group relative h-[400px] bg-[#2a2a2a] rounded-2xl overflow-hidden cursor-pointer">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                      <h3 className="text-white text-2xl font-light tracking-wide">{card.title}</h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark Editorial Section */}
      <section className="py-32 px-6 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#8b7355] text-sm font-medium tracking-[0.3em] mb-6">THE FORTA DIFFERENCE</p>
            <h2 className="text-white text-4xl md:text-6xl font-light tracking-tight mb-8 leading-tight">
              Built for Motion.
              <br />
              <span className="text-[#a0a0a0]">Refined for Beauty.</span>
            </h2>
            <p className="text-[#a0a0a0] text-lg font-light leading-relaxed mb-8">
              Every Forta formula is engineered for endurance. Tested in extreme conditions, 
              trusted by athletes, designed for anyone who refuses to compromise between 
              performance and aesthetics.
            </p>
            <Link to={createPageUrl("About")}>
              <motion.button
                whileHover={{ backgroundColor: "#8b7355" }}
                className="px-8 py-4 bg-transparent border border-[#8b7355] text-[#8b7355] hover:text-white text-sm font-medium tracking-wider smooth-transition rounded-full"
              >
                OUR STORY
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] rounded-3xl overflow-hidden"
          >
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/a38dfa5fb_TheVaultStock-10252.jpg"
              alt="Performance"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Light Product Section */}
      <section className="py-32 px-6 bg-[#f5f5f0]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] rounded-3xl overflow-hidden order-2 lg:order-1"
          >
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/5fb18a134_productImage.jpg"
              alt="Lock & Go"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <p className="text-[#8b7355] text-sm font-medium tracking-[0.3em] mb-6">SIGNATURE PRODUCT</p>
            <h2 className="text-[#1a1a1a] text-4xl md:text-6xl font-light tracking-tight mb-8 leading-tight">
              Lock & Go
              <br />
              <span className="text-[#6b6b6b]">Setting Spray</span>
            </h2>
            <p className="text-[#4a4a4a] text-lg font-light leading-relaxed mb-8">
              16-hour wear. Sweat-resistant. Transfer-proof. The setting spray that moves with you, 
              tested by elite athletes and trusted by anyone who demands more from their makeup.
            </p>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-light text-[#1a1a1a]">$30</span>
            </div>
            <Link to={createPageUrl("ProductDetail")}>
              <motion.button
                whileHover={{ backgroundColor: "#1a1a1a", color: "#ffffff" }}
                className="px-8 py-4 bg-[#8b7355] text-white hover:bg-[#1a1a1a] text-sm font-medium tracking-wider smooth-transition rounded-full"
              >
                SHOP NOW
              </motion.button>
            </Link>
          </motion.div>
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
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
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border border-white/20 text-white hover:bg-white/10 smooth-transition flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border border-white/20 text-white hover:bg-white/10 smooth-transition flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
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
                initial={{ opacity: 0, x: -40 }}
                animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="flex gap-8 items-start"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-[#8b7355] flex items-center justify-center">
                    <span className="text-white text-sm font-medium">{item.year}</span>
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-white text-2xl font-light tracking-wide mb-2">{item.title}</h3>
                  <p className="text-[#a0a0a0] font-light leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 bg-[#8b7355] text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-white text-5xl md:text-7xl font-light tracking-tight mb-8">
            Ready to Experience
            <br />
            Performance Beauty?
          </h2>
          <Link to={createPageUrl("Shop")}>
            <motion.button
              whileHover={{ backgroundColor: "#1a1a1a" }}
              className="px-12 py-5 bg-white text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white text-sm font-medium tracking-[0.2em] smooth-transition rounded-full"
            >
              SHOP FORTA
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
