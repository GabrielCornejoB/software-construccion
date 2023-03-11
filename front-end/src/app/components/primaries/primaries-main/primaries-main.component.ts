import { Component, OnInit } from '@angular/core';
import { PrimariesService } from 'src/app/services/primaries.service';
import { Primary } from 'src/app/types/Primary';

@Component({
  selector: 'app-primaries-main',
  templateUrl: './primaries-main.component.html',
  styleUrls: ['./primaries-main.component.sass']
})
export class PrimariesMainComponent implements OnInit  {
  constructor(private primariesService: PrimariesService) {}

  primaries: Primary[] = [];

  ngOnInit(): void {
    this.primariesService.getPrimaries().subscribe(
      res => {
        this.primaries = res;
        console.log(this.primaries);
      },
      err => {
        console.log(err);
      }
    )
  }

}
