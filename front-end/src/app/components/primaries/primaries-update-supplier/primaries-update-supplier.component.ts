import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimariesService } from 'src/app/services/primaries.service';
import { SuppliersService } from 'src/app/services/suppliers.service';
import { SupplierOfPrimary } from 'src/app/types/Primary';
import { Supplier } from 'src/app/types/Supplier';

@Component({
  selector: 'app-primaries-update-supplier',
  templateUrl: './primaries-update-supplier.component.html',
  styleUrls: ['./primaries-update-supplier.component.sass']
})
export class PrimariesUpdateSupplierComponent {
  id: string | null;
  supplierId: string | null;
  supplierForm: FormGroup;
  supplier: string = "";
  suppliers: SupplierOfPrimary[] = [];

  constructor(private fb: FormBuilder, private aRoute: ActivatedRoute, private primariesService: PrimariesService, private router: Router) {
    this.id = this.aRoute.snapshot.paramMap.get("id");
    this.supplierId = this.aRoute.snapshot.paramMap.get("supplierId");
    this.supplierForm = this.fb.group({
      supplierId: [''],
      listPrice: ['', Validators.required],
      iva: ['', Validators.required],
      discount: ['', Validators.required]
    });
  }
  updateSupplier(): void {
    if (this.id !== null && this.supplierId !== null) {
      const updatedSupplier: SupplierOfPrimary = {
        listPrice: this.supplierForm.get('listPrice')?.value,
        iva: this.supplierForm.get('iva')?.value,
        discount: this.supplierForm.get('discount')?.value
      };
      this.primariesService.updateSupplierOfPrimary(this.id, this.supplierId, updatedSupplier).subscribe(data => {
        this.router.navigate(['/primaries/detail', this.id]);
      }, error => {
        console.log(error);
        this.supplierForm.reset();
      });
    }
  }
}
