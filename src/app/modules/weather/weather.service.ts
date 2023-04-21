/** Angular Imports */
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

/** Third-Party Imports */
import { forkJoin, Observable } from "rxjs";
import { filter, switchMap } from "rxjs/operators";
/** Local Imports */
import { CurrentConditions, ForecastConditions } from "../../shared/models/weather";
import { map } from "rxjs/operators";
import { City } from "../../shared/models/city";
import { CityConditions, ForecastCityConditions } from "../../shared/models/city-conditions";
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private _http: HttpClient) { }

  /**
   * Make an HTTP call to the API for the current weather conditions in the city with the provided ID
   *
   * @param id
   */

  getCityConditions$(id: number): Observable<CityConditions> {
  
    return interval(1000)
    .pipe(
    switchMap(() => {
        return forkJoin([
        this._http.get<City>(`api/cities/${id}`),
        this._http.get<CurrentConditions>(`api/currentConditions/${id}`)
      ]).pipe(
      map(([city, currentConditions]) => {
        return { ...city, ...currentConditions }
      })
    );}))
  }

   
  getForecasts$(id: number): Observable<ForecastConditions> {
    return forkJoin([
        this._http.get<City>(`api/cities/${id}`),
        this._http.get<ForecastCityConditions>(`api/forecasts/${id}`)
      ]).pipe(
      map(([city, forecasts]) => {
        console.log("forecasts",forecasts);
        return {...forecasts, name: city.name}
      })
    );
  }

   

}
