---
description: "Use when designing or reviewing Discord embed messages, bot responses, button layouts, select menus, or any visual element of a Discord bot. Enforces embed aesthetic standards, color consistency, interaction UX, and Discord UI best practices."
applyTo: ["src/utils/embeds*", "src/utils/colors*", "src/commands/**", "src/components/**"]
---

# Discord Embed & UI Design Rules

## Embed Color Rules

Use ONLY the palette from `src/utils/colors.ts`:
- `Colors.PRIMARY` (Blurple) — info, neutral, standard responses
- `Colors.SUCCESS` (Green) — positive outcomes, joins, purchases
- `Colors.WARNING` (Yellow) — caution, rate-limited, pending
- `Colors.DANGER` (Red) — errors, bans, kicks, losses
- `Colors.MUTED` (Gray) — disabled, historical, footnote info
- `Colors.INVISIBLE` — matches dark background for "silent" embeds

NEVER hardcode hex values like `0xff0000` inline in commands.

## Embed Structure Standards

### Mandatory for all action embeds
- `.setColor()` — always explicit, never omitted
- `.setTimestamp()` — required for any moderation/economy/action

### Recommended structure
1. `.setAuthor({ name, iconURL })` → who triggered or who is the subject
2. `.setTitle()` → what happened (short, ≤ 60 chars)
3. `.setDescription()` → main body content
4. `.addFields([...])` → supplementary data (use `inline: true` for pairs)
5. `.setThumbnail()` → user avatar for person-related commands
6. `.setImage()` → full-width for generated images or banners
7. `.setFooter({ text })` → IDs, server name, command invoker
8. `.setTimestamp()` → always last

## Field Rules

- Field `name` max 256 chars, must never be empty
- Field `value` max 1024 chars — truncate with `...` if over
- Use inline fields in pairs (2 per row) for compact stat displays
- Never add an empty field as a "spacer" — use a blank description line instead

## Interaction Component Rules

### Buttons
- Use `ButtonBuilder` — ALWAYS set `.setLabel()` AND either `.setEmoji()` or meaningful label alone
- Primary (Blurple) = main action; Secondary (Gray) = cancel; Danger (Red) = destructive; Success (Green) = confirm
- Disabled state for expired/processed interactions: `.setDisabled(true)`
- `customId` format: `action:category:userId:data` (namespaced, colon-separated)

### Select Menus
- Each option MUST have `label` and `value`; `description` is recommended
- `placeholder` text should describe the action: "Select a role to add..."
- Set `minValues` and `maxValues` explicitly — never rely on defaults for multi-select

### Modals
- Title max 45 chars
- Input labels max 45 chars
- Use short inputs for IDs/amounts, paragraph inputs for reasons/notes

## Emoji Usage

- Use standard Unicode emojis in titles and descriptions for visual anchors
- Be consistent: pick ONE style (all Unicode, or all server custom) per bot
- Never use emojis as the ONLY indicator of meaning (accessibility: always pair with text)
- Status emojis: ✅ success,  ❌ error, ⚠️ warning, 🔄 loading/pending, 🔒 locked, 🔓 unlocked

## Rich Content Formatting

- Use Discord markdown in embed descriptions:
  - `**bold**` for key values
  - `\`code\`` for IDs, commands, values
  - `> blockquote` for quoted user content
  - `<t:TIMESTAMP:R>` for relative times (NOT string "3 hours ago")
  - `<@userId>`, `<#channelId>`, `<@&roleId>` for mentions in embed fields

## Response Hierarchy

1. Critical errors → Ephemeral error embed (only user sees it)
2. Personal data (balance, profile) → Ephemeral or public depending on context
3. Moderation actions → Public confirmation + log channel embed
4. Success actions → Public embed with celebratory color
