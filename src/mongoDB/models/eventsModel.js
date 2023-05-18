import { Schema, model, models } from "mongoose";

const eventSchema = new Schema({
    title: { type: String, required: true },
    start: { type: Date, required: true },
    oneDay: { type: Boolean, default: true },
    recurrence: {
        type: String,
        enum: ['none', 'daily', 'weekly', 'monthly', 'yearly'],
        default: 'none'
    },
    until: { type: Date, required: false },
    estimatedCost: { type: Number, required: false },
    description: { type: String, required: false },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    // friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {
    timestamps: true,
    versionKey: false,
});

export default models.Events || model("Events", eventSchema);