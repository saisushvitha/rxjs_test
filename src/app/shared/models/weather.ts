/**
 * Data model for the current weather conditions returned by the API
 */
export interface CurrentConditions {
  /**
   * The ID of the city associated with these weather conditions
   */
  id: number;

  /**
   * The temperature in the city
   */
  temp: number;

  /**
   * The speed of the wind in the city
   */
  windSpeed: number;
}

export interface ForecastConditions {

  id: number;
  forecast:
    {
      day: string,
      temp : number

    }[];

}