const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    api_key: {
        type: String,
        required: true,
        unique: true,
    },
    created_at: { type: Date, default: Date.now() },
});

module.exports = model("Dependent", UserSchema);
