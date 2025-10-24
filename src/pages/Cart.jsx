import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const savedCart = JSON.parse(localStorage.getItem('forta-cart') || '[]');
    setCart(savedCart);
  };

  const updateQuantity = (id, newQuantity) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    );
    setCart(updatedCart);
    localStorage.setItem('forta-cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cart-updated'));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('forta-cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cart-updated'));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      await base44.entities.Order.create({
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        shipping_address: formData.address,
        items: cart.map(item => ({
          product_id: item.id,
          product_name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        total: total,
        status: 'pending'
      });

      localStorage.removeItem('forta-cart');
      window.dispatchEvent(new Event('cart-updated'));
      
      alert('Order placed successfully! We will contact you shortly.');
      navigate(createPageUrl("Home"));
    } catch (error) {
      alert('Error placing order. Please try again.');
    }
    setIsProcessing(false);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-light text-[#0A1A2F] mb-4">Your cart is empty</h2>
          <Button
            onClick={() => navigate(createPageUrl("Shop"))}
            className="bg-black text-white hover:bg-black/90"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate(createPageUrl("Shop"))}
          className="flex items-center gap-2 text-sm text-black/60 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </button>

        <h1 className="text-5xl font-light tracking-tight text-[#0A1A2F] mb-12">
          Shopping Cart
        </h1>

        {!showCheckout ? (
          <div className="space-y-8">
            {/* Cart Items */}
            <div className="space-y-4">
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  className="bg-white p-6 flex gap-6"
                >
                  <div className="w-24 h-24 bg-gray-100 flex-shrink-0">
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200'}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-medium text-[#0A1A2F]">{item.name}</h3>
                      <p className="text-sm text-black/60 mt-1">${item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center border border-black/20">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-black/5"
                        >
                          −
                        </button>
                        <span className="px-4 py-1 border-x border-black/20 min-w-[50px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-black/5"
                        >
                          +
                        </button>
                      </div>

                      <p className="font-medium min-w-[80px] text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-black/40 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-[#0A1A2F] text-white p-8 space-y-6">
              <div className="flex justify-between items-center text-lg">
                <span className="font-light">Subtotal</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="font-light">Shipping</span>
                <span className="font-medium">FREE</span>
              </div>
              <div className="border-t border-white/20 pt-6 flex justify-between items-center text-2xl">
                <span className="font-light">Total</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>

              <Button
                onClick={() => setShowCheckout(true)}
                className="w-full h-14 bg-white text-black hover:bg-white/90 text-sm font-medium tracking-wider"
              >
                PROCEED TO CHECKOUT
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 max-w-2xl">
            <h2 className="text-2xl font-light mb-8">Checkout</h2>
            <form onSubmit={handleCheckout} className="space-y-6">
              <div>
                <Label>Full Name</Label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Shipping Address</Label>
                <Input
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="mt-2"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCheckout(false)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 bg-black text-white hover:bg-black/90"
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}