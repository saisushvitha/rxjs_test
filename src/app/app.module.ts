/** Angular Imports */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

/** Third-Party Imports */
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";

/** Local Imports */
import { ApiService } from "../api/api-service";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CityNavigationModule } from "./modules/city-navigation/city-navigation.module";
import { WeatherModule } from "./modules/weather/weather.module";
// import { ForecastComponent } from './modules/forecast/forecast.component';

@NgModule({
  declarations: [
    AppComponent,
    // ForecastComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CityNavigationModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(ApiService, { delay: 500 }),
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    WeatherModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
