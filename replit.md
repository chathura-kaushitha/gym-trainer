# Gym Trainer App

## Overview
A React-based gym trainer application built with Vite, featuring workout tracking, progress monitoring, and fitness coaching features.

## Tech Stack
- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with PostCSS/Autoprefixer
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization
- **Backend Services**: Firebase

## Project Structure
```
├── src/
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # React entry point
│   ├── index.css         # Global styles (Tailwind)
│   ├── firebase.js       # Firebase configuration
│   ├── components/       # Reusable UI components
│   ├── data/             # Constants and mock data
│   └── pages/            # Page components
├── index.html            # HTML entry point
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS config
└── postcss.config.js     # PostCSS config
```

## Development
- **Dev Server**: `npm run dev` (runs on port 5000)
- **Build**: `npm run build` (outputs to `dist/`)
- **Preview**: `npm run preview`

## Deployment
Configured for static deployment with built files served from the `dist` directory.
