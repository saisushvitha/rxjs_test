/**
 * The data model for City objects returned by API
 */
export interface City {
  /**
   * The ID of the city, used to match the city name with the weather data
   */
  id: number;

  /**
   * The name of the city
   */
  name: string;
}

// export interface Week{
//   id: number
//   name
//   week: string;
// }