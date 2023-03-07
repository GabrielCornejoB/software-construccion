const { Schema, model } = require('mongoose');

const primarySchema = new Schema(
    {
        id: Number,
        primary: String,
        group: String,
        clasification: String,
        unit: String,
        defaultPrice: Number,
        defaultSupplier: String,
        suppliers: [{
            supplierId: Number,
            supplier: String,
            listPrice: Number,
            iva: Number,
            discount: Number,
            unitaryPrice: Number,
            updateDate: Date
        }]
    }
)

module.exports = model("Primary", primarySchema);
