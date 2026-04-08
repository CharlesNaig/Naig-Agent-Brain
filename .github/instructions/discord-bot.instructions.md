---
description: "Use when writing, editing, or reviewing JavaScript code for CharlesNaig's Discord.js v14 Hybrid Template Bot — commands, events, components, schemas, or any src/ file in the bot project. Enforces the exact class-based hybrid (slash + prefix) patterns, Context API, triple message format (embed/componentsv2/message), Mongoose schemas, emoji utility, and BotClient conventions from https://github.com/CharlesNaig/Discord.js-v14-Hybrid-Template-Bot"
applyTo: ["src/commands/**", "src/events/**", "src/schemas/**", "src/utils/**"]
---

# Discord Bot — Hybrid Template Coding Rules

> These rules enforce the **CharlesNaig/Discord.js-v14-Hybrid-Template-Bot** conventions.
> Deviating from these patterns will break the bot's loader system.

## Language

- **JavaScript only** — NO TypeScript. No `.ts` files, no `import type`, no `: Type` annotations
- Use JSDoc comments for type hints: `/** @param {import('./Client.js').BotClient} client */`
- ES Modules (`import`/`export`) — always include `.js` extension in imports
- `"type": "module"` is set in package.json — all files use top-level `import`/`export`

## Command Structure — REQUIRED FORMAT

Every command MUST follow this exact class pattern:

```javascript
import Command from "../../structures/Command.js";

export default class CommandName extends Command {
    constructor(client) {
        super(client, {
            name: 'command-name',           // kebab-case
            description: {
                content: '...',             // required
                usage: '<user> [reason]',   // required
                examples: ['cmd @user'],    // required, array
            },
            aliases: [],                    // prefix aliases
            category: 'utility',            // must match folder name
            cooldown: 3,                    // seconds
            args: false,                    // true if prefix requires args
            permissions: {
                dev: false,
                client: ['SendMessages', 'ViewChannel', 'EmbedLinks'],
                user: [],
            },
            slashCommand: true,
            options: [],                    // raw API option objects
        });
    }

    async run(ctx, args) {
        // command logic
    }
}
```

NEVER use:
- `export const data = new SlashCommandBuilder()` pattern — wrong template
- `export async function execute(interaction)` pattern — wrong template
- `interaction.reply()` / `interaction.deferReply()` directly in commands — use `ctx.*`

## Context (ctx) — ALWAYS Use These Methods

```javascript
// ─── Reading arguments ───────────────────────────────────────────
ctx.isInteraction   // boolean: true=slash, false=prefix
ctx.author          // Discord User (works both ways)
ctx.guild           // Guild
ctx.channel         // Channel
ctx.member          // GuildMember

// Slash-specific:
ctx.interaction.options.getMember('user')
ctx.interaction.options.getString('text')
ctx.interaction.options.getInteger('amount')

// Prefix-specific:
ctx.message.mentions.members.first()
args[0]                            // first arg
args.slice(1).join(' ')           // rest of args as string

// ─── Sending responses ───────────────────────────────────────────
ctx.sendTypedMessage({ embed, componentsv2, message })   // main response
ctx.editTypedMessage({ embed, componentsv2, message })   // edit existing
ctx.sendDeferMessage('Loading...')                       // defer/loading
ctx.sendFollowUp({ content: '...' })                    // follow up
```

## Triple Message Format — ALWAYS Build All Three

Every `run()` that sends a response MUST provide all 3 formats:

```javascript
// embed     → EmbedBuilder
// componentsv2 → [ContainerBuilder]   (array)
// message   → plain string

return ctx.sendTypedMessage({ embed, componentsv2: [container], message });
```

Guild admins choose their preferred format via `/config messagetype`. If you only build `embed`, componentsv2 and message guilds will get broken responses.

## Colors — REQUIRED Convention

```javascript
// EmbedBuilder.setColor() — use hex string from this.client.color:
this.client.color.default   // '#5865F2' blurple
this.client.color.error     // '#ED4245'
this.client.color.success   // '#57F287'
this.client.color.info      // '#00A8FC'
this.client.color.warn      // '#FEE75C'

// ContainerBuilder.setAccentColor() — must use decimal via resolveColor():
import { resolveColor } from '../../utils/resolveColor.js';
container.setAccentColor(resolveColor(this.client.color.success));
```

NEVER hardcode hex like `.setColor(0x57F287)` or `.setColor('#57F287')` inline — use `this.client.color.*`.

## Emojis — REQUIRED Convention

```javascript
import { getEmoji, StatusEmojis } from '../../utils/emoji.js';

getEmoji('ban', '🔨')         // returns custom emoji or '`🔨`'
getEmoji('member', '👤')
getEmoji('info', '📝')

StatusEmojis.success   // '`✅`' — always use for positive status messages
StatusEmojis.error     // '`❌`' — always use for error messages
StatusEmojis.loading   // '`⏳`' — always use for deferred/loading state
StatusEmojis.warning   // '`⚠️`'
```

NEVER hardcode raw emoji strings like `'✅'` in message content — use `StatusEmojis.*` or `getEmoji()`.

## Embeds

- Use `this.client.embed()` — NOT `new EmbedBuilder()` — for consistency
- Always set `.setColor()`, `.setTimestamp()` on action embeds
- `.setFooter({ text: \`Requested by ${ctx.author.tag}\` })` on info commands
- Field values must never be empty string — use `'N/A'` or omit field

## Event Structure — REQUIRED FORMAT

```javascript
import Event from "../../structures/Event.js";
import { Events } from "discord.js";

export default class EventName extends Event {
    constructor(client, file) {
        super(client, file, {
            name: Events.GuildMemberAdd,  // Discord Events enum value
            once: false,
        });
    }
    async run(...args) {
        // handler code — use this.client for BotClient access
    }
}
```

NEVER: export `name`, `once`, `execute` as separate variables — use the class pattern.

## Schemas — REQUIRED FORMAT (Mongoose only, no Prisma)

```javascript
import pkg from 'mongoose';
const { Schema, model, models } = pkg;

const mySchema = new Schema({ _id: String, ... });
export default models.MyModel || model('MyModel', mySchema);
```

- `_id` = Discord snowflake (String), NOT auto-generated ObjectId
- Always use `models.Name || model('Name', schema)` to avoid re-registration errors

## File Naming

| Type | Convention | Example |
|---|---|---|
| Commands | PascalCase.js | `Ban.js`, `GiveCoins.js` |
| Events | PascalCase.js | `GuildMemberAdd.js`, `ready.js` |
| Schemas | PascalCase.js | `Guild.js`, `Warning.js` |
| Utils | camelCase.js | `emoji.js`, `formatters.js` |
| Structures | PascalCase.js | `Command.js`, `Event.js` |

## Anti-Patterns to Avoid
- `interaction.reply()` directly in a command — use `ctx.sendTypedMessage()`
- `data`/`execute` export pattern — wrong template, use `class extends Command`
- Prisma, Drizzle, or any ORM other than Mongoose — not in this template
- TypeScript types, `.ts` files, `interface`, `: string` annotations
- `new EmbedBuilder()` directly in commands — use `this.client.embed()`
- Hardcoded hex colors — use `this.client.color.*`
- Skipping the plain `message` format — always build all 3
