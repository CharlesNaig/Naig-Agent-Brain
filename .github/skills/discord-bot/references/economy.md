# Economy System Reference — Hybrid Template

## Mongoose Schema (`src/schemas/Economy.js`)

```javascript
import pkg from 'mongoose';
const { Schema, model, models } = pkg;

const economySchema = new Schema({
    _id: { type: String },
    userId: { type: String, required: true },
    guildId: { type: String, required: true },
    balance: { type: Number, default: 0 },
    bank: { type: Number, default: 0 },
    lastDaily: { type: Date, default: null },
    lastWork: { type: Date, default: null },
    inventory: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
});

export default models.Economy || model('Economy', economySchema);
```

## Economy Commands (to build)
| File | Command | Cooldown |
|---|---|---|
| `Balance.js` | `/balance [user]` | 3s |
| `Daily.js` | `/daily` | 24 hours |
| `Work.js` | `/work` | 1 hour |
| `Pay.js` | `/pay <user> <amount>` | 10s |
| `Leaderboard.js` | `/leaderboard` | 10s |
| `Shop.js` | `/shop` | 5s |
| `Buy.js` | `/buy <item>` | 5s |
| `Inventory.js` | `/inventory` | 5s |

## Balance Query Pattern
```javascript
import Economy from '../../schemas/Economy.js';

// Get or create member data
const data = await Economy.findOneAndUpdate(
    { userId: ctx.author.id, guildId: ctx.guild.id },
    { $setOnInsert: { _id: `${ctx.guild.id}-${ctx.author.id}`, userId: ctx.author.id, guildId: ctx.guild.id } },
    { upsert: true, new: true }
);
```

## Cooldown Check Pattern (using MongoDB)
```javascript
async run(ctx, args) {
    const data = await Economy.findOne({ userId: ctx.author.id, guildId: ctx.guild.id });

    const COOLDOWN_MS = 86_400_000; // 24 hours
    const now = Date.now();

    if (data?.lastDaily && now - data.lastDaily.getTime() < COOLDOWN_MS) {
        const remaining = COOLDOWN_MS - (now - data.lastDaily.getTime());
        const hours = Math.floor(remaining / 3_600_000);
        const mins = Math.floor((remaining % 3_600_000) / 60_000);

        return ctx.sendTypedMessage({
            embed: this.client.embed()
                .setColor(this.client.color.warn)
                .setDescription(`${StatusEmojis.warning} You already claimed your daily!\nCome back in **${hours}h ${mins}m**.`),
            message: `${StatusEmojis.warning} Come back in **${hours}h ${mins}m**.`,
        });
    }

    const reward = Math.floor(Math.random() * 200) + 100; // 100–300 coins

    await Economy.findOneAndUpdate(
        { userId: ctx.author.id, guildId: ctx.guild.id },
        { $inc: { balance: reward }, lastDaily: new Date() },
        { upsert: true, new: true }
    );

    // Build triple format and return ctx.sendTypedMessage(...)
}
```

## Transfer Pattern (atomic with session)
```javascript
import pkg from 'mongoose';
const { startSession } = pkg;

const session = await startSession();
session.startTransaction();
try {
    await Economy.findOneAndUpdate({ userId: fromId, guildId }, { $inc: { balance: -amount } }, { session });
    await Economy.findOneAndUpdate({ userId: toId, guildId }, { $inc: { balance: amount } }, { session, upsert: true });
    await session.commitTransaction();
} catch (err) {
    await session.abortTransaction();
    throw err;
} finally {
    session.endSession();
}
```

