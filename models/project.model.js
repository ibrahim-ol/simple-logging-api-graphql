const { Schema, model, Types } = require("mongoose");

const ProjectSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: Types.ObjectId,
        ref: "Dependent",
        required: true,
    },
    created_at: { type: Date, default: Date.now() },
});

module.exports = model("Project", ProjectSchema);
