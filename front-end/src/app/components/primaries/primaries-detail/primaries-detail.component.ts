import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrimariesService } from 'src/app/services/primaries.service';
import { DefaultSupplier, Primary, SupplierOfPrimary } from 'src/app/types/Primary';

@Component({
  selector: 'app-primaries-detail',
  templateUrl: './primaries-detail.component.html',
  styleUrls: ['./primaries-detail.component.sass']
})
export class PrimariesDetailComponent implements OnInit {
  id: string | null;
  primary: string = "";
  group: string = "";
  clasification: string = "";
  unit: string = "";
  defaultPrice: string = "";
  defaultSupplier: string = "";

  suppliers: any[] = [];

  constructor(private aRoute: ActivatedRoute, private primariesService: PrimariesService) {
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getPrimary();
    this.getSuppliers();
  }
  getPrimary() {
    if (this.id !== null) {
      this.primariesService.getPrimary(this.id).subscribe(data => {
        this.primary = data.primary;
        this.group = data.group;
        this.clasification = data.clasification;
        this.unit = data.unit;
        this.defaultPrice = data.defaultPrice;
        this.defaultSupplier = data.defaultSupplier;
      });
    }
  }
  getSuppliers() {
    if (this.id !== null) {
      const tmpSupplierArray: any[] = [];
      this.primariesService.getSuppliersOfPrimary(this.id).subscribe(data => {
        for (let obj of data) {
          let tmpObj = {
            supplierId: obj.supplierId,
            supplier: obj.supplier,
            listPrice: obj.listPrice,
            iva: obj.iva,
            discount: obj.discount,
            unitaryPrice: obj.unitaryPrice,
            updateDate: obj.updateDate
          }
          tmpSupplierArray.push(tmpObj);
        }    
      });
      this.suppliers = tmpSupplierArray;
      console.log(this.suppliers);
    }
  }
  setDefaultSupplier(defaultSupplier: number, defaultPrice: number) {
    if (this.id !== null) {
      const defaultSupplierObj: DefaultSupplier = {
        defaultPrice: defaultPrice,
        defaultSupplier: defaultSupplier
      } 
      this.primariesService.setDefaultSupplierOfPrimary(this.id, defaultSupplierObj).subscribe(data => {
        this.getPrimary();
      }, error => {
        console.log(error);
      })
    }
  }
  deleteSupplierOfPrimary(supplierId: string) {
    if (this.id !== null) {
      this.primariesService.deleteSupplierOfPrimary(this.id, supplierId).subscribe(data => {
        this.getPrimary();
        this.getSuppliers();
      }, error => {
        console.log(error);
      })
    }
  }
}
