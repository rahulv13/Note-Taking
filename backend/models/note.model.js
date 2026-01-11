const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: false },
    tags: { type: [String], default: [] },
    isPinned: { type: Boolean, default: false },
    userId: { type: String, required: true },
    createdOn: { type: Date, default: new Date().getTime() },
    isTodo: { type: Boolean, default: false },
    checklist: {
        type: [{
            text: { type: String },
            isDone: { type: Boolean, default: false }
        }],
        default: []
    }
});

module.exports = mongoose.model("Note", noteSchema);
