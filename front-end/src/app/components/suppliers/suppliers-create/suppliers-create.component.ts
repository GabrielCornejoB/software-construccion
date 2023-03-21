import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SuppliersService } from 'src/app/services/suppliers.service';
import { Supplier } from 'src/app/types/Supplier';

@Component({
  selector: 'app-suppliers-create',
  templateUrl: './suppliers-create.component.html',
  styleUrls: ['./suppliers-create.component.sass']
})
export class SuppliersCreateComponent {
  supplierForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private suppliersService: SuppliersService){
    this.supplierForm = this.fb.group({
      supplier: ['', Validators.required]
    });
  }

  createSupplier() {
    const supplier: Supplier = {
      supplier: this.supplierForm.get('supplier')?.value
    }
    this.suppliersService.addSupplier(supplier).subscribe({
      next: (data) => this.router.navigate(['/suppliers']),
      error: (e) => {
        console.log(e);
        this.supplierForm.reset();
      }
    });
    // this.suppliersService.addSupplier(supplier).subscribe(data => {
    //   this.router.navigate(['/suppliers']);
    // }, error => {
    //   console.log(error);
    //   this.supplierForm.reset();
    // })
  }
}
