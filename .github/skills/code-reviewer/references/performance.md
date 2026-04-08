# Performance Checklist

## Database

### Avoid N+1 Queries
```typescript
// ❌ N+1
const members = await prisma.member.findMany({ where: { guildId } });
for (const m of members) {
  const guild = await prisma.guild.findUnique({ where: { id: m.guildId } });
}

// ✅ Single query with include
const members = await prisma.member.findMany({
  where: { guildId },
  include: { guild: true },
});
```

### Use Indexes
```prisma
// Always add @@index for fields used in where/orderBy
model Member {
  @@index([guildId])
  @@index([userId, guildId])
}
```

### Pagination
```typescript
// ❌ Fetching all records
const all = await prisma.member.findMany({ where: { guildId } });

// ✅ Cursor-based pagination
const page = await prisma.member.findMany({
  where: { guildId },
  take: 10,
  skip: cursor ? 1 : 0,
  cursor: cursor ? { id: cursor } : undefined,
  orderBy: { balance: 'desc' },
});
```

## Discord.js

### Use Fetch, Not Cache
```typescript
// ❌ Stale cache
guild.members.cache.get(userId); // might return undefined or stale data

// ✅ Fetch fresh data
const member = await guild.members.fetch(userId).catch(() => null);
```

### Batch Operations
```typescript
// ❌ One API call per message
for (const id of messageIds) {
  await channel.messages.delete(id);
}

// ✅ Bulk delete (max 100, within 14 days)
await channel.bulkDelete(messageIds);
```

### Avoid Unnecessary Fetches
- Enable `partials` only for events that need them
- Use `makeCache` option to limit cache size for large bots
- Enable `MessageContent` intent only if you need `message.content`

## Next.js

### Minimize Client Bundle
```typescript
// ❌ Importing heavy lib in Client Component
'use client';
import { heavyLib } from 'heavy-package'; // goes into client bundle

// ✅ Load in Server Component or use dynamic import
import dynamic from 'next/dynamic';
const HeavyComponent = dynamic(() => import('./HeavyComponent'), { ssr: false });
```

### Use Next.js Caching
```typescript
// Built-in fetch caching
const data = await fetch(url, {
  next: { revalidate: 60 }, // revalidate every 60s
});

// On-demand revalidation
import { revalidatePath } from 'next/cache';
revalidatePath('/dashboard');
```

### Image Optimization
```tsx
// ❌
<img src="/hero.png" />

// ✅ — Next.js handles lazy load + WebP conversion + sizing
<Image src="/hero.png" alt="Hero" width={1200} height={600} priority />
```
