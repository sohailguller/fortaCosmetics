import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { base44 } from "@/api/base44Client";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await base44.integrations.Core.SendEmail({
        to: 'hello@forta.com',
        subject: `Contact Form: ${formData.subject}`,
        body: `
          Name: ${formData.name}
          Email: ${formData.email}
          
          Message:
          ${formData.message}
        `
      });

      setSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSent(false), 3000);
    } catch (error) {
      alert('Error sending message. Please try again.');
    }

    setIsSending(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-light tracking-tight text-[#0A1A2F] mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-black/60 font-light">
            Have questions? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label className="text-sm font-light">Name</Label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="mt-2 bg-white border-black/10 h-12"
                />
              </div>

              <div>
                <Label className="text-sm font-light">Email</Label>
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="mt-2 bg-white border-black/10 h-12"
                />
              </div>

              <div>
                <Label className="text-sm font-light">Subject</Label>
                <Input
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="mt-2 bg-white border-black/10 h-12"
                />
              </div>

              <div>
                <Label className="text-sm font-light">Message</Label>
                <Textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="mt-2 bg-white border-black/10 min-h-[180px] resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSending || sent}
                className="w-full h-14 bg-black text-white hover:bg-black/90 text-sm font-medium tracking-wider"
              >
                {sent ? 'MESSAGE SENT' : isSending ? 'SENDING...' : 'SEND MESSAGE'}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-2xl font-light tracking-tight text-[#0A1A2F] mb-8">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Mail className="w-5 h-5 text-[#0A1A2F] flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-light text-black/40 mb-1">Email</p>
                    <a href="mailto:hello@forta.com" className="text-base text-[#0A1A2F] hover:underline">
                      hello@forta.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="w-5 h-5 text-[#0A1A2F] flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-light text-black/40 mb-1">Phone</p>
                    <a href="tel:+15551234567" className="text-base text-[#0A1A2F] hover:underline">
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="w-5 h-5 text-[#0A1A2F] flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-light text-black/40 mb-1">Headquarters</p>
                    <p className="text-base text-[#0A1A2F]">
                      123 Innovation Drive<br />
                      San Francisco, CA 94103
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0A1A2F] text-white p-8">
              <h3 className="text-xl font-light mb-4">Customer Service</h3>
              <p className="text-sm text-white/70 font-light leading-relaxed mb-6">
                Our team is available Monday through Friday, 9am - 6pm PST. 
                We aim to respond to all inquiries within 24 hours.
              </p>
              <p className="text-sm text-white/70 font-light">
                For order-related questions, please include your order number.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}