const gql = require("graphql");
const { ProjectType, LogType, LogInputType } = require("./types/index.js");
const {
    parseResolveInfo,
    simplifyParsedResolveInfoFragmentWithType,
} = require("graphql-parse-resolve-info");
const resolvers = require("./resolvers/index");
const RootQueryType = new gql.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getApiKey: {
            type: new gql.GraphQLObjectType({
                name: "GetApiKeyResponse",
                fields: {
                    status: { type: gql.GraphQLBoolean },
                    message: { type: gql.GraphQLString },
                },
            }),
            args: {
                email: { type: gql.GraphQLNonNull(gql.GraphQLString) },
            },
            resolve(parent, args, context) {
                return resolvers.getApiKey(args);
            },
        },
        getProjects: {
            type: gql.GraphQLList(ProjectType),
            resolve(parent, args, context, info) {
                const parsedResolveInfoFragment = parseResolveInfo(info);
                const { fields } = simplifyParsedResolveInfoFragmentWithType(
                    parsedResolveInfoFragment,
                    ProjectType
                );
                let requestForLogs = false;
                if (fields.logs) {
                    requestForLogs = true;
                }
                return resolvers.getProjects(context.token, requestForLogs);
            },
        },
        getLogs: {
            type: gql.GraphQLList(LogType),
            args: {
                project_name: { type: gql.GraphQLNonNull(gql.GraphQLString) },
            },
            resolve(parent, args, context) {
                return resolvers.getLogs(context.token, args);
            },
        },
    },
});
const RootMutationType = new gql.GraphQLObjectType({
    name: "RootMutationType",
    fields: {
        addToLog: {
            type: LogType,
            args: {
                log_input: { type: gql.GraphQLNonNull(LogInputType) },
            },
            resolve(parent, args, context) {
                console.log(parent, args, context);
                return resolvers.addToLogs(context.token, args.log_input);
            },
        },
    },
});

module.exports = new gql.GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType,
});
