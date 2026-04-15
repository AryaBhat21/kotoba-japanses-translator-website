# Design System Document: The Moonlit Scholar

## 1. Overview & Creative North Star
This design system is anchored by the Creative North Star: **"The Moonlit Scholar."** 

Unlike traditional "flat" or "card-heavy" dashboards, this system draws inspiration from Japanese editorial design and midnight aesthetics. It rejects the rigid, boxy constraints of standard UI in favor of atmospheric depth, intentional asymmetry, and a sense of "Ma" (negative space). We are not just building an interface; we are creating a digital sanctuary for language and thought. 

The experience must feel like a premium, lacquered surface illuminated by soft neon—magical, fluid, and profoundly calm. We move beyond templates by using overlapping layers, high-contrast typography scales, and a "glass-first" philosophy.

---

## 2. Colors & Surface Philosophy

The palette is a sophisticated interplay between deep, ink-like shadows and the ethereal glow of spring flora.

### The Material Tonal Palette
*   **Surface / Background:** `#131313` (The Foundation)
*   **Primary (Sakura):** `#fbb3c1` (Used for key actions and focal points)
*   **Secondary (Lavender):** `#c5c5d8` (Used for supportive interactive elements)
*   **Tertiary (Midnight):** `#c5c5d6` (Used for subtle accents and depth)
*   **Surface Containers:** Ranging from `lowest` (`#0e0e0e`) to `highest` (`#353534`) for layering.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section content. Traditional dividers are considered "visual noise." Boundaries must be defined through:
1.  **Tonal Transitions:** A `surface-container-low` element sitting on a `surface` background.
2.  **Negative Space:** Using the spacing scale to create groupings.
3.  **Glassmorphism:** Defining edges through backdrop-blur and slight opacity shifts.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of semi-transparent materials. 
*   **Base:** `surface` or `surface-dim`.
*   **Nesting:** Place `surface-container-low` for large content areas. Within those, use `surface-container-high` for interactive cards. This "stacking" creates natural depth without the clutter of lines.

### The "Glass & Gradient" Rule
For floating elements (modals, dropdowns, navigation bars), use Glassmorphism. Apply `surface-variant` at 40-60% opacity with a `20px` to `40px` backdrop-blur. 
*   **Signature Glow:** Main CTAs should utilize a subtle radial gradient transitioning from `primary` (#fbb3c1) to `primary-container` (#2d0612) to provide a "living" pulse to the button.

---

## 3. Typography: The Editorial Voice

We use a high-contrast typographic pairing to balance tradition with modernity.

*   **Display & Headlines (Noto Serif):** This font carries the "Scholarly" weight. It should feel authoritative and poetic. 
    *   *Style Note:* Apply a subtle `text-shadow: 0 0 12px rgba(251, 179, 193, 0.3)` to `display-lg` and `headline-lg` titles to mimic a soft neon glow.
*   **Body & Titles (Plus Jakarta Sans):** A modern, geometric sans-serif that ensures legibility during long reading sessions. Its high x-height provides a premium, "tech-forward" feel.

**Hierarchy as Identity:** 
Use `display-lg` (3.5rem) sparingly to create editorial "moments" on a page. Pair it immediately with `body-sm` (0.75rem) labels to create a sophisticated, intentional scale contrast that feels like a high-end magazine.

---

## 4. Elevation & Depth: Tonal Layering

We do not use standard Material Design drop shadows. We use **Atmospheric Depth.**

*   **The Layering Principle:** Depth is achieved by "stacking" the surface tiers. A card should never just be "on top"; it should feel like it is submerged or floating within the midnight blue atmosphere.
*   **Ambient Shadows:** If a floating effect is required (e.g., a vocabulary flip-card), use an extra-diffused shadow: `box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4)`. The shadow color should never be pure black; it should be a tinted version of the `tertiary_container`.
*   **The "Ghost Border" Fallback:** If accessibility requires a border, use the `outline-variant` token at **15% opacity**. It should be a whisper of a line, not a statement.

---

## 5. Components

### Glassmorphic Cards
*   **Structure:** No solid background. Use `surface-container-low` at 60% opacity.
*   **Blur:** `backdrop-filter: blur(12px)`.
*   **Interaction:** On hover, the opacity should shift to 80% with a subtle `primary` outer glow.

### Glowing Buttons
*   **Primary:** Background is `primary` (#fbb3c1), text is `on-primary` (#50212d). Use a `roundedness` of `1` for subtle rounding.
*   **The "Neon State":** On hover, add a `box-shadow` of `0 0 20px` using the `primary` color to create the "magical" glow.
*   **Secondary:** Ghost-style with `outline` token at 20% opacity and `secondary` text.

### Vocabulary Flip-Cards
*   **Front:** `surface-container-highest` with a `display-sm` Noto Serif character.
*   **Back:** `surface-container-lowest` with `body-md` definitions.
*   **Motion:** Use a 600ms "Spring" animation. The flip should feel heavy and tactile, like a thick cardstock.

### Politeness Sliders (Smooth Animated Sliders)
*   **Track:** `surface-variant`.
*   **Handle:** `primary` (#fbb3c1).
*   **Feedback:** As the user slides (e.g., adjusting "Politeness Level" in a language app), the background `surface-tint` should subtly shift in saturation to provide a fluid, emotional response.

### Inputs & Fields
*   **Field Style:** Forbid the "box" look. Use a `surface-container-lowest` background with a bottom-only "Ghost Border."
*   **Focus State:** The bottom border transforms into a `primary` glow, and the `label-sm` floats above with a `primary` color shift.

---

## 6. Do's and Don'ts

### Do:
*   **Do** embrace asymmetry. Center-aligning everything kills the premium editorial feel.
*   **Do** use `on-surface-variant` for secondary text to maintain a low-contrast, calm reading environment.
*   **Do** ensure all "glass" layers have sufficient backdrop-blur to maintain readability over background elements.

### Don't:
*   **Don't** use 100% opaque, high-contrast white borders.
*   **Don't** use standard "Material Blue" for links. Always use `secondary` (Lavender) or `primary` (Sakura).
*   **Don't** crowd the interface. If a screen feels "busy," use the `spacing` scale to increase white space between sections.
*   **Don't** use sharp corners. Always adhere to the `roundedness` scale, favoring subtle rounding for a softer, more "polite" aesthetic.