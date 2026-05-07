---
name: discord-bot
description: "Discord.js v14 bot development with the CharlesNaig Hybrid Template. Use for commands, events, components, schemas, permissions, cooldowns, MongoDB/Mongoose, moderation, economy, music, leveling, tickets, and bot UI."
argument-hint: "Describe the Discord bot feature or fix."
---

# Discord Bot Skill

## When To Use

- Building or modifying Discord.js v14 bot features.
- Working in the CharlesNaig Hybrid Template.
- Creating commands, events, components, schemas, moderation, economy, music, leveling, tickets, or welcome systems.

## Template Rules

The CharlesNaig Hybrid Template uses:

| Layer | Choice |
|---|---|
| Runtime | Node.js 20+ |
| Library | discord.js v14 |
| Language | JavaScript ES Modules |
| Database | MongoDB via Mongoose |
| Config | `src/config.js` |
| Responses | embed + componentsv2 + message |

Use `.github/discord-bot-template` as the local reference template when available.

## Command Pattern

- Commands are classes extending `Command`.
- Files use PascalCase: `Ban.js`, `GiveCoins.js`.
- Command names use kebab-case: `give-coins`.
- Commands implement `async run(ctx, args)`.
- Use `ctx` methods instead of calling `interaction.reply()` directly.
- Build all configured response formats: `embed`, `componentsv2`, and `message`.

Required command shape:

```javascript
import Command from "../../structures/Command.js";

export default class CommandName extends Command {
    constructor(client) {
        super(client, {
            name: 'command-name',
            description: {
                content: 'What this command does.',
                usage: '<required> [optional]',
                examples: ['command-name example'],
            },
            aliases: [],
            category: 'utility',
            cooldown: 3,
            args: false,
            permissions: {
                dev: false,
                client: ['SendMessages', 'ViewChannel', 'EmbedLinks'],
                user: [],
            },
            slashCommand: true,
            options: [],
        });
    }

    async run(ctx, args) {
        return ctx.sendTypedMessage({ embed, componentsv2: [container], message });
    }
}
```

## Context API

Use `ctx` for hybrid slash/prefix behavior:

- `ctx.isInteraction`
- `ctx.author`
- `ctx.guild`
- `ctx.channel`
- `ctx.member`
- `ctx.sendTypedMessage({ embed, componentsv2, message })`
- `ctx.editTypedMessage({ embed, componentsv2, message })`
- `ctx.sendDeferMessage('Loading...')`
- `ctx.sendFollowUp({ content })`

## Colors And Emojis

- Use `this.client.color.*` for embed colors.
- Use `resolveColor()` for Components v2 accent colors.
- Use `getEmoji()` and `StatusEmojis`.
- Do not hardcode bot colors or raw status emoji strings when utilities exist.

## Mongoose Rules

- Schemas live in `src/schemas/`.
- Use String IDs for Discord snowflakes.
- Export schemas as `models.Name || model('Name', schema)`.
- Use atomic updates such as `findOneAndUpdate` with `upsert` for create-or-update flows.

## Anti-Patterns

- Do not use `SlashCommandBuilder` `data`/`execute` exports in the hybrid template.
- Do not add TypeScript syntax to JavaScript bot files.
- Do not call `interaction.reply()` directly inside commands.
- Do not skip `message` or `componentsv2` formats for command responses.
- Do not use Prisma in the bot template unless the project has intentionally changed stack.
