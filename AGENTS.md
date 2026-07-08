# AGENTS.md

## Purpose
This repository is for building niche digital tools and SEO landing pages for **SOLVE.RURALUTILITYCOST.COM**. 
The business focuses on underserved operational software and digital tools for farms, ranches, homesteads, and remote rural infrastructure.
Likely tools and pages include Water Check OS, Pump Trouble Logger, Remote Inspection Proof Tool, Freeze Event Planner, Fence Fault Tracker, and related SEO landing pages.

This file provides reusable, repo-level instructions to AI coding agents (e.g., Cursor, Claude Code, Codex, Cline, Windsurf, Augment). It acts as a strict operating manual to ensure agents work correctly inside the repo with minimal confusion.

## Project Priorities
1. Build useful narrow tools
2. Keep UX practical and mobile-friendly
3. Support SEO growth
4. Keep code simple and maintainable
5. Make pages conversion-oriented

*Note: Broad "platform" thinking should be avoided unless explicitly requested. This project prioritizes boring, underserved software opportunities over flashy ideas.*

## Agent Operating Rules
- Work in small, logical steps.
- Do not rewrite unrelated files.
- Preserve existing behavior unless intentionally changing it.
- Prefer editing existing files over creating duplicates.
- If blocked, leave a clear note and ask for clarification.
- Do not invent fake APIs or fake integrations.
- Do not add dependencies unless necessary. If adding a dependency, explain why.
- Avoid unnecessary abstractions.
- Keep implementation production-minded.
- Prefer semantic HTML, accessible UI, and clean structure.
- Do not use placeholder marketing fluff in product pages.
- Always make output specific to farms, ranches, and rural infrastructure when relevant.

## Product and UX Rules
- Each tool must solve one narrow painful workflow.
- Every page must explain the problem it solves in under 5 seconds.
- Mobile-first design is mandatory.
- Avoid generic startup language and vague marketing copy.
- Avoid purple/blue AI gradients, glassmorphism, and generic SaaS icon grids.
- Use practical, rugged, field-operations-style design.
- Copy must be plainspoken and outcome-driven.
- Structure pages around problems, workflows, trust, and CTA.
- Prefer pages that are easy to scan in the field with a strong visual hierarchy.
- Keep forms short and useful.
- Every tool page must include: definition, who it's for, what problem it solves, core features, and an FAQ structure.

## SEO and Content Rules
- One primary keyword theme per page.
- Exactly one `<h1>` tag per page.
- Use descriptive title tags and meta descriptions.
- Use internal links to related tool and guide pages.
- Add FAQ sections when relevant.
- Use natural-language headings.
- Write for real users first, search engines second.
- Avoid keyword stuffing.
- Favor problem-based search intent.
- Keep pages specific and topically focused.
- Use concise definitions, who-it's-for, what-it-solves, and FAQ blocks on tool pages.

## Code Style and Implementation Preferences
- Keep components small and readable.
- Use descriptive naming.
- Avoid magic constants.
- Prefer explicit logic over clever shortcuts.
- Keep CSS organized and reusable; do not over-nest styles.
- Avoid giant files when possible.
- Preserve accessibility.
- Minimize JavaScript where HTML/CSS is enough.
- Use comments only where they add real value.
- Prefer production-ready code over demo hacks.

## File and Folder Expectations
- Keep names descriptive and use `kebab-case` where appropriate for URLs and file names.
- Do not create duplicate versions of the same page or component.
- Prefer predictable file locations:
  - Landing pages and tool pages in the main `pages` or `features` directory.
  - Shared UI components in a centralized `components` folder.
  - Keep related logic, tests, and types close to the feature.

## Build Workflow
1. Understand the task.
2. Inspect existing files.
3. Reuse patterns already in repo.
4. Implement smallest correct change.
5. Review for UX, SEO, and accessibility.
6. Run tests/lint if available.
7. Summarize what changed.

## Testing and Validation
- Run tests if present.
- Run lint if present.
- Check mobile layout responsiveness.
- Check for obvious console errors.
- Validate heading hierarchy.
- Validate CTA visibility.
- Validate links and forms.
- Check that no placeholder text remains.
- Check accessibility basics.
- If validation commands are unknown, inspect package scripts first instead of inventing commands.

## Safety and Change Control

### Hard Stop Rules
- Never delete any file without explicit user approval.
- Never overwrite or replace an existing file wholesale without explicit user approval.
- Never rename or move files/folders without explicit user approval.
- Never perform destructive refactors without explicit user approval.
- Never remove "unused" code, files, styles, content, or assets unless the user explicitly asked for cleanup.
- Never rewrite large sections of a file if a targeted edit can solve the task.
- Never change deployment, environment, database, authentication, billing, analytics, SEO, or routing behavior without explicit approval if the task did not request it.
- Never update dependencies, lockfiles, package managers, build tooling, or config files unless the task requires it and the reason is explained.
- Never edit unrelated files while working on a focused request.
- No silent side effects. No stealth cleanup. No opportunistic refactors.
- Do not remove comments, docs, or content unless directly relevant to the task.
- Protect user-authored work by default.
- If the safest path is unclear, stop and ask for approval before proceeding.
- If a task may cause data loss, content loss, layout regression, or behavior regression, stop and ask first.
- If an existing implementation looks wrong but is outside the requested scope, do not silently "fix" it. Leave a note instead.

### Approval Required Before Proceeding
Do not proceed without explicit user consent for any of the following:
- deleting files
- overwriting files
- replacing page copy
- moving folders
- renaming files
- broad refactors
- dependency updates
- config changes
- schema/data changes
- auth changes
- analytics/SEO changes
- deployment changes

### Safe Editing Rules
- Make the smallest correct change.
- Preserve user work.
- Edit in place when possible.
- Avoid unrelated edits.
- Leave notes instead of fixing out-of-scope issues.
- Create backups before risky replacement.
- Prefer reversible changes.
- Preserve existing copy, assets, and structure unless the task explicitly calls for replacement.
- Prefer additive changes over destructive changes.
- If replacing a file is truly necessary, create a backup copy first unless the user explicitly says not to.
- If touching a sensitive file, minimize edits and preserve formatting where possible.

### Change Summary Rules
Before making risky changes, summarize:
- state which files it plans to touch
- state whether any existing content will be replaced
- state what risks exist before making risky changes
- state whether approval is needed

## Prompting and Collaboration Rules
- Expect detailed prompts and follow structured instructions carefully.
- Return organized summaries of work completed.
- State assumptions when forced to make them.
- Do not ask unnecessary clarifying questions if the task is actionable with reasonable defaults.
- Break work into sections and maintain clean implementation logic.

## Definition of Done
- Task goal met.
- No broken layout.
- No obvious placeholder copy.
- Mobile-friendly.
- Accessible basics covered.
- SEO basics covered if page content changed.
- No unrelated regressions introduced.
- Code is readable and maintainable.
- Summary of changes is ready.

## Optional Nested AGENTS.md Guidance
If the repository grows, nested `AGENTS.md` files may be added in subfolders for specific domain rules. The nearest `AGENTS.md` file should take precedence for subprojects.
