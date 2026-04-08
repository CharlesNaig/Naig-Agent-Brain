/**
 * MONGOOSE SCHEMA TEMPLATE — CharlesNaig Hybrid Template
 *
 * File location: src/schemas/SchemaName.js
 * File naming:   PascalCase — e.g. Member.js, Economy.js, Leveling.js
 *
 * Important:
 * - _id = Discord snowflake (String) for guild/user-based docs
 * - Always export with: `models.Name || model('Name', schema)`
 *   This prevents "Cannot overwrite model" errors during dev hot-reload
 */

import pkg from 'mongoose';
const { Schema, model, models } = pkg;

const mySchema = new Schema({
    _id: { type: String },                           // Discord guild ID or user ID

    // ─── Guild-scoped data ────────────────────────────────────────────────────
    guildId: { type: String, required: true },

    // ─── User-scoped data ─────────────────────────────────────────────────────
    userId: { type: String, required: true },

    // ─── Your fields ──────────────────────────────────────────────────────────
    balance: { type: Number, default: 0 },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 0 },
    inventory: { type: [String], default: [] },
    reason: { type: String, default: '' },

    // ─── Timestamps ───────────────────────────────────────────────────────────
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default models.MyModel || model('MyModel', mySchema);
