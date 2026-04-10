# Ideation Prompts — Scoping Questions & Expansion Frameworks

## Core Scoping Questions

Ask these in order. Stop after you have enough to generate a PLAN.md.

### 1. Problem & Purpose
- What problem does this solve?
- Why does this need to exist? (Is it missing from a current project, or net-new?)
- Where would a user first encounter this? (Discord server, web dashboard, API, etc.)

### 2. Target Users
- Who uses this? (Server members, admins, developers, end users?)
- How technical are they?
- What do they currently do without this feature?

### 3. Scope Boundary
- What is the absolute minimum version (MVP) that is usable?
- What is explicitly OUT of scope for now?
- Does this need a web UI, or is Discord-only acceptable for MVP?

### 4. Data & Persistence
- Does this store or retrieve data?
- Is the data per-user, per-guild, or global?
- Does it connect to an existing system (database, external API, third-party service)?

### 5. Integration Points
- Does this touch an existing command, feature, or schema?
- Does it need a website, dashboard, or API endpoint?
- Does it require authentication or permissions beyond Discord roles?

---

## Discord Bot Specific Questions

- What command name(s) should trigger this? (slash and/or prefix?)
- Should the output be public or ephemeral?
- Does it have buttons, select menus, or modals?
- Does it need a cron job or scheduled task?
- Does it need per-guild configuration?

---

## Website / Dashboard Specific Questions

- Is this a new standalone page or a section on an existing page?
- Does it need authentication? (Discord OAuth? Admin-only?)
- Is it data-driven (tables, charts, live updates)?
- Does it need mobile responsiveness as MVP or is it desktop-first?
- Does it interact with the Discord bot's database?

---

## Feature Tier Expansion Framework

Once the idea is scoped, expand it into tiers:

### MVP — What ships first (1–3 days)
- Single happy path only
- No customization
- Core data stored, no history
- Basic embeds, no interactive components

### v1 — First polished release (1–2 weeks)
- Edge cases handled
- Configurable settings per guild/user
- Interactive components (buttons, selects)
- Error handling with user-friendly embeds
- Admin controls

### v2+ — Future growth
- Web dashboard integration
- Analytics and logging
- Bulk operations
- Webhooks, notifications, third-party integrations
- Public API exposure

---

## User Story Format

When writing features, frame them as:

> As a **[role]**, I want to **[action]**, so that **[outcome]**.

Examples:
- As a **server member**, I want to see my XP rank, so that I know how close I am to the next level.
- As a **server admin**, I want to configure the XP rate per guild, so that I can tune the system for my community.
- As a **developer**, I want a REST endpoint for user data, so that the website dashboard can display it.
