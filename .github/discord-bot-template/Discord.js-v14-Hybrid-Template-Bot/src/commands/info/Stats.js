import Command from "../../structures/Command.js";
import { version, ContainerBuilder, TextDisplayBuilder, SeparatorBuilder, SeparatorSpacingSize } from 'discord.js';
import os from 'os';
import { getEmoji, StatusEmojis } from "../../utils/emoji.js";
import { resolveColor } from "../../utils/resolveColor.js";
import { formatUptime, formatBytes } from "../../utils/formatters.js";

export default class Stats extends Command {
    constructor(client) {
        super(client, {
            name: 'stats',
            description: {
                content: 'Display bot statistics.',
                usage: 'stats',
                examples: ['stats'],
            },
            aliases: ['statistics', 'botstat'],
            category: 'info',
            cooldown: 3,
            permissions: {
                dev: false,
                client: ['SendMessages', 'ViewChannel', 'EmbedLinks'],
                user: [],
            },
            slashCommand: true,
        });
    }

    async run(ctx, args) {
        const uptime = formatUptime(this.client.uptime);
        const memUsed = formatBytes(process.memoryUsage().heapUsed);
        const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
        const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
        const servers = this.client.guilds.cache.size;
        const users = this.client.users.cache.size;
        const channels = this.client.channels.cache.size;
        const commands = this.client.commands.size;
        const wsPing = Math.round(this.client.ws.ping);

        // ─── Embed Format ───
        const embed = this.client.embed()
            .setColor(this.client.color.default)
            .setAuthor({ name: 'Bot Statistics', iconURL: this.client.user.displayAvatarURL() })
            .setThumbnail(this.client.user.displayAvatarURL())
            .addFields([
                { name: `${getEmoji('bot', '🤖')} Bot Information`, value: `\`\`\`yml\nServers: ${servers}\nUsers: ${users}\nChannels: ${channels}\nCommands: ${commands}\`\`\``, inline: false },
                { name: `${getEmoji('clock', '⏰')} Uptime`, value: `\`\`\`yml\n${uptime}\`\`\``, inline: true },
                { name: `${getEmoji('clock', '🏓')} Ping`, value: `\`\`\`yml\nWS: ${wsPing}ms\`\`\``, inline: true },
                { name: `${getEmoji('info', '💾')} Memory`, value: `\`\`\`yml\nUsed: ${memUsed}\nFree: ${freeMem} GB\nTotal: ${totalMem} GB\`\`\``, inline: false },
                { name: `${getEmoji('settings', '🖥️')} System`, value: `\`\`\`yml\nPlatform: ${os.platform()}\nCPU Cores: ${os.cpus().length}\nNode.js: ${process.version}\nDiscord.js: v${version}\`\`\``, inline: false },
            ])
            .setFooter({ text: `Requested by ${ctx.author.tag}`, iconURL: ctx.author.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        // ─── Components V2 Format ───
        const container = new ContainerBuilder()
            .setAccentColor(resolveColor(this.client.color.default))
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`# ${getEmoji('info', '📊')} Bot Statistics`),
            )
            .addSeparatorComponents(
                new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small)
            )
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`## ${getEmoji('bot', '🤖')} Bot Information`),
                new TextDisplayBuilder().setContent(`${getEmoji('server', '📊')} **Servers:** ${servers}`),
                new TextDisplayBuilder().setContent(`${getEmoji('members', '👥')} **Users:** ${users}`),
                new TextDisplayBuilder().setContent(`${getEmoji('channel', '💬')} **Channels:** ${channels}`),
                new TextDisplayBuilder().setContent(`${getEmoji('info', '📝')} **Commands:** ${commands}`),
                new TextDisplayBuilder().setContent(`\u200b`),
                new TextDisplayBuilder().setContent(`## ${getEmoji('settings', '🖥️')} System`),
                new TextDisplayBuilder().setContent(`${getEmoji('clock', '⏰')} **Uptime:** ${uptime}`),
                new TextDisplayBuilder().setContent(`${getEmoji('clock', '🏓')} **WS Ping:** ${wsPing}ms`),
                new TextDisplayBuilder().setContent(`${getEmoji('info', '💾')} **Memory:** ${memUsed} / ${totalMem} GB`),
                new TextDisplayBuilder().setContent(`${getEmoji('settings', '💻')} **Platform:** ${os.platform()} (${os.cpus().length} cores)`),
                new TextDisplayBuilder().setContent(`${getEmoji('settings', '💻')} **Node.js:** ${process.version}`),
                new TextDisplayBuilder().setContent(`${getEmoji('info', '📚')} **Discord.js:** v${version}`),
                new TextDisplayBuilder().setContent(`\u200b`),
                new TextDisplayBuilder().setContent(`-# Requested by ${ctx.author.tag}`),
            );

        // ─── Message Format ───
        const message = [
            `${getEmoji('info', '📊')} **Bot Statistics**`,
            ``,
            `${getEmoji('server', '📊')} **Servers:** ${servers}`,
            `${getEmoji('members', '👥')} **Users:** ${users}`,
            `${getEmoji('channel', '💬')} **Channels:** ${channels}`,
            `${getEmoji('info', '📝')} **Commands:** ${commands}`,
            ``,
            `${getEmoji('clock', '⏰')} **Uptime:** ${uptime}`,
            `${getEmoji('clock', '🏓')} **WS Ping:** ${wsPing}ms`,
            `${getEmoji('info', '💾')} **Memory:** ${memUsed} / ${totalMem} GB`,
            `${getEmoji('settings', '💻')} **Platform:** ${os.platform()} | **Node.js:** ${process.version} | **Discord.js:** v${version}`,
        ].join('\n');

        return ctx.sendTypedMessage({ embed, componentsv2: [container], message });
    }
}
