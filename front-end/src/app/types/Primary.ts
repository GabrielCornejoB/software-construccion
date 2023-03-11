export interface Primary {
    id: Number,
    primary: String,
    group: String,
    clasification: String,
    unit: String,
    defaultPrice: Number,
    defaultSupplier: Number,
    suppliers: [{
        supplierId: Number,
        listPrice: Number,
        iva: Number,
        discount: Number,
        unitaryPrice: Number,
        updateDate: Date
    }]
}