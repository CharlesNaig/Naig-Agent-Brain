---
description: "Use when writing or reviewing Mongoose schema files or MongoDB queries for the CharlesNaig Discord bot template. Enforces Mongoose schema conventions, query patterns, and data modeling rules. Also applies to Prisma for Next.js website projects."
applyTo: ["src/schemas/**", "prisma/**", "**/*.prisma", "lib/db*"]
---

# Database Rules

## Discord Bot — Mongoose (MongoDB)

### Schema Conventions

- File naming: PascalCase in `src/schemas/` — `Guild.js`, `Warning.js`, `Economy.js`
- `_id`: Always `String` = Discord snowflake (guild ID, user ID, or `guildId-userId` compound)
- Every schema MUST export as: `models.ModelName || model('ModelName', schema)` — prevents hot-reload errors
- Timestamps: `createdAt: { type: Date, default: Date.now }` (not Mongoose timestamps option)

```javascript
import pkg from 'mongoose';
const { Schema, model, models } = pkg;

const mySchema = new Schema({
    _id: { type: String },
    guildId: { type: String, required: true },
    userId: { type: String, required: true },
    value: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

export default models.MyModel || model('MyModel', mySchema);
```

### Query Rules

- Use `findOneAndUpdate` with `{ upsert: true, new: true }` for create-or-update
- NEVER use `findOne` + conditional `new Model()` + `.save()` pattern — race condition
- Use `$inc` for numeric increments: `{ $inc: { balance: amount } }`
- Use `$push` / `$pull` for array field mutations
- Always `.catch()` on DB calls in event handlers — never let DB errors crash the bot
- Use `startSession()` for atomic multi-document mutations (economy transfers)

### Import Pattern
```javascript
import Guild from '../../schemas/Guild.js';
import Warning from '../../schemas/Warning.js';

// Prefer BotClient cache for guild settings:
const settings = await this.client.getGuildSettings(ctx.guild.id);
```

### What to Avoid
- Storing Discord snowflakes as `Number` — exceeds JS safe integer range, use `String`
- `new Model().save()` in hot paths — use `findOneAndUpdate` with upsert
- Raw string interpolation in queries — always use Mongoose operators

---

## Website — Prisma (PostgreSQL/SQLite)

For Next.js website projects:
- Model names: PascalCase singular
- `@@index` for every field used in `where`
- `String @id` for Discord snowflakes (not `Int`)
- `$transaction` for multi-step mutations
- Singleton Prisma client to avoid pool exhaustion

## Singleton Prisma Client (Next.js website)

```typescript
// lib/db.ts
import { PrismaClient } from '@prisma/client';
declare global { var __prisma: PrismaClient | undefined; }
const prisma = global.__prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.__prisma = prisma;
export { prisma };
```
