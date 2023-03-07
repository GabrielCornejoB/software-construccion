const { Schema, model } = require('mongoose');

const budgetSchema = new Schema(
    {
        id: Number,
        description: String,
        details: String,
        unit: String,
        price: Number,
        date: Date,
        items: [
            {
                id: Number,
                group: String,
                consumption: Number,
                waste: Number,
                unitaryPrice: Number,
                fullPrice: Number
            }
        ]
    }
)

module.exports = model("Budget", budgetSchema);
