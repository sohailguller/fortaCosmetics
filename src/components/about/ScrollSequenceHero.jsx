import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function ScrollSequenceHero({ showBanner = false }) {
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [frameUrls, setFrameUrls] = useState([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const containerRef = useRef(null);

  // Fetch and preload all images
  useEffect(() => {
    async function loadImages() {
      try {
        // Fetch frame list
        const base = "https://sohailguller.github.io/fortaImages/";
        const response = await fetch(base + "frames.json");
        const names = await response.json();
        const urls = names.map(n => base + n);
        
        console.log("Loaded frame URLs:", urls.length);
        setFrameUrls(urls);

        // Preload all images
        const promises = urls.map((url, i) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
              setLoadProgress(((i + 1) / urls.length) * 100);
              resolve();
            };
            img.onerror = (e) => {
              console.error("Failed to load:", url);
              reject(e);
            };
            img.src = url;
          });
        });

        await Promise.all(promises);
        console.log("All images preloaded");
        setTimeout(() => setLoading(false), 300);
      } catch (err) {
        console.error("Error loading images:", err);
        setLoading(false);
      }
    }

    loadImages();
  }, []);

  // Handle scroll to update frame
  useEffect(() => {
    if (loading || frameUrls.length === 0) return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const scrollHeight = container.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      
      // Calculate progress (0 to 1)
      const progress = Math.max(0, Math.min(1, scrolled / scrollHeight));
      
      // Map to frame index
      const frameIndex = Math.floor(progress * (frameUrls.length - 1));
      setCurrentFrame(frameIndex);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, frameUrls]);

  return (
    <>
      {/* Loading Overlay */}
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center"
        >
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/ea4583fe7_PrimaryLogo-_black-06.png" 
            alt="FORTA" 
            className="h-8 mb-12 object-contain mix-blend-multiply"
          />
          
          <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-black"
              initial={{ width: 0 }}
              animate={{ width: `${loadProgress}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
          
          <p className="mt-4 text-xs text-gray-500 tracking-wider">
            {Math.round(loadProgress)}%
          </p>
        </motion.div>
      )}

      {/* Scroll-driven sequence hero */}
      <div 
        ref={containerRef}
        className="relative h-[400vh]"
      >
        <div className={`sticky ${showBanner ? 'top-[68px] md:top-[80px]' : 'top-0'} h-screen w-full overflow-hidden bg-black`}>
          {frameUrls.length > 0 && (
            <img
              src={frameUrls[currentFrame]}
              alt="FORTA Hero"
              loading="eager"
              decoding="sync"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ imageRendering: 'high-quality' }}
            />
          )}
        </div>
      </div>
    </>
  );
}