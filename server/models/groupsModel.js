const moogoose = require('mongoose')

const groupSchema = moogoose.Schema(
    {

        name: String,//if it is chat name is chat
        image: String,
        members:[String],

    },
    { versionKey: false }
);
const Group = moogoose.model('group', groupSchema, 'groups')

module.exports = Group;