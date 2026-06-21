# Data Models & Schema

## CMS Schemas (Sanity.io)
- **Article (`post`)**: Title, Slug, Author, MainImage, Categories, PublishedAt, Body, Excerpt.
- **Author (`author`)**: Name, Image.
- **Category (`category`)**: Title, Description.

## Local State Models
- **Calculator Inputs**: Type-safe interfaces per calculator (e.g., `WellCalculatorInputs`).
- **Calculator Outputs**: Deterministic result objects mapped to UI visualizers.

## Future Database Models
- **User Profiles**: For saved calculation histories.
- **Saved Scenarios**: Stored JSON snapshots of calculator states.
