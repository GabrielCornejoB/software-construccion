export interface Primary {
    id: number,
    primary: string,
    group: string,
    clasification: string,
    unit: string,
    defaultPrice: number,
    defaultSupplier: number,
    suppliers: [{
        supplierId: number,
        listPrice: number,
        iva: number,
        discount: number,
        unitaryPrice: number,
        updateDate: Date
    }]
}
export interface SupplierOfPrimary {
    supplierId: number,
    listPrice: number,
    iva: number,
    discount: number,
    unitaryPrice: number,
    updateDate: Date
}
