import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Clasifications } from 'src/app/enums/clasifications.enum';
import { Groups } from 'src/app/enums/groups.enum';
import { Units } from 'src/app/enums/units.enum';
import { PrimariesService } from 'src/app/services/primaries.service';
import { Primary } from 'src/app/types/Primary';

@Component({
  selector: 'app-primaries-update',
  templateUrl: './primaries-update.component.html',
  styleUrls: ['./primaries-update.component.sass']
})
export class PrimariesUpdateComponent implements OnInit {
  id: string | null;
  primaryForm: FormGroup;
  units = Object.values(Units);
  groups = Object.values(Groups);
  clasifications = Object.values(Clasifications);
  primaryName: string = "";

  constructor(private fb: FormBuilder, private router: Router, private aRoute: ActivatedRoute, private primariesService: PrimariesService) {
    this.primaryForm = this.fb.group({ 
      primary: ['', Validators.required],
      group: ['', Validators.required],
      clasification: ['', Validators.required],
      unit: ['', Validators.required]
    });
    this.id = this.aRoute.snapshot.paramMap.get("id");
  }
  ngOnInit(): void {
    this.getPrimaryInfo();
  }

  getPrimaryInfo() {
    if (this.id !== null) {
      this.primariesService.getPrimary(this.id).subscribe(data => {
        this.primaryForm.setValue({
          primary: data.primary,
          group: data.group,
          clasification: data.clasification,
          unit: data.unit
        });
        this.primaryName = data.primary;
      });
    }
  }

  updatePrimary() {
    if (this.id !== null) {
      const primary: Primary = {
        primary: this.primaryForm.get('primary')?.value,
        group: this.primaryForm.get('group')?.value,
        clasification: this.primaryForm.get('clasification')?.value,
        unit: this.primaryForm.get('unit')?.value
      };
      this.primariesService.updatePrimary(this.id, primary).subscribe(data => {
        this.router.navigate(['/primaries']);
      }, error => {
        console.log(error);
        this.primaryForm.reset();
      }); 
    }
  }
}
