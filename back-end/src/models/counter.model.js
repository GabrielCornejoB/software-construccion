const { Schema, model } = require('mongoose');

const counterSchema = new Schema(
    {
        collectionName: String,
        counter: Number
    }
)

module.exports = model("Counter", counterSchema);
