const { Schema, model } = require('mongoose');

const subproductSchema = new Schema(
    {
        id: Number,
        subproduct: String,
        unit: String,
        fullPrice: Number,
        details: String,
        components: [
            {
                id: Number,
                group: String,
                consumption: Number,
                waste: Number,
                fullPrice: Number
            }
        ]
    }
)

module.exports = model("Subproduct", subproductSchema);
