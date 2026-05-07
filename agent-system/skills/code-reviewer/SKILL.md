---
name: code-reviewer
description: "Deep code review for JavaScript, TypeScript, Discord bots, and web apps. Use for security, performance, bugs, maintainability, accessibility, race conditions, exposed secrets, injection, rate limits, and missing tests."
argument-hint: "Paste code or describe what to review."
---

# Code Reviewer Skill

## When To Use

- Security audits.
- Discord bot code review.
- Next.js, React, and API review.
- General JavaScript/TypeScript maintainability review.
- Pre-merge or pre-deploy checks.

## Review Priority

Findings come first, ordered by severity:

1. Critical security or data-loss bugs.
2. Runtime bugs and behavior regressions.
3. Performance, scalability, and race-condition risks.
4. Maintainability and clarity issues.
5. Missing tests or verification gaps.

## Critical Checks

- Exposed secrets, tokens, passwords, credentials, or private URLs.
- SQL/NoSQL injection.
- XSS or unsafe HTML rendering.
- CSRF gaps on state-changing web routes.
- Auth or permission bypass.
- Uncaught promise rejections.
- Discord bot tokens in client bundles or logs.
- Infinite loops or event listeners that trigger themselves.

## Major Checks

- Missing input validation.
- Discord rate-limit handling gaps.
- Long Discord operations without defer/loading behavior.
- Memory leaks from unbounded maps, intervals, or event listeners.
- Race conditions in concurrent updates.
- N+1 queries or missing indexes.
- Unsafe `any` usage in TypeScript projects.

## Discord-Specific Checks

- Commands use the target bot framework's command pattern.
- Long-running commands defer before slow work.
- User-facing errors are safe embeds/messages, not raw stack traces.
- Component custom IDs validate user ownership and action scope.
- Guild members are fetched correctly when cache may be stale.
- All bot responses follow the project's configured response formats.

## Web-Specific Checks

- Server data fetching is not unnecessarily moved into client effects.
- Client components are only used when browser interactivity is required.
- API routes and server actions validate input before side effects.
- Public mutation routes have rate limiting and CSRF protection where applicable.
- Images, fonts, metadata, and accessibility follow project conventions.

## Output Format

Use this structure:

```markdown
## Findings

1. [Severity] `path:line` - Issue and impact.

## Open Questions

- Question or assumption.

## Verification Gaps

- What was not tested or could not be verified.
```

If no issues are found, state that explicitly and list residual risks.
