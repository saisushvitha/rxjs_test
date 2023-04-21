import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from "rxjs";
// import { CityConditions } from 'src/app/shared/models/city-conditions';
import { ForecastConditions } from 'src/app/shared/models/weather';
import {MatIconModule} from '@angular/material/icon'
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  // forecastData: ForecastConditions["forecast"] | undefined;
  // @Input() public set forecastConditions$ (value: Observable<ForecastConditions>| null) {
  //   value?.subscribe({next: value => this.forecastData = value.forecast})

  // }
  // constructor() { }

  // ngOnInit(): void {
  //    console.log("forecasting",this.forecastConditions$);
  // }
  forecastData: ForecastConditions["forecast"] | undefined;
  private unsubscribe$ = new Subject<void>();

  @Input() public set forecastConditions$ (value: Observable<ForecastConditions> | null) {
    if (value) {
      value.pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe({
        next: (forecastConditions) => {
          this.forecastData = forecastConditions.forecast;
        },
        error: (error) => {
          console.error('Error fetching forecast data:', error);
        }
      });
    }
  }

  constructor() { }

  ngOnInit(): void {
    console.log('ForecastComponent initialized');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
