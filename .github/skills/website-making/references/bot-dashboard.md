# Bot Dashboard — Discord OAuth2 Setup

## Environment Variables
```env
DISCORD_CLIENT_ID=your_application_client_id
DISCORD_CLIENT_SECRET=your_application_client_secret
DISCORD_BOT_TOKEN=your_bot_token
NEXTAUTH_SECRET=random_32_char_string
NEXTAUTH_URL=http://localhost:3000
```

## NextAuth.js v5 Config (`lib/auth.ts`)
```typescript
import NextAuth from 'next-auth';
import Discord from 'next-auth/providers/discord';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: {
        params: { scope: 'identify email guilds' },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) token.accessToken = account.access_token;
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
});
```

## Fetching User Guilds (Server Component)
```typescript
import { auth } from '@/lib/auth';

export async function getUserGuilds() {
  const session = await auth();
  if (!session?.accessToken) return [];

  const res = await fetch('https://discord.com/api/users/@me/guilds', {
    headers: { Authorization: `Bearer ${session.accessToken}` },
    next: { revalidate: 60 }, // cache 60s
  });

  if (!res.ok) return [];
  const guilds = await res.json();
  // Only return guilds where user has MANAGE_GUILD permission
  return guilds.filter((g: any) => (BigInt(g.permissions) & 0x20n) === 0x20n);
}
```

## Fetching Bot Guild Data (Server-Side Only)
```typescript
// NEVER call this from a Client Component
export async function getBotGuild(guildId: string) {
  const res = await fetch(`https://discord.com/api/guilds/${guildId}`, {
    headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
    next: { revalidate: 30 },
  });
  if (!res.ok) return null;
  return res.json();
}
```

## Route Protection (Middleware)
```typescript
// middleware.ts
export { auth as middleware } from '@/lib/auth';

export const config = {
  matcher: ['/dashboard/:path*'],
};
```
