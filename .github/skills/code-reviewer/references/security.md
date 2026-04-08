# Security Checklist

## Input Validation
```typescript
// ALWAYS validate with Zod at API boundaries
import { z } from 'zod';

const schema = z.object({
  userId: z.string().regex(/^\d{17,19}$/),        // Discord snowflake
  amount: z.number().int().min(1).max(1_000_000),
  reason: z.string().min(1).max(512),
});

const result = schema.safeParse(input);
if (!result.success) throw new Error('Invalid input');
```

## Secrets Management
- ✅ Use `.env` + `dotenv` / Next.js built-in env
- ✅ Provide `.env.example` with placeholder values
- ❌ Never `console.log(process.env)` in production
- ❌ Never commit `.env` files (ensure `.gitignore` covers it)
- ❌ Never expose bot token in `NEXT_PUBLIC_*` variables

## Discord Permission Validation
```typescript
// Command handler — always validate, never trust
if (!interaction.memberPermissions?.has(PermissionFlagsBits.BanMembers)) {
  return interaction.reply({ content: '❌ No permission.', ephemeral: true });
}
// Also check bot's own permissions
if (!interaction.guild?.members.me?.permissions.has(PermissionFlagsBits.BanMembers)) {
  return interaction.reply({ content: '❌ I lack permission to do that.', ephemeral: true });
}
```

## Rate Limit Protection
```typescript
// Detect Discord 429 and queue retry
client.rest.on('rateLimited', (info) => {
  console.warn(`[RateLimit] Route: ${info.route}, Retry after: ${info.timeToReset}ms`);
});

// Exponential backoff for external API calls
async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url);
    if (res.status !== 429) return res;
    const retryAfter = parseInt(res.headers.get('Retry-After') ?? '1') * 1000;
    await new Promise(r => setTimeout(r, retryAfter));
  }
  throw new Error('Max retries exceeded');
}
```

## CSRF for Dashboard APIs
```typescript
// next.js middleware — validate Origin header for state-mutating routes
export function middleware(req: NextRequest) {
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
    const origin = req.headers.get('origin');
    const host = req.headers.get('host');
    if (!origin || !origin.includes(host ?? '')) {
      return new NextResponse('Forbidden', { status: 403 });
    }
  }
}
```

## Dependency Audit
```bash
npm audit --audit-level=high
npx better-npm-audit audit
```
Run before every deployment.
