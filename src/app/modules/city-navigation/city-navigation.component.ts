/** Angular Imports */
import { Component, OnInit } from '@angular/core';

/** Third-Party Imports */
import { Observable } from "rxjs";

/** Local Imports */
import { City } from "../../shared/models/city";
import { CityService } from "./city.service";

@Component({
  selector: 'app-city-navigation',
  templateUrl: './city-navigation.component.html',
  styleUrls: ['./city-navigation.component.scss']
})
export class CityNavigationComponent implements OnInit {

  /**
   * Observable list of available cities used to populate the navigation list
   */
  public cities$: Observable<City[]> | null = null;

  constructor(
    public cityService: CityService
  ) { }

  ngOnInit(): void {
    this.cities$ = this.cityService.getCities$();
  }

}
