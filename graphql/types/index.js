const {
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLObjectType,
    GraphQLNonNull,
} = require("graphql");
const Log = require("./../../models/log.model");
const Project = require("./../../models/project.model");
const LogInputType = new GraphQLInputObjectType({
    name: "LogInput",
    fields: {
        project: { type: GraphQLNonNull(GraphQLString) },
        message: { type: GraphQLNonNull(GraphQLString) },
        stacktrace: { type: GraphQLString, default: "" },
        timestamp: { type: GraphQLString },
    },
});

const ProjectType = new GraphQLObjectType({
    name: "Project",
    fields: () => ({
        name: { type: GraphQLNonNull(GraphQLString) },
        created_at: {
            type: GraphQLNonNull(GraphQLString),
            resolve(parent) {
                return new Date(parent.created_at).toISOString();
            },
        },
        logs: {
            type: GraphQLList(GraphQLNonNull(LogType)),
            resolve(parent, args, context) {
                return context.logsLoader.load(parent._id);
            },
        },
    }),
});

const LogType = new GraphQLObjectType({
    name: "Log",
    fields: () => ({
        // project: {
        //     type: GraphQLNonNull(ProjectType),
        //     resolve(parent){
        //         return Project.findOne({_id: parent.project})
        //     }
        // },
        message: { type: GraphQLNonNull(GraphQLString) },
        stacktrace: { type: GraphQLString, default: "" },
        created_at: {
            type: GraphQLNonNull(GraphQLString),
            resolve(parent) {
                return new Date(parent.created_at).toISOString();
            },
        },
    }),
});

module.exports = {
    LogInputType,
    LogType,
    ProjectType,
};
const alternate = `
  type Project {
    id: String!,
    name: String!,
    created_at: String!,
    logs: [Log!]
  }

  type Log {
    project: Project!,
    message: String!,
    stacktrace: String,
    created_at: String!
  }

  input LogInput {
    project_name: String!,
    log_message: String!,
    stacktrace: String,
    timestamp: String
  }
`;
