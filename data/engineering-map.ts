export interface EngMapNode {
  id: string;
  label: string;
  type: "project" | "tech" | "concept";
  x: number;
  y: number;
  description?: string;
}

export interface EngMapEdge {
  from: string;
  to: string;
}

export const ENGINEERING_MAP: { nodes: EngMapNode[]; edges: EngMapEdge[] } = {
  nodes: [
    { id: "notapex",    label: "NOTAPEX",     type: "project", x: 50,  y: 18,  description: "Full-Stack internship — authentication, admin systems, payments" },
    { id: "autotx",     label: "AUTOTX",      type: "project", x: 18,  y: 60,  description: "SMS-driven intelligent expense tracker" },
    { id: "chat-app",   label: "CHAT APP",    type: "project", x: 50,  y: 84,  description: "Real-time Socket.io messaging platform" },
    { id: "no-excuses", label: "NO-EXCUSES",  type: "project", x: 82,  y: 60,  description: "ML-powered fitness recommendation app" },
    { id: "jwt",        label: "JWT",          type: "tech",    x: 25,  y: 7,   description: "Refresh token rotation in HttpOnly cookies — NOTAPEX" },
    { id: "prisma",     label: "PRISMA ORM",   type: "tech",    x: 72,  y: 5,   description: "Schema migrations & LIMIT/OFFSET pagination — NOTAPEX" },
    { id: "postgres",   label: "POSTGRESQL",   type: "tech",    x: 90,  y: 16,  description: "Relational store via Prisma ORM — NOTAPEX" },
    { id: "rate-limit", label: "RATE LIMIT",   type: "concept", x: 96,  y: 36,  description: "API-level DDoS and brute-force mitigation — NOTAPEX" },
    { id: "i18n",       label: "i18n",         type: "concept", x: 94,  y: 68,  description: "Bilingual EN/HI across nav and legal pages — NOTAPEX" },
    { id: "payments",   label: "PAYMENTS",     type: "concept", x: 76,  y: 88,  description: "Sanitised checkout payload security — NOTAPEX" },
    { id: "flutter",    label: "FLUTTER",      type: "tech",    x: 4,   y: 38,  description: "Cross-platform mobile UI — AutoTX & No-Excuses" },
    { id: "sms-parse",  label: "SMS PARSER",   type: "concept", x: 4,   y: 68,  description: "Regex bank SMS extraction engine — AutoTX" },
    { id: "socketio",   label: "SOCKET.IO",    type: "tech",    x: 22,  y: 94,  description: "Event-driven real-time pub/sub — Chat App" },
    { id: "mongodb",    label: "MONGODB",      type: "tech",    x: 50,  y: 97,  description: "Document store — Chat App & No-Excuses" },
    { id: "nodejs",     label: "NODE.JS",      type: "tech",    x: 78,  y: 94,  description: "Express.js API server — Chat App & No-Excuses" },
    { id: "python-ml",  label: "PYTHON ML",    type: "tech",    x: 96,  y: 50,  description: "Work-life balance prediction & recommendation — No-Excuses" },
  ],
  edges: [
    { from: "notapex",    to: "jwt" },
    { from: "notapex",    to: "prisma" },
    { from: "notapex",    to: "rate-limit" },
    { from: "notapex",    to: "i18n" },
    { from: "notapex",    to: "payments" },
    { from: "prisma",     to: "postgres" },
    { from: "autotx",     to: "flutter" },
    { from: "autotx",     to: "sms-parse" },
    { from: "chat-app",   to: "socketio" },
    { from: "chat-app",   to: "mongodb" },
    { from: "chat-app",   to: "nodejs" },
    { from: "no-excuses", to: "flutter" },
    { from: "no-excuses", to: "python-ml" },
    { from: "no-excuses", to: "mongodb" },
    { from: "no-excuses", to: "nodejs" },
  ],
};
