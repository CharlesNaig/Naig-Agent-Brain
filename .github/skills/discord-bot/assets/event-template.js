/**
 * EVENT TEMPLATE — CharlesNaig Hybrid Template
 *
 * File location: src/events/<Category>/EventName.js
 * File naming:   PascalCase  — e.g. GuildMemberAdd.js, VoiceStateUpdate.js
 * Category folders: AutoMod | Channel | Client | Guild | Member | Message | Moderation | Role | Voice
 *
 * Common Events enum values:
 *   Events.ClientReady         → run(client)
 *   Events.GuildMemberAdd      → run(member)
 *   Events.GuildMemberRemove   → run(member)
 *   Events.MessageCreate       → run(message)
 *   Events.InteractionCreate   → run(interaction)
 *   Events.GuildBanAdd         → run(ban)
 *   Events.VoiceStateUpdate    → run(oldState, newState)
 *   Events.GuildCreate         → run(guild)
 */

import Event from "../../structures/Event.js";
import { Events } from "discord.js";

export default class EventName extends Event {
    /**
     * @param {import('../../structures/Client.js').BotClient} client
     * @param {typeof EventName} file
     */
    constructor(client, file) {
        super(client, file, {
            name: Events.GuildMemberAdd,  // ← change to the correct Events enum value
            once: false,                   // true = fires only once (e.g. ClientReady)
        });
    }

    /**
     * Event handler
     * @param {import('discord.js').GuildMember} member  ← change params to match event
     */
    async run(member) {
        if (!member?.guild) return;

        // Access BotClient via this.client:
        this.client.logger.info(`[EventName] ${member.user.tag} in ${member.guild.name}`);

        // Get guild settings from cache/DB:
        // const settings = await this.client.getGuildSettings(member.guild.id);
        // if (!settings?.channelId) return;

        // Your logic here...
    }
}
