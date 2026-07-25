import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


export const metadata: Metadata = {
  title: "Kamalesh Acharya | B.Tech. (Hons.) Civil Engineering @ IIT Kharagpur",
  description: "Portfolio of Kamalesh Acharya, B.Tech. (Hons.) in Civil Engineering at IIT Kharagpur (2028), CGPA 8.14/10. Projects include React, C++, Node.js, Python, and real-time systems work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="o_M5Iv7V9TKz_aNEpuQ0jTPbewdksVvSEgydRtydbHc"
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-neutral-100 text-neutral-900 relative`}
      >
        {children}

        {/* Global Noise/Grain Texture Overlay */}
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-multiply"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise"/%3E%3C/filter%3E%3Crect width="400" height="400" fill="black" filter="url(%23noiseFilter)"/%3E%3C/svg%3E")',
            backgroundSize: '400px 400px',
          }}
        />
      </body>
    </html>
  );
}
