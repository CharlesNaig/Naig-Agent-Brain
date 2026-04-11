# Research & Investigation Planning Patterns

## When to use this reference
Load this when the task is a technical spike, proof of concept, debugging investigation, library evaluation, or any exploratory work where the output is knowledge, not shipping code.

---

## The Spike Template

A spike is time-boxed exploration. It has a hard stop and a defined output.

```markdown
## Spike: [Topic]

### Question we're trying to answer
[Single, specific question. If you have multiple questions, run multiple spikes.]

### Why we need to know this
[What decision or next step depends on this answer?]

### Timebox
[Max hours or days to spend. Default: 1 day. Never more than 1 sprint.]

### Approach
1. [First thing to try or read]
2. [Second thing]
3. [Fallback if first approach doesn't answer the question]

### Definition of done
- [ ] Question is answered with evidence
- [ ] Recommendation is written up
- [ ] Findings shared with team

### Output format
- Written finding: [doc, PR comment, Slack post]
- Demo (if applicable): [link or description]
```

---

## Library / Tool Evaluation Framework

When choosing between libraries, frameworks, or services, evaluate on:

| Criterion | Weight | Option A | Option B | Option C |
|-----------|--------|----------|----------|----------|
| Maintenance activity | High | — | — | — |
| Bundle size / performance | Medium | — | — | — |
| API ergonomics | High | — | — | — |
| License compatibility | High | — | — | — |
| Community size | Medium | — | — | — |
| TypeScript support | Medium | — | — | — |
| Security track record | High | — | — | — |

**Decision rule:** High-weight criteria breaking ties → pick based on the 3 High-weight criteria first.

---

## Bug Investigation Framework

For debugging complex or production issues, use this structure:

```
1. Reproduce
   - Can you reproduce it consistently?
   - Under what conditions does it occur?
   - What's the minimal reproduction case?

2. Isolate
   - Which layer is failing? (network, DB, service, UI)
   - Which component owns the failing behavior?
   - When did it start? (last known good state)

3. Hypothesize
   - List 3 possible causes ranked by likelihood
   - What would each one explain?
   - What would each one NOT explain?

4. Validate
   - For each hypothesis: what test or log check disproves it?
   - Run the fastest-to-disprove test first

5. Fix and Verify
   - Fix at the correct layer (not a symptom patch)
   - Add a test that would have caught this
   - Document root cause in PR or incident report
```

---

## Research Output Standards

Every investigation should produce:

1. **A clear answer** to the original question (even if the answer is "we don't know yet, and here's why")
2. **Evidence** (logs, benchmarks, test results, documentation quotes)
3. **A recommendation** with reasoning
4. **Next steps** — what to do based on the findings
5. **What was NOT investigated** — scope boundaries of the spike