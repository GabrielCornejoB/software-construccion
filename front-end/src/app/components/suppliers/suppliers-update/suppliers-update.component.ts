import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuppliersService } from 'src/app/services/suppliers.service';

@Component({
  selector: 'app-suppliers-update',
  templateUrl: './suppliers-update.component.html',
  styleUrls: ['./suppliers-update.component.sass']
})
export class SuppliersUpdateComponent implements OnInit {
  id: string | null;
  supplierForm: FormGroup;
  supplierName: string = "";

  constructor(private fb: FormBuilder, private router: Router, private aRoute: ActivatedRoute, private suppliersService: SuppliersService){
    this.supplierForm = this.fb.group({
      supplier: ['', Validators.required]
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.getSupplier();
  }
  getSupplier() {
    if (this.id !== null) {
      this.suppliersService.getSupplier(this.id).subscribe({
        next: (d) => {
          this.supplierName = d.supplier;
          this.supplierForm.setValue({supplier: d.supplier});
        },
        error: (e) => console.log(e)
      });
    }
  }
  updateSupplier() {
    if (this.id !== null) {
      this.suppliersService.updateSupplier(this.id, {supplier: this.supplierForm.get('supplier')?.value}).subscribe({
        next: (d) => this.router.navigate(['/suppliers']),
        error: (e) => {
          console.log(e);
          this.supplierForm.reset();
        }
      })
    }
  }
}
