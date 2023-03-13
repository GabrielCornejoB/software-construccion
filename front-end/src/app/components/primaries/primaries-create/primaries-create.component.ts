import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PrimariesService } from 'src/app/services/primaries.service';
import { Primary } from 'src/app/types/Primary';
import { Units } from 'src/app/enums/units.enum';
import { Groups } from 'src/app/enums/groups.enum';
import { Clasifications } from 'src/app/enums/clasifications.enum';

@Component({
  selector: 'app-primaries-create',
  templateUrl: './primaries-create.component.html',
  styleUrls: ['./primaries-create.component.sass']
})
export class PrimariesCreateComponent {
  primaryForm: FormGroup;
  units = Object.values(Units);
  groups = Object.values(Groups);
  clasifications = Object.values(Clasifications);

  constructor(private fb: FormBuilder, private router: Router, private primariesService: PrimariesService) {
    this.primaryForm = this.fb.group({ 
      primary: ['', Validators.required],
      group: ['', Validators.required],
      clasification: ['', Validators.required],
      unit: ['', Validators.required]
    });
  }

  createPrimary() {
    console.log(this.primaryForm);
    const primary: Primary = {
      primary: this.primaryForm.get('primary')?.value,
      group: this.primaryForm.get('group')?.value,
      clasification: this.primaryForm.get('clasification')?.value,
      unit: this.primaryForm.get('unit')?.value
    };
    this.primariesService.createPrimary(primary).subscribe(data => {
      this.router.navigate(['/primaries']);
    }, error => {
      console.log(error);
      this.primaryForm.reset();
    })
    
  }
}
