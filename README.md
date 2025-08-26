# Loritem Analytics — React + TailwindCSS Dashboard

This project implements a functional, styled **React + Vite dashboard** using **TailwindCSS** with:
- Responsive **sidebar**, **top bar**, **stats cards**, **data table** (≥5 columns), and a **Recharts** line chart.
- **Dark mode** (class-based) with **localStorage** persistence.
- **Search** (in top bar), **sorting**, and **pagination** in the table.
- Clear **branding hooks** to quickly adapt colors, typography, and logo.

## Quick Start
```bash
# 1) Install
npm install

# 2) Run
npm run dev
```

> If you prefer to initialize with Vite from scratch:
```bash
npm create vite@latest my-dashboard -- --template react
cd my-dashboard
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
# Copy / configure files from this project to match the structure
```

## Where to Customize (BRANDING)
- `tailwind.config.js`: `colors.brand.*` tokens (primary/accent/muted)
- `index.html`: app `<title>` and the **Inter** font
- `public/logo.svg`: replace with your brand mark
- `src/components/Sidebar.jsx`: app name text
- `src/styles/tailwind.css`: base font-family or global tweaks

## Features
- **Sidebar** collapses on mobile; overlay click to dismiss.
- **Topbar** with search, dark-mode toggle, and avatar placeholder.
- **Stats Cards** show value + trend badge.
- **Data Table** with search (from topbar), sort, pagination, and status pills.
- **Chart**: Weekly sales line chart via `recharts`.

## Extending
- Replace `src/data/mockData.js` with API fetch logic.
- Add routes (React Router) if needed.
- Add authentication guards.

## Accessibility
- Semantic regions (`nav`, `header`, `main`, `section`, `table`), focus styles, and high-contrast dark mode.
