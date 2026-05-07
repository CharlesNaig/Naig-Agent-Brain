---
name: deployment
description: "Deployment and DevOps guidance for Discord bots and websites: VPS, Railway, Fly.io, Vercel, Docker, PM2, CI/CD, production env vars, migrations, monitoring, and logs."
argument-hint: "Describe what is being deployed and where."
---

# Deployment Skill

## When To Use

- Deploying a Discord bot or website.
- Creating Docker, PM2, Railway, Vercel, Fly.io, or VPS deployment instructions.
- Adding CI/CD.
- Documenting production environment variables.
- Planning migrations, monitoring, and rollback.

## General Rules

- Keep secrets in platform env settings, not committed files.
- Do production migrations before restarting services.
- Keep bot restart behavior explicit for sharded bots.
- Add health checks where hosting supports them.
- Document rollback steps for risky deployments.

## Discord Bot Deployment

- PM2 is suitable for VPS hosting.
- Railway/Fly.io are suitable for managed bot hosting.
- Docker is suitable when the host supports persistent env config.
- Add process-level handlers for unhandled rejections and exceptions.
- Do not expose bot tokens in build logs or client code.

## Website Deployment

- Vercel is the default fit for Next.js.
- Use standalone output for self-hosted Docker when applicable.
- Configure environment variables in hosting dashboards.
- Keep public and server-only variables clearly separated.

## CI/CD Checklist

- Install dependencies reproducibly.
- Run lint/typecheck/tests when available.
- Apply migrations safely.
- Deploy or restart after successful checks only.
- Keep credentials in CI secrets.
