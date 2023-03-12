export class SupplierOfPrimary {
    supplierId: number;
    listPrice: number;
    iva: number;
    discount: number;
    unitaryPrice: number;
    updateDate: Date;

    constructor(supplierId: number, listPrice: number, iva: number, discount: number, unitaryPrice: number, updateDate: Date) {
        this.supplierId = supplierId;
        this.listPrice = listPrice;
        this.iva = iva;
        this.discount = discount;
        this.unitaryPrice = unitaryPrice;
        this.updateDate = updateDate;
    }
}
export class Primary {
    id?: number;
    primary: string;
    group: string;
    clasification: string;
    unit: string;
    defaultPrice?: number;
    defaultSupplier?: number;
    suppliers?: SupplierOfPrimary[];

    constructor(primary: string, group: string, clasification: string, unit: string) {
        this.primary = primary;
        this.group = group;
        this.clasification = clasification;
        this.unit = unit;
        this.defaultPrice = 0;
        this.defaultSupplier = 0;
        this.suppliers = [];
    }
}

