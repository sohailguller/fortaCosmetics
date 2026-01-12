import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollHeroSection() {
  const [frames, setFrames] = useState([]);
  const [loadedImages, setLoadedImages] = useState([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [sequenceComplete, setSequenceComplete] = useState(false);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const frameIndexRef = useRef(0);
  const rafRef = useRef(null);
  const scrollAccumulator = useRef(0);

  // Fetch frames list
  useEffect(() => {
    const fetchFrames = async () => {
      try {
        const response = await fetch("https://sohailguller.github.io/fortaImages/frames.json");
        const framesList = await response.json();
        setFrames(framesList);
      } catch (error) {
        console.error("Error fetching frames:", error);
      }
    };
    fetchFrames();
  }, []);

  // Preload all images
  useEffect(() => {
    if (frames.length === 0) return;

    const preloadImages = async () => {
      const baseURL = "https://sohailguller.github.io/fortaImages/";
      const imagePromises = frames.map((filename, index) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            setLoadProgress((prev) => Math.min(((index + 1) / frames.length) * 100, 100));
            resolve(img);
          };
          img.onerror = () => {
            console.error(`Failed to load frame: ${filename}`);
            setLoadProgress((prev) => Math.min(((index + 1) / frames.length) * 100, 100));
            resolve(null);
          };
          img.src = baseURL + filename;
        });
      });

      const loaded = await Promise.all(imagePromises);
      setLoadedImages(loaded.filter(img => img !== null));
      setIsLoading(false);
    };

    preloadImages();
  }, [frames]);

  // Draw frame on canvas
  const drawFrame = (frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas || loadedImages.length === 0) return;

    const ctx = canvas.getContext("2d");
    const img = loadedImages[frameIndex];
    if (!img) return;

    // Set canvas size to match window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Calculate cover-fit dimensions
    const canvasAspect = canvas.width / canvas.height;
    const imgAspect = img.width / img.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgAspect > canvasAspect) {
      drawHeight = canvas.height;
      drawWidth = img.width * (canvas.height / img.height);
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = canvas.width;
      drawHeight = img.height * (canvas.width / img.width);
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Freeze scroll until sequence completes
  useEffect(() => {
    if (isLoading || sequenceComplete) return;

    const preventScroll = (e) => {
      e.preventDefault();
    };

    // Prevent scrolling
    document.body.style.overflow = "hidden";
    document.addEventListener("wheel", preventScroll, { passive: false });
    document.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("wheel", preventScroll);
      document.removeEventListener("touchmove", preventScroll);
    };
  }, [isLoading, sequenceComplete]);

  // Wheel handler to scrub through frames
  useEffect(() => {
    if (isLoading || loadedImages.length === 0 || sequenceComplete) return;

    const handleWheel = (e) => {
      e.preventDefault();
      
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        // Only allow scrolling forward
        if (e.deltaY > 0) {
          scrollAccumulator.current += e.deltaY;
        }
        
        // Map accumulated scroll to frame index
        const pixelsPerFrame = 50; // Adjust for sensitivity
        const targetFrame = Math.floor(scrollAccumulator.current / pixelsPerFrame);
        const frameIndex = Math.max(0, Math.min(targetFrame, loadedImages.length - 1));
        
        if (frameIndex !== frameIndexRef.current) {
          frameIndexRef.current = frameIndex;
          drawFrame(frameIndex);
        }
        
        // Check if sequence is complete (reached last frame)
        if (frameIndex === loadedImages.length - 1) {
          setSequenceComplete(true);
        }

        rafRef.current = null;
      });
    };

    // Initialize at frame 0
    frameIndexRef.current = 0;
    scrollAccumulator.current = 0;
    drawFrame(0);

    // Handle resize
    const handleResize = () => {
      drawFrame(frameIndexRef.current);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isLoading, loadedImages, sequenceComplete]);

  return (
    <>
      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center"
          >
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-12 tracking-tight">FORTA</h1>
              
              {/* Loading Bar */}
              <div className="w-64 md:w-96 h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-black"
                  initial={{ width: 0 }}
                  animate={{ width: `${loadProgress}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              
              <p className="text-sm text-gray-500 mt-4 tracking-wider">
                {Math.round(loadProgress)}%
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Container */}
      <div ref={containerRef} className="relative" style={{ minHeight: sequenceComplete ? 'auto' : '100vh' }}>
        {/* Fixed Canvas Hero */}
        <div className={`${sequenceComplete ? 'relative' : 'fixed'} top-0 left-0 w-full h-screen overflow-hidden z-30`}>
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ display: isLoading ? "none" : "block" }}
          />
        </div>
      </div>
    </>
  );
}