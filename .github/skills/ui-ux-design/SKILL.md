---
name: ui-ux-design
description: "UI/UX design guidance for Discord bots, bot dashboards, and web apps. Use when: designing Discord embed layouts, bot response aesthetics, color schemes, embed hierarchy, button/component design, website visual design, landing pages, dark-mode aesthetics, accessibility design, typography, spacing, responsive layouts, Discord-themed UI, glassmorphism, gradient design, animation design, micro-interactions, icon design, card layouts, hero sections, dashboard widgets. Triggers: design, UI, UX, aesthetic, looks nice, make it pretty, embed design, colors, theme, layout, styling, visual, logo, brand, gradient, animation, discord theme, dark mode."
argument-hint: "Describe what you want to design (e.g. 'make my bot commands look more aesthetic')"
---

# UI/UX Design Skill

## When to Use
- Discord embed aesthetic design and hierarchy
- Bot response visual consistency
- Website / dashboard visual design
- Color palette selection and application
- Typography, spacing, and layout decisions
- Dark mode / Discord-themed UI
- Animation and micro-interaction design
- Accessibility and contrast compliance

## Design Principles for Discord Bots

### Embed Hierarchy
Good embeds follow a visual hierarchy:
1. **Title** — Short, bold, action-describing (max 256 chars)
2. **Description** — Primary info block (max 4096 chars)  
3. **Fields** — Supplementary data in 2-column grid (inline: true) or full-width
4. **Footer + Timestamp** — Metadata, attribution

### Embed Aesthetic Rules
| Rule | Why |
|---|---|
| Max 3-4 colors per embed set | Coherence |
| Consistent color = consistent meaning | Users learn your visual language |
| Use thumbnail for user/target avatars | Visual anchor |
| Use image field for charts/generated art | High impact placement |
| Author field for command invoker | Attribution |
| Fields in pairs for density (`inline: true`) | Space efficiency |

### Color Psychology for Bots
```
🔵 Blurple (#5865F2) — Info, neutral actions, identity
🟢 Green  (#23A55A) — Success, positive, earned, join
🔴 Red    (#F23F42) — Error, danger, ban, loss
🟡 Yellow (#FEE75C) — Warning, caution, pending
⚪ Gray   (#99AAB5) — Neutral, muted, inactive
🟣 Purple (#9B59B6) — Premium, special, rare
🟠 Orange (#E67E22) — Energy, economy, coins
```

## Aesthetic Embed Templates

### Success Embed
```typescript
new EmbedBuilder()
  .setColor(0x23A55A)
  .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
  .setTitle('✅ Action Completed')
  .setDescription('Brief positive message here.')
  .setTimestamp();
```

### Moderation Embed (Branded)
```typescript
new EmbedBuilder()
  .setColor(0xED4245)
  .setTitle('🔨 Member Banned')
  .setThumbnail(target.displayAvatarURL())
  .addFields(
    { name: '👤 User', value: `${target}`, inline: true },
    { name: '🛡️ Moderator', value: `${mod}`, inline: true },
    { name: '📝 Reason', value: reason },
  )
  .setFooter({ text: `ID: ${target.id}` })
  .setTimestamp();
```

### Info/Profile Card Embed
```typescript
new EmbedBuilder()
  .setColor(0x5865F2)
  .setAuthor({ name: 'Server Stats', iconURL: guild.iconURL() ?? '' })
  .setTitle(guild.name)
  .setThumbnail(guild.iconURL({ size: 256 }) ?? '')
  .addFields(
    { name: '👥 Members', value: `${guild.memberCount}`, inline: true },
    { name: '📅 Created', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true },
    { name: '🌐 Region', value: 'Auto', inline: true },
  )
  .setImage(guild.bannerURL({ size: 1024 }) ?? null)
  .setTimestamp();
```

## Website Design System

### Typography Scale (Tailwind)
```
text-xs   (12px) — Captions, timestamps, badges
text-sm   (14px) — Body secondary, nav labels
text-base (16px) — Body primary
text-lg   (18px) — Subheadings
text-xl   (20px) — H3
text-2xl  (24px) — H2
text-3xl  (30px) — H1 section
text-5xl  (48px) — Hero headlines
```

### Spacing System
Use multiples of 4px (Tailwind: `p-1` = 4px, `p-4` = 16px, `p-8` = 32px).
- Component padding: `p-4` to `p-6`
- Section spacing: `py-16` to `py-24`
- Card gap: `gap-4` to `gap-6`

### Discord-Branded Dark UI
See [design tokens reference](../website-making/references/design-tokens.md).

### Glassmorphism (for overlays, cards on hero)
```css
background: rgba(43, 45, 49, 0.7);
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: 12px;
```
```tailwind
bg-[#2b2d31]/70 backdrop-blur-md border border-white/[0.08] rounded-xl
```

### Gradient Designs
```tailwind
/* Blurple gradient text */
bg-gradient-to-r from-[#5865f2] to-[#9b59b6] bg-clip-text text-transparent

/* Hero gradient background */
bg-gradient-to-br from-[#1e1f22] via-[#2b2d31] to-[#1e1f22]

/* Glow effect */
shadow-[0_0_40px_rgba(88,101,242,0.3)]
```

## Animation Guidelines

### Entry Animations (Framer Motion)
```typescript
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};
```

### Micro-Interactions
- Buttons: `transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]`
- Cards: `transition-colors duration-200 hover:border-discord-blurple`
- Icons: `transition-transform duration-200 group-hover:rotate-12`

### Avoid
- Animations > 500ms for functional UI elements
- Parallax on mobile (performance)
- Flashing/strobing effects (accessibility)

## Accessibility Standard
- Color contrast ratio: minimum 4.5:1 for body text, 3:1 for large text
- All interactive elements need `:focus-visible` styles
- Don't rely on color alone to convey meaning — add icons/text
- `aria-label` on all icon-only buttons
- Check with: Tailwind `sr-only` for screen-reader-only text

## Procedure

### For a Discord Bot Aesthetic Overhaul
1. Define your color palette (3 colors max: primary, success, danger)
2. Apply consistently: primary for info/neutral, success for positive, danger for negative
3. Pick an emoji set style (all flat, all animated, or all Unicode)
4. Add timestamps to all action embeds
5. Use thumbnails for user-related commands, images for generated content
6. Standardize footer format across all embeds

### For a Website Design
1. Start with color tokens (see [design-tokens.md](../website-making/references/design-tokens.md))
2. Choose Hero → Features → CTA → Footer page structure
3. Establish type scale and spacing rhythm
4. Dark mode first (Discord theme), then light mode optional
5. Add Framer Motion page transitions
6. Run Lighthouse accessibility audit before shipping
