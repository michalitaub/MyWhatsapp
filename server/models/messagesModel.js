const mongoose = require('mongoose')

const messageSchema = mongoose.Schema(
    {

        // group: String,
        // user:String,
        // text: String,
        // date:Date,
        group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        text: { type: String, required: true },
        date: { type: Date, default: Date.now }

    },
    { versionKey: false }
);
const Message = mongoose.model('message', messageSchema, 'messages')

module.exports = Message;