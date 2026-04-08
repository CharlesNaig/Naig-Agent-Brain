---
name: code-reviewer
description: "Deep code review for TypeScript, JavaScript, discord.js bots, Next.js apps. Use when: reviewing code for security, performance, bugs, maintainability, Discord-specific pitfalls, race conditions, memory leaks, exposed secrets, SQL injection, XSS, CSRF, N+1 queries, missing error handling, uncaught promise rejections, rate limit issues, type safety violations, accessibility problems, anti-patterns. Triggers: review this code, code review, check for bugs, security audit, find issues, analyze code, what's wrong with, refactor, improve code, code quality."
argument-hint: "Paste code or describe what to review (e.g. 'review my moderation command for security issues')"
---

# Code Reviewer Skill

## When to Use
- Security audit of any code (secrets, injection, auth)
- Discord bot code review (rate limits, error handling, permissions)
- Next.js / React code review (performance, hydration, accessibility)
- General TypeScript/JavaScript review (type safety, anti-patterns)
- Pre-merge or pre-deploy review checklist

## Review Checklist

### 🔴 Critical (Must Fix)
- [ ] **Exposed secrets**: API keys, tokens, passwords in code or logs
- [ ] **SQL/NoSQL injection**: Unsanitized user input in queries
- [ ] **XSS**: Unescaped user content rendered as HTML
- [ ] **CSRF**: State-mutating API routes without CSRF protection
- [ ] **Auth bypass**: Missing permission/role checks
- [ ] **Uncaught promise rejections**: Async code without try/catch
- [ ] **Discord bot token exposed**: Token in client-side code or logs
- [ ] **Infinite loops**: Event listeners calling themselves

### 🟡 Major (Should Fix)
- [ ] **N+1 queries**: Fetching in loop — use `findMany` with `in` clause
- [ ] **Missing input validation**: User inputs not validated/sanitized
- [ ] **Rate limit not handled**: Discord API calls without error handling for 429
- [ ] **Memory leaks**: Event listeners not removed, unbounded Maps/Sets
- [ ] **Race conditions**: Concurrent mutations without locks/transactions
- [ ] **No error embed for Discord commands**: Raw error thrown to user
- [ ] **Missing defer**: Long operations without `deferReply()`
- [ ] **Type `any` abuse**: Bypasses TypeScript safety

### 🔵 Minor (Nice to Fix)
- [ ] **DRY violations**: Copy-pasted logic that should be extracted
- [ ] **Magic numbers/strings**: Unexplained literals
- [ ] **Unclear variable names**: Single-letter vars outside loop contexts
- [ ] **Missing loading/error states**: UI has no feedback for async ops
- [ ] **Missing accessibility**: Interactive elements without ARIA/labels
- [ ] **No pagination**: Fetching unlimited records from DB
- [ ] **Missing index**: Frequently queried fields without DB index

## Procedure

### 1. Scan for Critical Issues First
Look for: `process.env` logged, tokens in strings, `innerHTML`, `eval`, raw SQL with template literals, missing `await` on async calls.

### 2. Discord-Specific Checks
```
✓ Every command has try/catch that sends errorEmbed()
✓ deferReply() called before any await > 2s
✓ editReply/followUp used after defer, never reply()
✓ Rate limits handled (check for 429 retry logic)
✓ Bot token never appears in Next.js client bundle
✓ customId validated for ownership before processing
✓ GuildMember fetched correctly (not from stale cache)
```

### 3. Next.js / React Checks
```
✓ No useEffect for data fetching (use RSC or React Query)
✓ 'use client' only where truly needed
✓ next/image not <img>, next/font not <link>
✓ NEXT_PUBLIC_ vars don't contain secrets
✓ Server Actions validate with Zod before DB calls
✓ API routes have rate limiting if public
✓ Metadata exported from page.tsx
```

### 4. TypeScript Checks
```
✓ No 'any' — use unknown + type guards
✓ Non-null assertions (!) justified or removed
✓ Enums used for string unions where appropriate
✓ Return types explicit on public functions
✓ Prisma query results properly typed
```

### 5. Output Format

Always return a structured review:

```markdown
## Code Review Summary

### 🔴 Critical Issues
1. **[File:Line]** Description — `suggestion`

### 🟡 Major Issues  
1. **[File:Line]** Description — `suggestion`

### 🔵 Minor Issues
1. **[File:Line]** Description — suggestion

### ✅ Looks Good
- Mention what was done well

### Recommended Changes
Show corrected code snippets for each critical/major issue.
```

## Common Discord.js Anti-Patterns

| Anti-Pattern | Fix |
|---|---|
| `client.users.cache.get(id)` in guild context | `guild.members.fetch(id)` |
| `interaction.reply()` after defer | `interaction.editReply()` |
| `message.channel.send()` in loop | Collect all, send once |
| `if (interaction.commandName === 'x')` | Command handler map |
| Catching all errors silently | Log + send error embed |
| `setInterval` for per-guild state | BullMQ delayed jobs |
| Storing collections in module scope | Use `client.cache` Map or Redis |

## See Also
- [Security Checklist](./references/security.md)
- [Performance Checklist](./references/performance.md)
