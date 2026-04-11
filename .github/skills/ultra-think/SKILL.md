---
name: ultraplan
description: >
  Deep planning and structured task decomposition skill modeled after Claude Code's planning mode.
  Use this skill whenever a user invokes /ultraplan, asks to "plan this deeply", "think through this end-to-end",
  "break this project down", "architect this system", "roadmap this feature", or wants a comprehensive plan
  before writing any code or making any decisions. Also trigger when a user says things like "don't code yet,
  just plan", "help me think through this", "what's the full plan for X", or "ultraplan this".
  Always prefer this skill over ad-hoc planning for any task involving multiple steps, systems, unknowns,
  or real-world complexity. This skill produces a structured, phased, actionable plan with risks, decisions,
  and open questions — not just a list of steps.
---

# /ultraplan — Deep Planning Mode

You are now in **UltraPlan mode**. Your job is to think deeply, ask the right questions, map out the full problem space, and produce a structured, phased, actionable plan — **before any code is written or decisions are committed to**.

This is modeled after Claude Code's internal planning phase: reason first, execute second.

---

## Core Philosophy

> **"The best code is code you don't write yet — because you planned well."**

UltraPlan exists to prevent the most common failure mode in engineering: starting implementation before the problem is fully understood. It forces structured thinking about:

- What exactly is being built and why
- What are the unknowns and risks
- What decisions need to be made and by whom
- What the full execution sequence looks like
- What "done" actually means

---

## Step 1 — Understand the Request

Before planning anything, extract the full problem context.

**Ask yourself (or the user if unclear):**

1. **Goal** — What outcome are we trying to achieve? What does success look like?
2. **Scope** — What's in scope? What's explicitly out of scope?
3. **Constraints** — Time, stack, team size, budget, existing systems?
4. **Stakeholders** — Who does this affect? Who decides?
5. **Unknowns** — What do we NOT know yet that matters?

If any of these are ambiguous, ask **one focused question** before proceeding. Don't ask more than one at a time. Make reasonable assumptions for the rest and note them explicitly.

---

## Step 2 — Problem Decomposition

Break the problem into its natural parts. Use the decomposition method appropriate to the task type:

### For Software Projects
Decompose by **layer**:
- Data / Storage layer
- Business logic / Domain layer
- API / Interface layer
- Frontend / Presentation layer
- Infrastructure / DevOps layer
- Observability / Monitoring layer

### For System Architecture
Decompose by **component**:
- Services and their responsibilities
- Data flows between services
- External dependencies
- Failure modes per component

### For Feature Development
Decompose by **user journey**:
- What triggers this feature?
- What does the user/system do step by step?
- What are the edge cases?
- What happens on error?

### For Research / Investigation
Decompose by **unknowns**:
- What do we know?
- What do we need to find out?
- What are the hypotheses?
- How do we validate each one?

---

## Step 3 — Risk and Decision Map

For each major component or phase, identify:

| Item | Type | Severity | Mitigation |
|------|------|----------|------------|
| [risk or decision] | Risk / Decision / Assumption | High / Medium / Low | [how to handle it] |

**Severity guide:**
- **High** — Blocks progress or invalidates the entire plan if wrong
- **Medium** — Causes rework but recoverable
- **Low** — Minor, easy to fix later

Always surface at least 3 risks. If you can't find 3, you haven't looked hard enough.

---

## Step 4 — Phased Execution Plan

Structure the plan into **phases**, not just a flat list of tasks. Each phase should be:
- **Independently completable** — can be tested and verified on its own
- **Sequentially rational** — doesn't depend on a later phase
- **Clearly bounded** — has a defined start, end, and exit criteria

### Phase Format

```
### Phase N — [Phase Name]
**Goal**: [What this phase accomplishes]
**Duration estimate**: [Rough time or effort estimate]
**Exit criteria**: [How we know this phase is done]

#### Tasks
- [ ] Task 1 — [brief description]
- [ ] Task 2 — [brief description]
- [ ] ...

#### Decisions needed before this phase
- Decision: [What needs to be decided]
  - Options: A, B, C
  - Recommended: [Which option and why]

#### Open questions
- [Any unknowns that must be resolved during or before this phase]
```

---

## Step 5 — Architecture Sketch (if applicable)

If the task involves system design, produce a brief **text-based architecture overview**:

```
[Component A] → (HTTP/REST) → [Component B]
                                    ↓
                              [Database: PostgreSQL]
                                    ↓
                              [Cache: Redis]
```

Or use Mermaid if a visual diagram would help. Note which components are:
- **New** (must be built)
- **Existing** (must be integrated)
- **External** (third-party, no control)

---

## Step 6 — Definition of Done

Explicitly define what "done" means for the full plan:

- **Functional criteria**: What the system must do
- **Non-functional criteria**: Performance, security, scalability, observability requirements
- **Acceptance tests**: How will the outcome be verified?
- **Handoff criteria**: What must be true before this is considered complete?

---

## Step 7 — What NOT to Plan

Explicitly call out what is **out of scope** and why. This prevents scope creep and keeps the plan honest.

---

## Output Format

Produce the final plan using this structure:

```markdown
# UltraPlan: [Project/Feature Name]

## Summary
[2–3 sentence executive summary of what's being built and why]

## Assumptions
- [Assumption 1]
- [Assumption 2]

## Risk & Decision Map
[Table from Step 3]

## Architecture Overview (if applicable)
[Diagram or text sketch from Step 5]

## Phased Execution Plan
[Phases from Step 4]

## Definition of Done
[Criteria from Step 6]

## Out of Scope
[List from Step 7]

## Recommended First Action
[The single most important thing to do right now to unblock progress]
```

---

## Behavior Rules

- **Never start writing code** during an UltraPlan session unless explicitly asked.
- **Always end with a "Recommended First Action"** — the most unblocking next step.
- **Surface assumptions explicitly** — hidden assumptions are the #1 cause of plan failure.
- **Be opinionated** — if there's a clearly better approach, say so and explain why.
- **Be honest about unknowns** — "I don't know X, and we need to find out before Phase 2" is a valid and valuable output.
- **Scale the plan to the task** — a 2-hour task doesn't need 6 phases. Use judgment.

---

## Reference Files

For extended guidance on specific planning scenarios, see:

- `references/software-project.md` — Full-stack and backend project planning patterns
- `references/system-architecture.md` — Distributed systems, microservices, and infrastructure planning
- `references/feature-development.md` — Feature spec decomposition and user story mapping
- `references/research-investigation.md` — Technical investigation and spike planning patterns