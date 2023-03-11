import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-primaries-detail',
  templateUrl: './primaries-detail.component.html',
  styleUrls: ['./primaries-detail.component.sass']
})
export class PrimariesDetailComponent implements OnInit {
  id_text: string = "";
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params: any) => {
        const id = params.get('id');
        this.id_text = id;
      }
    });
  }
  
}
