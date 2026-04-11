# System Architecture Planning Patterns

## When to use this reference
Load this when the user is designing a distributed system, microservices architecture, event-driven system, or any multi-service infrastructure.

---

## Architecture Decision Record (ADR) Template

For every major architectural decision, document:

```markdown
### ADR-[N]: [Decision Title]

**Status**: Proposed / Accepted / Deprecated

**Context**: Why does this decision need to be made?

**Options considered**:
- Option A: [description] — Pro: X, Con: Y
- Option B: [description] — Pro: X, Con: Y

**Decision**: [Which option and why]

**Consequences**: [What this decision locks in or rules out]
```

---

## System Design Checklist

### Service Boundaries
- [ ] Each service has a single clear responsibility
- [ ] Services are independently deployable
- [ ] Service contracts (API/event schemas) are versioned
- [ ] No circular dependencies between services

### Data Strategy
- [ ] Data ownership per service defined (no shared DB between services)
- [ ] Event sourcing vs CRUD decision made per domain
- [ ] Eventual consistency zones identified and documented
- [ ] Data consistency requirements per operation (strong vs eventual)

### Communication Patterns
- [ ] Sync (REST/gRPC) vs async (message queue/event bus) per interaction
- [ ] Retry/backoff strategy for failures
- [ ] Idempotency for critical operations
- [ ] Dead letter queue strategy for failed messages

### Resilience Planning
- [ ] Circuit breaker pattern where needed
- [ ] Bulkhead isolation for critical services
- [ ] Graceful degradation behavior defined
- [ ] SLA/SLO targets per service

---

## Architecture Patterns Reference

### Event-Driven Architecture
```
[Producer Service] → [Event Bus (Kafka/SQS)] → [Consumer Service A]
                                              → [Consumer Service B]
                                              → [Audit Log Service]
```
Best for: decoupled workflows, audit trails, high throughput pipelines

### CQRS (Command Query Responsibility Segregation)
```
[Write API] → [Command Handler] → [Write DB] → [Event] → [Read Model Builder]
[Read API]  → [Query Handler]  → [Read DB (denormalized)]
```
Best for: high read/write asymmetry, complex query requirements

### API Gateway Pattern
```
[Client] → [API Gateway] → [Auth Service]
                         → [Service A]
                         → [Service B]
                         → [Rate Limiter]
```
Best for: multi-service frontends, mobile clients, public APIs

---

## Common Architecture Risks

| Risk | Signal | Mitigation |
|------|--------|------------|
| Distributed monolith | Services share DB or deploy together | Enforce independent data ownership |
| Chatty services | N+1 calls between services | Aggregate APIs, batch calls, event-driven |
| No schema versioning | Breaking changes in events/APIs | Semantic versioning + backward compat policy |
| Missing observability | Can't trace a request end-to-end | Distributed tracing from day one (OpenTelemetry) |
| Overengineered for scale | Microservices for a team of 2 | Start modular monolith, extract services when justified |