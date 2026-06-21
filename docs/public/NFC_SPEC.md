# NFC Implementation Spec

## Vision
Integrating physical rural assets with digital calculations using Near Field Communication (NFC) tags.

## Use Cases
- **Equipment Tags:** Tap an NFC sticker on a solar battery bank to instantly open the Solar Depreciation Calculator pre-filled with that specific battery capacity.
- **Well Heads:** Tap a tag on a well to view historical depth, flow rate, and future maintenance schedule recommendations.

## Technical Approach
- **Encoding:** NFC Data Exchange Format (NDEF) containing specific URLs with query parameters (e.g., `https://ruralutilitycost.com/calculators/solar?battery=10kwh&install_date=2020`).
- **Hardware Requirement:** Standard NTAG213/215 stickers, weatherproofed for outdoor agricultural deployment.
