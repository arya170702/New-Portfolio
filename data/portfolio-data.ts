export interface ExperienceItem {
  id: string;
  company: string;
  companyUrl?: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  tags: string[];
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  highlights: string[];
  github: string;
  accent: string;
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level?: string }[];
}

export interface AchievementItem {
  value: string;
  label: string;
  detail: string;
  subtext?: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  url?: string;
}

// Engineering map data is now in @/data/engineering-map
export type { EngMapNode, EngMapEdge } from "@/data/engineering-map";
export { ENGINEERING_MAP } from "@/data/engineering-map";

export const PORTFOLIO_DATA = {

  personal: {
    name: "Subhadip Mondal",
    title: "Full-Stack Developer",
    location: "Kolkata, India (IST / UTC+5:30)",
    currentRole: "Full-Stack Developer Intern @ NOTAPEX",
    status: "Available for Opportunities",
    email: "aryasubha011@gmail.com",
    linkedin: "https://www.linkedin.com/in/subhadip-mondal-07163b198/",
    github: "https://github.com/arya170702",
    twitter: "https://x.com/arya_subhaa",
    resumePdf: "/assets/resume.pdf",
    profilePic: "/assets/profile.webp",
    education: {
      degree: "B.Tech in Computer Science & Engineering",
      institution: "Vellore Institute of Technology, Vellore",
      cgpa: "8.02",
      period: "2020–2024",
    },
  },

  about: {
    philosophy:
      "Engineered systems require both visual restraint and backend rigor. I bridge the gap between design engineering and system reliability—from pixel-perfect responsive interfaces to Prisma schema migrations and JWT security protocols.",
    highlights: [
      { label: "DEGREE", value: "B.Tech Computer Science" },
      { label: "INSTITUTION", value: "VIT Vellore" },
      { label: "ACADEMIC SCORE", value: "8.02 CGPA" },
      { label: "FOCUS", value: "Full-Stack & Systems" },
    ],
  },

  experiences: [
    {
      id: "notapex",
      company: "NOTAPEX",
      companyUrl: "https://notapex.com/",
      role: "Full-Stack Developer Intern",
      period: "May 2026 – Present",
      location: "Remote / India",
      tags: [
        "Next.js",
        "TypeScript",
        "Prisma ORM",
        "PostgreSQL",
        "JWT / HttpOnly",
        "OAuth 2.0",
        "i18n / Bilingual",
        "PDF Engine",
        "Rate Limiting",
        "Admin Panel",
        "reCAPTCHA v3",
        "Payment Security",
      ],
      highlights: [
        "Architected secure role-escalation system (Student → Teacher/Institute) using JWT refresh tokens in HttpOnly cookies.",
        "Built responsive admin dashboard for user verification, permission approvals, and status tracking.",
        "Implemented dynamic pagination with grid/list view toggles backed by database-level LIMIT/OFFSET queries via Prisma ORM.",
        "Engineered automated signed-PDF delivery pipeline for secure document dispatch.",
        "Integrated bilingual English/Hindi internationalization (i18n) across navigation and legal frameworks.",
        "Authored production database schema migrations, integrity rules, and database seed scripts.",
        "Implemented API rate limiting to mitigate DDoS vectors and brute-force traffic.",
        "Sanitised payment checkout payloads to strengthen overall financial transaction security.",
      ],
    },
    {
      id: "itjobxs",
      company: "ITJOBXS",
      role: "Software Development Intern",
      period: "Mar 2023 – May 2023",
      location: "India",
      tags: ["React", "JavaScript", "reCAPTCHA v3", "Auth Flows", "Bot Detection", "Spam Filtering"],
      highlights: [
        "Designed and built responsive frontend web interface for the Desi QnA platform.",
        "Engineered user verification logic and secure authentication onboarding flows.",
        "Developed custom bot detection algorithms to filter fake posts and automated spam.",
        "Integrated Google reCAPTCHA v3 across public entry points for spam prevention.",
      ],
    },
  ] as ExperienceItem[],

  projects: [
    {
      id: "autotx",
      number: "01",
      title: "AutoTX",
      subtitle: "Intelligent Expense Tracker",
      description:
        "An intelligent mobile & web expense tracking engine that automatically parses incoming bank SMS notifications and extracts transaction metadata in real time, eliminating manual expense entry.",
      tech: ["Flutter", "JavaScript", "CSS3", "SMS Parser", "Regex Engine", "REST API"],
      highlights: [
        "Real-time SMS transaction regex & NLP parser",
        "Instant category tagging & expense telemetry",
        "Fallback manual entry with instant validation",
        "Clean, high-density financial analytics view",
      ],
      github: "https://github.com/arya170702/AutoTX",
      accent: "#10b981",
    },
    {
      id: "chat-app",
      number: "02",
      title: "Chat Application",
      subtitle: "Real-Time Broadcast & Messaging Engine",
      description:
        "A low-latency real-time communication platform supporting private point-to-point rooms, direct user messaging, and instant broadcast channels powered by Socket.io.",
      tech: ["Node.js", "Express.js", "Socket.IO", "MongoDB", "JavaScript", "REST API", "Session Management"],
      highlights: [
        "Event-driven Socket.io socket server architecture",
        "Server-side session management & persistent state",
        "Multi-room isolation & access control",
        "Broadcast channels with live user status indicators",
      ],
      github: "https://github.com/arya170702/Chat-App",
      accent: "#3b82f6",
    },
    {
      id: "no-excuses",
      number: "03",
      title: "No-Excuses",
      subtitle: "ML-Driven Personalised Fitness Platform",
      description:
        "A holistic fitness application generating hyper-personalized meal & exercise regimes based on user routine, caloric expenditure, and machine-learning work-life balance predictions.",
      tech: ["Flutter", "Express.js", "MongoDB", "Python", "NumPy", "Pandas", "ML Model", "REST API"],
      highlights: [
        "Python ML model for work-life balance prediction",
        "Adaptive caloric & macronutrient recommendation engine",
        "Custom exercise split generator based on activity metrics",
        "End-to-end REST API architecture connecting mobile to ML services",
      ],
      github: "https://github.com/Cypher-Dawgs",
      accent: "#a855f7",
    },
  ] as ProjectItem[],

  skillCategories: [
    {
      category: "Frontend Engineering",
      skills: [
        { name: "React 19" },
        { name: "Next.js (App Router)" },
        { name: "TypeScript" },
        { name: "JavaScript (ESNext)" },
        { name: "Tailwind CSS v4" },
        { name: "Redux" },
        { name: "React Router" },
        { name: "HTML5 / Semantic Web" },
        { name: "CSS3 / Animations" },
        { name: "Responsive Design" },
        { name: "i18n / Localization" },
        { name: "Figma" },
      ],
    },
    {
      category: "Backend & Systems",
      skills: [
        { name: "Node.js" },
        { name: "Express.js" },
        { name: "Prisma ORM" },
        { name: "RESTful API Design" },
        { name: "Socket.IO" },
        { name: "Database Migrations" },
        { name: "API Rate Limiting" },
        { name: "PDF Generation Pipeline" },
        { name: "Webhook Integration" },
        { name: "Java" },
      ],
    },
    {
      category: "Mobile Development",
      skills: [
        { name: "Flutter" },
        { name: "React Native" },
        { name: "Android" },
        { name: "Swift" },
        { name: "Kotlin" },
        { name: "Cross-Platform UI" },
        { name: "REST API Integration" },
        { name: "SMS Parsing Engine" },
      ],
    },
    {
      category: "Databases & Storage",
      skills: [
        { name: "PostgreSQL" },
        { name: "MongoDB" },
        { name: "Redis" },
        { name: "Firebase" },
        { name: "SQL & Query Tuning" },
        { name: "LIMIT/OFFSET Pagination" },
        { name: "Prisma Schema Design" },
        { name: "Amazon S3" },
        { name: "Database Management (DBMS)" },
      ],
    },
    {
      category: "Cloud & DevOps",
      skills: [
        { name: "Amazon EC2" },
        { name: "Amazon S3" },
        { name: "Amazon SQS" },
        { name: "Netlify" },
        { name: "Git / GitHub" },
        { name: "Git SVN" },
        { name: "Postman" },
        { name: "Agile / PR Workflows" },
        { name: "VS Code" },
      ],
    },
    {
      category: "Security & Auth",
      skills: [
        { name: "JWT & Refresh Tokens" },
        { name: "HttpOnly Cookies" },
        { name: "Google OAuth 2.0" },
        { name: "Google reCAPTCHA v3" },
        { name: "Payload Sanitization" },
        { name: "Role-Based Access Control" },
        { name: "Bot Detection Logic" },
        { name: "Microsoft Security Certified" },
      ],
    },
    {
      category: "AI, ML & Data",
      skills: [
        { name: "Python" },
        { name: "NumPy" },
        { name: "Pandas" },
        { name: "ML Model Integration" },
        { name: "Generative AI Tools" },
        { name: "Claude / LLM Workflows" },
        { name: "Vibe Coding" },
        { name: "Data Pipeline Design" },
      ],
    },
    {
      category: "Languages & Platforms",
      skills: [
        { name: "JavaScript" },
        { name: "TypeScript" },
        { name: "Python" },
        { name: "Java" },
        { name: "C++" },
        { name: "C" },
        { name: "XML" },
        { name: "Shopify" },
        { name: "WordPress" },
        { name: "Software Testing / Jest" },
      ],
    },
  ] as SkillCategory[],

  achievements: [
    {
      value: "95.87%",
      label: "JEE Mains 2020",
      detail: "National Percentile in Joint Entrance Examination",
      subtext: "Top tier nationwide engineering entrance performance",
    },
    {
      value: "Rank 2400",
      label: "WBJEE 2020",
      detail: "State Rank in West Bengal Joint Entrance Examination",
      subtext: "Secured top merit rank among over 100,000 candidates",
    },
  ] as AchievementItem[],

  certifications: [
    {
      title: "Microsoft Security, Compliance & Identity Fundamentals",
      issuer: "Microsoft Certified",
      url: "https://drive.google.com/file/d/1ZuD--IQuLrCVSBv8wEzRggeUde4ghxOa/view?usp=sharing",
    },
    {
      title: "Accenture Technology Consulting Virtual Experience Program",
      issuer: "Forage",
      url: "https://drive.google.com/file/d/1aLKzdJBIRKra8uqP25JM3sy_yBd_FH6m/view?usp=sharing",
    },
  ] as CertificationItem[],
};
