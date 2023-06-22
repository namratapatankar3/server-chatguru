const mongoose = require("mongoose")
const chatSchema = new mongoose.Schema({
    members: {
        type: [
        {
                type: mongoose.Schema.Types.ObjectId,
              refs:"users"
        }
    ]
    },
    lastMessages: {
        type: mongoose.Schema.Types.ObjectId,
        refs:"messages"
    },
    unreadMessages: {
        type: Number,
        default:0,
    }
}, {
    timestamps:true,
})

module.exports = mongoose.model("chats",chatSchema)