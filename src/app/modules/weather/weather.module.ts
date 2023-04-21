/** Angular Imports */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';

/** Local Imports */
import { CurrentConditionsComponent } from "./current-conditions/current-conditions.component";
import { WeatherComponent} from "./weather.component";
import {MatGridListModule} from '@angular/material/grid-list';
import { ForecastComponent } from './forecast/forecast.component';
import {MatIconModule} from '@angular/material/icon'


@NgModule({
  declarations: [
    WeatherComponent,
    CurrentConditionsComponent,
    ForecastComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,MatIconModule,
    // MatCardTitle
  ]
})
export class WeatherModule { }
