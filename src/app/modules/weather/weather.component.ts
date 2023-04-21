/** Angular Imports */
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Component, OnInit } from '@angular/core';

/** Third-Party Imports */
import { interval, Observable } from "rxjs";
import { filter, switchMap } from "rxjs/operators";

/** Local Imports */
import { CityConditions } from "../../shared/models/city-conditions";
import { WeatherService } from "./weather.service";
import { ForecastConditions } from "src/app/shared/models/weather";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  /**
   * Observable of the currently selected city's weather conditions
   */
  public cityConditions$: Observable<CityConditions> | null = null;
  public forecastConditions$! : Observable<ForecastConditions>;

  constructor(
    public route: ActivatedRoute,
    public weatherService: WeatherService
  ) { }

  ngOnInit(): void {

    // Obtain city and current conditions data from the id provided in the route parameters
    this.cityConditions$ = this.route.paramMap.pipe(

      // Only continue if an id was passed
      filter((paramMap: ParamMap) => !!paramMap.get('id')),

      // Get cityCondition data from the weather service
      switchMap((paramMap: ParamMap) => {
          return this.weatherService.getCityConditions$(parseInt(paramMap.get('id') as string));
      })
    );

    this.forecastConditions$ = this.route.paramMap.pipe(

      filter((paramMap: ParamMap) => !!paramMap.get('id')),
      switchMap((paramMap: ParamMap) => {
        return this.weatherService.getForecasts$(parseInt(paramMap.get('id') as string));
    })

    )
  }
}
