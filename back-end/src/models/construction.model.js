const { Schema, model } = require('mongoose');

const constructionModel = new Schema(
    {
        id: Number,
        description: String,
        details: String,
        cost: Number,
        value: Number,
        revenue: Number,
        budgets: [
            {
                budgetId: Number,
                amount: Number,
                aiu: Number,
                incidence: Number,
                unitaryValue: Number,
                fullvalue: Number
            }
        ]
    }
)
