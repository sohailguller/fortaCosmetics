import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);

  const product = {
    name: "Lock & Go Setting Spray",
    price: 30,
    description: "Our award-winning formula that keeps your makeup locked in place for up to 16 hours. Sweat-resistant, transfer-proof, and feather-light.",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/5fb18a134_productImage.jpg"
  };

  const accordionData = [
    {
      id: "ingredients",
      title: "Ingredients",
      content: "Water, SD Alcohol 40-B, PVP, Aloe Barbadensis Leaf Juice, Chamomilla Recutita (Matricaria) Flower Extract, Cucumis Sativus (Cucumber) Fruit Extract, Glycerin, Polysorbate 20, Phenoxyethanol, Ethylhexylglycerin, Fragrance."
    },
    {
      id: "howtouse",
      title: "How to Use",
      content: "Hold bottle 8-10 inches from face. Close eyes and mist in an 'X' and 'T' motion across face. Allow to dry for 30 seconds. For maximum hold, apply before and after makeup application. Shake well before use."
    },
    {
      id: "benefits",
      title: "Benefits",
      content: "• 16-hour long-lasting hold\n• Sweat and water resistant formula\n• Transfer-proof protection\n• Weightless, breathable finish\n• Non-sticky, quick-drying\n• Suitable for all skin types\n• Dermatologist tested\n• Vegan & cruelty-free"
    }
  ];

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('forta-cart') || '[]');
    const existingItem = cart.find(item => item.name === product.name);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: 'lock-and-go',
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }

    localStorage.setItem('forta-cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-[#F8F8F8]">
      {/* Hero Image Section */}
      <section className="relative h-[70vh] md:h-screen bg-[#F8F8F8] overflow-hidden">
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
          className="h-full"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center"
        >
          <p className="text-sm text-black/60 font-light tracking-[0.3em]">SCROLL TO EXPLORE</p>
        </motion.div>
      </section>

      {/* Product Info Section */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-xs text-black/40 font-light tracking-[0.2em] mb-4">
              SIGNATURE FORMULA
            </p>
            <h1 className="text-5xl md:text-6xl font-light tracking-tight text-[#0A1A2F] mb-6">
              {product.name}
            </h1>
            <p className="text-3xl font-medium text-black mb-8">
              ${product.price}
            </p>
            <p className="text-lg text-black/70 font-light leading-relaxed max-w-2xl mx-auto">
              {product.description}
            </p>
          </motion.div>

          {/* Buy Button Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-md mx-auto space-y-6"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <label className="text-sm font-light tracking-wide">Quantity</label>
              <div className="flex items-center border-2 border-black/20">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-5 py-3 hover:bg-black/5 transition-colors text-lg"
                >
                  −
                </button>
                <span className="px-8 py-3 border-x-2 border-black/20 min-w-[80px] text-center font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-5 py-3 hover:bg-black/5 transition-colors text-lg"
                >
                  +
                </button>
              </div>
            </div>

            <Button
              onClick={addToCart}
              disabled={added}
              className="w-full h-16 bg-black text-white hover:bg-[#0A1A2F] text-sm font-medium tracking-[0.2em] transition-all"
            >
              {added ? (
                <span className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  ADDED TO CART
                </span>
              ) : (
                'ADD TO CART'
              )}
            </Button>

            <p className="text-xs text-center text-black/40 font-light">
              Free shipping on orders over $50
            </p>
          </motion.div>
        </div>
      </section>

      {/* Performance Proof Section */}
      <section className="relative h-[80vh] bg-black text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/091d182cc_TheVaultStock-10413.jpg"
            alt="Athlete using Forta"
            className="w-full h-full object-cover opacity-60"
          />
        </div>

        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="text-center max-w-3xl"
          >
            <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-8">
              Performance Proof
            </h2>
            <p className="text-xl font-light leading-relaxed text-white/90 mb-12">
              Tested by elite athletes, trusted by performers. Lock & Go has been 
              rigorously tested in extreme conditions—from marathon training to stage 
              performances under hot lights. When failure isn't an option.
            </p>
            
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {[
                { stat: "16", label: "Hours" },
                { stat: "100%", label: "Sweat-Proof" },
                { stat: "1000+", label: "Athletes" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="border-t-2 border-white/30 pt-4"
                >
                  <div className="text-4xl font-light mb-2">{item.stat}</div>
                  <div className="text-sm text-white/70 font-light tracking-wide">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Accordions Section */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-light tracking-tight text-[#0A1A2F] mb-12 text-center"
          >
            Product Details
          </motion.h2>

          <div className="space-y-4">
            {accordionData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="border-b border-black/10"
              >
                <button
                  onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                  className="w-full flex items-center justify-between py-6 text-left hover:opacity-70 transition-opacity"
                >
                  <span className="text-lg font-light tracking-wide text-[#0A1A2F]">
                    {item.title}
                  </span>
                  <motion.div
                    animate={{ rotate: openAccordion === item.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-black/40" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openAccordion === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 text-base text-black/70 font-light leading-relaxed whitespace-pre-line">
                        {item.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tagline Footer */}
      <section className="bg-black text-white py-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center px-6"
        >
          <h2 className="text-6xl md:text-8xl font-light tracking-tight">
            You Move—
            <br />
            <span className="font-normal">It Stays.</span>
          </h2>
        </motion.div>
      </section>

      {/* Sliding Text Banner */}
      <div className="bg-white border-t border-black/10">
        <motion.div
          animate={{
            x: [-1000, 0],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
          className="flex whitespace-nowrap py-4"
        >
          {Array(12).fill(0).map((_, i) => (
            <span key={i} className="inline-flex items-center mx-6 text-sm font-light tracking-[0.2em] text-black/60">
              LOCK IN YOUR EDGE
              <span className="mx-6 text-black/20">●</span>
              FORTA PERFORMANCE
              <span className="mx-6 text-black/20">●</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}