import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrimariesService } from 'src/app/services/primaries.service';
import { SupplierOfPrimary } from 'src/app/types/Primary';

@Component({
  selector: 'app-primaries-detail',
  templateUrl: './primaries-detail.component.html',
  styleUrls: ['./primaries-detail.component.sass']
})
export class PrimariesDetailComponent implements OnInit {
  id_text: string = "";
  constructor(private route: ActivatedRoute, private primariesService: PrimariesService) {}

  data: SupplierOfPrimary[] = []

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params: any) => {
        const id = params.get('id');
        if (id) {
          this.primariesService.getPrimaryWithSuppliers(id).subscribe(
            res => {
              this.data = res;
              console.log(this.data);
            },
            err => {
              console.log(err);
            }
          )
        }
      }
    });
  }
  
}
