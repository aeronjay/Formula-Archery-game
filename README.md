# Formula Archery - Dartboard Target Application

A React-based archery/dartboard target application with customizable settings and team scoring.

## Features

- **Interactive Dartboard**: Beautiful SVG-rendered dartboard with multiple rings and segments
- **Customizable Values**: Settings sidebar allows you to modify values for each ring section
- **Team Management**: Set custom team names and track scores
- **Modern UI**: Purple gradient background with glassmorphism effects
- **Responsive Design**: Works on desktop and mobile devices

## Color Scheme

- Background: Purple gradient (#667eea to #764ba2)
- Center (Bullseye): Red (#ff4757)
- Inner Ring: Blue (#4a5cff)
- Outer Ring: Dark navy (#2a2a4a)
- Text: White with shadow effects

## Components

- **Dartboard**: Main target with configurable ring values
- **Scoreboard**: Team names and placeholder scores display
- **Sidebar**: Settings panel for customizing values and team names

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5174/` (or the port shown in terminal)

## Usage

1. Click the **⚙️ settings icon** in the upper right corner to open the sidebar
2. Customize team names in the "Team Names" section
3. Modify the center bullseye value
4. Adjust inner ring values (4 segments)
5. Configure outer ring values (13 segments)
6. Changes are applied in real-time to the dartboard

## Technologies Used

- React
- Vite
- CSS with gradients and geometric shapes
- SVG for precise dartboard renderingte

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
