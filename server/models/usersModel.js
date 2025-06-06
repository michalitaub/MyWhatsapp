const moogoose = require('mongoose')

const userSchema = moogoose.Schema(
    {

        full_Name: String,
        image: String,

    },
    { versionKey: false }
);
const User = moogoose.model('user', userSchema, 'users')

module.exports = User;