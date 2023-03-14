import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PrimariesAddSupplierComponent } from './components/primaries/primaries-add-supplier/primaries-add-supplier.component';
import { PrimariesCreateComponent } from './components/primaries/primaries-create/primaries-create.component';
import { PrimariesDetailComponent } from './components/primaries/primaries-detail/primaries-detail.component';
import { PrimariesMainComponent } from './components/primaries/primaries-main/primaries-main.component';
import { PrimariesUpdateComponent } from './components/primaries/primaries-update/primaries-update.component';

const routes: Routes = [
  {path:"", component: HomeComponent},
  {path:"primaries", component:PrimariesMainComponent},
  {path:"primaries/detail/:id", component:PrimariesDetailComponent},
  {path:"primaries/create", component: PrimariesCreateComponent},
  {path:"primaries/update/:id", component: PrimariesUpdateComponent},
  {path:"primaries/add-supplier/:id", component: PrimariesAddSupplierComponent},
  {path:"**", redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
