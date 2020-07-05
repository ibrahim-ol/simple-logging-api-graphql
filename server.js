const express = require("express");
const body_parser = require("body-parser");
const graphqlHTTP = require("express-graphql");
require("./models/db.js");

const appSchema = require('./graphql/schema.js')
const app = express();
// app.use(body_parser)
const getContext = (req) => {
    const {authorization: token} = req.headers;
    return {token}
}
app.use(
    "/gql",
    graphqlHTTP(async (req) => ({
        schema: appSchema,
        graphiql: true,
        context: () => getContext(req)
    }))
);

app.listen(5000);
