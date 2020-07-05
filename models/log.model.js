const mongoose = require("mongoose");

const LogSchema = mongoose.Schema({
    project: { type: mongoose.Types.ObjectId, ref: 'Project', required: true },
    message: { type: String, required: true },
    stacktrace: { type: String },
    created_at: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Log", LogSchema);
