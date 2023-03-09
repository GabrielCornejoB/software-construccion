import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PrimariesMainComponent } from './components/primaries/primaries-main/primaries-main.component';
import { PrimariesDetailComponent } from './components/primaries/primaries-detail/primaries-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PrimariesMainComponent,
    PrimariesDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
