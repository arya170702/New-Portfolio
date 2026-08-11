# ⚡ Subhadip Mondal — Premium Full-Stack Portfolio

[![Next.js 15](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Live Demo](https://img.shields.io/badge/Live_Demo-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://aryasubhaa.netlify.app)

A modern, high-precision engineering portfolio built with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS v4**. Features interactive technical architecture visualizers, real-time interactive demo models, a keyboard-driven command palette, and an expressive dark-mode design system.

👉 **[View Live Portfolio: aryasubhaa.netlify.app](https://aryasubhaa.netlify.app)**

---

## 🌟 Key Highlights & System Features

### 🕸️ 1. Living Engineering System Map
- Interactive SVG component mapping relationships across **Projects**, **Technologies**, and **Core Engineering Concepts**.
- Real-time highlight loops for connected dependency graph nodes and dynamic Bezier curve edges.
- Full keyboard access and node details drawer for deep inspection.

### ⚡ 2. Interactive Technical Demos
- **AutoTX (Expense Classification)**: Live regex engine preview classifying raw transaction text into categorized expenses with confidence scoring.
- **Socket.IO Event Pipeline**: Step-by-step simulator showing WebSocket handshakes, room joining, payload encryption, and ACK acknowledgments.
- **No-Excuses ML Pose Analysis**: Interactive landmark confidence calculator illustrating exercise rep verification.

### ⌨️ 3. Command Palette (`CMD + K`)
- Instant access navigation across all 7 portfolio sections.
- Quick action triggers: Jump to GitHub, LinkedIn, Twitter/X, download 2026 CV, or copy email address.

### 🎨 4. Premium Design System
- Curated dark mode palette built with glassmorphism, radial ambient lighting, and subtle micro-animations via `motion/react`.
- SEO optimization complete with Open Graph social card tags, JSON-LD `Person` schema, and dynamic metadata.

---

## 🛠️ Technology Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Motion (Framer Motion v12) |
| **Backend & APIs** | Node.js, Express, Prisma ORM, Socket.IO, RESTful & WebSocket APIs |
| **Databases** | PostgreSQL, MongoDB |
| **Security & Auth** | JWT (HttpOnly Cookies), OAuth 2.0, reCAPTCHA v3, Rate Limiting, CSP Headers |
| **Deployment** | Netlify (Static HTML Export), GitHub Actions CI |

---

## 📁 Repository Structure

```text
├── app/
│   ├── globals.css         # Design tokens & glassmorphism utilities
│   ├── layout.tsx          # Root layout with Open Graph & JSON-LD schema
│   └── page.tsx            # Main application composition
├── components/
│   ├── demos/              # Interactive technical feature simulators
│   ├── layout/             # Navbar, Footer
│   ├── sections/           # Hero, About, Experience, Projects, Map, Thinking, Contact
│   └── ui/                 # Command Palette, Custom Cursor, Magnetic Buttons
├── data/
│   ├── engineering-map.ts  # Node/Edge relationship data for System Map
│   └── portfolio-data.ts   # Personal, experience, project, & skill data
├── public/                 # Static assets, PDF resume, sitemap, robots.txt
└── netlify.toml            # Deployment build configuration
```

---

## 🚀 Local Development

To run this project locally on your machine:

```bash
# 1. Clone the repository
git clone https://github.com/arya170702/New-Portfolio.git
cd New-Portfolio

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts

- `npm run dev`: Launch local development server
- `npm run build`: Generate Next.js static export build (`out/`)
- `npm run type-check`: Run TypeScript static type checking (`tsc --noEmit`)
- `npm run lint`: Run Next.js linter

---

## 🌐 Connect & Contact

- **Website**: [aryasubhaa.netlify.app](https://aryasubhaa.netlify.app)
- **LinkedIn**: [Subhadip Mondal](https://www.linkedin.com/in/subhadip-mondal-07163b198/)
- **GitHub**: [@arya170702](https://github.com/arya170702)
- **Twitter / X**: [@arya_subhaa](https://x.com/arya_subhaa)
- **Email**: [aryasubha011@gmail.com](mailto:aryasubha011@gmail.com)

---

© 2026 Subhadip Mondal. Built with Next.js & React.
