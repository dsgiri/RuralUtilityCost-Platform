# RuralUtilityCost.com

![RuralUtilityCost.com](public/icon.png)

A comprehensive suite of interactive rural calculators designed to help farmers, ranchers, homesteaders, and rural property owners make better, data-driven decisions quickly. 

## 🎯 Mission
Our goal is to provide clear math, immediate feedback, and transparent assumptions for rural living costs. From understanding the true cost of off-grid solar to calculating the long-term math between drilling a well and hauling water, we turn complex agricultural and infrastructure formulas into simple, actionable insights.

## 🛠 Tech Stack
* **Framework:** React 18 + TypeScript + Vite
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **Content Management:** Sanity.io (for articles and guides)
* **Routing:** React Router v6

## 🏗 Architecture
The project follows a **Feature-based architecture** to keep the codebase modular, testable, and strictly organized:

```text
/
├── docs/                   # Documentation, Calculator Registry & Standards
├── scripts/                # Utility scripts (e.g., Sanity seeding)
├── src/
│   ├── components/         # Shared global UI components (Buttons, Layout, SEO)
│   ├── features/           # Feature-specific logic (e.g., individual calculators, articles)
│   ├── lib/                # Third-party integrations (Sanity config, analytics)
│   ├── pages/              # Top-level Page components connecting features together
│   └── types.ts            # Global TypeScript types
└── README.md
```

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   Copy `.env.example` to `.env` and fill in your Sanity configuration:
   ```env
   VITE_SANITY_PROJECT_ID="8nl8fyiq"
   VITE_SANITY_DATASET="production"
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```

4. **Populate Content (Optional)**
   If you need to seed initial articles into the Sanity CMS:
   ```bash
   # Make sure you have SANITY_API_TOKEN set in your environment
   npx tsx scripts/seed-sanity.ts
   ```

## 📐 Calculator Standards
We enforce a strict standard for all calculators added to the platform:
1. **Clarity over cleverness.**
2. **Simple inputs, meaningful outputs.**
3. **Visual feedback** when it helps understanding (progress bars, charts).
4. **Trustworthy math** that users can verify.

*Before adding a new calculator, please consult `AGENTS.md`, `docs/CALCULATOR_REGISTRY.md` and `docs/Calculator-Standard.md` to ensure fitment and prevent duplication.*

## 🔗 Open Source & Repository
This is a **public GitHub repository**. The project is managed at [dsgiri/ruralutilitycost-platform](https://github.com/dsgiri/ruralutilitycost-platform). The domain name for the live application is **RuralUtilityCost.com**.

**CRITICAL SECURITY RULE:** Since this is a public repository, you must **never**, under any circumstances, push, commit, or release any API keys, tokens, or secrets to GitHub. All sensitive keys must remain in your local `.env` file and be securely managed in deployment environments.

## 📝 License
Proprietary / All Rights Reserved.
