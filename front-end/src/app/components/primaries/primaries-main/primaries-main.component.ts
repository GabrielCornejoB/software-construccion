import { Component, OnInit } from '@angular/core';
import { PrimariesService } from 'src/app/services/primaries.service';
import { Primary } from 'src/app/types/Primary';

@Component({
  selector: 'app-primaries-main',
  templateUrl: './primaries-main.component.html',
  styleUrls: ['./primaries-main.component.sass']
})
export class PrimariesMainComponent implements OnInit  {
  primaries: Primary[] = [];
  constructor(private primariesService: PrimariesService) {}

  ngOnInit(): void {
    this.getPrimaries();
  }
  getPrimaries(): void {
    this.primariesService.getPrimaries().subscribe(primaries => {
      this.primaries = primaries
    });
  }
}
