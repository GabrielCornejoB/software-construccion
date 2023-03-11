import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PrimariesDetailComponent } from './components/primaries/primaries-detail/primaries-detail.component';
import { PrimariesMainComponent } from './components/primaries/primaries-main/primaries-main.component';

const routes: Routes = [
  {path:"", redirectTo:"/home", pathMatch: 'full'},
  {path:"home", component: HomeComponent},
  {path:"primaries", component:PrimariesMainComponent},
  {path:"primaries/detail/:id", component:PrimariesDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
