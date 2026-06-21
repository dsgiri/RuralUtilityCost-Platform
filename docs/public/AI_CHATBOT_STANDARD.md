# AI Chatbot & Machine Readability Standard

To ensure that `RuralUtilityCost.com` functions flawlessly for both human users and AI agents (LLMs, Deep Research bots, search crawlers), every page and calculator must pass the following structural and semantic checks.

### 1. Clear Page Purpose (Semantic Headers)
- Every calculator must have a single `<h1>` tag at the top of the content area.
- Directly beneath the `<h1>`, include a one-to-two sentence `<p>` description that explicitly states what the page calculates and who it is for in plain language.
- Use structured `<h2>` and `<h3>` tags for logical sections (e.g., "Assumptions", "Results", "How It Works").

### 2. Answer-First Content
- Results must be prominent in the DOM. Do not bury the final numerical outputs deep within complex CSS grids without clear structural relationships.
- Use explicit labeling for results (e.g., "Total Estimated Cost", "Recommended Septic Size") rather than just rendering a large number without context.

### 3. Visible Assumptions & Context
- Any estimated output must explicitly state its units, defaults, and the core assumptions used in the math.
- For AI tools to cite us correctly, include a dedicated section (or `<aside>`) that lists the bounds of the calculator (e.g., "Assumes a 20% baseline idle draw").

### 4. Semantic HTML & Forms
- Always wrap calculator inputs in semantic layout blocks.
- Every `<input>`, `<select>`, and `<textarea>` must have a clearly associated `<label>`. Ensure units are explicitly mentioned in the label text (e.g., "Generator Size (kW)").
- Use `<main>` for the core application layout (already implemented in `Layout.tsx`), and `<article>` or `<section>` to group parts of complex calculators.

### 5. Rich Metadata (JSON-LD)
- All calculators must implement the `SEO` component and pass the `jsonLd` prop.
- The `jsonLd` payload must specify `@type: "WebApplication"` (or `"SoftwareApplication"`) and explicitly describe the `applicationCategory` and `description` to ensure crawlers understand the interactive nature of the page.

### 6. FAQ Blocks
- Append an FAQ (Frequently Asked Questions) section at the bottom of the page, addressing edge cases or common questions rural homeowners ask. This highly structured Q&A format is ideal for chatbots extracting answers directly.
- **Example:** "Why are my expenses going up with my revenue?"

### 7. Freshness & Consistency
- Use the exact same calculator name in the `<h1>`, `<SEO title="...">`, JSON-LD `"name"`, and side navigation. 
- Avoid technical jargon unless immediately defined adjacent to the input.

By adhering to these rules, `RuralUtilityCost.com` remains the most authoritative, machine-readable tool platform for rural utility planning.
