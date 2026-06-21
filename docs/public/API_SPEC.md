# API & Integrations Spec

## 1. Sanity.io CMS
- **Endpoint:** `https://[PROJECT_ID].api.sanity.io/v2024-03-20/data/query/[DATASET]`
- **Client**: `@sanity/client`
- **Queries**: GROQ syntax for fetching Articles, Authors, and Categories.

## 2. Google Analytics 4 (GA4)
- **Measurement ID:** Handled via `.env` (`VITE_GA_MEASUREMENT_ID`).
- **Events Tracked:** Page views, Calculator computations, outbound links.

## 3. Future Integrations
- USDA/Agricultural Data APIs (pricing indexes)
- Weather APIs (for water catchment calculators)
