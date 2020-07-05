const User = require("./../../models/user.model");
const Log = require("./../../models/log.model");
const Project = require("./../../models/project.model");
const { getUser, sendMail } = require("./../../utils/functions");
module.exports = {
    getApiKey: async ({ email }) => {
        console.log(email);
        let user = await User.findOne({ email });
        let uniqString = "";
        if (!user) {
            //generate user api, save and send to their mail
            uniqString =
                Math.random().toString(36).substring(2, 15) +
                Math.random().toString(36).substring(2, 15);
            user = new User({ email, api_key: uniqString });
            await user.save();
        } else {
            uniqString = user.api_key;
        }
        //send an email here
        sendMail(
            email,
            "Your Logger API KEY",
            `Find your API key below.
Enjoy.
   
${uniqString}
`
        );
        return {
            status: true,
            message: "Your API key has been sent to your email",
        };
    },

    getProjects: async (apiKey, fetchLogs) => {
        const user = await getUser(apiKey);
        if (fetchLogs) {
            return Project.find({ user }).populate("Log");
        }
        return Project.find({ user });
    },

    getLogs: async (apiKey, { project_name }) => {
        await getUser(apiKey);
        const prj = await Project.findOne({ name: project_name.toUpperCase() });
        return Log.find({ project: prj });
    },
    addToLogs: async (apiKey, { project, message, stacktrace, timestamp }) => {
        const user = await getUser(apiKey);
        // get the project by name and if it doesnt exist create it
        let _project = await Project.findOne({ name: project.toUpperCase() });
        if (!_project) {
            _project = new Project({ name: project.toUpperCase(), user });
            _project.save();
        }
        const log = new Log({
            project: _project,
            message,
            stacktrace,
            created_at: timestamp,
        });
        log.save();
        _project.logs.push(log._id);
        _project.save();
        return log;
    },
};
