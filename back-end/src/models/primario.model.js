const { Schema, model } = require('mongoose');

const primarioSchema = new Schema(
    {
        id: Number,
        primario: String,
        grupo: String,
        clasificacion: String,
        unidad: String,
        valorPorDefecto: Number,
        proveedorPorDefecto: String,
        proveedores: [{
            idProveedor: Number,
            precioLista: Number,
            porcentajeIVA: Number,
            porcentajeDcto: Number,
            valorUnitario: Number,
            fechaActualizacion: Date,
            observaciones: String
        }]
    }
)

module.exports = model("Primario", primarioSchema);
