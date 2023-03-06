const { Schema, model } = require('mongoose');

const supplierSchema = new Schema(
    {
        id: Number,
        supplier: String
    }
);

module.exports = model("Supplier", supplierSchema);
