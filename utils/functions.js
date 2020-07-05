const User = require('./../models/user.model')
const sgMail = require('@sendgrid/mail');
const config = require('./config')

const getUser = async (token) => {
    if(process.env.ENVIRONMENT === 'DEV'){
        token = process.env.TEST_TOKEN
    }
    const user = await User.findOne({api_key: token})
    if (!user) {
        throw new Error('UnAuthorized. Please provide a valid token')
    }
    return user
}

const sendMail = (to, title, message) => {
    sgMail.setApiKey(config.SEND_GRID.toString());
    const msg = {
        to: to,
        from: config.SENDER_EMAIL,
        subject: title,
        text: message,
        html: `<pre>${message}</pre>`,
    };
    sgMail.send(msg)
        .then(data => {
            console.log(data)
        })
        .catch( error =>  {
            console.log(error.response)
        })
    ;
}


module.exports = {
    getUser,
    sendMail
}
