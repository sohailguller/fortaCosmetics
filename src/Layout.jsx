import React from "react";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white selection:bg-black selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');

        :root {
          --font-sans: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          --font-serif: 'Playfair Display', serif;
        }
        
        * {
          font-family: var(--font-sans);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        h1, h2, h3, h4, h5, h6 {
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <main>{children}</main>
    </div>
  );
}