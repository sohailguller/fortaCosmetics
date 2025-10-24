import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { base44 } from "@/api/base44Client";
import { ArrowRight, Mail } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await base44.integrations.Core.SendEmail({
        to: 'support@fortacosmetics.com',
        subject: `Contact Form: ${formData.name}`,
        body: `
Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}
        `
      });

      setSent(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 3000);
    } catch (error) {
      alert('Error sending message. Please try again.');
    }

    setIsSending(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20 md:py-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-light tracking-tight text-[#0A1A2F] mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-black/60 font-light">
            Have questions? We're here to help.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label className="text-sm font-light tracking-wide text-black/70">
                  Name
                </Label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="mt-2 h-12 border-black/20 focus:border-[#0A1A2F] bg-white"
                  placeholder="Your name"
                />
              </div>

              <div>
                <Label className="text-sm font-light tracking-wide text-black/70">
                  Email
                </Label>
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="mt-2 h-12 border-black/20 focus:border-[#0A1A2F] bg-white"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <Label className="text-sm font-light tracking-wide text-black/70">
                  Message
                </Label>
                <Textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="mt-2 min-h-[200px] border-black/20 focus:border-[#0A1A2F] bg-white resize-none"
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSending || sent}
                className="w-full h-14 bg-[#0A1A2F] text-white hover:bg-[#0A1A2F]/80 text-sm font-medium tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3"
              >
                {sent ? (
                  'MESSAGE SENT'
                ) : isSending ? (
                  'SENDING...'
                ) : (
                  <>
                    SEND MESSAGE
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-2xl font-light tracking-tight text-[#0A1A2F] mb-8">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 border border-black/10 hover:border-black/20 transition-colors">
                  <Mail className="w-5 h-5 text-[#0A1A2F] flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-light text-black/40 mb-2">
                      Email Us
                    </p>
                    <a 
                      href="mailto:support@fortacosmetics.com"
                      className="text-lg text-[#0A1A2F] hover:underline font-light flex items-center gap-2"
                    >
                      support@fortacosmetics.com
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F8F8F8] p-8 space-y-4">
              <h3 className="text-xl font-light text-[#0A1A2F]">
                Response Time
              </h3>
              <p className="text-sm text-black/70 font-light leading-relaxed">
                We typically respond within 24 hours during business days (Monday–Friday, 9am–6pm PST).
              </p>
              <p className="text-sm text-black/70 font-light leading-relaxed">
                For urgent inquiries regarding orders, please include your order number in the subject line.
              </p>
            </div>

            <div className="border-l-2 border-black/20 pl-6">
              <p className="text-sm text-black/60 font-light leading-relaxed italic">
                "Every message matters to us. Whether you have a question, feedback, 
                or just want to say hi—we're listening."
              </p>
            </div>
          </motion.div>
        </div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-32 text-center"
        >
          <h2 className="text-3xl font-light tracking-tight text-[#0A1A2F] mb-12">
            Frequently Asked
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                question: "Shipping",
                answer: "Free shipping on all orders over $50. Standard delivery 3-5 business days."
              },
              {
                question: "Returns",
                answer: "30-day return policy on all products. Must be unused and in original packaging."
              },
              {
                question: "Product Questions",
                answer: "Need help choosing? Our team can provide personalized recommendations."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="p-6 border border-black/10"
              >
                <h3 className="text-lg font-medium text-[#0A1A2F] mb-3">
                  {item.question}
                </h3>
                <p className="text-sm text-black/70 font-light leading-relaxed">
                  {item.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Banner */}
      <div className="bg-black border-t border-white/10">
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
            <span key={i} className="inline-flex items-center mx-6 text-sm font-light tracking-[0.2em] text-white/60">
              WE'RE HERE TO HELP
              <span className="mx-6 text-white/20">●</span>
              GET IN TOUCH
              <span className="mx-6 text-white/20">●</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}