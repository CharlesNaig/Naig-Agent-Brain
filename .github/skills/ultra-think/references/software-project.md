# Software Project Planning Patterns

## When to use this reference
Load this when the user is planning a new application, service, API, or full-stack system from scratch or from an existing base.

---

## Project Planning Checklist

### Before Phase 1 (Setup)
- [ ] Repository strategy decided (monorepo vs polyrepo)
- [ ] Tech stack locked (language, framework, DB, infra)
- [ ] Local dev environment reproducible (Docker, `.env.example`, README)
- [ ] CI/CD pipeline bootstrapped (even if minimal)
- [ ] Coding standards defined (linting, formatting, commit conventions)

### Data Layer Planning
- [ ] Entities and relationships modeled (ERD or equivalent)
- [ ] Indexing strategy considered for known query patterns
- [ ] Migration strategy defined (schema-first vs code-first)
- [ ] Seed data strategy for dev/test environments
- [ ] Backup and recovery plan (even minimal for early stages)

### API Layer Planning
- [ ] REST vs GraphQL vs gRPC decision made
- [ ] Authentication/authorization strategy defined (JWT, OAuth, session)
- [ ] Versioning strategy defined (`/v1/`, header-based, etc.)
- [ ] Error response format standardized
- [ ] Rate limiting strategy noted (even if not implemented yet)

### Frontend Planning (if applicable)
- [ ] Routing strategy (SPA, SSR, SSG, hybrid)
- [ ] State management approach (local, global, server-state)
- [ ] Component library decision (build vs use existing)
- [ ] Responsive/mobile strategy noted

### Infrastructure Planning
- [ ] Hosting platform decided (cloud provider, serverless, VPS)
- [ ] Environments defined: dev, staging, prod (minimum)
- [ ] Secrets management strategy (env vars, vault, cloud KMS)
- [ ] Logging and monitoring baseline defined

---

## Common Phase Patterns for Software Projects

### Greenfield Project (3–5 phases)

```
Phase 1 — Foundation
  - Repo setup, CI/CD skeleton, env configuration
  - DB schema v1, migrations working
  - Auth scaffolding

Phase 2 — Core Domain
  - Core business logic implemented
  - Primary API endpoints
  - Basic frontend shell (if applicable)

Phase 3 — Feature Completion
  - Full feature set from spec
  - Integration tests passing
  - Error handling and edge cases

Phase 4 — Hardening
  - Performance testing and optimization
  - Security review
  - Observability (logs, metrics, alerts)

Phase 5 — Launch
  - Staging validation
  - Load testing
  - Production deployment and rollback plan
```

### Adding a Major Feature (2–3 phases)

```
Phase 1 — Spec & Scaffold
  - Feature spec reviewed and approved
  - DB migrations written and tested
  - API contract defined (request/response shapes)

Phase 2 — Implementation
  - Backend logic complete
  - Frontend integration complete
  - Unit + integration tests passing

Phase 3 — Validation & Ship
  - QA sign-off
  - Staged rollout or feature flag strategy
  - Monitoring alerts for new endpoints
```

---

## Red Flags to Surface in Planning

- **No auth design** — security is harder to retrofit than build in
- **No migration strategy** — schema changes without a plan cause outages
- **Missing error handling spec** — "we'll handle errors later" always bites
- **No staging environment** — "works on my machine" at scale
- **Undefined "done"** — features shipped without acceptance criteria drag forever
- **Missing non-functional requirements** — performance, concurrency, data retention