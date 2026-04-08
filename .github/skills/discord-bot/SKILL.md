---
name: discord-bot
description: "Heavy-duty Discord bot development with discord.js v14+ using the CharlesNaig Hybrid Template. Use when: building slash commands, prefix commands, hybrid commands, buttons, select menus, modals, event handlers, cron jobs, permission systems, cooldown guards, MongoDB/Mongoose integration, rate limit handling, multi-guild bots, bot sharding, music bots (Shoukaku/Lavalink), economy systems, leveling systems, ticket systems, moderation bots, welcome/farewell messages, webhook management. Triggers: discord bot, slash command, prefix command, discord.js, bot command, discord event, bot embed, bot music, bot economy, bot leveling, bot moderation, bot ticket, bot cron, hybrid bot, BotClient, Command class, Context class, MessageBuilder, sendTypedMessage, componentsv2 discord."
argument-hint: "Describe what you want to build (e.g. 'ban command with all 3 message type formats')"
---

# Discord Bot — Hybrid Template Skill

> **This skill is based on the [CharlesNaig/Discord.js-v14-Hybrid-Template-Bot](https://github.com/CharlesNaig/Discord.js-v14-Hybrid-Template-Bot).**
> All code MUST follow this exact template's classes, patterns, and file structure.

## When to Use
- Building or modifying bot using the CharlesNaig Hybrid Template
- New commands (slash + prefix hybrid), events, components
- Economy, leveling, moderation, music, ticket, or welcome systems
- Sharding, MongoDB schemas, rate limiting, cooldowns

## Tech Stack
| Layer | Choice |
|---|---|
| Runtime | Node.js 20+ |
| Library | discord.js v14 |
| **Language** | **JavaScript (ES Modules — NOT TypeScript)** |
| DB | MongoDB via Mongoose |
| Logger | signale (via `Logger.js`) |
| Sharding | `sharder.js` at root using `ShardingManager` |
| Config | `src/config.js` (central, env-driven) |

## Project Structure
```
Discord.js-v14-Hybrid-Template-Bot/
├── sharder.js                    # ShardingManager entry point
├── .env.example                  # All env vars documented here
├── src/
│   ├── index.js                  # Instantiates BotClient → client.start()
│   ├── config.js                 # Colors, emojis, tokens, links — ALL config
│   ├── commands/
│   │   ├── config/               # Guild config commands
│   │   ├── dev/                  # Developer-only commands
│   │   ├── info/                 # Info commands (Ping, Stats, Help, About)
│   │   ├── moderation/           # Mod commands (Ban, Kick, Warn, etc.)
│   │   └── utility/              # General utility commands
│   ├── events/
│   │   ├── AutoMod/              # AutoMod events
│   │   ├── Channel/              # Channel create/delete/update
│   │   ├── Client/               # ready.js, InteractionCreate.js, MessageCreate.js
│   │   ├── Guild/                # guildCreate/Delete/Update
│   │   ├── Member/               # guildMemberAdd/Remove
│   │   ├── Message/              # messageUpdate/Delete
│   │   ├── Moderation/           # banAdd/banRemove
│   │   ├── Role/                 # roleCreate/Delete/Update
│   │   └── Voice/                # voiceStateUpdate
│   ├── schemas/                  # Mongoose schemas
│   │   ├── Guild.js              # Guild settings
│   │   ├── Warning.js            # Moderation warnings
│   │   ├── prefix.js             # Per-guild prefix
│   │   └── 247.js                # 24/7 voice channel
│   ├── structures/               # Base classes (DO NOT edit unless extending)
│   │   ├── BotClient.js          # Extended Client
│   │   ├── Command.js            # Base Command class
│   │   ├── Event.js              # Base Event class
│   │   ├── ComponentHandler.js   # Base ComponentHandler class
│   │   ├── Context.js            # Hybrid ctx abstraction
│   │   └── Logger.js             # signale logger
│   └── utils/
│       ├── emoji.js              # getEmoji(), StatusEmojis
│       ├── formatters.js         # formatUptime, formatBytes, truncate, timestamp
│       ├── messageBuilder.js     # MessageBuilder (triple-format)
│       ├── pagination.js         # Paginated embeds/components
│       └── resolveColor.js       # Hex → decimal color converter
```

---

## Core Concepts

### The Hybrid System
Every command works as BOTH a slash command AND a prefix command. The `Context` class (`ctx`) abstracts the difference:

```javascript
// ctx works the same regardless of slash or prefix origin
ctx.isInteraction              // true = slash, false = prefix
ctx.author                     // User — works for both
ctx.guild, ctx.channel, ctx.member // same for both
ctx.sendTypedMessage({ embed, componentsv2, message })   // respects guild setting
ctx.editTypedMessage({ embed, componentsv2, message })
ctx.sendDeferMessage('Loading...')  // defers slash, sends message for prefix
ctx.sendFollowUp({ content })

// Slash-only data access:
ctx.interaction.options.getMember('user')
ctx.interaction.options.getString('reason')
ctx.interaction.options.getInteger('amount')

// Prefix-only data access:
ctx.message.mentions.members.first()
args[0]           // first word after command name
args.slice(1).join(' ')  // rest of args as string
```

### Triple Message Format
Guild admins can configure their preferred message type via `/config messagetype`. Every command must provide **all three formats**:

| Type | Class | How Used |
|---|---|---|
| `embed` | `EmbedBuilder` | Classic Discord embed |
| `componentsv2` | `ContainerBuilder` | Discord Components v2 (new UI) |
| `message` | Plain string | Text-only fallback |

Use `MessageBuilder` for simple responses, or build all three manually like the canon commands do.

### `config.js` Colors
```javascript
// this.client.color  — hex strings for EmbedBuilder.setColor()
this.client.color.default   // '#5865F2'
this.client.color.error     // '#ED4245'
this.client.color.success   // '#57F287'
this.client.color.info      // '#00A8FC'
this.client.color.warn      // '#FEE75C'

// this.client.config.colors — decimals for ContainerBuilder.setAccentColor()
// Use resolveColor(this.client.color.xxx) to convert hex → decimal
import { resolveColor } from '../../utils/resolveColor.js';
container.setAccentColor(resolveColor(this.client.color.error));
```

---

## Procedure

### 1. New Command

**File**: `src/commands/<category>/CommandName.js` (PascalCase filename)

```javascript
import Command from "../../structures/Command.js";
import { ContainerBuilder, TextDisplayBuilder, SeparatorBuilder, SeparatorSpacingSize } from "discord.js";
import { getEmoji, StatusEmojis } from "../../utils/emoji.js";
import { resolveColor } from "../../utils/resolveColor.js";

export default class CommandName extends Command {
    constructor(client) {
        super(client, {
            name: 'command-name',       // kebab-case, matches filename roughly
            description: {
                content: 'What this command does.',
                usage: '<required> [optional]',
                examples: ['command-name @user', 'command-name 123456'],
            },
            aliases: ['alias1'],        // prefix aliases
            category: 'utility',        // folder name
            cooldown: 5,                // seconds
            args: false,                // requires arguments for prefix?
            permissions: {
                dev: false,             // owner-only command?
                client: ['SendMessages', 'ViewChannel', 'EmbedLinks'],
                user: [],               // e.g. ['BanMembers']
            },
            slashCommand: true,
            options: [
                // Discord slash command options (raw API format):
                { name: 'user', description: 'Target user', type: 6, required: true },
                { name: 'reason', description: 'Reason', type: 3, required: false },
            ],
        });
    }

    async run(ctx, args) {
        // ─── Get args for both slash and prefix ───
        const target = ctx.isInteraction
            ? ctx.interaction.options.getMember('user')
            : ctx.message.mentions.members.first() || await ctx.guild.members.fetch(args[0]).catch(() => null);

        const reason = ctx.isInteraction
            ? ctx.interaction.options.getString('reason') || 'No reason provided'
            : args.slice(1).join(' ') || 'No reason provided';

        if (!target) {
            return ctx.sendTypedMessage({
                embed: this.client.embed().setColor(this.client.color.error).setDescription(`${StatusEmojis.error} User not found.`),
                message: `${StatusEmojis.error} User not found.`,
            });
        }

        // ─── Embed Format ───
        const embed = this.client.embed()
            .setColor(this.client.color.success)
            .setTitle(`${getEmoji('success', '✅')} Action Completed`)
            .addFields(
                { name: `${getEmoji('member', '👤')} User`, value: `${target}`, inline: true },
                { name: `${getEmoji('info', '📝')} Reason`, value: reason, inline: false },
            )
            .setThumbnail(target.user.displayAvatarURL({ size: 128 }))
            .setFooter({ text: `Requested by ${ctx.author.tag}`, iconURL: ctx.author.displayAvatarURL() })
            .setTimestamp();

        // ─── Components V2 Format ───
        const container = new ContainerBuilder()
            .setAccentColor(resolveColor(this.client.color.success))
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`# ${getEmoji('success', '✅')} Action Completed`),
            )
            .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small))
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`${getEmoji('member', '👤')} **User:** ${target}`),
                new TextDisplayBuilder().setContent(`${getEmoji('info', '📝')} **Reason:** ${reason}`),
                new TextDisplayBuilder().setContent(`-# Requested by ${ctx.author.tag}`),
            );

        // ─── Message Format ───
        const message = [
            `${getEmoji('success', '✅')} **Action Completed**`,
            `${getEmoji('member', '👤')} **User:** ${target}`,
            `${getEmoji('info', '📝')} **Reason:** ${reason}`,
        ].join('\n');

        return ctx.sendTypedMessage({ embed, componentsv2: [container], message });
    }
}
```

See [full command template](./assets/command-template.js).

### 2. Using MessageBuilder (Simpler Alternative)

For commands that don't need highly custom V2 layouts:

```javascript
import { MessageBuilder } from '../../utils/messageBuilder.js';

// Inside run(ctx, args):
const response = new MessageBuilder()
    .setTitle(`${StatusEmojis.success} Done`)
    .setDescription('Operation completed successfully.')
    .setColor(this.client.color.success)
    .addField('User', `${target}`, true)
    .addField('Reason', reason, false)
    .setFooter(`Requested by ${ctx.author.tag}`)
    .setTimestamp(true)
    .build(); // returns { embed, componentsv2, message }

return ctx.sendTypedMessage(response);
```

### 3. New Event

**File**: `src/events/<Category>/EventName.js` (Category = PascalCase folder, e.g. `Member`, `Client`, `Moderation`)

```javascript
import Event from "../../structures/Event.js";
import { Events } from "discord.js";

export default class GuildMemberAdd extends Event {
    constructor(client, file) {
        super(client, file, {
            name: Events.GuildMemberAdd, // from discord.js Events enum
            once: false,
        });
    }

    async run(member) {
        if (!member.guild) return;
        // your logic here — access this.client for BotClient
        this.client.logger.info(`${member.user.tag} joined ${member.guild.name}`);
    }
}
```

See [event template](./assets/event-template.js).

### 4. New ComponentHandler (Button / SelectMenu / Modal)

**File**: `src/events/Client/` or a dedicated `src/components/` folder

```javascript
import ComponentHandler from "../../structures/ComponentHandler.js";

export default class MyButtonHandler extends ComponentHandler {
    constructor(client) {
        super(client, {
            customId: /^myaction:/, // regex OR exact string
            type: 'button',         // 'button' | 'selectMenu' | 'modal'
            cooldown: 3,
        });
    }

    async run(interaction) {
        const [action, userId, data] = interaction.customId.split(':');
        if (interaction.user.id !== userId) {
            return interaction.reply({ content: '`❌` This is not your button.', ephemeral: true });
        }
        await interaction.reply({ content: '`✅` Done!', ephemeral: true });
    }
}
```

### 5. Mongoose Schema

**File**: `src/schemas/SchemaName.js`

```javascript
import pkg from 'mongoose';
const { Schema, model, models } = pkg;

const mySchema = new Schema({
    _id: { type: String },          // Always use _id = Discord snowflake ID (guild/user)
    guildId: { type: String, required: true },
    userId: { type: String, required: true },
    value: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

export default models.MyModel || model('MyModel', mySchema);
```

### 6. Emojis

```javascript
import { getEmoji, StatusEmojis } from '../../utils/emoji.js';

// Custom emoji with unicode fallback:
getEmoji('ban', '🔨')       // returns custom or '`🔨`'
getEmoji('member', '👤')

// Pre-built status (always unicode, safe everywhere):
StatusEmojis.success   // '`✅`'
StatusEmojis.error     // '`❌`'
StatusEmojis.warning   // '`⚠️`'
StatusEmojis.loading   // '`⏳`'
StatusEmojis.info      // '`ℹ️`'
```

### 7. Logging

```javascript
this.client.logger.info('Message');    // ℹ info
this.client.logger.warn('Warning');    // ⚠ warn
this.client.logger.error(err);         // ✖ error + stack
this.client.logger.debug('Debug');     // 🐛 debug
this.client.logger.cmd('Cmd loaded');  // ⌨️ cmd
this.client.logger.event('Event loaded'); // 🎫 event
this.client.logger.ready('Connected');    // ✔️ ready
```

---

## Key Rules

- **JavaScript only** — no TypeScript. Use JSDoc `/** @param */` for type hints
- **PascalCase filenames** for commands and events: `Ban.js`, `GuildMemberAdd.js`
- **always build all 3 formats**: embed + componentsv2 + message in every `run()`
- **Use `ctx` methods** — never call `interaction.reply()` directly in commands
- **Colors via `this.client.color`** (hex) and `resolveColor()` for V2 containers
- **Emojis via `getEmoji()`** — never hardcode emoji strings directly
- **No Prisma** — MongoDB only via Mongoose schemas in `src/schemas/`
- **Secrets in `.env`** — reference `this.client.config.xxx` from `config.js`
- **Slash options use raw API types**: `type: 6` = USER, `type: 3` = STRING, `type: 4` = INTEGER, `type: 5` = BOOLEAN, `type: 7` = CHANNEL, `type: 8` = ROLE
- **Cooldowns** handled automatically by `BotClient` via `this.client.cooldowns` Collection
- **Dev commands** — set `permissions: { dev: true }` for owner-only commands

## References
- [Embed Design Guide](./references/embeds.md)
- [Moderation System](./references/moderation.md)
- [Economy System](./references/economy.md)
- [Music Bot (Lavalink)](./references/music.md)
- [Command Template](./assets/command-template.js)
- [Event Template](./assets/event-template.js)
- [ComponentHandler Template](./assets/component-template.js)
