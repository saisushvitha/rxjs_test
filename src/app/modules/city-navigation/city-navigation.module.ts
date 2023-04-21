/** Angular Imports */
import { CommonModule } from '@angular/common';
import { MatListModule } from "@angular/material/list";
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";

/** Local Imports */
import { CityNavigationComponent } from './city-navigation.component';


@NgModule({
  declarations: [
    CityNavigationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatListModule
  ],
  exports: [
    CityNavigationComponent
  ]
})
export class CityNavigationModule { }
