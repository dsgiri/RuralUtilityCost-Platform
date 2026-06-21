# 💻 Coding Standards

These standards ensure that the Rural Utility Cost codebase remains clean, predictable, and easy to maintain by any engineer joining the project.

## 1. Core Technologies
* **Language:** TypeScript (Strict Mode)
* **Framework:** React 18+
* **Build Tool:** Vite
* **Styling:** Tailwind CSS

## 2. TypeScript & Type Safety
* **No `any`:** Avoid using `any`. Use `unknown` if the type is truly unknown, and narrow it down safely.
* **Type Extraction:** Define shared types and interfaces centrally (e.g., in `/src/types.ts` or co-located with their domain logic if specific to one module).
* **Return Types:** Explicitly define return types for complex functions and custom hooks to prevent implicit inference errors.
* **Avoid Enums via `const enum`:** Use standard `enum` declarations or union types (`type Status = 'idle' | 'success' | 'error'`).

## 3. React Components & Structure
* **Hybrid Folder Structure:** Use a flat structure for static pages/shell (`src/pages/*`), but use a dedicated folder structure (`src/features/FeatureName/*`) for complex calculators. The dedicated folder should house the main `.tsx` file, a `types.ts` file, any custom hooks (e.g. `usePainPoints.ts`), and a `usage-instructions.md` file.
* **Functional Components:** Always use functional components and React Hooks. Do not use Class components.
* **Naming:** 
  * Use **PascalCase** for component file names and component functions (e.g., `GenFuelCost.tsx`, `function GenFuelCost()`).
  * Use **camelCase** for variables, functions, and state hooks.
* **Simplicity First:** Keep components small, focused, and single-responsibility. Extracted logic should live in custom hooks in the feature folder.
* **Hooks:** Follow the Rules of Hooks. Stabilize dependencies in `useEffect` and `useCallback` to prevent infinite re-renders.

## 4. State & Logic Separation
* **Keep Math Pure:** Extract complex formula math from the JSX return block. Calculate constants and derived state above the `return` statement.
* **Validation First:** Check inputs (`NaN`, negative numbers, bounds) before performing calculations.

## 5. Styling (Tailwind CSS)
* **Utility-First:** Use Tailwind CSS utility classes exclusively. Do not create custom CSS classes in `index.css` unless defining global theme variables (`@theme`).
* **Composition:** Use the `cn()` utility (clsx + tailwind-merge) for conditionally joining class names.
* **Readability:** Group utility classes logically (e.g., display/layout, sizing, typography, colors, interactions).

## 6. Commit & Merge Strategy
* **Atomicity:** Keep commits small and focused on a single feature, refactor, or bug fix.
* **Safety:** Ensure `npm run build` succeeds locally before merging any changes to the main branch.
