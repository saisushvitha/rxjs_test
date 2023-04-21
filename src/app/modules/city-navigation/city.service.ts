/** Angular Imports */
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

/** Third-Party Imports */
import { Observable } from "rxjs";

/** Local Imports */
import { City } from "../../shared/models/city";


@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private _http: HttpClient) { }

  /**
   * Makes an HTTP call to the API to retrieve the list of cities
   */
  getCities$(): Observable<City[]> {
    return this._http.get<City[]>('api/cities');
  }


}
