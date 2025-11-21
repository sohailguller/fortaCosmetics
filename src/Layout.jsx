import React from "react";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white selection:bg-black selection:text-white">
      <link href="https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap" rel="stylesheet" />
      <style>{`
        :root {
          --font-sans: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          --font-body: 'Courier Prime', 'Courier New', monospace;
        }

        body {
          font-family: var(--font-body);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        h1, h2, h3, h4, h5, h6, .font-sans {
          font-family: var(--font-sans);
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        /* Ensure buttons and nav use the clean heading font or body font based on preference - usually buttons look better in sans for this brand */
        button, .font-bold {
          font-family: var(--font-sans);
        }

        p, li, span, input, textarea, .font-mono {
          font-family: var(--font-body);
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