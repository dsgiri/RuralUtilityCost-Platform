# RuralUtilityCost.com Calculator Standard

## 1. Purpose
RuralUtilityCost.com is a practical rural planning toolkit. The purpose of this platform is to provide calculators and tools for rural living, land development, homestead planning, utilities, farms, livestock, generator backup, habitat support, and related community-driven needs.

This platform helps users estimate costs, estimate yields, evaluate runtime or fuel use, compare scenarios, prioritize pain points, and make better, data-driven rural decisions. This standard prevents random, low-value, or confusing tools from degrading the quality and focus of the site.

## 2. Site Scope
**What belongs on the site:**
- Property and construction cost calculators
- Rural utility calculators
- Farm and livestock calculators
- Generator and fuel tools
- Beekeeping tools
- Meat processing tools
- Habitat and community tools
- Pain point prioritization tools
- Grant and project planning tools
- Maintenance and backup planning tools

**What does NOT belong on the site:**
- Unrelated entertainment calculators
- Highly academic or research-only models
- Overly speculative or abstract tools
- Tools with no clear rural user benefit
- Tools that cannot be explained in plain, non-academic language
- Tools that require hidden proprietary datasets to be useful

## 3. Calculator Fitment Criteria
A calculator belongs on the site if it meets most of these criteria:
- It solves a real rural or homestead problem.
- It helps users save money, time, or uncertainty.
- It produces a decision-support result, not just trivia.
- It can be described clearly in one plain sentence.
- It has straightforward, accessible inputs.
- It can be calculated with transparent logic.
- It helps users compare options, plan, budget, or prioritize.
- It is highly useful to landowners, homesteaders, farmers, small rural businesses, or habitat-minded users.
- It can fit cleanly into a card-based calculator page.

**Rejection Criteria:**
Do not build the calculator if:
- The value proposition is unclear.
- The user has to understand specialized jargon before using it.
- The result is too uncertain to be credible.
- It depends heavily on data the site cannot reasonably provide.
- It feels like a random idea rather than a real, demonstrated rural need.

## 4. Calculator Categories
Calculators should cleanly align with one of the primary rural pillars. Each category serves specific pain points:
- **Property:** Solves land valuation, soil readiness, structural prep, and fencing uncertainty.
- **Utilities:** Solves grid-independence, heating fuel logistics, and bulk water supply planning.
- **Farm / Animal:** Solves herd planning, feed costs, water needs, and gestation tracking.
- **Beekeeping:** Solves hive startup costs, syrup mixing, and honey yield projections.
- **Meat Processing:** Solves butcher fee confusion, hanging weight math, and break-even pricing.
- **Generator / Backup Power:** Solves outage planning, critical load matching, and fuel storage duration.
- **Habitat:** Solves conservation planning, seed density, and pollinator budgeting.
- **Grants:** Solves USDA/State funding confusion and eligibility filtering.
- **Business:** Solves operational margin improvement and compliance readiness.
- **Prioritization:** Helps land managers rank pressing rural issues against budget and risk.

## 5. Priority Scoring
To decide whether a calculator should be built next, use the following framework. A calculator must score highly on functionality and pain relief to be built.

**Score Dimensions (High / Medium / Low):**
- **User Pain Level:** How painful/expensive is the problem this solves?
- **Frequency of Use:** Is this checked daily, seasonally, or once a decade?
- **Rural Relevance:** Is this unequivocally a rural/homestead issue?
- **Ease of Explanation:** Can the user understand the tool in 5 seconds?
- **Implementation Complexity:** Can this be built safely with transparent math?

**Prioritization Rule:**
A calculator should be prioritized immediately if it addresses **high pain**, provides **high usefulness**, is **easy to explain**, and is **reasonably simple to implement**. 

*(Note: The Pain Point Prioritization calculator itself is a high-priority tool, as it actively helps users organize these very problems.)*

## 6. Input and Output Standards
**Inputs should be:**
- Short, obvious, and limited to the absolute minimum needed.
- Clearly labeled with their required units (e.g., "Gallons", "kW", "Acres").
- Safely validated (e.g., no negative acres, no zero-division).

**Outputs should be:**
- Highly readable and prominently displayed.
- Sensibly rounded (e.g., $1,250.50, not $1,250.50392).
- Accompanied by a short note explaining exacty what the result means.
- Easy to act on (e.g., "You need 3 truckloads", not just "Total volume: 45 cubic yards").

## 7. Assumption and Disclaimer Standards
All calculators that use estimates (which is most of them) **must** expose their assumptions.

If a calculator utilizes:
- An average yield
- A dressing percentage
- A fuel burn rate or efficiency baseline
- An estimated cost per pound
- Any user-selected default values

**The Standard:**
Estimates are fully allowed, but they *must* be clearly labeled, editable where useful, and explained in plain language directly in the UI. 
*Example:* "Results are estimates. Auto-estimated burn rates assume a 20% baseline idle draw plus linear fuel scaling with load."

## 8. Design Standards
The calculator UI should be:
- Simple, card-based, and mobile-friendly.
- Readable, low clutter, and highly trustworthy.
- Visually consistent with the platform's utility-focused brand.

**Required Page Elements:**
1. Title
2. Short, plain-language description
3. Inputs section
4. Main result block (prominent)
5. Assumption/Disclaimer note
6. Breakdown or calculation steps explanation
7. Reset button
8. *Optional:* Comparison or breakdown panels.

The design should never feel like a dense spreadsheet dump. Keep it calm and focused.

## 9. Export and Sharing Standards
High-value calculators should support Print, Download, and Share capabilities when they generate actionable artifacts, reports, or lists.

**Implementation Rules:**
- **Print:** Provide a clean summary view tailored for paper or PDF printing (using print media queries to hide UI clutter).
- **Download:** Generate a PDF when the result is a formatted report. Export to CSV when the result contains itemized data, tables, or lists.
- **Share:** Implement link-based sharing where the current input state is encoded securely in the URL, allowing users to send exact scenarios to partners or contractors.

**Constraints:**
- Do not force print/download/share buttons into tiny or trivial calculators if it adds unnecessary UI clutter.
- If a calculator generates a list, checklist, or complex financial report, a user-friendly export path is required.

## 10. Usage Instructions & Help Text
Every calculator should include enough guidance to make it usable without guesswork, but instructions should be short, contextual, and proportionate to complexity.

**When to include instructions:**
- When the calculator uses unfamiliar terms or jargon.
- When there are multiple steps or phases.
- When the math relies on background assumptions.
- When ranking or scoring logic is applied.
- When the output can easily be misread or misused.
*(Skip heavy instructions for obvious, single-step utility tools).*

**Best Format (Layered Structure):**
- **Inline Help:** Short helper text (`<p className="text-sm text-gray-500">`) directly underneath confusing inputs.
- **"How it works" Block:** A brief explainer placed near the results or at the bottom.
- **Advanced Notes/Disclaimers:** Used to explain edge cases or complex formulas out of the main flow.

## 11. Trust and Reliability Standards
To maintain credibility as a rural toolset:
- **Transparent Formulas:** Users must understand how the math works.
- **Safe Error Messages:** Catch invalid inputs (e.g., letters in numeric fields) politely.
- **No Silent Failures:** If a state breaks, show an error state, do not just output `0` or `NaN`.
- **No Hidden Assumptions:** Expose the constants.
- **No Secret Exposure:** Never put API keys in client-side calculators.
- **Isolation:** A bug in the Septic calculator must not break the Generator calculator. Keep them independent.

If a calculator poses a high risk of leading to dangerous structural or financial decisions without proper regulatory context, it should not be shipped until a clear disclaimer strategy is approved.

## 12. Out-of-Scope Ideas
Do not add these to the site unless heavily justified and approved:
- Random novelty tools (e.g., "What farm animal are you?").
- Tools completely unrelated to rural utility, homesteading, or farm planning.
- Pure entertainment calculators.
- Highly speculative financial products (crypto, day-trading).
- Complex scientific models that lack end-user clarity.
- Tools that provide strict legal, structural engineering, or regulatory sign-off without professional verification disclaimers.

## 13. Review Checklist
Before approving or building a new calculator idea, the Vibe Coding Agent (and human reviewer) must verify:
- [ ] Does this solve a real rural problem?
- [ ] Can the user understand what it does in one sentence?
- [ ] Are the inputs simple and few in number?
- [ ] Are the outputs useful, readable, and actionable?
- [ ] Are all baseline assumptions visible?
- [ ] Is the resulting estimate trustworthy enough to be useful?
- [ ] Can the calculator fit cleanly into the site’s card-based design?
- [ ] Is the technical build effort reasonable?
- [ ] Will it actively help users prioritize an issue or save money?
- [ ] Does it match the brand's practical, trustworthy tone?

## 14. Example Calculator Categories
*(See the Unified Calculator Registry for the active system-of-record limit.)*
Examples of valid calculator additions:
- **Property:** Gravel tonnage, fill dirt volume.
- **Utilities:** Generator runtime, peak demand, off-grid solar.
- **Farm:** Meat yield, gestation timelines.
- **Community:** Prioritization matrix.

## 15. Future Expansion Rules
The standard explicitly encourages the site to grow into new necessary areas, including but not limited to:
- Expanded livestock management tools
- Advanced meat yield modeling
- Deep-dive generator and off-grid planning
- Beekeeping & apiary economics
- Habitat participation & cover cropping
- Grant planning & eligibility checks
- Maintenance scheduling
- Complex pain-point prioritization models

However, no matter the category, all future additions **must** pass the core fitment criteria, UX constraints, and assumption transparency rules outlined in this document.
