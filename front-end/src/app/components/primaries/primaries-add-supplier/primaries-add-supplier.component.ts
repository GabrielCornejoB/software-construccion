import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimariesService } from 'src/app/services/primaries.service';
import { SuppliersService } from 'src/app/services/suppliers.service';
import { SupplierOfPrimary } from 'src/app/types/Primary';
import { Supplier } from 'src/app/types/Supplier';

@Component({
  selector: 'app-primaries-add-supplier',
  templateUrl: './primaries-add-supplier.component.html',
  styleUrls: ['./primaries-add-supplier.component.sass']
})
export class PrimariesAddSupplierComponent implements OnInit {
  supplierForm: FormGroup;
  id: string | null;
  primary: string = "";
  suppliers: Supplier[] = [];

  constructor(private fb: FormBuilder, private aRoute: ActivatedRoute, private suppliersService: SuppliersService, 
              private primariesService: PrimariesService,  private router: Router) {
    this.id = this.aRoute.snapshot.paramMap.get("id");
    this.supplierForm = this.fb.group({
      supplierId: ['', Validators.required],
      listPrice: ['', Validators.required],
      iva: ['', Validators.required],
      discount: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.getPrimary();
    this.getSuppliers();
  }
  getPrimary() {
    if (this.id !== null) {
      this.primariesService.getPrimary(this.id).subscribe(data => {
        this.primary = data.primary;
      });
    }
  }
  getSuppliers(): void {
    this.suppliersService.getSuppliers().subscribe(data => {
      this.suppliers = data;
      console.log(this.suppliers);
    }, error => {
      console.log(error);
    })
  }
  addSupplierToPrimary(): void {
    if(this.id !== null) {
      const supplierOfPrimary: SupplierOfPrimary = {
        supplierId: this.supplierForm.get('supplierId')?.value,
        listPrice: this.supplierForm.get('listPrice')?.value,
        iva: this.supplierForm.get('iva')?.value,
        discount: this.supplierForm.get('discount')?.value
      };
      this.primariesService.addSupplierToPrimary(this.id, supplierOfPrimary).subscribe(data => {
        this.router.navigate(['/primaries/detail', this.id]);
      }, error => {
        console.log(error);
        this.supplierForm.reset();
      })
    }
  }
}
