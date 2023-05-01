import { Schema, model, models } from "mongoose";

const transactionSchema = new Schema({
    type: {
        type: String,
        required: [true, "type is required"]
    },
    amount: {
        type: Number,
        required: [true, "amount is required"]
    },
    category: {
        type: String,
        required: [true, "category is required"]
    },
    notes: {
        type: String,
        trim: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User_ID",
        required: [true, "user is required"]
    }
}, {
    timestamps: true,
    versionKey: false
});

export default models.Transactions || model("Transactions", transactionSchema);
