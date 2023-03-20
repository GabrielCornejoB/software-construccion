import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetsMainComponent } from './components/budgets/budgets-main/budgets-main.component';
import { ConstructionsMainComponent } from './components/constructions/constructions-main/constructions-main.component';
import { HomeComponent } from './components/home/home.component';
import { PrimariesAddSupplierComponent } from './components/primaries/primaries-add-supplier/primaries-add-supplier.component';
import { PrimariesCreateComponent } from './components/primaries/primaries-create/primaries-create.component';
import { PrimariesDetailComponent } from './components/primaries/primaries-detail/primaries-detail.component';
import { PrimariesMainComponent } from './components/primaries/primaries-main/primaries-main.component';
import { PrimariesUpdateSupplierComponent } from './components/primaries/primaries-update-supplier/primaries-update-supplier.component';
import { PrimariesUpdateComponent } from './components/primaries/primaries-update/primaries-update.component';
import { SubproductsMainComponent } from './components/subproducts/subproducts-main/subproducts-main.component';
import { SuppliersCreateComponent } from './components/suppliers/suppliers-create/suppliers-create.component';
import { SuppliersMainComponent } from './components/suppliers/suppliers-main/suppliers-main.component';

const routes: Routes = [
  {path:"", component: HomeComponent},
  {path:"primaries", component:PrimariesMainComponent},
  {path:"primaries/detail/:id", component:PrimariesDetailComponent},
  {path:"primaries/create", component: PrimariesCreateComponent},
  {path:"primaries/update/:id", component: PrimariesUpdateComponent},
  {path:"primaries/add-supplier/:id", component: PrimariesAddSupplierComponent},
  {path:"primaries/update-supplier/:id/:supplierId", component: PrimariesUpdateSupplierComponent},
  {path:"subproducts", component: SubproductsMainComponent},
  {path:"budgets", component: BudgetsMainComponent},
  {path:"constructions", component:ConstructionsMainComponent},
  {path:"suppliers", component:SuppliersMainComponent},
  {path:"suppliers/create", component:SuppliersCreateComponent},
  {path:"**", redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
