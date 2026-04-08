---
description: "Use when writing or reviewing environment configuration, dotenv setup, .env files, .env.example files, or any configuration management code. Enforces secret safety and config documentation standards."
applyTo: [".env*", "src/config*", "lib/config*"]
---

# Environment & Configuration Rules

## Required Files

Every project MUST have:
- `.env` — actual secrets (in `.gitignore`, NEVER committed)
- `.env.example` — placeholder values, committed to repo, documents all vars
- `.gitignore` entry for `.env`, `.env.local`, `.env.production`

## .env.example Format

```env
# Discord Bot
DISCORD_BOT_TOKEN=your_bot_token_here
DISCORD_CLIENT_ID=your_application_client_id
DISCORD_CLIENT_SECRET=your_application_client_secret

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/botdb

# Redis (for cooldowns/caching)
REDIS_URL=redis://localhost:6379

# External APIs
HUGGINGFACE_API_KEY=hf_your_key_here
REPLICATE_API_TOKEN=r8_your_token_here

# Next.js Auth
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
NEXTAUTH_URL=http://localhost:3000
```

## Variable Naming

- All caps, underscores: `DISCORD_BOT_TOKEN`, not `discordToken`
- Group by service with a common prefix: `DISCORD_`, `DB_`, `REDIS_`, `HF_`
- Next.js client-side: `NEXT_PUBLIC_` prefix — ONLY for non-secret public config
- Never prefix secrets with `NEXT_PUBLIC_`

## Access Pattern

```typescript
// ✅ Cast and validate at startup
const token = process.env.DISCORD_BOT_TOKEN;
if (!token) throw new Error('DISCORD_BOT_TOKEN is required');

// ✅ Use a config module
import { config } from './config.js';
config.discordToken; // typed, validated

// ❌ Never spread or log process.env
console.log(process.env);
JSON.stringify(process.env);
```

## Discord Bot Config Pattern (CharlesNaig Hybrid Template)

The bot uses `src/config.js` — NOT a Zod-validated module. All env vars are read there:

```javascript
// src/config.js — access anywhere via: import { config } from '../config.js'
// Or via BotClient: this.client.config.*

export const config = {
    token: process.env.TOKEN || '',
    clientId: process.env.CLIENT_ID || '',
    prefix: process.env.PREFIX || '!',
    ownerID: process.env.OWNER_ID ? process.env.OWNER_ID.split(',') : [],
    mongourl: process.env.MONGO_URL || '',
    guildId: process.env.GUILD_ID || '',
    production: process.env.PRODUCTION === 'true',
    // colors, emojis, links also defined here
};
```

## .env.example for the Hybrid Template
```env
# Auth
TOKEN=your_bot_token_here
CLIENT_ID=your_application_client_id
CLIENT_SECRET=your_application_client_secret
OWNER_ID=your_discord_user_id

# Prefix
PREFIX=!

# MongoDB
MONGO_URL=mongodb://localhost:27017/botdb

# Guild (for guild command testing in production mode)
GUILD_ID=your_test_guild_id

# Mode
PRODUCTION=false
```
