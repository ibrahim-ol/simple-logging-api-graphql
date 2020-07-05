const mongoose = require("mongoose");
const config = require("./../utils/config");
mongoose.connect(
    config.MONGODB_URL,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err, client) => {
        if (err) {
            console.log("error");
        }
    }
);
const db = mongoose.connection;
db.once("open", (_) => {
    console.log("Database connected");
});

db.on("error", (err) => {
    console.error("connection error:", err);
});
module.exports = db;
