# JLG Portfolio — Jhon Lemon Galin

AI Automation Specialist | Workflow Developer

## Tech Stack

- **React 18** + **Vite** — Fast frontend framework
- **TailwindCSS 3** — Utility-first styling with dark/light mode
- **Framer Motion 11** — Smooth animations & scroll effects
- **Lucide React** — Icon library
- **Canvas API** — Animated particle background

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

Open http://localhost:5173

## Features

- 🌙 Dark / Light mode toggle
- ✨ Animated particle background (Canvas)
- 🔄 Floating tech icons around profile
- 📜 Scroll-reveal animations
- 🖼️ Project image modal gallery with keyboard navigation
- 📱 Fully responsive (mobile, tablet, desktop)
- ⌨️ Typewriter effect in hero
- 🎯 Smooth scroll navigation
- 💎 Glassmorphism cards
- 🔦 Neon glow effects (dark mode)
- 📊 Animated skill bars

## Folder Structure

```
portfolio/
├── public/
│   └── projects/           ← Add project screenshots here
│       ├── messenger/
│       ├── lead/
│       └── workflow/
├── src/
│   ├── components/
│   │   ├── GlassCard.jsx
│   │   ├── Navbar.jsx
│   │   ├── ParticleBackground.jsx
│   │   ├── ScanLine.jsx
│   │   └── SectionWrapper.jsx
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Tools.jsx
│   │   ├── Projects.jsx
│   │   ├── Experience.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── hooks/
│   │   └── useTheme.js
│   ├── styles/
│   │   └── globals.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Adding Your Profile Photo

Replace the "JLG" placeholder in `src/sections/Hero.jsx`:

```jsx
// Find this block and replace with <img>:
<div className="w-full h-full flex items-center justify-center ...">
  JLG
</div>

// Replace with:
<img src="/profile.jpg" alt="Jhon Lemon Galin" className="w-full h-full object-cover" />
```

Then place `profile.jpg` in the `/public/` folder.

## Adding Real Project Screenshots

Place images in `/public/projects/` and update `src/sections/Projects.jsx`:

```js
images: [
  '/projects/messenger/screenshot1.png',
  '/projects/messenger/screenshot2.png',
]
```

## Customization

- **Colors**: Edit `tailwind.config.js` → `theme.extend.colors`
- **Fonts**: Edit `index.html` Google Fonts link + `tailwind.config.js`
- **Content**: Edit individual section files in `src/sections/`
- **Animations**: Edit `src/styles/globals.css` keyframes
