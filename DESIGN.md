---
name: NextDST 69
description: A clear curriculum explorer for incoming DST students.
colors:
  page: "#f7f7f5"
  panel: "#ffffff"
  panel-soft: "#eeeeeb"
  field: "#fbfbfa"
  text: "#151513"
  muted: "#6f6f68"
  line: "#e2e2dd"
  line-strong: "#c8c8bf"
  accent: "#256c5f"
  accent-soft: "#e1f0eb"
  skeleton: "#e4e4df"
  dark-page: "#11120f"
  dark-panel: "#181a16"
  dark-panel-soft: "#20231e"
  dark-field: "#141610"
  dark-text: "#f4f2ea"
  dark-muted: "#aaa79a"
  dark-line: "#2b2e27"
  dark-line-strong: "#45493f"
  dark-accent: "#8acbb9"
  dark-accent-soft: "#1e3a33"
  dark-skeleton: "#2d3029"
typography:
  display:
    fontFamily: "Bai Jamjuree, system-ui, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "0"
  headline:
    fontFamily: "Bai Jamjuree, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0"
  title:
    fontFamily: "Bai Jamjuree, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.55
    letterSpacing: "0"
  body:
    fontFamily: "Bai Jamjuree, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 2
    letterSpacing: "0"
  label:
    fontFamily: "Bai Jamjuree, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  section: "32px"
components:
  button-primary:
    backgroundColor: "{colors.text}"
    textColor: "{colors.page}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
    typography: "{typography.label}"
  button-secondary:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
    typography: "{typography.label}"
  input-default:
    backgroundColor: "{colors.field}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    height: "44px"
    typography: "{typography.label}"
  card-default:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: "16px"
  chip-neutral:
    backgroundColor: "{colors.panel-soft}"
    textColor: "{colors.muted}"
    rounded: "{rounded.md}"
    padding: "4px 10px"
  chip-accent:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.accent}"
    rounded: "{rounded.md}"
    padding: "4px 10px"
---

# Design System: NextDST 69

## 1. Overview

**Creative North Star: "The Clear Study Desk"**

NextDST 69 should feel like a prepared study desk for a new DST student: ordered, quiet, and immediately useful. The interface serves lookup and orientation, so the visual system stays restrained, uses a single Thai-ready sans family, and keeps every surface close to the student's next action.

The product rejects difficult UX, hidden navigation, dense PDF-like pages, unclear filters, and decorative dashboard behavior. Visual decisions must help a student choose a year, read the study plan, scan course groups, and recover from empty results without guessing.

**Key Characteristics:**
- Restrained neutral surfaces with one academic green accent.
- Thai-first typography using Bai Jamjuree at practical product UI sizes.
- Small-radius controls and cards that keep the interface compact.
- Borders and tonal layering carry structure before shadows.
- Motion is short and state-driven, never a page-load performance.

## 2. Colors

The palette is a quiet academic neutral system with a low-frequency green accent for focus, selected states, and source-linked actions.

### Primary
- **Registrar Green** (`accent`, `#256c5f`): Used for text links, focused controls, active track chips, and small confidence cues. Keep it rare so it remains a signal.
- **Pale Registrar Green** (`accent-soft`, `#e1f0eb`): Used behind accent chips, selections, and focus rings. It supports the primary accent without becoming decoration.

### Neutral
- **Desk Page** (`page`, `#f7f7f5`): Main canvas. It is near-white but not warm cream, keeping long curriculum screens calm.
- **White Panel** (`panel`, `#ffffff`): Cards, filters, navigation controls, and contained content surfaces.
- **Soft Panel** (`panel-soft`, `#eeeeeb`): Section bands, active nav states, summary values, and neutral chips.
- **Field Surface** (`field`, `#fbfbfa`): Input and select backgrounds.
- **Ink Text** (`text`, `#151513`): Main body, headings, selected states, primary buttons.
- **Quiet Text** (`muted`, `#6f6f68`): Secondary course details, helper text, labels, and inactive nav. Do not use below body contrast requirements.
- **Fine Line** (`line`, `#e2e2dd`): Default borders and dividers.
- **Strong Line** (`line-strong`, `#c8c8bf`): Dashed empty states, secondary button borders, and stronger boundaries.
- **Skeleton Fill** (`skeleton`, `#e4e4df`): Loading placeholders.

### Dark Neutral
- **Night Page** (`dark-page`, `#11120f`): Dark mode canvas.
- **Night Panel** (`dark-panel`, `#181a16`): Dark mode cards and controls.
- **Night Soft Panel** (`dark-panel-soft`, `#20231e`): Dark mode section bands and selected states.
- **Night Ink** (`dark-text`, `#f4f2ea`): Dark mode readable text.
- **Night Muted** (`dark-muted`, `#aaa79a`): Dark mode secondary text.
- **Night Registrar Green** (`dark-accent`, `#8acbb9`): Dark mode accent.

### Named Rules

**The One Accent Rule.** Use the green accent for current state, links, focus, and track information only. Do not add new hue families for course categories unless the data model requires it.

**The Neutral First Rule.** Structure the page with panel contrast, borders, spacing, and typography before reaching for saturated color.

## 3. Typography

**Display Font:** Bai Jamjuree (with system-ui fallback)
**Body Font:** Bai Jamjuree (with system-ui fallback)
**Label/Mono Font:** None

**Character:** The type system is Thai-first, compact, and academic without being stiff. One family is correct here because course names, labels, filters, numbers, and navigation all need to feel like one tool.

### Hierarchy
- **Display** (600, up to `3.75rem`, line-height 1.15): Page identity and year hero headings only. Keep letter spacing at `0`.
- **Headline** (600, `1.5rem`, line-height 1.25): Section headings such as course lists, summaries, and year selection.
- **Title** (600, `1.125rem`, line-height 1.55): Course card titles, accordion titles, and compact panel titles.
- **Body** (400, `1rem`, line-height 2): Hero explanations and longer Thai copy. Keep prose width around 65-75ch.
- **Label** (500-600, `0.75rem` to `0.875rem`, letter-spacing 0 or short uppercase only): Buttons, filters, nav, badges, and metadata.

### Named Rules

**The Thai Readability Rule.** Do not compress Thai line-height to match English UI density. Thai body and helper text need enough vertical air to scan.

**The Product Scale Rule.** Avoid oversized marketing type. This is a curriculum tool, so headings should be stable, readable, and task-sized.

## 4. Elevation

Depth is mostly tonal and structural: panel color, borders, and section bands define the hierarchy. Shadows are present but low-intensity and state-based. Resting cards use `shadow-sm`; hoverable year cards may lift to `shadow-md`; the mobile drawer uses `shadow-xl` because it must sit above the page.

### Shadow Vocabulary
- **Resting Surface** (`shadow-sm`): Cards, summaries, filters, accordions, metrics, and course cards at rest.
- **Interactive Lift** (`shadow-md`): Hover state for year cards only, paired with a tiny upward transform.
- **Overlay Drawer** (`shadow-xl`): Mobile sidebar panel over the dimmed page.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows appear only for interactive lift or overlay hierarchy.

**The No Ghost Card Rule.** Do not pair a decorative wide shadow with a 1px border. If a card needs structure, use the existing border and low shadow vocabulary.

## 5. Components

### Buttons

- **Shape:** Gently squared controls (`rounded-md`, 6px).
- **Primary:** Ink background (`text`) with page text (`page`), `12px 20px` padding, 600 label weight.
- **Secondary:** Transparent or panel background with a strong neutral border (`line-strong`) and ink text.
- **Hover / Focus:** Hover changes border or tonal background. Focus must use the accent border plus pale accent ring.
- **Mobile icon buttons:** Fixed `44px` square touch target with border and centered icon.

### Chips

- **Style:** Neutral chips use `panel-soft` with muted text. Accent chips use `accent-soft` with accent text.
- **State:** Chips communicate course group, year, term, and track. They are metadata, not primary actions.

### Cards / Containers

- **Corner Style:** Compact rounded cards (`rounded-lg`, 8px).
- **Background:** `panel` for contained content; `panel-soft` for nested neutral values and section bands.
- **Shadow Strategy:** `shadow-sm` at rest; `shadow-md` only on hoverable year cards.
- **Border:** Default border uses `line`; stronger or dashed borders use `line-strong`.
- **Internal Padding:** `16px` for dense cards, `20px` for summary and year cards, `32px` for empty states.

### Inputs / Fields

- **Style:** `44px` height, `rounded-md`, `field` background, `line` border, `12px` horizontal padding.
- **Focus:** Accent border and 2px pale accent ring. This is required for keyboard navigation.
- **Placeholder:** Use `muted` only when contrast remains readable.
- **Error / Disabled:** Not yet implemented. Add explicit error text and disabled opacity rules before adding form validation.

### Navigation

- **Desktop:** Sticky top bar, `64px` height, translucent page background via `color-mix`, bottom border, compact text links.
- **Mobile:** Fixed menu button opens a left sidebar. Overlay dims the page. Sidebar width is `286px` with an `84vw` cap.
- **Active State:** Active year links use `panel-soft` and ink text. Inactive links use muted text and tonal hover.

### Course Card

The course card is the signature content component. It must preserve the code badge, Thai title, optional English title, credit box, metadata chips, and optional note. Do not collapse these into a single paragraph; the hierarchy is how students scan.

### Loading And Empty States

Loading uses skeleton blocks, not a spinner. Empty results use a dashed border, centered explanation, and a recovery instruction. Keep this pattern because it teaches the filter system without modal interruption.

## 6. Do's and Don'ts

### Do:

- **Do** use `page`, `panel`, `panel-soft`, and `line` to create structure before adding color.
- **Do** keep the green accent rare and functional for focus, links, active states, and track chips.
- **Do** preserve Bai Jamjuree as the only family unless the curriculum source demands a distinct monospace code treatment.
- **Do** keep controls at least `44px` tall on touch surfaces.
- **Do** preserve visible focus states and reduced-motion alternatives for WCAG AA.
- **Do** keep course data scannable through code badges, titles, credits, and metadata chips.

### Don't:

- **Don't** create difficult UX, hidden navigation, dense PDF-like pages, unclear filters, or interfaces that make students guess where to start.
- **Don't** make the app feel like a generic marketing landing page or a decorative dashboard where visual style gets in the way of course lookup.
- **Don't** use gradient text, glass cards, side-stripe card borders, or decorative chart-like hero metrics.
- **Don't** add saturated category colors to every course group without a data reason.
- **Don't** use motion that does not explain state changes. Product motion must stay between 150ms and 250ms unless the mobile drawer needs a stronger physical transition.
- **Don't** hide the source document link or bury year navigation behind ambiguous labels.
