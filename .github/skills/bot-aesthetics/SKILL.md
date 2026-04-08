---
name: bot-aesthetics
description: "Design system and aesthetic guidelines specifically for Discord bots — embed branding, color palette creation, response consistency, bot personality design, status messages, animated responses, server-specific themes, seasonal themes, trophy/achievement card design, rank cards, level-up announcements, welcome messages. Use when: making bot responses look better, designing a bot's visual identity, creating rank cards, designing profile cards, level-up embed design, aesthetic server embeds, bot branding, themed commands, emoji guidelines, consistent bot personality. Triggers: make it aesthetic, bot design, rank card, profile card, level up design, welcome embed, bot branding, embed style, bot look, visual identity, server theme."
argument-hint: "Describe what you want to make aesthetic (e.g. 'design a rank card embed for my leveling bot')"
---

# Bot Aesthetics Skill

## When to Use
- Building or improving the visual identity of a Discord bot
- Designing rank cards, profile cards, level-up announcements
- Creating welcome/farewell embeds with personality
- Making a bot's responses feel cohesive and on-brand
- Seasonal or server-themed embed sets
- Achievement/trophy card design

## Bot Identity Framework

### Step 1: Define Your Bot's Palette
A bot should have 3-5 core colors:
```
Primary   → Used on main info/neutral commands
Accent    → Highlights, rare events, premium features  
Success   → Positive outcomes (level up, purchase success)
Danger    → Errors, bans, losses
Background→ Used for rank cards, profile backgrounds
```

### Step 2: Pick an Emoji Identity
Choose ONE visual style and stick to it:
| Style | Examples | Best For |
|---|---|---|
| Unicode Standard | ✅❌⚠️🎮🏆 | Simple, works everywhere |
| Unicode Animated | — (server emoji only) | Premium, expressive |
| Flat Icon Set | 🔵🟢🔴🟡 | Clean, minimal aesthetic |
| Custom Server Emojis | `:customemoji:` | Branded, exclusive feel |

### Step 3: Define Response Personality
Pick a voice and stay consistent:
- **Friendly & Casual**: "Hey {user}! You just hit level 10! 🎉"
- **Professional**: "Level milestone reached. Current level: 10."
- **Playful**: "BOOM! Level 10 unlocked, {user}! Who's unstoppable now?? 🚀"
- **RPG/Fantasy**: "Brave adventurer {user} has ascended to Rank 10! ⚔️"

## Rank Card Design

Canvas-based rank cards using `@napi-rs/canvas`:
```typescript
import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas';

export async function generateRankCard(opts: {
  username: string;
  avatarURL: string;
  level: number;
  xp: number;
  xpRequired: number;
  rank: number;
  accentColor: string; // hex
}): Promise<Buffer> {
  const canvas = createCanvas(934, 282);
  const ctx = canvas.getContext('2d');

  // Dark background
  ctx.fillStyle = '#2b2d31';
  ctx.roundRect(0, 0, canvas.width, canvas.height, 20);
  ctx.fill();

  // Avatar (circular)
  const avatar = await loadImage(opts.avatarURL + '?size=256');
  ctx.save();
  ctx.beginPath();
  ctx.arc(141, 141, 100, 0, Math.PI * 2);
  ctx.clip();
  ctx.drawImage(avatar, 41, 41, 200, 200);
  ctx.restore();

  // XP Progress bar background
  ctx.fillStyle = '#1e1f22';
  ctx.roundRect(280, 195, 580, 30, 15);
  ctx.fill();

  // XP Progress bar fill
  const progress = Math.min(opts.xp / opts.xpRequired, 1);
  ctx.fillStyle = opts.accentColor;
  ctx.roundRect(280, 195, 580 * progress, 30, 15);
  ctx.fill();

  // Username
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px Sans';
  ctx.fillText(opts.username, 280, 175);

  // Level
  ctx.fillStyle = opts.accentColor;
  ctx.font = 'bold 28px Sans';
  ctx.fillText(`Level ${opts.level}`, 700, 170);

  // Rank
  ctx.fillStyle = '#b5bac1';
  ctx.font = '24px Sans';
  ctx.fillText(`Rank #${opts.rank}`, 280, 140);

  // XP Text
  ctx.fillStyle = '#80848e';
  ctx.font = '20px Sans';
  ctx.fillText(`${opts.xp.toLocaleString()} / ${opts.xpRequired.toLocaleString()} XP`, 280, 245);

  return canvas.toBuffer('image/png');
}
```

## Level-Up Embed Design

```typescript
// Dramatic level-up announcement
const levelUpEmbed = (member: GuildMember, level: number) =>
  new EmbedBuilder()
    .setColor(0xFEE75C)   // Golden for achievement
    .setTitle('⬆️ Level Up!')
    .setDescription(`**${member.displayName}** reached **Level ${level}**! 🎊`)
    .setThumbnail(member.displayAvatarURL({ size: 256 }))
    .addFields(
      { name: '🏆 New Level', value: `\`${level}\``, inline: true },
      { name: '🎁 Reward', value: getLevelReward(level) ?? 'None', inline: true },
    )
    .setTimestamp();
```

## Welcome Embed Design

```typescript
const welcomeEmbed = (member: GuildMember) =>
  new EmbedBuilder()
    .setColor(0x57F287)
    .setTitle(`Welcome to ${member.guild.name}! 👋`)
    .setDescription(
      `Hey ${member}! We're glad you're here.\n\n` +
      `📌 Read the rules in <#RULES_CHANNEL_ID>\n` +
      `🎭 Grab roles in <#ROLES_CHANNEL_ID>\n` +
      `💬 Introduce yourself in <#INTROS_CHANNEL_ID>`
    )
    .setThumbnail(member.displayAvatarURL({ size: 256 }))
    .setImage(member.guild.bannerURL({ size: 1024 }) ?? null)
    .setFooter({ text: `Member #${member.guild.memberCount}` })
    .setTimestamp();
```

## Seasonal Themes

Switch color palettes seasonally:
```typescript
function getSeasonalColor(): number {
  const month = new Date().getMonth(); // 0-indexed
  if (month === 11 || month === 0) return 0xC0392B; // Christmas red / winter
  if (month === 9) return 0xE67E22;                 // Halloween orange
  if (month === 1) return 0xE91E63;                 // Valentine pink
  if (month >= 2 && month <= 4) return 0x2ECC71;    // Spring green
  if (month >= 5 && month <= 7) return 0xF1C40F;    // Summer yellow
  return 0x5865F2;                                  // Default blurple
}
```

## Achievement Card Design

For trophy/achievement unlock notifications:
```typescript
new EmbedBuilder()
  .setColor(0xFFD700)           // Gold for achievements
  .setAuthor({ name: '🏆 Achievement Unlocked!' })
  .setTitle(achievement.name)
  .setDescription(achievement.description)
  .setThumbnail(achievement.imageURL)   // custom achievement artwork
  .addFields({ name: '🎁 Reward', value: achievement.reward })
  .setTimestamp();
```

## Status Rotation Template

```typescript
const STATUSES = [
  { name: '/help', type: ActivityType.Listening },
  { name: `${guild.memberCount} members`, type: ActivityType.Watching },
  { name: 'your commands', type: ActivityType.Playing },
  { name: 'bot.example.com', type: ActivityType.Watching },
];

let i = 0;
setInterval(() => {
  client.user?.setActivity(STATUSES[i % STATUSES.length]);
  i++;
}, 30_000);
```
