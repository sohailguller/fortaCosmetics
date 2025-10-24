import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProductCard from "../components/shop/ProductCard";

export default function Home() {
  const { data: featuredProducts = [] } = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => base44.entities.Product.filter({ featured: true }),
  });

  return (
    <div className="bg-[#F8F8F8]">
      {/* Hero Section */}
      <section className="relative h-[90vh] bg-black text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1920&q=80"
            alt="Hero"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center max-w-4xl"
          >
            <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-6">
              Performance
              <br />
              <span className="font-normal">Cosmetics</span>
            </h1>
            <p className="text-lg md:text-xl font-light text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Clinical-grade formulations engineered for visible results.
              Where science meets beauty.
            </p>
            <Link to={createPageUrl("Shop")}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-10 py-4 text-sm font-medium tracking-wider hover:bg-white/90 transition-colors inline-flex items-center gap-3"
              >
                EXPLORE COLLECTION
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#0A1A2F] mb-4">
                Featured Collection
              </h2>
              <p className="text-base text-black/60 font-light">
                Our most powerful formulations
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* Brand Story */}
      <section className="bg-[#0A1A2F] text-white py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">
              Engineered for Excellence
            </h2>
            <p className="text-lg font-light text-white/80 leading-relaxed mb-12">
              At Forta, we believe in the power of science-backed skincare. 
              Every product is formulated with precision, tested rigorously, 
              and designed to deliver measurable results. No compromise.
            </p>
            <Link to={createPageUrl("About")}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="border border-white px-8 py-3 text-sm font-medium tracking-wider hover:bg-white hover:text-black transition-all"
              >
                OUR STORY
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              title: "Clean Science",
              description: "Formulated without harmful ingredients. Every component serves a purpose."
            },
            {
              title: "Clinical Testing",
              description: "Dermatologist-tested and proven effective through rigorous clinical trials."
            },
            {
              title: "Sustainable",
              description: "Eco-conscious packaging and ethically sourced ingredients."
            }
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <h3 className="text-xl font-medium tracking-wide text-[#0A1A2F] mb-4">
                {value.title}
              </h3>
              <p className="text-sm text-black/60 font-light leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}