/**
 * COMPONENT HANDLER TEMPLATE — CharlesNaig Hybrid Template
 *
 * File location: src/events/Client/ or src/components/<name>.js
 * Use for: Buttons, Select Menus, Modals
 *
 * customId naming convention:  action:userId:extraData
 * e.g.  'paginate:prev:123456789:0'
 *       'confirm:delete:987654321'
 */

import ComponentHandler from "../../structures/ComponentHandler.js";
import { StatusEmojis } from "../../utils/emoji.js";

export default class MyButtonHandler extends ComponentHandler {
    /**
     * @param {import('../structures/Client.js').BotClient} client
     */
    constructor(client) {
        super(client, {
            customId: /^myaction:/,  // regex OR exact string: 'exact-id'
            type: 'button',          // 'button' | 'selectMenu' | 'modal'
            cooldown: 3,             // seconds
        });
    }

    /**
     * @param {import('discord.js').ButtonInteraction} interaction
     */
    async run(interaction) {
        const parts = interaction.customId.split(':');
        const [action, userId, data] = parts;

        // ─── Ownership check ─────────────────────────────────────────────────
        if (interaction.user.id !== userId) {
            return interaction.reply({
                content: `${StatusEmojis.error} This button is not for you.`,
                ephemeral: true,
            });
        }

        await interaction.deferUpdate(); // or deferReply({ ephemeral: true }) for new reply

        // ─── Your logic ───────────────────────────────────────────────────────
        // e.g. update the embed, fetch next page, etc.

        await interaction.editReply({
            content: `${StatusEmojis.success} Done!`,
        });
    }
}
