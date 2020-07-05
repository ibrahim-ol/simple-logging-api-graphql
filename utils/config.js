require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 5000,
    MONGODB_URL: process.env.MONGO_CONNECTION_URL || "",
    SECRET: process.env.APP_KEY,
    SEND_GRID: process.env.SENDGRID_API_KEY,
    SENDER_EMAIL: process.env.SENDER_EMAIL
};
