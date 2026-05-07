---
name: environment-config
description: "Environment and configuration management skill for .env, .env.example, config modules, deployment variables, secret safety, and validation."
argument-hint: "Describe the environment/config change."
---

# Environment Config Skill

## When To Use

- Editing `.env.example`, config files, or deployment variable docs.
- Adding required environment variables.
- Reviewing secret handling.
- Refactoring configuration modules.

## Required Rules

- Never commit real secrets.
- Keep `.env` ignored.
- Keep `.env.example` committed with safe placeholder values.
- Do not log `process.env` or stringify full environments.
- Validate required variables at startup when the target project supports it.
- Keep server-only secrets out of client bundles.

## Naming

- Use uppercase names with underscores.
- Group related variables by prefix.
- Use `NEXT_PUBLIC_` only for non-secret browser-safe values.

## Discord Bot Config

The CharlesNaig Hybrid Template uses `src/config.js`.

Common variables:

```env
TOKEN=your_bot_token_here
CLIENT_ID=your_application_client_id
CLIENT_SECRET=your_application_client_secret
OWNER_ID=your_discord_user_id
PREFIX=!
MONGO_URL=mongodb://localhost:27017/botdb
GUILD_ID=your_test_guild_id
PRODUCTION=false
```

## Website Config

Common variables:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/app
NEXTAUTH_SECRET=generate_a_strong_secret
NEXTAUTH_URL=http://localhost:3000
DISCORD_CLIENT_ID=your_application_client_id
DISCORD_CLIENT_SECRET=your_application_client_secret
```

## Checklist

- `.env.example` contains every required variable.
- `.gitignore` excludes real env files.
- Secrets are server-side only.
- Error messages identify missing variable names without printing values.
