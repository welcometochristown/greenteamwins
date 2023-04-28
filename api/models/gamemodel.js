const mongoose = require("mongoose");

const schema = {
    _id: { type: mongoose.Schema.ObjectId, auto: true },
    code:  mongoose.Schema.Types.String,
    round:  mongoose.Schema.Types.Number,
    started:  mongoose.Schema.Types.Boolean,
    card: mongoose.Schema.Types.String, // @@_XX_YY
    deck: mongoose.Schema.Types.String  // @@_XX_YY|@@_XX_YY
};

module.exports = mongoose.model("game", new mongoose.Schema(schema));