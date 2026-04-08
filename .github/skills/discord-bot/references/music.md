# Music Bot — Lavalink + Shoukaku Reference — Hybrid Template

## Dependencies
```bash
npm install shoukaku
# Lavalink 4 server (Docker):
# docker run -d --name lavalink -p 2333:2333 ghcr.io/lavalink-devs/lavalink:4
```

## Environment Variables (add to `.env` + `config.js`)
```env
LAVALINK_URL=localhost:2333
LAVALINK_PASSWORD=youshallnotpass
LAVALINK_NODE_NAME=main
```

In `src/config.js`:
```javascript
lavalink: {
    url: process.env.LAVALINK_URL || 'localhost:2333',
    password: process.env.LAVALINK_PASSWORD || 'youshallnotpass',
    nodeName: process.env.LAVALINK_NODE_NAME || 'main',
}
```

## Shoukaku Setup in BotClient

Add to `src/structures/Client.js` `start()` method:
```javascript
import { Shoukaku, Connectors } from 'shoukaku';

// In constructor():
this.shoukaku = null;
this.queues = new Map(); // guildId → { tracks: [], player: null }

// In start():
this.shoukaku = new Shoukaku(new Connectors.DiscordJS(this), [
    {
        name: this.config.lavalink.nodeName,
        url: this.config.lavalink.url,
        auth: this.config.lavalink.password,
    }
], {
    reconnectTries: 3,
    reconnectInterval: 5000,
    restTimeout: 10000,
});

this.shoukaku.on('error', (_, err) => this.logger.error(`[Shoukaku] ${err.message}`));
```

## Music Commands
| File | Command |
|---|---|
| `Play.js` | `/play <query>` |
| `Skip.js` | `/skip` |
| `Queue.js` | `/queue` |
| `Stop.js` | `/stop` |
| `Pause.js` | `/pause` |
| `Resume.js` | `/resume` |
| `Volume.js` | `/volume <0–100>` |
| `Nowplaying.js` | `/nowplaying` |
| `Loop.js` | `/loop` |

## Play Command Pattern
```javascript
export default class Play extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            description: { content: 'Play a song', usage: '<query|url>', examples: ['play never gonna give you up'] },
            category: 'music',
            cooldown: 3,
            args: true,
            permissions: { dev: false, client: ['SendMessages', 'ViewChannel', 'EmbedLinks', 'Connect', 'Speak'], user: [] },
            slashCommand: true,
            options: [{ name: 'query', description: 'Song name or URL', type: 3, required: true }],
        });
    }

    async run(ctx, args) {
        const voiceChannel = ctx.member.voice.channel;
        if (!voiceChannel) return ctx.sendTypedMessage({
            embed: this.client.embed().setColor(this.client.color.error).setDescription(`${StatusEmojis.error} Join a voice channel first.`),
            message: `${StatusEmojis.error} Join a voice channel first.`,
        });

        const query = ctx.isInteraction ? ctx.interaction.options.getString('query') : args.join(' ');

        const node = this.client.shoukaku.getIdealNode();
        const result = await node.rest.resolve(query.startsWith('http') ? query : `ytsearch:${query}`);

        if (!result?.data || result.loadType === 'error') return ctx.sendTypedMessage({
            embed: this.client.embed().setColor(this.client.color.error).setDescription(`${StatusEmojis.error} No results found.`),
            message: `${StatusEmojis.error} No results found.`,
        });

        const track = result.loadType === 'playlist' ? result.data.tracks[0] : result.data[0] ?? result.data;

        let player = this.client.queues.get(ctx.guild.id)?.player;
        if (!player) {
            player = await this.client.shoukaku.joinVoiceChannel({
                guildId: ctx.guild.id,
                channelId: voiceChannel.id,
                shardId: 0,
                deaf: true,
            });
            this.client.queues.set(ctx.guild.id, { tracks: [], player });
        }

        await player.playTrack({ track });
        // ... build triple format response
    }
}
```

## VoiceState Cleanup (in `src/events/Voice/VoiceStateUpdate.js`)
```javascript
async run(oldState, newState) {
    if (!oldState.channel) return;
    const voiceMembers = oldState.channel.members.filter(m => !m.user.bot);
    if (voiceMembers.size === 0) {
        const queue = this.client.queues.get(oldState.guild.id);
        if (queue?.player) {
            setTimeout(() => {
                queue.player.connection.disconnect();
                this.client.queues.delete(oldState.guild.id);
            }, 30_000);
        }
    }
}
```

