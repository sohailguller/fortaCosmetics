import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function ProductDetail() {
  const navigate = useNavigate();
  const [productId, setProductId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    setProductId(id);
  }, []);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const products = await base44.entities.Product.filter({ id: productId });
      return products[0];
    },
    enabled: !!productId,
  });

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('forta-cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0],
        quantity: quantity
      });
    }

    localStorage.setItem('forta-cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-black/60">Product not found</p>
      </div>
    );
  }

  const images = product.images || ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800'];

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(createPageUrl("Shop"))}
          className="flex items-center gap-2 text-sm text-black/60 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </button>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-[3/4] bg-white mb-4 overflow-hidden"
            >
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-white overflow-hidden transition-opacity ${
                      selectedImage === index ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <p className="text-xs text-black/40 font-light tracking-wider mb-2">
                {product.category?.toUpperCase()}
              </p>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-[#0A1A2F] mb-4">
                {product.name}
              </h1>
              <p className="text-2xl font-medium text-black">
                ${product.price?.toFixed(2)}
              </p>
            </div>

            <div className="border-t border-black/10 pt-8">
              <p className="text-base text-black/80 font-light leading-relaxed">
                {product.long_description || product.description}
              </p>
            </div>

            {product.benefits && product.benefits.length > 0 && (
              <div>
                <h3 className="text-sm font-medium tracking-wide mb-4">Key Benefits</h3>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-black/70 font-light">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.ingredients && (
              <div>
                <h3 className="text-sm font-medium tracking-wide mb-3">Ingredients</h3>
                <p className="text-xs text-black/60 font-light leading-relaxed">
                  {product.ingredients}
                </p>
              </div>
            )}

            {/* Add to Cart */}
            <div className="border-t border-black/10 pt-8 space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-light">Quantity</label>
                <div className="flex items-center border border-black/20">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-black/5 transition-colors"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 border-x border-black/20 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-black/5 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <Button
                onClick={addToCart}
                disabled={product.stock === 0 || added}
                className="w-full h-14 bg-black text-white hover:bg-black/90 text-sm font-medium tracking-wider"
              >
                {added ? 'ADDED TO CART' : product.stock === 0 ? 'OUT OF STOCK' : 'ADD TO CART'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}