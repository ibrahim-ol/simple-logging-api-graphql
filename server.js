const express = require("express");
const body_parser = require("body-parser");
const graphqlHTTP = require("express-graphql");
require("./models/db.js");

const appSchema = require("./graphql/schema.js");
const resolvers = require("./graphql/resolvers/index.js");
const DataLoader = require("dataloader");
const app = express();
// app.use(body_parser)
const getTokenContext = (req) => {
    const { authorization: token } = req.headers;
    return token;
};
app.use(
    "/gql",
    graphqlHTTP(async (req) => ({
        schema: appSchema,
        graphiql: true,
        context: {
            token: getTokenContext(req),
            logsLoader: new DataLoader(resolvers.batchLogLoader),
        },
    }))
);

app.listen(5000);
