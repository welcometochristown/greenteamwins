const mongoose = require("mongoose");

const schema = {
    _id: { type: mongoose.Schema.ObjectId, auto: true },
    name: mongoose.Schema.Types.String,
    game: mongoose.Schema.Types.String,
    host: mongoose.Schema.Types.Boolean,
    points: mongoose.Schema.Types.Number,
    team: mongoose.Schema.Types.String
};

module.exports = mongoose.model("player", new mongoose.Schema(schema));