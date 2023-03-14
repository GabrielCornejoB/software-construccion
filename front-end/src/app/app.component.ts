import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'software-construccion';
  active: number = 0;
  isHome: boolean = true;
  toggleClass(newActive: number){
    this.active = newActive;
  }
}
