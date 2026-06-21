# System Design

RuralUtilityCost.com is designed to be a fast, informative, and mathematically robust web application. This document outlines the holistic system design and data flow.

## 1. System Components

The system is composed of two primary environments:
1. **The Web Client:** The React SPA compiled by Vite, served to end-users.
2. **The Content System:** Sanity.io CMS providing dynamic articles and guides.

### The Web Client
- **Calculate Engine:** A library of isolated, pure JavaScript functions governing agricultural and infrastructure math.
- **UI Render Engine:** React components translating raw inputs into visualized financial scenarios. 

### The Content System (Sanity.io)
- **Studio:** (Optional local/hosted execution) for editors to write rich-text guides.
- **Content Delivery API:** Used by the client at runtime to fetch articles, author data, and category structures dynamically.

## 2. Application Flow

### Calculator Flow
1. **Input Collection:** User visits a calculator page (e.g., "Solar Cost Calculator"). The UI requests initial parameters.
2. **Local Evaluation:** As the user adjusts sliders or inputs, React state updates immediately.
3. **Pure Function Execution:** The state is passed into a stateless `calculator.ts` function.
4. **Data Visualization:** The results object is rendered into charts, progress bars, and cost breakdowns instantaneously.

### Article Content Flow
1. **Routing:** User navigates to `/articles`.
2. **Data Fetching:** Over the network, the app calls `getArticles()` utilizing `@sanity/client`. The GROQ query requests the specific fields needed (avoiding over-fetching).
3. **State Population:** React populates the payload into local state.
4. **Rendering:** The list is mapped out. Single articles use `<PortableText>` to safely render CMS-formatted blocks into accessible HTML tags.

## 3. Design Principles

- **Mobile-First UX:** Farmers and rural property owners frequently access tools from the field. Thumb-friendly touch targets (min 44px) and responsive flex/grid layouts are mandatory.
- **Progressive Disclosure:** Complex calculators start with minimal required inputs. Advanced variables (e.g., specific soil types, exact loan APRs) are hidden under "Advanced Settings" toggles.
- **Graceful Degradation:** If the CMS API is unreachable, the application gracefully degrades by displaying sensible error messages without breaking the core calculator functionalities.
- **Architectural Honesty:** No mock loading bars or simulated processing times. Since calculations are O(1) synchronous math operations, feedback is instant.

## 4. Scalability

- **Feature Scaling:** The feature-based folder structure means adding the 50th calculator is just as easy as adding the 1st, without creating merge conflicts or massive shared files.
- **Content Scaling:** Migrating from static site content to Sanity.io unlocks unlimited article scalability and dynamic cross-referencing between guides and calculators.
