import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PrimariesMainComponent } from './components/primaries/primaries-main/primaries-main.component';
import { PrimariesDetailComponent } from './components/primaries/primaries-detail/primaries-detail.component';
import { PrimariesCreateComponent } from './components/primaries/primaries-create/primaries-create.component';
import { PrimariesUpdateComponent } from './components/primaries/primaries-update/primaries-update.component';
import { PrimariesAddSupplierComponent } from './components/primaries/primaries-add-supplier/primaries-add-supplier.component';
import { PrimariesUpdateSupplierComponent } from './components/primaries/primaries-update-supplier/primaries-update-supplier.component';
import { SubproductsMainComponent } from './components/subproducts/subproducts-main/subproducts-main.component';
import { BudgetsMainComponent } from './components/budgets/budgets-main/budgets-main.component';
import { ConstructionsMainComponent } from './components/constructions/constructions-main/constructions-main.component';
import { SuppliersMainComponent } from './components/suppliers/suppliers-main/suppliers-main.component';
import { SuppliersCreateComponent } from './components/suppliers/suppliers-create/suppliers-create.component';
import { SuppliersUpdateComponent } from './components/suppliers/suppliers-update/suppliers-update.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PrimariesMainComponent,
    PrimariesDetailComponent,
    PrimariesCreateComponent,
    PrimariesUpdateComponent,
    PrimariesAddSupplierComponent,
    PrimariesUpdateSupplierComponent,
    SubproductsMainComponent,
    BudgetsMainComponent,
    ConstructionsMainComponent,
    SuppliersMainComponent,
    SuppliersCreateComponent,
    SuppliersUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
