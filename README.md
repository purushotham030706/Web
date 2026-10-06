# Purushotham M — Portfolio

[![Live Site](https://img.shields.io/badge/Live-puru--portfolio--web.onrender.com-00e5ff?style=for-the-badge&logo=render)](https://puru-portfolio-web.onrender.com)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-00f59b?style=for-the-badge)](#)
[![Stack](https://img.shields.io/badge/Stack-React%2018%20%7C%20Vite%20%7C%20Express%20%7C%20MongoDB-7c3aed?style=for-the-badge)](#)

A modern, tactile, and highly interactive developer portfolio showcasing games, web applications, and systems programming by **Purushotham M** — Computer Science Engineering student at JSS Science and Technology University (JSSSTU), Mysuru.

---

## ✨ Features & Interactive Systems

- **Interactive Dot-Matrix Portrait**: Custom ASCII/dot-density face simulation responsive to mouse proximity and mobile touch interactions.
- **Dynamic Starfield & Particle Canvas**: Ambient background particle field with smooth cursor repulsion and velocity dampening.
- **Precision Crosshair Cursor**: Tailored hardware-accelerated cursor with hover states and velocity scaling.
- **Kinetic Smooth Scrolling**: Tuned Lenis smooth-scrolling integration with subtle inertia bouncing.
- **Interactive Developer Terminal**: Embedded retro command-line interface featuring system commands (`/help`, `/projects`, `/skills`, `/contact`, `/favgame`, `/favmusicartist`, `/clear`).
- **Playable 3-Map Retro Descent Mini-Game**: Integrated canvas arcade platformer with horizontal movement, jumping physics, dynamic laser hazards, 10 collectible stars per map, and death counter tracking.
- **Interactive 3D Twist Footer**: Norris-inspired kinetic 3D typography hover interactions.
- **Hardened Contact Dispatcher**: Contact form with configurable backend endpoints, in-memory sliding-window IP rate limiting, hidden bot honeypot, input length validation, and MongoDB fallback.

---

## 🛠 Tech Stack

### Frontend
- **React 18** & **Vite** — Fast, component-driven client architecture
- **Tailwind CSS** — Utility-first, responsive editorial design system
- **Framer Motion** — Physics-based motion and entrance orchestrations
- **@studio-freight/lenis** — Inertial smooth scrolling
- **Lucide React** — Modern stroke iconography
- **HTML5 Canvas** — High-performance game loops and dot simulations

### Backend
- **Node.js** & **Express** — RESTful API services
- **MongoDB & Mongoose** — Document persistence with graceful in-memory development fallback
- **CORS** — Configurable cross-origin resource sharing
- **Rate Limiting & Spam Defense** — Per-IP sliding-window limiter & honeypot verification

### Deployment & Infrastructure
- **Render** — Blueprint orchestration (`render.yaml`) with decoupled static client and Node.js web services

---

## 📂 Repository Architecture

```
website/
├── client/                     # Frontend React + Vite application
│   ├── public/                 # Static assets & icons
│   ├── src/
│   │   ├── components/         # Interactive UI modules (Terminal, MiniGame, Cursor, Face)
│   │   ├── sections/           # Landing, About, Projects, Technical Matrix, Contact, Footer
│   │   ├── hooks/              # Custom React hooks (smooth scroll, viewport, timers)
│   │   ├── utils/              # Project and personal metadata
│   │   ├── App.jsx             # Root layout and shell orchestration
│   │   └── main.jsx            # React DOM entry point
│   ├── .env.example            # Client environment blueprint
│   ├── package.json
│   └── vite.config.js
├── server/                     # Backend Express REST service
│   ├── controllers/            # Request handlers (contactController.js)
│   ├── models/                 # Mongoose schemas (Contact.js)
│   ├── routes/                 # Express route definitions (contact.js)
│   ├── .env.example            # Server environment blueprint
│   ├── package.json
│   └── server.js               # API entry point & database connection
├── render.yaml                 # Render infrastructure blueprint
└── README.md                   # Project documentation
```

---

## 🚀 Projects Showcased

1. **NetAssure (2026)** — *Security & AI Systems*  
   Automated network configuration audit engine with local RAG learning. Parses device configurations (Cisco IOS/IOS-XE, FortiOS, Junos), extracts canonical facts, runs deterministic compliance checks, and leverages Ollama (Llama 3.2) and ChromaDB vector search. Built with Python, FastAPI, React, and Tailwind CSS.

2. **Bovine Rush (2026)** — *Game Development*  
   Fast-paced 2D endless runner engineered with agile principles, dynamic obstacle pacing, responsive character physics, and an integrated gameplay analytics pipeline.

3. **Dr. Bharathi P Clinic (2026)** — *Full-Stack Web Application*  
   Healthcare appointment booking and administrative scheduling portal engineered with React, Node.js, Express, and MongoDB.

4. **Café Tracker (2025)** — *Web Application*  
   Lightweight spatial log to catalog visited cafés, chronological notes, and interactive map markers using Leaflet.js and OpenStreetMap.

5. **Run n Gun (2024)** — *Game Development*  
   2D arcade shooter built in Unreal Engine using Blueprints, focusing on player mobility, procedural enemy hazard dispatching, and arcade scoring loops.

---

## ⚙️ Environment Configuration

### Backend (`server/.env`)
Copy `server/.env.example` to `server/.env`:
```bash
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/portfolio # Optional: in-memory fallback if omitted
```

### Frontend (`client/.env`)
Copy `client/.env.example` to `client/.env`:
```bash
VITE_API_URL=http://localhost:5000
```

---

## 💻 Local Development

### 1. Backend Setup
```bash
cd server
npm install
npm run dev # or: npm start
```
The API starts at `http://localhost:5000`. Test the health endpoint at `http://localhost:5000/api/health`.

### 2. Frontend Setup
In a separate terminal:
```bash
cd client
npm install
npm run dev
```
Open `http://localhost:5173` to view the application with hot module reloading.

---

## 🌐 Render Deployment

This repository includes a production-ready `render.yaml` specification configured for Render Blueprints:

1. Connect the GitHub repository to [Render](https://render.com).
2. Create a new **Blueprint** instance pointing to this repository.
3. Render automatically provisions:
   - **`puru-portfolio-api`**: Node.js Web Service running `server/server.js`.
   - **`puru-portfolio-web`**: Static Site building `client` into `dist` with SPA rewrite rules.
4. Add your production `MONGODB_URI` under the `puru-portfolio-api` environment variables in the Render dashboard if permanent database persistence is desired.

---

## 📬 Contact & Socials

- **Email**: [purushothambm2006@gmail.com](mailto:purushothambm2006@gmail.com)
- **Instagram**: [@purushotham0307](https://www.instagram.com/purushotham0307)
- **GitHub**: [github.com/purushotham030706](https://github.com/purushotham030706)
- **LinkedIn**: [linkedin.com/in/purushotham-m-61b35937a](https://www.linkedin.com/in/purushotham-m-61b35937a)

---

© 2026 Purushotham M. Built with precision and care.
