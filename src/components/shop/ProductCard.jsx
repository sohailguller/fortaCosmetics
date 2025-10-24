import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  return (
    <Link to={createPageUrl("ProductDetail") + `?id=${product.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className="group cursor-pointer"
      >
        <div className="relative aspect-[3/4] bg-white overflow-hidden mb-4">
          <img
            src={product.images?.[0] || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800'}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white text-sm font-light tracking-wider">OUT OF STOCK</span>
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <h3 className="text-sm font-light tracking-wide text-[#0A1A2F]">
            {product.name}
          </h3>
          <p className="text-xs text-black/40 font-light">
            {product.category?.toUpperCase()}
          </p>
          <p className="text-sm font-medium text-black">
            ${product.price?.toFixed(2)}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}