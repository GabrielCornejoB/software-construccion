import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SuppliersService } from 'src/app/services/suppliers.service';
import { SupplierOfPrimary } from 'src/app/types/Primary';
import { Supplier } from 'src/app/types/Supplier';

@Component({
  selector: 'app-primaries-add-supplier',
  templateUrl: './primaries-add-supplier.component.html',
  styleUrls: ['./primaries-add-supplier.component.sass']
})
export class PrimariesAddSupplierComponent implements OnInit {
  id: string | null;
  suppliers: Supplier[] = [];

  constructor(private aRoute: ActivatedRoute, private suppliersService: SuppliersService) {
    this.id = this.aRoute.snapshot.paramMap.get("id");
  }
  ngOnInit(): void {
    this.getSuppliers();
  }
  getSuppliers(): void {
    this.suppliersService.getSuppliers().subscribe(data => {
      this.suppliers = data;
      console.log(this.suppliers);
    }, error => {
      console.log(error);
    })
  }
}
