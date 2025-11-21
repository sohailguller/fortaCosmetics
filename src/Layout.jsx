import React from "react";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @font-face {
          font-family: 'GT Sectra';
          src: url('https://dl.dropboxusercontent.com/scl/fi/7ehv7fa316dfnoh8ovgor/GT-Sectra-Fine-Book.otf?rlkey=n9x18qjoy7y30be19n8aujath&st=3qvzhkw3') format('opentype');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'Aktiv Grotesk';
          src: url('https://dl.dropboxusercontent.com/scl/fi/35sm2m0albyt6gofq2t3s/AktivGrotesk_Rg.ttf?rlkey=36puj9mfxck45sv5e76pgw1j9&st=m46vqfm') format('truetype');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        
        * {
          font-family: 'Aktiv Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        h1, h2 {
          font-family: 'GT Sectra', Georgia, serif;
          font-weight: 400;
        }

        :root {
          --black: #000000;
          --white: #FFFFFF;
          --stone: #C9C0B4;
          --oat: #E5DED3;
          --linen: #F5F2EE;
        }
      `}</style>

      <main>{children}</main>
    </div>
  );
}