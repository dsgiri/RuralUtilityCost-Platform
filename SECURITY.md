# Security Policy

At RuralUtilityCost.com, we take the security of our users and our infrastructure seriously.

## 1. Data Privacy & Handling

- **Client-Side Compute By Default:** Most core features—especially the rural utility calculators—operate purely client-side. The math is executed within the user's browser, meaning sensitive financial or personal farm data inputted by the user is **never transmitted to or stored on our servers** unless explicitly stated otherwise via an opt-in save/export feature.
- **No Unsolicited Tracking:** We only use minimal analytics to improve the user experience.

## 2. API Keys and Secrets Management

- **Public Keys:** Environment variables prefixed with `VITE_` (e.g., `VITE_SANITY_PROJECT_ID`) are embedded into the client bundle. These are safe to expose and are strictly read-only configurations or public identifiers.
- **Private Secrets:** API Tokens involving write-access (e.g., `SANITY_API_TOKEN`) or backend database connections must **never** be prefixed with `VITE_` or committed to the repository. They are kept secure in deployment environments.

## 3. Dependency Security

- We utilize npm audit and maintain up-to-date dependencies.
- Third-party packages are vetted for security and community maintenance before integration into the `package.json`.

## 4. Content Security

- **CMS Integration (Sanity):** Content fetched from Sanity is typed and validated. When rendering rich text (via `@portabletext/react`), HTML is safely managed to prevent Cross-Site Scripting (XSS) attacks.

## 5. Reporting a Vulnerability

If you discover a security vulnerability within this project, please do not disclose it publicly. Instead, contact the development or support team directly so that we can implement a patch promptly.

*Note: As this application scales, this document will be updated to reflect incoming backend infrastructures, authentication flows, and expanded data layers.*
