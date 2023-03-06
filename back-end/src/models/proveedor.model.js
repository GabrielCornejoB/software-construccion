const { Schema, model } = require('mongoose');

const proveedorSchema = new Schema(
    {
        id: Number,
        proveedor: String
    }
);

module.exports = model("Proveedor", proveedorSchema);
