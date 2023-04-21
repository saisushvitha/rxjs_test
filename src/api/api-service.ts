/** DO NOT MODIFY THIS FILE */

/** Angular Imports */
import { InMemoryDbService, RequestInfo, ResponseOptions, STATUS } from "angular-in-memory-web-api";

/** Third-Party Imports */
import { Observable } from "rxjs";

/**
 * This service intercepts http requests in order to mock http calls to an external API.
 *
 * Test writers DO NOT modify this file in any way, but they CAN view this file to see the data models.
 */
export class ApiService implements InMemoryDbService {

  /**
   * Overrides the GET handler when a call for currentConditions is made to return randomized values.
   *
   * @param requestInfo
   */
  public get(requestInfo: RequestInfo) {
    if (requestInfo.collectionName === "currentConditions") {

      // Generate randomized values for the current conditions
      return requestInfo.utils.createResponse$(() => {
        const options: ResponseOptions = {
          body: {
            id: requestInfo.id,
            temp: (10 + Math.random() * 5).toFixed(1),
            windSpeed: (20 + Math.random() * 20).toFixed(1)
          },
          status: STATUS.OK
        }
        return options;
      })
    }

    // Use default handler otherwise
    return undefined
  }

  /**
   * Helper function for generating forecast data.
   * @param id
   */
  private _generateForecast(id: number) {
    return {
      id: id,
      forecast: [
        {day: "Monday", temp: Math.floor(Math.random() * 20)},
        {day: "Tuesday", temp: Math.floor(Math.random() * 20)},
        {day: "Wednesday", temp: Math.floor(Math.random() * 20)},
        {day: "Thursday", temp: Math.floor(Math.random() * 20)},
        {day: "Friday", temp: Math.floor(Math.random() * 20)},
        {day: "Saturday", temp: Math.floor(Math.random() * 20)},
        {day: "Sunday", temp: Math.floor(Math.random() * 20)},
      ]
    }
  }

  createDb(): {} | Observable<{}> {
    const cities = [
      {id: 1, name: 'Summerside'},
      {id: 2, name: 'Charlottetown'},
      {id: 3, name: 'Halifax'},
      {id: 4, name: 'Toronto'},
      {id: 5, name: 'Vancouver'},
      {id: 6, name: 'Ottawa'},
      {id: 7, name: 'Saint John\'s'},
      {id: 8, name: 'Fredericton'},
      {id: 9, name: 'Regina'},
      {id: 10, name: 'Edmonton'},
    ];

    // Forecast data is randomized, but should only be generated once per app
    const forecasts = [
      this._generateForecast(1),
      this._generateForecast(2),
      this._generateForecast(3),
      this._generateForecast(4),
      this._generateForecast(5),
      this._generateForecast(6),
      this._generateForecast(7),
      this._generateForecast(8),
      this._generateForecast(9),
      this._generateForecast(10)
    ]

    return { cities, forecasts }
  }

}
