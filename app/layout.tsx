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
  title: "Subhadip Mondal — Full-Stack Developer | VIT Vellore",
  description:
    "Subhadip Mondal is a Full-Stack Developer from Kolkata, India (B.Tech CSE, VIT Vellore). Interning at NOTAPEX. Specializes in Next.js, TypeScript, Node.js, Prisma ORM, PostgreSQL, and React Native. View portfolio, projects, and contact.",
  keywords: [
    "Subhadip Mondal",
    "Subhadip Mondal VIT Vellore",
    "Subhadip Mondal Portfolio",
    "Subhadip Mondal Full-Stack Developer",
    "Subhadip Mondal Kolkata",
    "Subhadip Mondal NOTAPEX",
    "Subhadip Mondal Developer India",
    "Full-Stack Developer",
    "Full-Stack Developer India",
    "Frontend Engineer",
    "Backend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Node.js",
    "Prisma ORM",
    "PostgreSQL",
    "VIT Vellore",
    "Vellore Institute of Technology",
    "Kolkata Developer",
    "NOTAPEX Intern",
    "Software Engineer India",
    "Developer Portfolio",
  ],
  authors: [{ name: "Subhadip Mondal", url: "https://aryasubhaa.netlify.app" }],
  creator: "Subhadip Mondal",
  publisher: "Subhadip Mondal",
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
    title: "Subhadip Mondal — Full-Stack Developer | VIT Vellore",
    description:
      "Subhadip Mondal — Full-Stack Developer from Kolkata, India. B.Tech CSE @ VIT Vellore. Interning at NOTAPEX. Building scalable web apps with Next.js, TypeScript, Node.js & PostgreSQL.",
    siteName: "Subhadip Mondal Portfolio",
    images: [
      {
        url: "/assets/og-banner.png",
        width: 1200,
        height: 630,
        alt: "Subhadip Mondal — Full-Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Subhadip Mondal — Full-Stack Developer | VIT Vellore",
    description:
      "Full-Stack Developer from Kolkata, India. B.Tech CSE @ VIT Vellore. Interning at NOTAPEX. Builds scalable apps with Next.js, TypeScript & Node.js.",
    creator: "@arya_subhaa",
    site: "@arya_subhaa",
    images: ["/assets/og-banner.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "g-1xs18X4QuadunYrA1LDrX242fqX_VgyOLfxEBTrBk",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Subhadip Mondal",
  url: "https://aryasubhaa.netlify.app",
  image: "https://aryasubhaa.netlify.app/assets/photo-1.jpg",
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
        <meta name="google-site-verification" content="g-1xs18X4QuadunYrA1LDrX242fqX_VgyOLfxEBTrBk" />
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
