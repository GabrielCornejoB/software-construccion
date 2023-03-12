import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PrimariesService } from 'src/app/services/primaries.service';
import { Primary } from 'src/app/types/Primary';

@Component({
  selector: 'app-primaries-create',
  templateUrl: './primaries-create.component.html',
  styleUrls: ['./primaries-create.component.sass']
})
export class PrimariesCreateComponent {
  primaryForm: FormGroup;

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
