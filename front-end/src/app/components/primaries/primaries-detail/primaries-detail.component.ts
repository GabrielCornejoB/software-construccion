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
  suppliers: SupplierOfPrimary[] = [];
  data: any;
  id: string | null;

  constructor(private router: ActivatedRoute, private primariesService: PrimariesService) {
    this.id = this.router.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getPrimary();
  }
  // getPrimary(id: string): void {
  //   this.primariesService.getPrimary(id).subscribe(primary => this.data = primary);
  //   console.log(this.data);
  // }
  getSuppliers(id: string): void {
    this.primariesService.getPrimaryWithSuppliers(id).subscribe(suppliers => this.suppliers = suppliers);
    console.log(this.suppliers);
  }
  getPrimary() {
    this.primariesService.getPrimary(this.id).subscribe(data => {
      console.log(data);
    });
  }
}
