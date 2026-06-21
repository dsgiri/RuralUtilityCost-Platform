# 🎨 UI / UX Standards

Our goal is to build an interface that feels like a dependable tool, not a flashy consumer marketing site. It should optimize for clarity, trust, and practical utility.

## 1. Visual Tone & Identity
* **Theme:** Clean, Modern, Professional, Practical.
* **Colors:** 
  * Primary brand: Deep Green (`#1a5f3f`) and its varying opacity variants for branding and success states.
  * Categories have specific semantic colors (e.g., Blue/Sky for Runtime, Orange for Fuel, Indigo for Loads) to aid fast visual scanning.
  * Neutral backgrounds: White (`#ffffff`) or light gray (`#f9fafb`) for main content.
* **Typography:** `system-ui, -apple-system, sans-serif`. Use font weight (bold, medium, regular) to establish clear hierarchy rather than varying font families.

## 2. Layout & Responsiveness
* **Mobile-First:** Design components to stack and read cleanly on narrow phone screens before optimizing for desktop grids. Touch targets must be generous (min 44px height).
* **Card Interfaces:** Encapsulate inputs and results in distinct, softly rounded cards (`rounded-xl` or `rounded-2xl`) with subtle shadows and borders.
* **Spacing:** Use generous padding (e.g., `p-6`, `gap-8`) to prevent cognitive overload. Give elements room to breathe.

## 3. Calculators & Forms
* **Input Clarity:** Label every input clearly. Provide helping text or placeholders if a field uses specific units (e.g., "kW", "Gallons").
* **Sensible Defaults:** Pre-fill calculators with realistic average numbers (e.g., Generator Size: 10kW) so users see immediate mathematical output on page load.
* **Immediate Feedback:** Calculators should update their results instantly as the user types. Do not use "Calculate" submit buttons unless making external API calls.
* **Graceful Validation:** Prevent negative numbers, divide-by-zero, or nonsensical inputs gracefully. Show a helpful error note inline instead of crashing.

## 4. Accessibility (A11y)
* **Contrast:** Ensure all text passes WCAG contrast ratios against its background.
* **Keyboard Navigation:** All interactive elements (`<button>`, `<a>`, `<input>`) must be easily reachable via Tab and have visible focus rings (`focus-visible:ring-2`).
* **Screen Readers:** Use semantic HTML (`<main>`, `<h2>`, `<label>`) and explicitly link labels to inputs via `htmlFor`. Provide `aria-label` where visual text is absent (e.g., icon buttons).

## 5. Trust & Transparency
* **Expose Assumptions:** Every calculator must include an info box explaining its baseline assumptions (e.g., "Auto-estimated burn rates assume a 20% baseline idle draw").
* **Clear Language:** Say "Estimated Runtime" instead of "Guaranteed Runtime". Avoid over-promising absolute precision when physics/weather variable exist.
