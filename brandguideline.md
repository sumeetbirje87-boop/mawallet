# MaWallet — Brand Guidelines

**Version 1.0 · March 2026**
**Confidential — For Internal and Partner Use Only**

---

## Table of Contents

1. [Brand Overview](#1-brand-overview)
2. [Logo System](#2-logo-system)
3. [Logo Usage & Don'ts](#3-logo-usage--donts)
4. [Color System](#4-color-system)
5. [Typography](#5-typography)
6. [Iconography](#6-iconography)
7. [Spacing & Grid System](#7-spacing--grid-system)
8. [Buttons & Interactive Elements](#8-buttons--interactive-elements)
9. [Headers & Navigation](#9-headers--navigation)
10. [Cards, Containers & Surfaces](#10-cards-containers--surfaces)
11. [Charts & Data Visualization](#11-charts--data-visualization)
12. [Form Elements & Inputs](#12-form-elements--inputs)
13. [Feedback & Status Indicators](#13-feedback--status-indicators)
14. [Illustrations & Imagery](#14-illustrations--imagery)
15. [Brand Voice & Tone](#15-brand-voice--tone)
16. [Motion & Animation](#16-motion--animation)
17. [Dark Mode & Light Mode](#17-dark-mode--light-mode)
18. [Responsive Behavior](#18-responsive-behavior)
19. [Use Cases & Applications](#19-use-cases--applications)
20. [Do's and Don'ts — Quick Reference](#20-dos-and-donts--quick-reference)

---

## 1. Brand Overview

### 1.1 Brand Name

**MaWallet**

Pronounced: "Ma-Wallet" — a personal, possessive name that reinforces ownership. This is *your* wallet, *your* money, *your* control. The "Ma" prefix is warm and familiar, evoking the same comfort as "my" in multiple languages, while "Wallet" grounds the brand in its core purpose.

### 1.2 Brand Essence

> **"Your money, your clarity."**

MaWallet exists to replace financial anxiety with financial clarity. It is not a tool for accountants — it is a daily companion for real people who want to understand where their money goes and feel confident about their financial decisions.

### 1.3 Brand Personality

| Trait | Expression |
|-------|-----------|
| **Trustworthy** | Clean design, consistent behavior, secure feel. No gimmicks. |
| **Approachable** | Warm language, friendly illustrations, no jargon. |
| **Empowering** | Progress-oriented, celebrates wins, presents data as opportunity rather than judgment. |
| **Efficient** | Minimal steps, fast interactions, respects the user's time. |
| **Modern** | Contemporary aesthetics, smooth motion, feels current without chasing trends. |

### 1.4 Brand Promise

MaWallet makes personal finance management feel simple, satisfying, and private. Every design decision should answer: *Does this help the user feel more in control of their money?*

---

## 2. Logo System

### 2.1 Logo Mark (Symbol)

The MaWallet logo mark is a stylized wallet silhouette formed by two overlapping rounded rectangles (suggesting wallet folds), with a subtle upward-right arrow integrated into the negative space — symbolizing growth, progress, and the upward trajectory of financial health.

**Construction Details:**

```
┌─────────────────────────────────┐
│                                 │
│   ┌───────────────────┐        │
│   │                   │        │
│   │   ┌──────────────────┐     │
│   │   │                  │     │
│   │   │       ↗          │     │
│   │   │    (growth       │     │
│   │   │     arrow in     │     │
│   └───│     negative     │     │
│       │     space)       │     │
│       │                  │     │
│       └──────────────────┘     │
│                                 │
└─────────────────────────────────┘

Outer fold: Rounded rectangle, corner radius = 20% of height
Inner fold: Offset 15% right and 10% down, same proportions
Arrow: Formed by the gap between the two folds at upper-right
```

- Corner radius on both rectangles: `20%` of the mark's height.
- The two rectangles overlap by approximately `60%`.
- Stroke weight: `2px` at default 32px size, scales proportionally.
- Arrow angle: `45°` — pointing upper-right.
- Minimum clear space around the mark: equal to the height of the arrow element on all sides.

**Color of the Mark:**

- Primary: Emerald Green (`#10B981`) on light backgrounds.
- Inverted: White (`#FFFFFF`) on dark or colored backgrounds.
- Monochrome: Charcoal (`#1F2937`) for single-color print.

### 2.2 Wordmark

The word "MaWallet" is set in **Satoshi Bold** (or fallback: **DM Sans Bold**).

- "Ma" and "Wallet" are a single unbroken word. Never separate them.
- Letter-spacing: `-0.02em` (slightly tightened for cohesion).
- The "W" is capitalized. "Ma" is capitalized. The rest is lowercase: **MaWallet**.
- Color: Charcoal (`#111827`) on light backgrounds, White (`#F9FAFB`) on dark backgrounds.

### 2.3 Logo Lockups

The logo exists in four lockup configurations:

#### Lockup A: Horizontal (Primary)

```
[Mark]  MaWallet
```

- Mark sits to the left of the wordmark.
- Vertical center-aligned.
- Gap between mark and wordmark: `12px` at default size (scales proportionally).
- **Use for**: App header, website navbar, email signatures, horizontal banners.

#### Lockup B: Stacked (Secondary)

```
   [Mark]
  MaWallet
```

- Mark centered above the wordmark.
- Gap: `8px`.
- **Use for**: App splash screen, favicons at larger sizes, social media profile images, square placements.

#### Lockup C: Mark Only

```
[Mark]
```

- The symbol alone, without text.
- **Use for**: App icon, favicon (16px/32px), small UI placements, watermarks.

#### Lockup D: Wordmark Only

```
MaWallet
```

- Text alone, without the symbol.
- **Use for**: Text-heavy contexts, footer credits, legal documents, inline mentions.

### 2.4 Logo Sizing

| Context | Minimum Size | Recommended Size |
|---------|-------------|-----------------|
| App icon (favicon) | 16×16px (mark only) | 32×32px |
| Mobile app icon | 48×48px (mark only) | 1024×1024px (store asset) |
| App header / navbar | Mark: 28px height | Mark: 32px height |
| Website hero | Full lockup A: 40px mark height | 48px mark height |
| Print (business card) | 10mm mark height | 15mm mark height |
| Print (letterhead) | 12mm mark height | 18mm mark height |

**Absolute minimum mark size: 16×16px.** Below this, the arrow detail is lost — use a simplified single-rectangle mark at sizes under 16px.

### 2.5 Clear Space

Minimum clear space around any logo lockup equals the height of the logo mark (the "M-height" unit). No text, graphics, borders, or other elements may intrude into this zone.

```
          ← M →
     ┌─────────────┐
  M  │             │  M
  ↕  │  [Logo]     │  ↕
     │             │
     └─────────────┘
          ← M →
```

---

## 3. Logo Usage & Don'ts

### 3.1 Approved Usage

- Place on solid backgrounds (white, off-white, dark charcoal, emerald green, or brand-approved gradients).
- Scale proportionally — always constrain aspect ratio.
- Use the provided logo files (SVG, PNG at 1x, 2x, 3x).
- On photographs or textured backgrounds, ensure sufficient contrast. Use a semi-transparent white or dark overlay behind the logo if needed.

### 3.2 Logo Don'ts

**Never do any of the following:**

| # | Don't | Why |
|---|-------|-----|
| 1 | **Don't change the colors** of the logo to unapproved colors (e.g., red, purple, neon). | Breaks brand recognition. |
| 2 | **Don't rotate, skew, or flip** the logo. | Distorts the mark and weakens consistency. |
| 3 | **Don't stretch or compress** the logo non-proportionally. | Destroys the geometry of the wallet symbol. |
| 4 | **Don't add effects** — no drop shadows, glows, 3D bevels, gradients on the mark, or outlines. | The logo is designed to stand on its own. |
| 5 | **Don't place on busy or low-contrast backgrounds** without an overlay or container. | Logo must always be legible. |
| 6 | **Don't separate "Ma" and "Wallet"** into two lines, add spaces, or change capitalization (e.g., "MA WALLET", "ma wallet", "Ma Wallet"). | The name is one word: MaWallet. |
| 7 | **Don't use the logo smaller than the minimum size** (16px mark, 80px horizontal lockup). | Details become illegible. |
| 8 | **Don't surround the logo with a box or border** unless using an approved container (e.g., app icon rounding). | Adds visual clutter. |
| 9 | **Don't rearrange the lockup** (e.g., wordmark above the mark in horizontal layout). | Use only the four approved lockups. |
| 10 | **Don't place the logo too close to other logos, text, or edges.** | Respect the M-height clear space rule. |
| 11 | **Don't use an outdated version** of the logo. Always source from the official brand asset repository. | Ensures consistency across all touchpoints. |
| 12 | **Don't add a tagline directly attached to the logo.** Taglines go separately, below the clear space zone. | Keeps the logo clean. |
| 13 | **Don't animate the logo** in unauthorized ways (e.g., bouncing, spinning). Approved animations are specified in Section 16. | Maintains brand dignity. |

---

## 4. Color System

### 4.1 Design Philosophy

MaWallet's color system is built around **Emerald Green** as the primary brand color — representing growth, prosperity, and stability. A **Cool Slate** neutral palette provides structure, and semantic colors handle feedback states. The palette works across both light and dark modes with carefully tuned values for each.

### 4.2 Primary Color — Emerald

Emerald is the signature MaWallet color. It is used for primary actions, key metrics, income indicators, positive trends, and brand accents.

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--emerald-50` | `#ECFDF5` | `#022C22` | Tinted backgrounds, subtle highlights |
| `--emerald-100` | `#D1FAE5` | `#064E3B` | Hover states on tinted backgrounds |
| `--emerald-200` | `#A7F3D0` | `#065F46` | Borders, dividers on green elements |
| `--emerald-300` | `#6EE7B7` | `#047857` | Secondary green accents |
| `--emerald-400` | `#34D399` | `#059669` | Icons, badges, chart fills |
| `--emerald-500` | `#10B981` | `#10B981` | **Primary brand color** — buttons, links, key highlights |
| `--emerald-600` | `#059669` | `#34D399` | Primary button hover, active links |
| `--emerald-700` | `#047857` | `#6EE7B7` | Headings on green backgrounds |
| `--emerald-800` | `#065F46` | `#A7F3D0` | — |
| `--emerald-900` | `#064E3B` | `#D1FAE5` | — |
| `--emerald-950` | `#022C22` | `#ECFDF5` | — |

**Primary Action Color (buttons, CTAs):**
- Light Mode: `#10B981` (emerald-500) with hover `#059669` (emerald-600).
- Dark Mode: `#10B981` (emerald-500) with hover `#34D399` (emerald-400).

### 4.3 Secondary Color — Teal / Cyan

A cooler, blue-shifted green used for secondary actions, informational elements, transfers, and chart differentiation.

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--teal-50` | `#F0FDFA` | `#042F2E` | Info backgrounds |
| `--teal-100` | `#CCFBF1` | `#134E4A` | — |
| `--teal-200` | `#99F6E4` | `#115E59` | — |
| `--teal-300` | `#5EEAD4` | `#0D9488` | — |
| `--teal-400` | `#2DD4BF` | `#14B8A6` | Secondary icon color, transfer indicators |
| `--teal-500` | `#14B8A6` | `#2DD4BF` | **Secondary brand color** — secondary buttons, links |
| `--teal-600` | `#0D9488` | `#5EEAD4` | Secondary button hover |

### 4.4 Neutral Palette — Slate

The backbone of the UI. Used for text, backgrounds, borders, cards, and containers.

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--slate-50` | `#F8FAFC` | `#020617` | Page background (light), deepest dark |
| `--slate-100` | `#F1F5F9` | `#0F172A` | Card background (light), page bg (dark) |
| `--slate-200` | `#E2E8F0` | `#1E293B` | Borders (light), card bg (dark) |
| `--slate-300` | `#CBD5E1` | `#334155` | Disabled states, dividers |
| `--slate-400` | `#94A3B8` | `#475569` | Placeholder text, muted icons |
| `--slate-500` | `#64748B` | `#64748B` | Secondary text |
| `--slate-600` | `#475569` | `#94A3B8` | Body text (light mode) |
| `--slate-700` | `#334155` | `#CBD5E1` | Body text (dark mode) |
| `--slate-800` | `#1E293B` | `#E2E8F0` | Headings (light mode) |
| `--slate-900` | `#0F172A` | `#F1F5F9` | Strongest text (light), headings (dark) |
| `--slate-950` | `#020617` | `#F8FAFC` | — |

### 4.5 Semantic Colors

These colors are reserved for specific meanings. They should never be used decoratively.

#### Success (Income, Positive Trends, Goals Met)

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| `--success` | `#10B981` | `#34D399` |
| `--success-bg` | `#ECFDF5` | `#022C22` |
| `--success-border` | `#A7F3D0` | `#065F46` |

*Note: Success green is the same as the primary emerald. This is intentional — MaWallet's brand color is inherently "positive."*

#### Danger (Expenses, Overspending, Errors, Overdue)

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| `--danger` | `#EF4444` | `#F87171` |
| `--danger-bg` | `#FEF2F2` | `#450A0A` |
| `--danger-border` | `#FECACA` | `#7F1D1D` |

#### Warning (Budget Nearing Limit, Approaching Due Date)

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| `--warning` | `#F59E0B` | `#FBBF24` |
| `--warning-bg` | `#FFFBEB` | `#451A03` |
| `--warning-border` | `#FDE68A` | `#78350F` |

#### Info (Transfers, Informational Notices, Tips)

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| `--info` | `#3B82F6` | `#60A5FA` |
| `--info-bg` | `#EFF6FF` | `#172554` |
| `--info-border` | `#BFDBFE` | `#1E3A5F` |

### 4.6 Chart Palette

A curated sequence of 10 colors for use in charts, graphs, and data visualizations. Designed for maximum distinguishability, including for colorblind users (tested against deuteranopia, protanopia, and tritanopia).

| Index | Name | Hex | Usage Example |
|-------|------|-----|--------------|
| 1 | Emerald | `#10B981` | Income, savings, primary category |
| 2 | Blue | `#3B82F6` | Transfers, secondary data series |
| 3 | Amber | `#F59E0B` | Warnings, budget limits |
| 4 | Rose | `#F43F5E` | Expenses, overspending |
| 5 | Violet | `#8B5CF6` | Investments, goals |
| 6 | Cyan | `#06B6D4` | Utilities, recurring |
| 7 | Orange | `#F97316` | Food, dining |
| 8 | Pink | `#EC4899` | Shopping, personal |
| 9 | Lime | `#84CC16` | Transport, travel |
| 10 | Indigo | `#6366F1` | Education, subscriptions |

**Rules:**
- Always start with Emerald (index 1) for the primary data series.
- Use colors in order. Do not skip or randomize.
- For two-series charts (income vs. expense), use Emerald and Rose.
- Ensure each color is accompanied by a pattern (stripes, dots) in accessibility mode for colorblind support.

### 4.7 Gradient

MaWallet uses one signature gradient, sparingly, for hero sections, onboarding screens, and premium moments.

```css
/* Signature Gradient — Light Mode */
background: linear-gradient(135deg, #10B981 0%, #14B8A6 50%, #06B6D4 100%);

/* Signature Gradient — Dark Mode */
background: linear-gradient(135deg, #065F46 0%, #115E59 50%, #164E63 100%);
```

**Usage:** Onboarding hero, splash screen, celebration confetti background, marketing banners. Never apply to buttons, cards, or body text.

---

## 5. Typography

### 5.1 Typeface Selection

#### Primary Typeface: **Satoshi**

- **Source**: Free, from Fontshare by Indian Type Foundry.
- **Weights Used**: Regular (400), Medium (500), Bold (700), Black (900).
- **Usage**: All UI text — headings, body copy, labels, buttons, numbers.
- **Why Satoshi**: Geometric sans-serif with warmth. Highly legible at small sizes, distinctive at large sizes. Excellent number forms for financial data — tabular, even-width numerals.

#### Secondary / Monospace Typeface: **JetBrains Mono**

- **Weights**: Regular (400), Medium (500).
- **Usage**: Monetary amounts on dashboards, transaction amounts, account balances, OTP inputs, code/data references.
- **Why**: Even-width (tabular) numerals ensure columns of financial figures align perfectly. Clean and modern.

#### Fallback Stack

```css
/* Primary */
font-family: 'Satoshi', 'DM Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Monospace / Financial Figures */
font-family: 'JetBrains Mono', 'SF Mono', 'Fira Code', 'Cascadia Mono', monospace;
```

### 5.2 Type Scale

The type scale follows a **1.250 (Major Third)** ratio, optimized for both readability and information density in a financial dashboard context.

| Token | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `--text-xs` | 11px / 0.6875rem | 16px (1.45) | 400 | Fine print, timestamps, helper text |
| `--text-sm` | 13px / 0.8125rem | 20px (1.54) | 400 | Labels, captions, secondary info |
| `--text-base` | 15px / 0.9375rem | 24px (1.6) | 400 | Body text, descriptions, table cells |
| `--text-md` | 17px / 1.0625rem | 26px (1.53) | 500 | Emphasized body, card titles |
| `--text-lg` | 20px / 1.25rem | 28px (1.4) | 600 | Section headings, modal titles |
| `--text-xl` | 24px / 1.5rem | 32px (1.33) | 700 | Page sub-headings |
| `--text-2xl` | 30px / 1.875rem | 38px (1.27) | 700 | Page titles |
| `--text-3xl` | 36px / 2.25rem | 44px (1.22) | 700 | Dashboard hero numbers |
| `--text-4xl` | 48px / 3rem | 56px (1.17) | 900 | Marketing hero, splash screen |

### 5.3 Financial Figures

All monetary amounts displayed as the primary value on dashboards, cards, and summaries use the monospace typeface for alignment and prominence.

```css
.amount {
  font-family: 'JetBrains Mono', monospace;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
}

.amount-income { color: var(--success); }
.amount-expense { color: var(--danger); }
.amount-transfer { color: var(--info); }
.amount-neutral { color: var(--slate-900); }
```

### 5.4 Typography Rules

- **Headings**: Satoshi Bold (700) or Black (900) for hero text. Sentence case — never ALL CAPS for headings.
- **Body**: Satoshi Regular (400). Maximum line width: `65ch` (~600px) for readability.
- **Labels**: Satoshi Medium (500), `--text-sm`, `--slate-500`. Uppercase tracking (`letter-spacing: 0.05em`) only for small overline labels (e.g., above a card metric).
- **Links**: Emerald-500, underline on hover. No underline by default within the app (underline by default in marketing/external content).
- **Numbers**: Always use `font-variant-numeric: tabular-nums` in tables and aligned contexts.
- **No Orphans**: In marketing copy and long paragraphs, avoid single words on the last line (use `text-wrap: balance` where supported).

---

## 6. Iconography

### 6.1 Icon Library

MaWallet uses **Lucide Icons** as the primary icon set.

- **Style**: Outlined, 1.5px stroke, rounded caps and joins.
- **Default Size**: 20×20px for inline UI, 24×24px for navigation and action buttons, 16×16px for compact/table contexts.
- **Color**: Inherits text color by default (`currentColor`). Category icons use their assigned category color.

### 6.2 Category Icons

Each financial category has a dedicated icon + color pairing (see Appendix A of the System Instructions). Category icons are displayed in a circular colored container:

```
┌──────┐
│  🍽️  │   Category: Food & Dining
│      │   Background: #FF5722 at 12% opacity (light) / 20% opacity (dark)
└──────┘   Icon color: #FF5722
           Container: 36px diameter, border-radius: 50%
```

### 6.3 Icon Rules

- Icons are always paired with a text label in navigation, buttons, and menus. Icon-only buttons are allowed only for well-established actions (edit pencil, delete trash, close X) and must have an `aria-label`.
- Never use icons decoratively without semantic purpose.
- Maintain consistent sizing within a context — do not mix 20px and 24px icons in the same toolbar.

---

## 7. Spacing & Grid System

### 7.1 Base Unit

MaWallet uses a **4px base unit**. All spacing values are multiples of 4.

| Token | Value | Common Usage |
|-------|-------|-------------|
| `--space-0.5` | 2px | Micro-adjustments (icon-to-text nudge) |
| `--space-1` | 4px | Tight inner padding (tags, tiny badges) |
| `--space-1.5` | 6px | Compact element gaps |
| `--space-2` | 8px | Default inner padding for small elements |
| `--space-3` | 12px | Icon-to-label gap, list item inner padding |
| `--space-4` | 16px | **Standard padding** — cards, modals, containers |
| `--space-5` | 20px | Section inner padding |
| `--space-6` | 24px | Gap between related groups |
| `--space-8` | 32px | Gap between distinct sections |
| `--space-10` | 40px | Large section padding |
| `--space-12` | 48px | Page top padding |
| `--space-16` | 64px | Section separators on marketing pages |
| `--space-20` | 80px | Hero section padding |
| `--space-24` | 96px | Maximum spacing (marketing hero top/bottom) |

### 7.2 Layout Grid

#### Desktop (>1024px)

- **Content max-width**: `1280px`, centered.
- **Sidebar width**: `256px` (expanded), `72px` (collapsed/icon-only).
- **Main content**: Fills remaining width.
- **Column grid**: 12-column grid within main content, `24px` gutter.
- **Dashboard cards**: Typically span 3, 4, or 6 columns.

#### Tablet (640–1024px)

- Sidebar collapses to icon-only (`72px`) or hidden (hamburger).
- Grid collapses to 8 columns, `16px` gutter.
- Cards stack to 2-up or full-width.

#### Mobile (<640px)

- Single-column layout.
- No sidebar — bottom tab bar instead.
- Grid: single column with `16px` horizontal page padding.
- Cards: full-width.

### 7.3 Spacing Conventions

| Context | Spacing Value |
|---------|--------------|
| Page padding (horizontal) | `24px` desktop, `16px` mobile |
| Page padding (top, below header) | `32px` desktop, `16px` mobile |
| Gap between summary cards row | `16px` |
| Gap between dashboard sections | `32px` |
| Card internal padding | `20px` desktop, `16px` mobile |
| Card border-radius | `12px` |
| Between label and input field | `6px` |
| Between form fields | `16px` |
| Between a section title and its content | `16px` |
| Table cell padding | `12px` horizontal, `10px` vertical |
| Modal padding | `24px` |
| Toast padding | `12px 16px` |

---

## 8. Buttons & Interactive Elements

### 8.1 Button Hierarchy

MaWallet uses four button tiers, each with a clear role.

#### Primary Button

- **Purpose**: The single most important action on screen (e.g., "Add Transaction", "Save Budget", "Create Goal").
- **Appearance**:
  - Background: `--emerald-500` (`#10B981`).
  - Text: `#FFFFFF` (white), Satoshi Medium (500), `--text-base`.
  - Border: none.
  - Border-radius: `8px`.
  - Padding: `10px 20px`.
  - Height: `40px` (default), `36px` (compact), `48px` (large/hero).
- **States**:
  - Hover: `--emerald-600` (`#059669`), slight `translateY(-1px)` lift.
  - Active/Pressed: `--emerald-700` (`#047857`), `translateY(0)`.
  - Focus: `2px` emerald-300 outline offset by `2px`.
  - Disabled: `--slate-300` background, `--slate-500` text, `cursor: not-allowed`, 50% opacity.
  - Loading: Spinner icon replaces text, button width preserved (use `min-width`).

#### Secondary Button

- **Purpose**: Alternative or less prominent actions (e.g., "Cancel", "Export", "View All").
- **Appearance**:
  - Background: transparent.
  - Text: `--emerald-600` (light mode), `--emerald-400` (dark mode).
  - Border: `1.5px solid --emerald-300` (light), `--emerald-700` (dark).
  - Same radius, padding, height as primary.
- **States**:
  - Hover: `--emerald-50` background (light), `--emerald-950` (dark).
  - Active: `--emerald-100` background (light).
  - Focus: Same as primary.
  - Disabled: `--slate-200` border, `--slate-400` text.

#### Ghost Button

- **Purpose**: Tertiary actions, inline actions, toolbar buttons (e.g., "Clear Filters", "Reset").
- **Appearance**:
  - Background: transparent.
  - Text: `--slate-600` (light), `--slate-400` (dark).
  - Border: none.
  - Same padding and height.
- **States**:
  - Hover: `--slate-100` background (light), `--slate-800` (dark).

#### Danger Button

- **Purpose**: Destructive actions (e.g., "Delete Transaction", "Delete Account").
- **Appearance**:
  - Background: `--danger` (`#EF4444`).
  - Text: `#FFFFFF`.
  - Same structure as primary.
- **States**:
  - Hover: `#DC2626` (darker red).
  - Always preceded by a confirmation step (modal or inline confirm).

### 8.2 Button Rules

- Maximum one primary button per screen section or modal.
- Buttons always have visible text labels (icon-only buttons allowed only for universal actions with aria-labels, e.g., close, edit).
- Button text is sentence case: "Add transaction", not "Add Transaction" or "ADD TRANSACTION".
- Minimum touch target: `44px × 44px` on mobile (add padding if the visual button is smaller).
- Button groups (e.g., "Cancel" + "Save") have the primary action on the right and a `12px` gap.

### 8.3 Floating Action Button (FAB) — Mobile

- Fixed position: bottom-right, `16px` from edge.
- Size: `56px` diameter, `border-radius: 50%`.
- Background: `--emerald-500`.
- Icon: Plus (`+`), white, 24px.
- Shadow: `0 4px 12px rgba(16, 185, 129, 0.35)`.
- Tap opens the Quick Add Transaction modal.
- Scrolls away on downward scroll, reappears on upward scroll.

### 8.4 Chips & Tags

- **Appearance**: Rounded pill shape (`border-radius: 999px`), `--text-xs`, padding `4px 10px`.
- **Filter Chips**: `--slate-200` background, `--slate-700` text. Active: `--emerald-50` background, `--emerald-700` text, `--emerald-200` border.
- **Transaction Tags**: `--slate-100` background, `--slate-600` text, border `--slate-200`. Removable with an "×" icon on the right.

### 8.5 Toggles & Switches

- Height: `24px`, width: `44px`.
- Track: `--slate-300` (off), `--emerald-500` (on).
- Thumb: White circle, `20px`, with `1px` shadow.
- Transition: `150ms ease`.
- Always accompanied by a text label — never standalone.

---

## 9. Headers & Navigation

### 9.1 Top Bar (App Header)

- **Height**: `64px` desktop, `56px` mobile.
- **Background**: `--slate-50` (light mode), `--slate-900` (dark mode).
- **Bottom border**: `1px solid --slate-200` (light), `--slate-800` (dark).
- **Content**: Logo (left), Search bar (center-left), Quick Add button (center-right), Notification bell (right), User avatar (right).
- **Position**: `sticky` at top, `z-index: 50`.
- **Shadow on scroll**: When scrolled, add `box-shadow: 0 1px 3px rgba(0,0,0,0.08)`.

### 9.2 Sidebar Navigation

- **Width**: `256px` expanded, `72px` collapsed.
- **Background**: `#FFFFFF` (light), `--slate-900` (dark).
- **Right border**: `1px solid --slate-200` (light), `--slate-800` (dark).
- **Nav items**:
  - Height: `40px`.
  - Padding: `8px 12px`.
  - Border-radius: `8px`.
  - Icon: `20px`, `--slate-500`, gap `12px` to label.
  - Label: `--text-sm`, Satoshi Medium (500), `--slate-700` (light), `--slate-300` (dark).
  - Hover: `--slate-100` background (light), `--slate-800` (dark).
  - Active (current page): `--emerald-50` background, `--emerald-600` text and icon (light). `--emerald-950` background, `--emerald-400` text (dark). Left border accent: `3px solid --emerald-500`.

### 9.3 Page Header

Each page has a consistent header area below the top bar:

- **Title**: `--text-2xl`, Satoshi Bold, `--slate-900`.
- **Subtitle/Description** (optional): `--text-base`, `--slate-500`.
- **Action Buttons**: Aligned to the right of the title (e.g., "+ Add Income").
- **Period Selector** (where applicable): Tabs or dropdown, aligned right or below the title.
- **Breadcrumbs** (for nested pages like Budget Detail): `--text-sm`, `--slate-500`, separator `/`.
- **Bottom margin**: `24px` before content begins.

### 9.4 Mobile Bottom Tab Bar

- **Height**: `64px` + safe area inset (for notched devices).
- **Background**: `#FFFFFF` (light), `--slate-900` (dark), with `blur(12px)` backdrop filter for a frosted glass effect.
- **Top border**: `1px solid --slate-200` (light).
- **Items**: 5 tabs, evenly spaced.
  - Icon: `24px`, centered above label.
  - Label: `--text-xs`, Satoshi Medium.
  - Default: `--slate-400`.
  - Active: `--emerald-500` icon, `--emerald-600` label, dot indicator above icon.
- **Position**: `fixed` bottom, `z-index: 50`.

---

## 10. Cards, Containers & Surfaces

### 10.1 Card Component

Cards are the primary content container across the app — used for summary metrics, budget progress, goals, bills, and grouped information.

**Default Card:**

```css
.card {
  background: var(--white);               /* #FFFFFF light, --slate-800 dark */
  border: 1px solid var(--slate-200);      /* --slate-700 dark */
  border-radius: 12px;
  padding: 20px;                           /* 16px on mobile */
  box-shadow: 0 1px 2px rgba(0,0,0,0.04); /* subtle lift */
  transition: box-shadow 150ms ease, border-color 150ms ease;
}

.card:hover {                              /* only for clickable cards */
  border-color: var(--slate-300);
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}
```

**Metric Card (Dashboard Summary):**

Same as default card, with:
- Overline label: `--text-xs`, uppercase, `--slate-500`, `letter-spacing: 0.05em`.
- Metric value: `--text-3xl`, JetBrains Mono Bold, `--slate-900`.
- Comparison indicator: `--text-sm`, with ↑/↓ arrow icon. Green for positive, red for negative.
- Optional sparkline or icon on the right side.

**Interactive Card (Clickable):**

Same as default card, plus:
- `cursor: pointer`.
- Hover: border color shifts, shadow deepens.
- Focus: `2px` emerald outline.
- Use `<button>` or `<a>` semantics, not `<div>` with onClick.

### 10.2 Surfaces & Elevation

MaWallet uses a flat design with minimal elevation. Shadows are functional (separating layers), not decorative.

| Level | Shadow | Use |
|-------|--------|-----|
| Level 0 (Flat) | None | Page background, inline elements |
| Level 1 (Subtle) | `0 1px 2px rgba(0,0,0,0.04)` | Cards at rest, containers |
| Level 2 (Raised) | `0 4px 12px rgba(0,0,0,0.08)` | Hovered cards, dropdowns |
| Level 3 (Floating) | `0 8px 24px rgba(0,0,0,0.12)` | Modals, popovers, toasts |
| Level 4 (Overlay) | `0 16px 48px rgba(0,0,0,0.16)` | Mobile slide-over drawer |

### 10.3 Modals

- **Backdrop**: `rgba(0,0,0,0.5)` with `backdrop-filter: blur(4px)`.
- **Container**: White (light) / `--slate-800` (dark), `border-radius: 16px`, padding `24px`, max-width `560px` (centered).
- **Header**: Title (`--text-lg`, Bold) + close button (X icon, top-right).
- **Footer**: Action buttons right-aligned, gap `12px`.
- **Animation**: Fade in + slide up (`translateY(20px)` → `translateY(0)`), `200ms ease-out`.
- **Mobile**: Full-screen sheet, slides up from bottom, `border-radius: 16px 16px 0 0` on the top.

### 10.4 Section Dividers

- Horizontal rule: `1px solid --slate-200` (light), `--slate-700` (dark).
- Vertical spacing around divider: `24px` above and below.
- Within cards: use `--slate-100` (light) / `--slate-700` (dark) background sections instead of lines where possible.

---

## 11. Charts & Data Visualization

### 11.1 Chart Styling

All charts follow the Chart Palette (Section 4.6) and these style rules:

- **Background**: Transparent (inherits card background).
- **Grid Lines**: `--slate-200` (light), `--slate-700` (dark), `1px`, dashed or dotted. Horizontal only — no vertical grid lines (unless a scatter plot).
- **Axis Labels**: `--text-xs`, Satoshi Regular, `--slate-500`.
- **Axis Lines**: `--slate-300` (light), `--slate-600` (dark), `1px`.
- **Data Labels** (on hover): Tooltip with white background, `--slate-900` text, `border-radius: 8px`, shadow level 2, padding `8px 12px`.
- **Legend**: Below the chart, horizontal, `--text-sm`, color swatch (12px circle) + label.

### 11.2 Chart Types & Usage

| Chart Type | When to Use |
|-----------|------------|
| **Bar (Vertical)** | Income vs. Expense by month, category comparison |
| **Bar (Horizontal)** | Budget progress bars, ranked categories |
| **Donut** | Expense breakdown by category (current period) |
| **Line** | Trends over time (balance, net worth, daily spending) |
| **Area (Stacked)** | Cumulative data (savings goals, net worth composition) |
| **Sparkline** | Inline mini-trends within cards (no axes, minimal) |
| **Heatmap** | Daily spending intensity (calendar-style) |

### 11.3 Chart Interaction

- **Hover**: Highlight the hovered element (bar, segment, point) — dim others to `40%` opacity.
- **Tooltip**: Appears near the cursor, contains value and label. Never truncate values.
- **Click**: Where applicable, drill down (e.g., click a donut segment → filter transactions).
- **Responsive**: Charts resize fluidly. On mobile, allow horizontal scroll for time-series charts wider than the viewport.

### 11.4 Empty Chart State

When a chart has no data, display:

- The chart area with faded axis labels.
- A centered message: "No data for this period" in `--slate-400`.
- A subtle illustration (see Section 14).

---

## 12. Form Elements & Inputs

### 12.1 Text Input

```css
.input {
  height: 40px;
  padding: 8px 12px;
  font-family: 'Satoshi', sans-serif;
  font-size: var(--text-base);           /* 15px */
  color: var(--slate-900);
  background: var(--white);               /* --slate-800 dark */
  border: 1.5px solid var(--slate-300);   /* --slate-600 dark */
  border-radius: 8px;
  transition: border-color 150ms, box-shadow 150ms;
}

.input:hover {
  border-color: var(--slate-400);
}

.input:focus {
  border-color: var(--emerald-500);
  box-shadow: 0 0 0 3px var(--emerald-100);  /* --emerald-900 at 30% dark */
  outline: none;
}

.input::placeholder {
  color: var(--slate-400);
}

.input--error {
  border-color: var(--danger);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}
```

### 12.2 Amount / Currency Input

- Same base as text input, but:
  - Currency symbol prefix inside the field (e.g., "₹"), `--slate-400`, non-editable.
  - Font: JetBrains Mono for the numeric value.
  - Right-aligned text.
  - Larger size for primary amount entry: `height: 56px`, `--text-2xl`.

### 12.3 Select / Dropdown

- Same dimensions and border as text input.
- Chevron icon on the right: `--slate-400`, `16px`.
- Dropdown menu: White / `--slate-800`, `border-radius: 8px`, shadow level 2, max-height `280px` (scrollable), `z-index: 40`.
- Option hover: `--slate-100` (light), `--slate-700` (dark).
- Selected option: `--emerald-50` background, `--emerald-600` text, checkmark icon.

### 12.4 Date Picker

- Trigger: Text input with calendar icon on the right.
- Calendar popup: White, shadow level 3, `border-radius: 12px`.
- Today: Outlined with `--emerald-500`.
- Selected date: Filled `--emerald-500` background, white text.
- Range selection: `--emerald-50` fill between start and end dates.

### 12.5 Labels & Helper Text

- **Label**: Above the input, `--text-sm`, Satoshi Medium, `--slate-700`. Gap: `6px`.
- **Required indicator**: Red asterisk (`*`) after the label text.
- **Helper text**: Below the input, `--text-xs`, `--slate-500`. Gap: `4px`.
- **Error text**: Below the input (replaces helper text), `--text-xs`, `--danger`. Accompanied by a small alert icon.

### 12.6 Checkbox & Radio

- Size: `18px × 18px`.
- Border: `1.5px solid --slate-300`.
- Border-radius: `4px` (checkbox), `50%` (radio).
- Checked: `--emerald-500` fill, white checkmark/dot.
- Focus: `2px` emerald outline.
- Label: `--text-base`, `--slate-700`, gap `8px` from the control.

---

## 13. Feedback & Status Indicators

### 13.1 Toast Notifications

- **Position**: Top-right on desktop, top-center on mobile.
- **Width**: `360px` max on desktop, `calc(100% - 32px)` on mobile.
- **Structure**: Icon (left), message (center), dismiss X (right).
- **Variants**:
  - Success: `--success-bg` background, `--success` left border (4px), emerald icon.
  - Error: `--danger-bg`, `--danger` border, red icon.
  - Warning: `--warning-bg`, `--warning` border, amber icon.
  - Info: `--info-bg`, `--info` border, blue icon.
- **Auto-dismiss**: After `5 seconds` (configurable). Pause on hover.
- **Animation**: Slide in from right (`translateX(100%)` → `0`), fade out on dismiss.
- **Stacking**: Max 3 visible, newest on top, older ones slide down.

### 13.2 Progress Bars

- **Height**: `8px` (default), `4px` (compact/dashboard), `12px` (large/detail view).
- **Track**: `--slate-200` (light), `--slate-700` (dark), `border-radius: 999px`.
- **Fill**: Color based on context:
  - Budget: Green (0–60%), Yellow (61–80%), Orange (81–99%), Red (100%+).
  - Savings Goal: `--emerald-500` always.
  - Debt Payoff: `--info` (blue).
- **Fill border-radius**: Same as track.
- **Animation**: Fill width transitions smoothly (`300ms ease`) on data change.
- **Label Position**: Percentage right-aligned above the bar, or inline at the fill endpoint.

### 13.3 Badges & Statuses

| Status | Background | Text Color | Border |
|--------|-----------|------------|--------|
| Paid | `--success-bg` | `--success` | `--success-border` |
| Upcoming | `--info-bg` | `--info` | `--info-border` |
| Due Today | `--warning-bg` | `--warning` | `--warning-border` |
| Overdue | `--danger-bg` | `--danger` | `--danger-border` |
| On Track | `--success-bg` | `--success` | `--success-border` |
| At Risk | `--warning-bg` | `--warning` | `--warning-border` |
| Exceeded | `--danger-bg` | `--danger` | `--danger-border` |
| Completed | `--emerald-100` | `--emerald-700` | `--emerald-200` |

**Badge size**: `--text-xs`, Satoshi Medium, padding `2px 8px`, `border-radius: 999px`, `1px` border.

### 13.4 Empty States

- Centered in the content area.
- Illustration: 120px–160px simple line illustration in `--slate-300` and `--emerald-300`.
- Heading: `--text-lg`, Satoshi Bold, `--slate-700`.
- Description: `--text-base`, `--slate-500`, max-width `400px`.
- CTA Button: Primary button below, `margin-top: 16px`.

### 13.5 Loading States

- **Skeleton Screens** (preferred over spinners): Pulse-animated rectangles matching the content layout. Background: `--slate-200` (light), `--slate-700` (dark). Animation: subtle left-to-right shimmer.
- **Spinner**: 20px Emerald SVG spinner (circular arc). Use only inside buttons and small inline contexts.
- **Progress (determinate)**: For imports/exports — horizontal bar with percentage label.

---

## 14. Illustrations & Imagery

### 14.1 Illustration Style

MaWallet uses a custom illustration set with these characteristics:

- **Style**: Flat, geometric, with soft rounded shapes. Minimal detail — suggest rather than depict.
- **Palette**: Uses brand colors only — emerald, teal, slate, and one semantic accent where appropriate.
- **Line Weight**: Consistent `2px` stroke (matching Lucide icons).
- **Mood**: Friendly, calm, optimistic. Characters (if any) are abstract / faceless.
- **Use Cases**: Onboarding screens, empty states, error pages, celebration moments, marketing.

### 14.2 Photography

MaWallet does **not** use stock photography in the product UI. The brand is illustration-first and data-first. Photography is allowed only in:

- Marketing website hero sections (people managing finances, daily life scenes).
- Blog posts and social media.
- Must be warm, diverse, real — no staged or overly corporate imagery.

### 14.3 Receipt & Attachment Thumbnails

- Displayed as `48px × 48px` rounded-square thumbnails with `border-radius: 8px`.
- Border: `1px solid --slate-200`.
- Hover: Slight scale (`1.05`) and shadow lift.
- Click: Opens in a lightbox overlay.

---

## 15. Brand Voice & Tone

### 15.1 Voice Principles

MaWallet speaks like a **knowledgeable friend who's great with money** — not a bank, not a teacher, not a robot. The voice is consistent; the tone adapts to context.

| Principle | Meaning |
|-----------|---------|
| **Clear** | Say it in the fewest, simplest words. Avoid jargon, technical terms, and banker-speak. |
| **Warm** | Use "you" and "your." Be encouraging, never preachy or judgmental. |
| **Honest** | If the user overspent, say so kindly — but say it. No sugarcoating. |
| **Action-Oriented** | Every message should help the user do something or understand something. |
| **Consistent** | Same voice in error messages, marketing copy, notifications, and tooltips. |

### 15.2 Tone by Context

| Context | Tone | Example |
|---------|------|---------|
| **Onboarding** | Warm, encouraging, simple | "Welcome to MaWallet! Let's get your finances organized in just a few steps." |
| **Dashboard** | Confident, informative | "You've saved 28% of your income this month — that's above your average." |
| **Adding a transaction** | Quick, minimal | "Got it. ₹450 added to Food & Dining." |
| **Budget warning** | Honest, supportive | "Heads up — you've used 82% of your Dining budget with 10 days left." |
| **Budget exceeded** | Direct, non-judgmental | "Your Dining budget is over by ₹2,300. Want to adjust the limit for next month?" |
| **Goal achieved** | Celebratory, proud | "You did it! Your Emergency Fund goal of ₹1,00,000 is complete." |
| **Error message** | Calm, helpful | "We couldn't save that transaction. Check your connection and try again." |
| **Empty state** | Motivating, inviting | "No expenses yet this month. Add your first one to start tracking." |
| **Bill overdue** | Urgent but kind | "Your electricity bill was due 3 days ago. Mark it as paid or set a reminder." |
| **Deletion confirmation** | Careful, clear | "This will permanently delete this transaction. This can't be undone." |
| **Financial tip** | Friendly, practical | "Tip: Setting a grocery budget helped MaWallet users save an average of 15% on food." |

### 15.3 Writing Rules

- Use **sentence case** everywhere — headings, buttons, labels, menus. Never ALL CAPS (except legal/acronym contexts like "EMI" or "UPI").
- Use **contractions**: "you've", "can't", "we'll" — they sound more natural.
- Use **active voice**: "You saved ₹5,000" not "₹5,000 was saved."
- **Avoid**: "Please" (overused, makes the UI feel apologetic), "Error" as a heading (describe the problem instead), "Invalid" (say what's wrong specifically), exclamation marks in error contexts.
- **Numbers**: Use the user's locale formatting. Always include the currency symbol. Spell out "one" through "nine" in prose; use digits for 10+. Always use digits for monetary amounts.
- **Dates**: Respect the user's chosen format (DD/MM/YYYY or MM/DD/YYYY). In prose, use friendly format: "15 Mar 2026" or "March 15, 2026."

### 15.4 Microcopy Examples

| Element | Copy |
|---------|------|
| Password field placeholder | "At least 8 characters" |
| Empty search results | "No transactions match your search. Try different keywords." |
| Successful save | "Changes saved." |
| Undo toast | "Transaction deleted. [Undo]" |
| Budget created | "Budget set — we'll let you know when you're close to the limit." |
| Goal contribution | "₹5,000 added to your Emergency Fund. 68% there!" |
| Loading transactions | "Loading your transactions..." |
| Network error | "Can't reach our servers right now. Check your connection and try again." |
| Session expired | "Your session has expired. Log in again to continue." |
| Delete account warning | "This will permanently delete your account and all your data. There's no way to undo this." |
| Recurring auto-logged | "Auto-logged: Monthly rent of ₹25,000 from HDFC Savings." |

---

## 16. Motion & Animation

### 16.1 Principles

- **Purposeful**: Every animation communicates something — entry, exit, state change, feedback. No animation for decoration alone.
- **Quick**: UI transitions are `150ms–250ms`. Never longer than `300ms` for in-app interactions. Onboarding and celebrations may be `400ms–600ms`.
- **Smooth**: Use `ease-out` for entrances, `ease-in` for exits, `ease-in-out` for state changes.
- **Respect preferences**: Honor `prefers-reduced-motion: reduce` — disable all non-essential animations.

### 16.2 Easing Curves

```css
:root {
  --ease-default: cubic-bezier(0.4, 0.0, 0.2, 1);   /* Material standard */
  --ease-in:      cubic-bezier(0.4, 0.0, 1, 1);       /* Exits */
  --ease-out:     cubic-bezier(0.0, 0.0, 0.2, 1);     /* Entrances */
  --ease-bounce:  cubic-bezier(0.34, 1.56, 0.64, 1);  /* Celebrations */
}
```

### 16.3 Common Animations

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Page transition | Fade in + slide up `8px` | `200ms` | `--ease-out` |
| Modal enter | Fade in backdrop `150ms` + slide up modal `250ms` | `250ms` | `--ease-out` |
| Modal exit | Reverse of enter | `200ms` | `--ease-in` |
| Toast enter | Slide in from right `16px` + fade | `200ms` | `--ease-out` |
| Toast exit | Fade out + slide right `8px` | `150ms` | `--ease-in` |
| Dropdown open | Scale from `0.95` to `1` + fade | `150ms` | `--ease-out` |
| Button hover | Background color shift | `150ms` | `--ease-default` |
| Card hover | Shadow deepen + border shift | `150ms` | `--ease-default` |
| Progress bar fill | Width change | `300ms` | `--ease-default` |
| Skeleton shimmer | Left-to-right highlight sweep | `1500ms` loop | `linear` |
| Confetti (goal achieved) | Burst + gravity fall | `600ms` | `--ease-bounce` |
| Number counter (dashboard) | Count up from 0 to value | `400ms` | `--ease-out` |
| Chart data update | Bars/lines morph to new values | `300ms` | `--ease-default` |

### 16.4 Logo Animation (Splash Screen Only)

- The two wallet folds slide in from left and right, overlap, and the arrow fades in.
- Total duration: `800ms`.
- Used only on: app splash screen (initial load), onboarding welcome.
- Never animate the logo in headers or navigation.

---

## 17. Dark Mode & Light Mode

### 17.1 Mode Selection

- **Default**: Follow system preference (`prefers-color-scheme`).
- **User override**: Manual toggle in Settings and top-bar avatar menu (Sun/Moon icon).
- **Persistence**: Store preference in `localStorage` and user profile (synced across devices).

### 17.2 Implementation Strategy

Use CSS custom properties (variables) for all colors. Toggle by applying a `.dark` class on the `<html>` element.

```css
:root {
  /* Light mode values */
  --bg-page: #F8FAFC;
  --bg-card: #FFFFFF;
  --bg-card-hover: #F1F5F9;
  --border-default: #E2E8F0;
  --text-primary: #0F172A;
  --text-secondary: #64748B;
  --text-tertiary: #94A3B8;
}

html.dark {
  --bg-page: #0F172A;
  --bg-card: #1E293B;
  --bg-card-hover: #334155;
  --border-default: #334155;
  --text-primary: #F1F5F9;
  --text-secondary: #94A3B8;
  --text-tertiary: #64748B;
}
```

### 17.3 Dark Mode Rules

- **Never pure black**: Darkest background is `#0F172A` (slate-900), not `#000000`. This avoids excessive contrast and eye strain.
- **Never pure white text**: Lightest text on dark backgrounds is `#F1F5F9` (slate-100), not `#FFFFFF`, except for text on primary-colored buttons.
- **Elevation in dark mode**: Instead of shadows (invisible on dark backgrounds), use progressively lighter background tones. A card on a page: page `#0F172A`, card `#1E293B`, raised element `#334155`.
- **Borders are critical in dark mode**: They provide separation that shadows can't. Ensure all cards and containers have visible borders in dark mode.
- **Charts**: Use the same chart palette colors but ensure they meet WCAG contrast on dark backgrounds. Some colors may need to shift one step lighter (e.g., Emerald-500 → Emerald-400).
- **Images and illustrations**: Test visibility on dark backgrounds. Add a subtle background container if illustrations are designed for light only.

### 17.4 Transition

Smooth transition between modes:

```css
html {
  transition: background-color 200ms ease, color 200ms ease;
}

/* Apply to all themed elements */
*, *::before, *::after {
  transition: background-color 200ms ease, border-color 200ms ease, color 200ms ease;
}
```

---

## 18. Responsive Behavior

### 18.1 Breakpoints

| Token | Width | Description |
|-------|-------|-------------|
| `--bp-sm` | 640px | Mobile landscape, small tablet portrait |
| `--bp-md` | 768px | Tablet portrait |
| `--bp-lg` | 1024px | Tablet landscape, small desktop |
| `--bp-xl` | 1280px | Desktop |
| `--bp-2xl` | 1536px | Large desktop |

### 18.2 Component Adaptations

| Component | Desktop (>1024px) | Tablet (640–1024px) | Mobile (<640px) |
|-----------|-------------------|--------------------|-----------------| 
| Navigation | Fixed sidebar 256px | Collapsed sidebar 72px or hidden | Bottom tab bar + hamburger drawer |
| Dashboard cards | 4–5 cards in a row | 2–3 per row | Horizontal scroll carousel or stacked |
| Charts | Full width within content area | Full width, reduced height | Full width, simplified (fewer labels), horizontal scroll for time series |
| Tables | Full columns visible | Collapse low-priority columns, horizontal scroll | Card/list layout per row |
| Modals | Centered, max-width 560px | Centered, max-width 90% | Full-screen bottom sheet |
| Forms | Side-by-side fields where appropriate | Stacked | Stacked |
| Action buttons | In-line with page header | In-line or below header | FAB + condensed header actions |

### 18.3 Touch Optimization

- Minimum tap target: `44px × 44px` (per WCAG).
- Swipe gestures on transaction rows: swipe left → delete (red), swipe right → edit (blue). Reveal action buttons underneath.
- Pull-to-refresh on all list pages.
- Long-press on a transaction to enter bulk-selection mode.

---

## 19. Use Cases & Applications

### 19.1 Marketing Website

- **Logo**: Horizontal lockup (A), emerald mark on white.
- **Colors**: White background, slate text, emerald accents. Signature gradient on hero section.
- **Typography**: Satoshi Bold for hero headlines (`--text-4xl`), Satoshi Regular for body.
- **Tone**: Aspirational, clear, benefit-focused.
- **CTAs**: "Get started — it's free" (primary button), "See how it works" (secondary/ghost).

### 19.2 Social Media

- **Profile Image**: Stacked lockup (B) on a white square, or mark-only (C) on emerald background.
- **Post Templates**: White background, emerald accent bars, Satoshi Bold headlines, data visualization screenshots. Maintain `--space-8` padding from edges.
- **Color**: Primarily white and emerald. Avoid dark mode for social media assets (stands out less in feeds).
- **Hashtag**: `#MaWallet`, `#YourMoneyYourClarity`.

### 19.3 Email Templates

- **Header**: Horizontal logo lockup on white, centered or left-aligned.
- **Body**: Max-width `600px`. Satoshi font stack (falls back to system sans-serif in email). `--text-base` body, `--text-xl` headings.
- **CTA Buttons**: Emerald-500 background, white text, `border-radius: 8px`, `44px` height, centered.
- **Footer**: Slate-500 text, unsubscribe link, MaWallet © year.
- **Types**: Welcome, weekly summary, bill reminder, goal milestone, password reset, security alert.

### 19.4 App Store Listing

- **Icon**: Mark-only (C) on white background, rounded corners per platform guidelines (iOS: continuous corner radius).
- **Screenshots**: Device frames showing key screens (Dashboard, Add Transaction, Budget Progress, Goals). White background with emerald annotation callouts.
- **Feature Graphic** (Android): Signature gradient background with stacked logo and tagline.

### 19.5 Print (Business Cards, Stationery)

- **Logo**: Horizontal lockup (A) in charcoal on white stock.
- **Accent**: Single emerald rule or emerald-colored edge.
- **Typography**: Satoshi Bold for name/title, Satoshi Regular for contact info.
- **Paper**: Uncoated, white or very light warm gray (not bright white).

### 19.6 Slide Decks / Pitch Presentations

- **Template**: White slides, emerald headline underlines, slate body text.
- **Headings**: Satoshi Bold, `--text-2xl`, `--slate-900`.
- **Data slides**: Use brand chart colors. White card containers on `--slate-50` background.
- **Logo**: Bottom-left of each slide (wordmark only, small).

---

## 20. Do's and Don'ts — Quick Reference

### Do's

- **Do** use the emerald-500 (`#10B981`) as the primary accent consistently.
- **Do** use Satoshi as the primary typeface everywhere in the product and marketing.
- **Do** use JetBrains Mono for monetary amounts and tabular data.
- **Do** maintain the 4px spacing grid for all layout decisions.
- **Do** use semantic colors for their intended purpose (green = income/success, red = expense/error).
- **Do** test all designs in both light and dark modes.
- **Do** honor the M-height clear space around the logo.
- **Do** write in sentence case for all UI text.
- **Do** use contractions and friendly language.
- **Do** provide meaningful empty states with illustrations and CTAs.
- **Do** animate purposefully and keep durations under 300ms for UI transitions.
- **Do** use skeleton screens instead of spinners for content loading.
- **Do** ensure WCAG 2.1 AA compliance for contrast, touch targets, and screen reader support.
- **Do** use `border-radius: 12px` for cards and `8px` for buttons and inputs consistently.
- **Do** pair icons with text labels in navigation and menus.

### Don'ts

- **Don't** use any shade of purple, orange, or neon as a primary or dominant color.
- **Don't** use more than one primary button per visible section.
- **Don't** use ALL CAPS for headings, buttons, or labels (except acronyms like "EMI").
- **Don't** use pure black (`#000000`) or pure white (`#FFFFFF`) as background colors.
- **Don't** add drop shadows, glows, gradients, or outlines to the logo.
- **Don't** stretch, rotate, recolor, or rearrange the logo.
- **Don't** use stock photography inside the product UI.
- **Don't** write in a preachy, judgmental, or condescending tone when a user overspends or misses a bill.
- **Don't** use animations longer than 300ms for standard interactions.
- **Don't** use Lorem Ipsum in prototypes — always use realistic financial data.
- **Don't** place the logo on a busy background without a contrast overlay or container.
- **Don't** use icon-only buttons without aria-labels and tooltips.
- **Don't** mix Lucide icons with other icon sets.
- **Don't** use inconsistent border-radius values within the same component type.
- **Don't** ignore dark mode — every screen, component, and illustration must work in both modes.
- **Don't** hardcode colors — always use CSS custom properties / design tokens.

---

## Appendix: CSS Design Tokens (Full Export)

```css
:root {
  /* === Primary === */
  --color-primary: #10B981;
  --color-primary-hover: #059669;
  --color-primary-active: #047857;
  --color-primary-subtle: #ECFDF5;

  /* === Secondary === */
  --color-secondary: #14B8A6;
  --color-secondary-hover: #0D9488;
  --color-secondary-subtle: #F0FDFA;

  /* === Neutrals === */
  --color-bg-page: #F8FAFC;
  --color-bg-card: #FFFFFF;
  --color-bg-elevated: #F1F5F9;
  --color-border: #E2E8F0;
  --color-border-strong: #CBD5E1;
  --color-text-primary: #0F172A;
  --color-text-secondary: #64748B;
  --color-text-tertiary: #94A3B8;
  --color-text-on-primary: #FFFFFF;

  /* === Semantic === */
  --color-success: #10B981;
  --color-success-bg: #ECFDF5;
  --color-danger: #EF4444;
  --color-danger-bg: #FEF2F2;
  --color-warning: #F59E0B;
  --color-warning-bg: #FFFBEB;
  --color-info: #3B82F6;
  --color-info-bg: #EFF6FF;

  /* === Typography === */
  --font-primary: 'Satoshi', 'DM Sans', sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', monospace;
  --text-xs: 0.6875rem;
  --text-sm: 0.8125rem;
  --text-base: 0.9375rem;
  --text-md: 1.0625rem;
  --text-lg: 1.25rem;
  --text-xl: 1.5rem;
  --text-2xl: 1.875rem;
  --text-3xl: 2.25rem;
  --text-4xl: 3rem;

  /* === Spacing === */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;

  /* === Radii === */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 999px;

  /* === Shadows === */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.12);
  --shadow-xl: 0 16px 48px rgba(0,0,0,0.16);

  /* === Motion === */
  --duration-fast: 150ms;
  --duration-default: 200ms;
  --duration-slow: 300ms;
  --ease-default: cubic-bezier(0.4, 0.0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0.0, 1, 1);
  --ease-out: cubic-bezier(0.0, 0.0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
}

html.dark {
  --color-primary: #10B981;
  --color-primary-hover: #34D399;
  --color-primary-active: #6EE7B7;
  --color-primary-subtle: #022C22;

  --color-secondary: #2DD4BF;
  --color-secondary-hover: #5EEAD4;
  --color-secondary-subtle: #042F2E;

  --color-bg-page: #0F172A;
  --color-bg-card: #1E293B;
  --color-bg-elevated: #334155;
  --color-border: #334155;
  --color-border-strong: #475569;
  --color-text-primary: #F1F5F9;
  --color-text-secondary: #94A3B8;
  --color-text-tertiary: #64748B;
  --color-text-on-primary: #FFFFFF;

  --color-success: #34D399;
  --color-success-bg: #022C22;
  --color-danger: #F87171;
  --color-danger-bg: #450A0A;
  --color-warning: #FBBF24;
  --color-warning-bg: #451A03;
  --color-info: #60A5FA;
  --color-info-bg: #172554;

  --shadow-sm: 0 1px 2px rgba(0,0,0,0.2);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.3);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.4);
  --shadow-xl: 0 16px 48px rgba(0,0,0,0.5);
}
```

---

*MaWallet Brand Guidelines v1.0*
*Last Updated: March 2026*
*Maintained by: MaWallet Design Team*
*For questions or asset requests, contact: design@mawallet.app*
