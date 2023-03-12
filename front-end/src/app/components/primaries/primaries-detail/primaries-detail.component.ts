import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrimariesService } from 'src/app/services/primaries.service';
import { Primary, SupplierOfPrimary } from 'src/app/types/Primary';

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

  constructor(private aRoute: ActivatedRoute, private primariesService: PrimariesService) {
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getPrimary();
  }
  // getPrimary(id: string): void {
  //   this.primariesService.getPrimary(id).subscribe(primary => this.data = primary);
  //   console.log(this.data);
  // }
  // getSuppliers(id: string): void {
  //   this.primariesService.getSuppliersOfPrimary(id).subscribe(suppliers => this.suppliers = suppliers);
  //   console.log(this.suppliers);
  // }
  getPrimary() {
    if (this.id !== null) {
      this.primariesService.getPrimary(this.id).subscribe(data => {
        console.log(data);
        this.primary = data.primary;
        this.group = data.group;
        this.clasification = data.clasification;
        this.unit = data.unit;
        this.defaultPrice = data.defaultPrice;
        this.defaultSupplier = data.defaultSupplier;
      });
    }
  }
}
