# Risk Management App

[![Deploy Risk Management Site](https://github.com/MunoMono/risk-management/actions/workflows/deploy.yml/badge.svg)](https://github.com/MunoMono/risk-management/actions/workflows/deploy.yml)

A live, interactive **Risk Management App** built with **React, Vite, and IBM Carbon Design System**.  
It provides a structured interface for tracking, filtering, and visualising **academic, practice, ethics, and well-being risks** in research projects.

👉 **Live site**: [https://munomono.github.io/risk-management/](https://munomono.github.io/risk-management/)

---

## 📚 About

This repository publishes a **risk management web app** for PhD research at the **Royal College of Art (RCA)**.  
The app helps researchers, supervisors, and institutions systematically **identify, track, and manage risks** that may affect the research journey.

- **Framework**: React 19 + Vite 7  
- **UI**: IBM Carbon Design System (`@carbon/react`, `@carbon/styles`)  
- **Features**:
  - Carbon-styled **Header** with theme toggle (light/dark)
  - Navigation across **Home, Risks, and About** pages
  - Risk Register sourced from JSON (`risk_register.json`)
  - Carbon **DataTable** with search, multi-select filters, and keyword highlighting
  - Fully responsive layout (Carbon grid system)
  - Deployed to GitHub Pages

---

## 🚀 Usage

- **View online**:  
  [https://munomono.github.io/risk-management/](https://munomono.github.io/risk-management/)

- **Run locally**:

```bash
git clone https://github.com/MunoMono/risk-management.git
cd risk-management
npm install
npm run dev
```

- **Build for production**:

```bash
npm run build
npm run preview
```

- **Deploy to GitHub Pages**:

```bash
npm run deploy
```

Deployment is automated via GitHub Actions → GitHub Pages.

---

## 🧩 Features

- **Home page**  
  Introductory overview with markdown-rendered content and Carbon layout.

- **Risk Register**  
  - Carbon **DataTable** displaying risk data from JSON.  
  - Search bar with **keyword highlighting**.  
  - Inline filters for Category, Likelihood, Impact, Response Strategy.  
  - Responsive UI for desktop + mobile.

- **Theming**  
  - Dark/Light mode toggle (Carbon g90 and g10 themes).  
  - Custom SCSS overrides for full dark background experience.

- **Navigation**  
  Carbon Header with accessible navigation and mobile-friendly menu.

---

## 🛠 Development

Key source files:

- `src/App.jsx` — Core app wrapper with routing + theme.  
- `src/components/HeaderBar.jsx` — Carbon Header with theme toggle + nav.  
- `src/pages/Home.jsx` — Landing page with markdown + Carbon Grid.  
- `src/pages/Risks.jsx` — Risk register with search, filters, and table.  
- `src/styles/` — SCSS files for Carbon overrides and custom styles.  

Run locally with:

```bash
npm run dev
```

---

## 🔖 License

MIT License — see the [LICENSE](LICENSE) file for details.
