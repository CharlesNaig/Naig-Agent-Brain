# Discord Embed Design Guide — Hybrid Template

## Color Reference
From `src/config.js` → accessed via `this.client.color` (hex strings) in commands:

```javascript
// For EmbedBuilder.setColor():
this.client.color.default   // '#5865F2' — Discord Blurple
this.client.color.error     // '#ED4245' — Red
this.client.color.success   // '#57F287' — Green
this.client.color.info      // '#00A8FC' — Blue
this.client.color.warn      // '#FEE75C' — Yellow
this.client.color.gold      // '#f2e05c'
this.client.color.dark      // '#2C2F33'
this.client.color.purple    // '#9B59B6'

// For ContainerBuilder.setAccentColor() (needs decimal):
import { resolveColor } from '../../utils/resolveColor.js';
resolveColor(this.client.color.success) // → 0x57F287
```

## `this.client.embed()` Helper
`BotClient` exposes `embed()` which returns a fresh `EmbedBuilder`:
```javascript
const embed = this.client.embed()   // same as: new EmbedBuilder()
    .setColor(this.client.color.success)
    .setTitle('...')
    ...
```

## Embed Best Practices

| Rule | Why |
|---|---|
| Max 25 fields per embed | Discord API limit |
| Field values max 1024 chars — truncate with `truncate()` from formatters | API limit |
| Description max 4096 chars | Use paginated embeds for long lists |
| Always `.setTimestamp()` on action/moderation embeds | Audit trail |
| `.setFooter({ text: \`Requested by ${ctx.author.tag}\` })` | Context |
| `.setThumbnail(member.user.displayAvatarURL())` for person-related commands | Visual anchor |
| `.setImage(url)` for generated content | High-impact placement |
| Field `value` must never be empty string | Use `'N/A'` or omit |

## Standard Response Patterns

### Error Response
```javascript
return ctx.sendTypedMessage({
    embed: this.client.embed()
        .setColor(this.client.color.error)
        .setDescription(`${StatusEmojis.error} Something went wrong.`),
    message: `${StatusEmojis.error} Something went wrong.`,
    // note: componentsv2 is optional for simple error messages
});
```

### Success Response (Full Triple Format)
```javascript
const embed = this.client.embed()
    .setColor(this.client.color.success)
    .setTitle(`${getEmoji('success', '✅')} Done`)
    .setDescription('Operation completed.')
    .setTimestamp();

const container = new ContainerBuilder()
    .setAccentColor(resolveColor(this.client.color.success))
    .addTextDisplayComponents(new TextDisplayBuilder().setContent(`# ✅ Done`))
    .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small))
    .addTextDisplayComponents(new TextDisplayBuilder().setContent('Operation completed.'));

const message = `${StatusEmojis.success} **Done**\nOperation completed.`;

return ctx.sendTypedMessage({ embed, componentsv2: [container], message });
```

### Using MessageBuilder (Cleaner for Simple Responses)
```javascript
import { MessageBuilder } from '../../utils/messageBuilder.js';

const response = new MessageBuilder()
    .setTitle(`${StatusEmojis.success} Done`)
    .setDescription('Operation completed.')
    .setColor(this.client.color.success)
    .addField('User', `${target}`, true)
    .addField('Reason', reason, false)
    .setFooter(`Requested by ${ctx.author.tag}`)
    .setTimestamp(true)
    .build(); // { embed, componentsv2: [container], message }

return ctx.sendTypedMessage(response);
```

## Formatters (`src/utils/formatters.js`)
```javascript
import { formatUptime, formatBytes, truncate, timestamp, formatNumber } from '../../utils/formatters.js';

truncate(longString, 1024)      // truncate for field values
timestamp(new Date(), 'R')      // '<t:1234567890:R>' relative time
formatUptime(client.uptime)     // '2d 3h 15m 40s'
formatBytes(process.memoryUsage().heapUsed) // '54.2 MB'
formatNumber(123456)            // '123,456'
```

## Pagination (`src/utils/pagination.js`)
Use for list commands with > 10 items — see `src/utils/pagination.js` for API.

