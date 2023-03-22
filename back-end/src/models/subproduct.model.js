const { Schema, model } = require('mongoose');

const subproductSchema = new Schema(
    {
        id: {type: Number, required: true},
        subproduct: {type: String, required: true},
        unit: {type: String, required: true, 
            enum: ["m", "m2", "m3", "ml", "m3-km", "viaje", "kg", "ton", "lb", "gal", "hr", "dia", "pipeta", "un", "saco", "lata", "cuñete", "rollo"]},
        fullPrice: {type: Number, required: true},
        components: [
            {
                id: {type: Number, required: true},
                group: {type: String, required: true, 
                    enum: ["Diseños", "Ensayos", "Equipos", "Herramientas", "M.O.", "Materiales", "Polimericos", "Servicios", "Subcontratos", "Subproductos", "Transportes"]},
                consumption: {type: Number, required: true},
                waste: {type: Number, required: true}
            }
        ]
    }
)

module.exports = model("Subproduct", subproductSchema);
