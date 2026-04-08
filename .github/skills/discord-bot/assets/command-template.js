/**
 * COMMAND TEMPLATE — CharlesNaig Hybrid Template
 * 
 * File location: src/commands/<category>/CommandName.js
 * File naming:   PascalCase — e.g. Ban.js, GiveCoins.js, UserInfo.js
 * 
 * Slash option types (raw API):
 *   3 = STRING  | 4 = INTEGER | 5 = BOOLEAN | 6 = USER
 *   7 = CHANNEL | 8 = ROLE    | 9 = MENTIONABLE | 10 = NUMBER
 */

import Command from "../../structures/Command.js";
import {
    ContainerBuilder,
    TextDisplayBuilder,
    SeparatorBuilder,
    SeparatorSpacingSize,
} from "discord.js";
import { getEmoji, StatusEmojis } from "../../utils/emoji.js";
import { resolveColor } from "../../utils/resolveColor.js";

export default class CommandName extends Command {
    constructor(client) {
        super(client, {
            name: 'command-name',           // kebab-case, matches slash command name
            description: {
                content: 'What this command does.',
                usage: '<required> [optional]',
                examples: ['command-name @user', 'command-name @user spamming'],
            },
            aliases: [],                    // prefix command aliases
            category: 'utility',            // matches src/commands/<category> folder
            cooldown: 5,                    // seconds between uses per user
            args: false,                    // true = prefix requires at least one arg
            permissions: {
                dev: false,                 // true = owner only (ownerID in config)
                client: ['SendMessages', 'ViewChannel', 'EmbedLinks'],
                user: [],                   // e.g. ['BanMembers', 'KickMembers']
            },
            slashCommand: true,
            options: [
                // Raw Discord API slash command option objects
                { name: 'user', description: 'The target user', type: 6, required: true },
                { name: 'reason', description: 'The reason', type: 3, required: false },
            ],
        });
    }

    /**
     * Command handler — works for BOTH slash and prefix commands via Context.
     * @param {import('../../structures/Context.js').default} ctx
     * @param {string[]} args  — prefix args (empty array for slash)
     */
    async run(ctx, args) {
        // ─── Get args — handle slash vs prefix ───────────────────────────────
        const target = ctx.isInteraction
            ? ctx.interaction.options.getMember('user')
            : ctx.message.mentions.members.first()
              || await ctx.guild.members.fetch(args[0]).catch(() => null);

        const reason = ctx.isInteraction
            ? ctx.interaction.options.getString('reason') || 'No reason provided'
            : args.slice(1).join(' ') || 'No reason provided';

        // ─── Validation ───────────────────────────────────────────────────────
        if (!target) {
            return ctx.sendTypedMessage({
                embed: this.client.embed()
                    .setColor(this.client.color.error)
                    .setDescription(`${StatusEmojis.error} User not found.`),
                message: `${StatusEmojis.error} User not found.`,
            });
        }

        // ─── Your core logic ─────────────────────────────────────────────────
        // ... do the thing ...

        // ─── Embed Format (classic) ───────────────────────────────────────────
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

        // ─── Components V2 Format (new Discord UI) ────────────────────────────
        const container = new ContainerBuilder()
            .setAccentColor(resolveColor(this.client.color.success))
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`# ${getEmoji('success', '✅')} Action Completed`),
            )
            .addSeparatorComponents(
                new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small),
            )
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`${getEmoji('member', '👤')} **User:** ${target}`),
                new TextDisplayBuilder().setContent(`${getEmoji('info', '📝')} **Reason:** ${reason}`),
                new TextDisplayBuilder().setContent(`\u200b`),
                new TextDisplayBuilder().setContent(`-# Requested by ${ctx.author.tag}`),
            );

        // ─── Message Format (plain text fallback) ─────────────────────────────
        const message = [
            `${getEmoji('success', '✅')} **Action Completed**`,
            `${getEmoji('member', '👤')} **User:** ${target}`,
            `${getEmoji('info', '📝')} **Reason:** ${reason}`,
        ].join('\n');

        // ─── Send — respects guild's configured message type ──────────────────
        return ctx.sendTypedMessage({ embed, componentsv2: [container], message });
    }
}
