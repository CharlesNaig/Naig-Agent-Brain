# Moderation System Reference — Hybrid Template

## Existing Commands (already in template)
| File | Command | Permissions |
|---|---|---|
| `Ban.js` | `/ban` | BanMembers |
| `Kick.js` | `/kick` | KickMembers |
| `Timeout.js` | `/timeout` | ModerateMembers |
| `Warn.js` | `/warn` | ManageMessages |
| `Warnings.js` | `/warnings` | ManageMessages |
| `Purge.js` | `/purge` | ManageMessages |
| `Lock.js` | `/lock` | ManageChannels |
| `Slowmode.js` | `/slowmode` | ManageChannels |

## Existing Schema — `src/schemas/Warning.js`
```javascript
import pkg from 'mongoose';
const { Schema, model, models } = pkg;

// Already defined in the template — import it in your commands:
import Warning from '../../schemas/Warning.js';
```

## Adding New Mod Commands — Pattern from `Ban.js`

```javascript
import Command from "../../structures/Command.js";
import { ContainerBuilder, TextDisplayBuilder, SeparatorBuilder, SeparatorSpacingSize } from "discord.js";
import { getEmoji, StatusEmojis } from "../../utils/emoji.js";
import { resolveColor } from "../../utils/resolveColor.js";
import Warning from "../../schemas/Warning.js";

export default class MyModCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'mymod',
            description: { content: '...', usage: '<@user> [reason]', examples: [] },
            category: 'moderation',
            cooldown: 5,
            args: true,
            permissions: {
                dev: false,
                client: ['SendMessages', 'ViewChannel', 'EmbedLinks', 'BanMembers'],
                user: ['BanMembers'],
            },
            slashCommand: true,
            options: [
                { name: 'user', description: 'Target user', type: 6, required: true },
                { name: 'reason', description: 'Reason', type: 3, required: false },
            ],
        });
    }

    async run(ctx, args) {
        const member = ctx.isInteraction
            ? ctx.interaction.options.getMember('user')
            : ctx.message.mentions.members.first() || await ctx.guild.members.fetch(args[0]).catch(() => null);

        const reason = ctx.isInteraction
            ? ctx.interaction.options.getString('reason') || 'No reason provided'
            : args.slice(1).join(' ') || 'No reason provided';

        // Always check:
        if (!member) return ctx.sendTypedMessage({
            embed: this.client.embed().setColor(this.client.color.error).setDescription(`${StatusEmojis.error} User not found.`),
            message: `${StatusEmojis.error} User not found.`,
        });

        if (!member.bannable) return ctx.sendTypedMessage({
            embed: this.client.embed().setColor(this.client.color.error).setDescription(`${StatusEmojis.error} I cannot moderate this member.`),
            message: `${StatusEmojis.error} I cannot moderate this member.`,
        });

        if (ctx.member.roles.highest.position <= member.roles.highest.position) return ctx.sendTypedMessage({
            embed: this.client.embed().setColor(this.client.color.error).setDescription(`${StatusEmojis.error} You can't moderate someone with equal or higher role.`),
            message: `${StatusEmojis.error} Role hierarchy violation.`,
        });

        // DM target before actioning:
        await member.user.send({ content: `You have been actioned in **${ctx.guild.name}**.\nReason: ${reason}` }).catch(() => {});

        // Save warning:
        const warning = new Warning({ guildId: ctx.guild.id, userId: member.id, moderatorId: ctx.author.id, reason });
        await warning.save();

        this.client.logger.info(`[MyMod] ${member.user.tag} actioned in ${ctx.guild.name} by ${ctx.author.tag}`);

        // Build triple format:
        const embed = this.client.embed()
            .setColor(this.client.color.error)
            .setTitle(`${getEmoji('ban', '🔨')} Action Applied`)
            .addFields(
                { name: `${getEmoji('member', '👤')} User`, value: `${member.user.tag} (${member.id})`, inline: true },
                { name: `${getEmoji('moderator', '🛡️')} Moderator`, value: ctx.author.tag, inline: true },
                { name: `${getEmoji('info', '📝')} Reason`, value: reason },
            )
            .setThumbnail(member.user.displayAvatarURL({ size: 128 }))
            .setTimestamp();

        const container = new ContainerBuilder()
            .setAccentColor(resolveColor(this.client.color.error))
            .addTextDisplayComponents(new TextDisplayBuilder().setContent(`# ${getEmoji('ban', '🔨')} Action Applied`))
            .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small))
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`${getEmoji('member', '👤')} **User:** ${member.user.tag}`),
                new TextDisplayBuilder().setContent(`${getEmoji('moderator', '🛡️')} **Moderator:** ${ctx.author.tag}`),
                new TextDisplayBuilder().setContent(`${getEmoji('info', '📝')} **Reason:** ${reason}`),
            );

        const message = [
            `${getEmoji('ban', '🔨')} **Action Applied**`,
            `${getEmoji('member', '👤')} **User:** ${member.user.tag}`,
            `${getEmoji('moderator', '🛡️')} **Moderator:** ${ctx.author.tag}`,
            `${getEmoji('info', '📝')} **Reason:** ${reason}`,
        ].join('\n');

        return ctx.sendTypedMessage({ embed, componentsv2: [container], message });
    }
}
```

## Log Channel Pattern
Send a log embed to the guild's configured log channel after every mod action:
```javascript
const settings = await this.client.getGuildSettings(ctx.guild.id);
if (settings?.logChannelId) {
    const logChannel = ctx.guild.channels.cache.get(settings.logChannelId);
    if (logChannel?.isTextBased()) await logChannel.send({ embeds: [embed] });
}
```

