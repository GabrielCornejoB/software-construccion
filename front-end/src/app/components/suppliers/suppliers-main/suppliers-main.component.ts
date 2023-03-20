import { Component, OnInit } from '@angular/core';
import { SuppliersService } from 'src/app/services/suppliers.service';
import { Supplier } from 'src/app/types/Supplier';

@Component({
  selector: 'app-suppliers-main',
  templateUrl: './suppliers-main.component.html',
  styleUrls: ['./suppliers-main.component.sass']
})
export class SuppliersMainComponent implements OnInit {
  suppliers: Supplier[] = [];

  constructor(private suppliersService: SuppliersService){}

  ngOnInit(): void {
    this.getSuppliers();
  }
  getSuppliers(): void {
    this.suppliersService.getSuppliers().subscribe(data => {
      this.suppliers = data;
    }, error => {
      console.log(error);
    })
  }
}
