const { Schema, model } = require('mongoose');

const primarySchema = new Schema(
    {
        id: {type: Number, required: true},
        primary: {type: String, required: true},
        group: {type: String, required: true, 
            enum: ["Diseños", "Ensayos", "Equipos", "Herramientas", "M.O.", "Materiales", "Polimericos", "Servicios", "Subcontratos", "Subproductos", "Transportes"]},
        clasification: {type: String, required: true, 
            enum: ["Aceros", "Aditivos", "Argos", "Áridos", "Herrajes", "Maderas", "Mezclas", "Prefabricados", "Premezclados", "PVC", "Transportes"]},
        unit: {type: String, required: true, 
            enum: ["m", "m2", "m3", "ml", "m3-km", "viaje", "kg", "ton", "lb", "gal", "hr", "dia", "pipeta", "un", "saco", "lata", "cuñete", "rollo"]},
        defaultPrice: {type: Number, required: true},
        defaultSupplier: {type: Number, required: true},
        suppliers: [{
            supplierId: {type: Number, required: true},
            listPrice: {type: Number, required: true},
            iva: {type: Number, required: true},
            discount: {type: Number, required: true},
            unitaryPrice: {type: Number, required: true},
            updateDate: {type: Date, default: Date.now()}
        }]
    }
)

module.exports = model("Primary", primarySchema);
