const { Schema, model } = require('mongoose');

const supplierSchema = new Schema(
    {
        id: {type: Number, required: true},
        supplier: {type: String, required: true}
    }
);

module.exports = model("Supplier", supplierSchema);
