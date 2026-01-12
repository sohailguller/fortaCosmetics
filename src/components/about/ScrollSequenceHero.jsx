import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// GitHub raw URLs for the sequence frames
const BASE_URL = "https://raw.githubusercontent.com/sohailguller/fortaImages/main";
const FRAME_COUNT = 119;

export default function ScrollSequenceHero() {
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [images, setImages] = useState([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const containerRef = useRef(null);

  // Preload all images
  useEffect(() => {
    const imagePromises = [];
    const loadedImages = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const frameNumber = String(i).padStart(3, '0');
      const url = `${BASE_URL}/frame_${frameNumber}_delay-0.041s.webp`;
      
      const promise = new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loadedImages[i] = url;
          setLoadProgress(((i + 1) / FRAME_COUNT) * 100);
          resolve();
        };
        img.onerror = reject;
        img.src = url;
      });
      
      imagePromises.push(promise);
    }

    Promise.all(imagePromises)
      .then(() => {
        setImages(loadedImages);
        setTimeout(() => setLoading(false), 300);
      })
      .catch((err) => {
        console.error("Error loading images:", err);
        setLoading(false);
      });
  }, []);

  // Handle scroll to update frame
  useEffect(() => {
    if (loading || images.length === 0) return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const scrollHeight = container.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      
      // Calculate progress (0 to 1)
      const progress = Math.max(0, Math.min(1, scrolled / scrollHeight));
      
      // Map to frame index
      const frameIndex = Math.floor(progress * (FRAME_COUNT - 1));
      setCurrentFrame(frameIndex);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, images]);

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
        className="relative h-[300vh]"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {images.length > 0 && (
            <img
              src={images[currentFrame]}
              alt="FORTA Hero"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    </>
  );
}