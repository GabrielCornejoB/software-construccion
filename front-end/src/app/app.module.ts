import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PrimariesMainComponent } from './components/primaries/primaries-main/primaries-main.component';
import { PrimariesDetailComponent } from './components/primaries/primaries-detail/primaries-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { PrimariesCreateComponent } from './components/primaries/primaries-create/primaries-create.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PrimariesMainComponent,
    PrimariesDetailComponent,
    PrimariesCreateComponent
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
