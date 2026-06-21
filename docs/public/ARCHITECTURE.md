# Architecture

RuralUtilityCost.com is architected to be a lightweight, highly responsive, and maintainable web application focused on delivering fast, client-side calculations and reading experiences.

## High-Level Architecture

The platform operates primarily as a Single Page Application (SPA). 

- **Client Layer**: React 18 application handling the UI, routing, and calculator logic.
- **Content Layer**: Sanity.io Headless CMS delivering article and guide data via an API.
- **Build & Serve Layer**: Bundled via Vite, ready to be served by Node.js or static web hosts.

## Core Technology Stack

- **UI Framework:** React 18
- **Language:** TypeScript (Strict Mode)
- **Build Tool:** Vite
- **Styling Pipeline:** Tailwind CSS
- **Routing:** React Router v6
- **CMS Integration:** Sanity Client (`@sanity/client`)
- **Icons:** Lucide React

## Directory Structure & Modularity

The application enforces a **Feature-Based Architecture**. Rather than grouping files by technical type (e.g., all components together, all hooks together), we group them by the business feature they belong to.

```text
/
├── docs/                   
│   ├── public/             # Architecture, Coding Standards, Calculator Registry
│   └── internal/           # Private business logic, PRDs, SEO, Backlogs
├── scripts/                # Build and maintenance scripts (e.g., CMS seeding, sitemaps)
├── src/
│   ├── components/         # Shared, generic UI components (Layout, SEO, Buttons)
│   ├── features/           # Feature domains (Core domain logic)
│   │   ├── api/            # API domain (if applicable)
│   │   ├── articles/       # CMS integration, article types, and Article UI
│   │   └── calculators/    # Specific calculator implementations
│   ├── lib/                # Third-party wrappers (Sanity client configuration, utility functions)
│   ├── pages/              # Top-level route components bundling features together
│   ├── App.tsx             # Route declarations and root providers
│   └── main.tsx            # Application entry point
```

## Calculator Architecture

Calculators are the core of the application. To ensure mathematical accuracy and UI flexibility, every calculator follows a strict separation of concerns:

1. **Pure Data Types (`types.ts`)**: Defines the exact input and output interfaces.
2. **Pure Math Logic (`calculator.ts`)**: Framework-agnostic functions that take inputs and yield outputs. These must be heavily unit-testable without any UI baggage.
3. **UI Components (`<CalculatorName>.tsx`)**: React components that bridge user input to state, pass state to the pure math functions, and display the formatted results.

## State Management

Given the isolated nature of the calculators, global state management (like Redux) is deliberately avoided.
- **Local State (`useState`, `useReducer`)**: Used for individual calculator forms.
- **Prop Drilling / Component Composition**: Used to pass data down locally.
- **URL State**: For shareable calculator states, parameters can be serialized into the URL (if needed in the future).

## Styling Strategy

- Utility-first CSS using **Tailwind CSS**.
- Avoids custom CSS files. Global themes and color variables are strictly defined in Tailwind config/globals.
- UI elements must maintain a "Technical Dashboard" aesthetic: accessible, high-contrast, clean typography (sans-serif), and clear interactive states.
