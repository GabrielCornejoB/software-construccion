import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    this.primariesService.getPrimaries().subscribe(data => {
      this.primaries = data;
    }, error => {
      console.log(error);
    });
  }
  deletePrimary(id: any): void {
    this.primariesService.deletePrimary(id).subscribe(data => {
      console.log("Eliminado con exito");
    }, error => {
      console.log(error);
    })
  }
}
