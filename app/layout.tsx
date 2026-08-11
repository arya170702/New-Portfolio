import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aryasubhaa.netlify.app"),
  title: "Subhadip Mondal — Full-Stack Developer",
  description:
    "Portfolio of Subhadip Mondal, Full-Stack Developer Intern building thoughtful interfaces, reliable systems, and resilient web applications.",
  keywords: [
    "Subhadip Mondal",
    "Full-Stack Developer",
    "Frontend Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Prisma",
    "Node.js",
    "VIT Vellore",
  ],
  authors: [{ name: "Subhadip Mondal" }],
  creator: "Subhadip Mondal",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aryasubhaa.netlify.app",
    title: "Subhadip Mondal — Full-Stack Developer",
    description:
      "Full-Stack Developer crafting high-precision web applications, secure authentication pipelines, and resilient systems.",
    siteName: "Subhadip Mondal Portfolio",
    images: [
      {
        url: "/assets/profile.png",
        width: 1200,
        height: 1600,
        alt: "Subhadip Mondal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Subhadip Mondal — Full-Stack Developer",
    description:
      "Full-Stack Developer building thoughtful interfaces, reliable systems, and resilient web applications.",
    creator: "@arya_subhaa",
    site: "@arya_subhaa",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Subhadip Mondal",
  url: "https://aryasubhaa.netlify.app",
  jobTitle: "Full-Stack Developer",
  description:
    "Full-Stack Developer building thoughtful interfaces, reliable systems, and resilient web applications.",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Vellore Institute of Technology",
    url: "https://vit.ac.in",
  },
  sameAs: [
    "https://github.com/arya170702",
    "https://www.linkedin.com/in/subhadip-mondal-07163b198/",
    "https://x.com/arya_subhaa",
  ],
  knowsAbout: [
    "React", "Next.js", "TypeScript", "Node.js", "Flutter",
    "PostgreSQL", "MongoDB", "JWT Authentication", "Full-Stack Development",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="canonical" href="https://aryasubhaa.netlify.app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#080808] text-gray-100 min-h-screen selection:bg-emerald-500/30 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
