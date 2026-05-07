---
name: database
description: "Database design and review for MongoDB/Mongoose, Prisma, schemas, queries, indexes, migrations, transactions, and data integrity."
argument-hint: "Describe the schema, query, migration, or data issue."
---

# Database Skill

## When To Use

- Designing schemas or migrations.
- Reviewing MongoDB/Mongoose or Prisma queries.
- Fixing data consistency, indexes, transactions, or N+1 issues.
- Adding Discord bot persistence.
- Adding website persistence.

## Discord Bot: MongoDB/Mongoose

- Use Mongoose for the CharlesNaig Hybrid Template unless the project explicitly changed stack.
- Store Discord snowflakes as strings.
- Use predictable schema names in `src/schemas/`.
- Export with `models.Name || model('Name', schema)` to avoid re-registration errors.
- Use `findOneAndUpdate` with `{ upsert: true, new: true }` for create-or-update flows.
- Use `$inc`, `$push`, `$pull`, and transactions for atomic multi-document updates.
- Avoid `findOne` then `new Model().save()` in hot paths.

Example:

```javascript
import pkg from 'mongoose';
const { Schema, model, models } = pkg;

const economySchema = new Schema({
    _id: { type: String },
    guildId: { type: String, required: true },
    userId: { type: String, required: true },
    balance: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

export default models.Economy || model('Economy', economySchema);
```

## Website: Prisma

- Use Prisma when the website project already uses it.
- Add indexes for frequently queried fields.
- Use transactions for multi-step mutations.
- Keep Discord IDs as strings.
- Use a singleton Prisma client in Next.js development to avoid connection churn.

## Review Checklist

- Are IDs typed safely?
- Are required indexes present?
- Can concurrent requests corrupt data?
- Are migrations reversible or at least documented?
- Are user inputs validated before queries?
- Are errors handled without leaking details?
