---
name: Turbo Pixel Fun
colors:
  surface: '#0c1609'
  surface-dim: '#0c1609'
  surface-bright: '#323c2d'
  surface-container-lowest: '#071105'
  surface-container-low: '#141e11'
  surface-container: '#182214'
  surface-container-high: '#222d1e'
  surface-container-highest: '#2d3828'
  on-surface: '#dae6d0'
  on-surface-variant: '#baccb0'
  inverse-surface: '#dae6d0'
  inverse-on-surface: '#293324'
  outline: '#85967c'
  outline-variant: '#3c4b35'
  surface-tint: '#2ae500'
  primary: '#efffe3'
  on-primary: '#053900'
  primary-container: '#39ff14'
  on-primary-container: '#107100'
  inverse-primary: '#106e00'
  secondary: '#ffabf3'
  on-secondary: '#5b005b'
  secondary-container: '#fe00fe'
  on-secondary-container: '#500050'
  tertiary: '#fff8f7'
  on-tertiary: '#442927'
  tertiary-container: '#ffd3ce'
  on-tertiary-container: '#7a5955'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#79ff5b'
  primary-fixed-dim: '#2ae500'
  on-primary-fixed: '#022100'
  on-primary-fixed-variant: '#095300'
  secondary-fixed: '#ffd7f5'
  secondary-fixed-dim: '#ffabf3'
  on-secondary-fixed: '#380038'
  on-secondary-fixed-variant: '#810081'
  tertiary-fixed: '#ffdad6'
  tertiary-fixed-dim: '#e7bdb8'
  on-tertiary-fixed: '#2c1513'
  on-tertiary-fixed-variant: '#5d3f3c'
  background: '#0c1609'
  on-background: '#dae6d0'
  surface-variant: '#2d3828'
  lemon-shock: '#CCFF00'
  pixel-black: '#000000'
  deep-void: '#1A1A1A'
  hard-shadow: '#000000'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: 0.05em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: JetBrains Mono
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
spacing:
  pixel-unit: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style

This design system embraces a **Pixel Art / Retro-Game** aesthetic, shifting away from a serious tone to one of humor, energy, and high-octane playfulness. It targets users who appreciate nostalgia, gaming culture, and quirky, unconventional interfaces. The emotional response is intended to be pure joy and "clicky" satisfaction.

The design movement is **Brutal-Pixel**: a mix of raw 8-bit graphics and bold, high-contrast layouts. The UI should feel like a game menu from the early 90s, featuring thick pixelated borders, hard-edged shadows, and vibrant neon accents. Every interaction should feel intentional and tactile, like pressing a mechanical button on an arcade cabinet.

## Colors

The color palette is high-vibrancy and high-contrast, designed to pop against a pure black or deep-gray background. 

- **Primary (Neon Green):** The main interactive color, used for success states, primary actions, and progress.
- **Secondary (Shocking Pink):** Used for playful accents, destructive actions, or secondary highlights.
- **Tertiary (Lemon Chime):** A bright yellow-green for warnings and special labels.
- **Neutral:** A foundation of deep charcoal and pure black to make the neon colors feel like they are glowing. 

Avoid gradients or soft transitions. Color changes should be immediate and "step-like" to honor the pixel-art constraints.

## Typography

Typography relies on technical and geometric fonts that mimic the blocky nature of pixels. **Space Grotesk** is used for headlines to provide a modern-yet-retro geometric feel, while **JetBrains Mono** provides a technical, "code-like" readability for body text and data.

All text should feel chunky. Labels and headlines should preferably be in all-caps to enhance the "arcade" feel. For an authentic pixel effect, avoid sub-pixel rendering settings where possible; letters should feel locked to a grid.

## Layout & Spacing

The layout is strictly governed by a **4px pixel-grid**. All margins, paddings, and element dimensions must be multiples of this unit to ensure edges align perfectly without "half-pixels."

A **Fixed Grid** model is preferred for containers to maintain the structured look of a game console. Components should be grouped into rigid boxes. Instead of fluid white space, use thick pixel borders to separate content areas. Layouts should be dense and information-rich, mimicking a retro RPG status screen.

## Elevation & Depth

Depth is conveyed through **Hard Block Shadows** rather than blurs or lighting.

- **Block Shadows:** Use solid 4px or 8px offsets with 100% opacity (Black) to make elements pop off the screen. 
- **Tonal Stepping:** Use "stair-step" shades of gray to show nesting. 
- **No Blurs:** Transparent blurs and glassmorphism are strictly prohibited. Every layer must have a hard, opaque edge.
- **Inverted Press:** When an element is interacted with, the block shadow should disappear, and the element should translate 4px down and to the right to simulate a physical "click."

## Shapes

The shape language is strictly **Sharp (0px roundedness)**. 

To create a "pixel-rounded" look, use a stepped corner technique: a 4px x 4px square removed from the corner, rather than a mathematical curve. This maintains the "lo-fi" aesthetic. All borders must be at least 2px thick to be visible as distinct "pixel" lines.

## Components

- **Buttons:** Rectangular with a 2px solid border and a 4px black block shadow. Use Neon Green for primary actions. On hover, the background color should "flash" or brighten.
- **Input Fields:** Black background with a thick White or Neon Green border. The cursor should be a solid, blinking block.
- **Cards:** Heavy 2px borders with an offset shadow. Use "pixel-art" style icons (limited palette, blocky) for card headers.
- **Progress Bars:** Segmented into discrete blocks (e.g., 10 blocks representing 100%). As the bar fills, the blocks should light up in Neon Green.
- **Chips:** Small boxes with hard borders. No rounded corners. Use high-contrast text-background combinations (e.g., Pink background with Black text).
- **Checkboxes:** Simple squares that fill with a solid "X" mark made of pixels when selected.
- **Navigation:** Use a "Sidebar" or "Top Bar" that resembles a game HUD (Heads-Up Display), with fixed-width slots for each menu item.