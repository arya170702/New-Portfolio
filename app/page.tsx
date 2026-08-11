import { CustomCursor } from "@/components/ui/custom-cursor";
import { CommandPalette } from "@/components/ui/command-palette";
import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { EngineeringMapSection } from "@/components/sections/engineering-map-section";
import { EngineeringThinkingSection } from "@/components/sections/engineering-thinking-section";
import { AchievementsSection } from "@/components/sections/achievements-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#080808] text-gray-100 selection:bg-emerald-500/30 selection:text-white">
      {/* Desktop Custom Cursor Light */}
      <CustomCursor />

      {/* Global ⌘K Command Palette */}
      <CommandPalette />

      {/* Floating Glass Navbar */}
      <Navbar />

      {/* 01 — HERO */}
      <HeroSection />

      {/* 02 — ABOUT & PHILOSOPHY */}
      <AboutSection />

      {/* 03 — WORK EXPERIENCE */}
      <ExperienceSection />

      {/* 04 — SELECTED PROJECTS (Interactive Demos) */}
      <ProjectsSection />

      {/* 05 — ENGINEERING SYSTEM MAP */}
      <EngineeringMapSection />

      {/* 06 — ENGINEERING THINKING */}
      <EngineeringThinkingSection />

      {/* 07 — ACHIEVEMENTS */}
      <AchievementsSection />

      {/* 08 — CONTACT */}
      <ContactSection />

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
