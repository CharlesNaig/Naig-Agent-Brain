---
name: deployment
description: "Deployment and DevOps guidance for Discord bots and Next.js websites. Use when: deploying a Discord bot to VPS, Railway, Fly.io, or Docker; deploying Next.js to Vercel, Cloudflare Pages, or self-hosted; setting up PM2 process manager, Docker containers, CI/CD pipelines with GitHub Actions; environment variable management in production; zero-downtime deployments for bots (bot sharding restart); database migrations in production; monitoring and logging setup. Triggers: deploy, hosting, Docker, PM2, Railway, Vercel, Fly.io, CI/CD, GitHub Actions, production, self-host, VPS, process manager, monitoring."
argument-hint: "What are you deploying? (e.g. 'Discord bot to Railway' or 'Next.js app to Vercel')"
---

# Deployment Skill

## When to Use
- Deploying a Discord bot or website to production
- Setting up CI/CD with GitHub Actions
- Configuring Docker for containerized deployment
- PM2 for process management on VPS
- Database migration workflow for production
- Setting up uptime monitoring and error alerting

## Platforms Quick Reference

| Platform | Best For | Cost |
|---|---|---|
| Railway | Discord bots + databases | Free tier, then ~$5/mo |
| Fly.io | Discord bots (auto-scaling) | Free tier available |
| VPS (DigitalOcean, Hetzner) | Full control, production bots | ~$5-20/mo |
| Vercel | Next.js websites | Generous free tier |
| Cloudflare Pages | Static/Edge Next.js | Very generous free tier |
| Supabase | PostgreSQL + Auth | Generous free tier |
| Upstash | Redis (serverless) | Pay-per-use, cheap |

## Discord Bot Deployment

### PM2 on VPS
```bash
npm install -g pm2

# ecosystem.config.cjs
module.exports = {
  apps: [{
    name: 'discord-bot',
    script: 'dist/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: 'production',
    },
  }]
};

pm2 start ecosystem.config.cjs
pm2 save
pm2 startup  # auto-restart on server reboot
```

### Docker
```dockerfile
FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package*.json ./
RUN npm ci --only=production

FROM base AS builder
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM base AS runner
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

ENV NODE_ENV=production
USER node
CMD ["node", "dist/index.js"]
```

### Railway Deployment
1. Push to GitHub
2. Connect repo in Railway dashboard
3. Add environment variables in Railway dashboard (never in Dockerfile)
4. Railway auto-deploys on push to main

## Next.js Website Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
# Or push to GitHub + connect Vercel to repo for auto-deploy
```

Environment variables → Vercel Dashboard → Settings → Environment Variables

### Self-hosted with Docker
```dockerfile
FROM node:20-alpine AS base
WORKDIR /app

FROM base AS builder
COPY . .
RUN npm ci && npm run build

FROM base AS runner
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

In `next.config.ts`:
```typescript
output: 'standalone',
```

## GitHub Actions CI/CD

### Bot Deployment Pipeline
```yaml
# .github/workflows/deploy-bot.yml
name: Deploy Bot

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - run: npm run lint
      - name: Deploy to server
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /app/bot
            git pull origin main
            npm ci --only=production
            npm run build
            pm2 restart discord-bot
```

### Deploy Slash Commands on Deploy
```typescript
// scripts/deploy-commands.ts
import { REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';

const commands = [];
// ... load all command data exports
const rest = new REST().setToken(process.env.DISCORD_BOT_TOKEN!);
await rest.put(
  Routes.applicationCommands(process.env.DISCORD_CLIENT_ID!),
  { body: commands },
);
```

Run `npm run deploy:commands` in CI before restarting the bot.

## Production Database Migrations

```bash
# Generate migration files (dev)
npx prisma migrate dev --name your_migration_name

# Apply migrations in production (no interactive prompt)
npx prisma migrate deploy

# Run in CI/CD before bot restart:
npx prisma migrate deploy && pm2 restart discord-bot
```

NEVER run `prisma migrate reset` in production — it wipes data.

## Monitoring

### Uptime (Free)
- BetterUptime or UptimeRobot: ping your bot's HTTP health endpoint every 5 minutes
- Add a `/health` HTTP server to your bot:
```typescript
import { createServer } from 'http';
createServer((_, res) => res.writeHead(200).end('OK')).listen(3000);
```

### Error Alerting
- Log errors to a private Discord channel via webhook:
```typescript
process.on('unhandledRejection', async (error) => {
  const webhook = new WebhookClient({ url: process.env.ERROR_WEBHOOK_URL! });
  await webhook.send({ content: `🔴 **Unhandled Error**\n\`\`\`${error}\`\`\`` });
});
```
