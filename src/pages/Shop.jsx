import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ProductCard from "../components/shop/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list('-created_date'),
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, []);

  const categories = [
    { id: "all", name: "All Products" },
    { id: "face", name: "Face" },
    { id: "body", name: "Body" },
    { id: "hair", name: "Hair" },
    { id: "tools", name: "Tools" },
    { id: "sets", name: "Sets" }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-light tracking-tight text-[#0A1A2F] mb-4">
            Shop
          </h1>
          <p className="text-base text-black/60 font-light">
            {filteredProducts.length} products
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-12 space-y-6">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 bg-white border-black/10 h-12 text-sm font-light"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 text-sm font-light tracking-wide transition-all ${
                  selectedCategory === category.id
                    ? 'bg-black text-white'
                    : 'bg-white text-black/60 hover:bg-black/5'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {Array(8).fill(0).map((_, i) => (
              <div key={i}>
                <Skeleton className="aspect-[3/4] mb-4" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-black/40 font-light">
              No products found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}