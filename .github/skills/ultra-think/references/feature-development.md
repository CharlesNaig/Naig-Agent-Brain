# Feature Development Planning Patterns

## When to use this reference
Load this when planning a specific feature, user story, or product requirement — especially when it spans frontend, backend, and data layers.

---

## Feature Spec Template

Before writing a single line of code, the feature spec should answer:

```markdown
## Feature: [Name]

### Problem
What user or system problem does this solve? Why does it matter now?

### Users affected
Who uses this feature? What do they currently do without it?

### Success metrics
How will we know this feature is working as intended?
- Metric 1: [e.g., "User completes onboarding in < 3 minutes"]
- Metric 2: [e.g., "Zero 500 errors on new endpoint in first 7 days"]

### User stories
- As a [user type], I want to [action] so that [outcome].
- As a [user type], I want to [action] so that [outcome].

### Acceptance criteria
- [ ] Given [context], when [action], then [expected result]
- [ ] Given [context], when [action], then [expected result]

### Edge cases
- What happens if [edge case 1]?
- What happens if [edge case 2]?

### Out of scope (v1)
- [Feature variant that's explicitly deferred]
```

---

## Feature Decomposition by Layer

### Backend
1. DB schema changes (new tables, columns, indexes)
2. Migration files
3. Domain model / service layer
4. API endpoint(s)
5. Input validation
6. Error handling
7. Unit tests
8. Integration tests

### Frontend
1. Route/page addition
2. API client update
3. UI components (new or updated)
4. Form validation
5. Loading / error / empty states
6. Accessibility (ARIA, keyboard nav)
7. Responsive behavior

### Cross-cutting
1. Auth/permission checks
2. Analytics events
3. Feature flag (if staged rollout)
4. Documentation update

---

## Task Sizing Guidelines

| Size | Description | Rough effort |
|------|-------------|--------------|
| XS | Single function or UI component | < 1 hour |
| S | Single layer change (e.g., add one API endpoint) | 1–4 hours |
| M | Full vertical slice (DB + API + basic UI) | 1–2 days |
| L | Multi-service or complex UI feature | 3–5 days |
| XL | Requires spike or architecture decision | > 5 days, split further |

**Rule:** If a task is XL, break it into smaller pieces before scheduling it.

---

## Rollout Strategy Options

| Strategy | When to use |
|----------|-------------|
| Full release | Small, low-risk changes |
| Feature flag (% rollout) | High traffic, gradual validation |
| Beta group | Early access for trusted users |
| Dark launch | Backend only, no UI surface, validate data quality |
| Shadow mode | Run new logic in parallel, compare output, don't serve |