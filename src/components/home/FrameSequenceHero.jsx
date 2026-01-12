import React, { useState, useEffect, useRef } from "react";

export default function FrameSequenceHero() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [frames, setFrames] = useState([]);
  const [loading, setLoading] = useState(true);
  const imgRef = useRef(null);
  const preloadedImages = useRef(new Set());

  const BASE_URL = "https://sohailguller.github.io/fortaImages/";

  // Fetch frames list
  useEffect(() => {
    const fetchFrames = async () => {
      try {
        const response = await fetch(BASE_URL + "frames.json");
        const frameNames = await response.json();
        const frameUrls = frameNames.map(name => BASE_URL + name);
        setFrames(frameUrls);
        
        // Preload first 12 frames
        for (let i = 0; i < Math.min(12, frameUrls.length); i++) {
          const img = new Image();
          img.src = frameUrls[i];
          img.onload = () => {
            preloadedImages.current.add(i);
            if (i === 0) setLoading(false);
          };
        }
      } catch (error) {
        console.error("Error loading frames:", error);
        setLoading(false);
      }
    };

    fetchFrames();
  }, []);

  // Preload upcoming frames
  const preloadAhead = (startIdx, count = 8) => {
    for (let k = 0; k < count; k++) {
      const idx = (startIdx + k) % frames.length;
      if (!preloadedImages.current.has(idx)) {
        const img = new Image();
        img.src = frames[idx];
        img.onload = () => preloadedImages.current.add(idx);
      }
    }
  };

  // Play animation at ~24 FPS
  useEffect(() => {
    if (frames.length === 0) return;

    const fps = 24;
    const interval = setInterval(() => {
      setCurrentFrame((prev) => {
        const next = (prev + 1) % frames.length;
        preloadAhead(next + 1, 8);
        return next;
      });
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [frames]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <img 
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fae7032e9ee5cc70e1bfa7/ea4583fe7_PrimaryLogo-_black-06.png" 
          alt="FORTA" 
          className="h-8 object-contain mix-blend-multiply animate-pulse"
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto px-0">
      <img
        ref={imgRef}
        src={frames[currentFrame]}
        alt="FORTA animation"
        className="w-full h-auto block"
      />
    </div>
  );
}