import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Primary } from 'src/app/types/Primary';

@Component({
  selector: 'app-primaries-create',
  templateUrl: './primaries-create.component.html',
  styleUrls: ['./primaries-create.component.sass']
})
export class PrimariesCreateComponent {
  primaryForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
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
    console.log(primary);
    this.router.navigate(['/']);
  }
}
