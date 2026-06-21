# 🏗️ Architecture Standards

The Rural Utility Cost platform is designed to be lightweight, fast, and scalable. This document outlines the architectural boundaries and tools.

## 1. System Topology
* **Client-Side SPA:** The application is a Single Page Application built with React and Vite.
* **Serverless Hosting:** Designed to run in stateless containers (Cloud Run) or standard static hosting environments.
* **Routing:** Client-side routing managed by `react-router-dom`. No server-side routing logic.

## 2. Directory Structure
* `/src/components`: UI primitives, layout wrappers, and shared interface elements.
* `/src/features`: Domain-specific modules representing individual calculators or complex features (e.g., Pain Point Priority, Grant Readiness). Each folder contains its own component, types, custom hooks, and usage instructions.
* `/src/pages`: Generic static routes and shell pages (e.g., Home, About, Privacy Policy).
* `/src/lib`: Helper functions, pure mathematical logic, and utilities (like the `cn` function).

## 3. State Management
* **Local State:** Use `useState` and `useReducer` for component-level state (e.g., calculator inputs).
* **Persistence:** Use the browser's `localStorage` for non-sensitive user preferences (e.g., recently visited calculators, accessibility toggles).
* **Global State:** Avoid complex state management libraries (Redux, MobX) unless the app introduces complex multi-step cross-page workflows. React Context is sufficient for theme or auth state.

## 4. API & External Services
* **First-Party Backend:** Currently, the app relies purely on client-side JS logic for mathematical calculations.
* **External APIs:** Any external service integrations (e.g., Web3Forms for contact) must be asynchronous and fail gracefully without crashing the UI.

## 5. Performance & Build
* **Bundling:** Vite handles bundling and chunk optimization.
* **Assets:** SVGs and Lucide React icons are preferred over heavy raster images.

## 6. Security Boundaries
* **No Secrets in Browser:** Never expose administrative API keys in client-side code.
* **Data Privacy:** Calculations are performed in the user's browser; no user input from calculators is transmitted to a database.
