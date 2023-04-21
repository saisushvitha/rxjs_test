/** Angular Imports */
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';

/** Local Imports */
import { City } from "../../shared/models/city";
import { CityConditions, ForecastCityConditions } from "../../shared/models/city-conditions";
import { CurrentConditions, ForecastConditions } from "../../shared/models/weather";
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(WeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make an http request to the api for current conditions', fakeAsync(() => {
    // define test data
    const testCityData: City = {
      id: 3,
      name: "Halifax"
    }
  
    const testCurrentConditionsData: CurrentConditions = {
      id: 3,
      temp: 13.7,
      windSpeed: 27.3
    }
  
    // make the http request
    service.getCityConditions$(3).subscribe(
      (cityConditions: CityConditions) => {
        expect(cityConditions).toEqual({...testCityData, ...testCurrentConditionsData});
      }
    );
  
    // simulate the response to the http request
    const testCurrentConditionsRequest = httpTestingController.expectOne('api/currentConditions/3');
    const testCityRequest = httpTestingController.expectOne('api/cities/3');
  
    testCurrentConditionsRequest.flush(testCurrentConditionsData);
    testCityRequest.flush(testCityData);
  
    // verify there are no outstanding requests
    httpTestingController.verify();
  
    discardPeriodicTasks();
  }));
  


  it('should make an http request to the api for forecast', fakeAsync(() => {
    const testCityData: City = {
      id: 3,
      name: "Halifax"
    }

    const testForecastData: ForecastConditions ={
      id : 3,
      forecast:[{
        day: "Monday",
        temp: 11
    }]
    }


    service.getForecasts$(3).subscribe(
      (forecastCityConditions: ForecastConditions) => {
        expect(forecastCityConditions).toEqual({...testCityData, ...testForecastData})
      }
    );

    // Fake the time for 1 call
    tick(100);

    const testForecastConditionsRequest = httpTestingController.expectOne('api/forecasts/3')
    const testCityRequest = httpTestingController.expectOne('api/cities/3');
    
    expect(testForecastConditionsRequest.request.method).toEqual('GET'); 
    expect(testCityRequest.request.method).toEqual('GET');
    

    // Respond with the test data
    testForecastConditionsRequest.flush(testForecastData);
    testCityRequest.flush(testCityData);
    

    // Verify there are no outstanding requests
    httpTestingController.verify();

    discardPeriodicTasks();
  }));



  it('should make an api call every second', fakeAsync(() => {
    service.getCityConditions$(3).subscribe()

    // Allow enough time for 3 calls to be made
    tick(2500);

    // Expect 3 http calls
    let requests = httpTestingController.match('api/cities/3')
    expect(requests.length).toBe(3);

    discardPeriodicTasks();
  }));

  it('should load the forecast once per city', fakeAsync(() => {
    service.getForecasts$(3).subscribe()

    // Allow enough time for 3 calls to be made
    // tick(2500);

    // Expect 3 http calls
    let requests = httpTestingController.match('api/cities/3')
    expect(requests.length).toBe(3);

    discardPeriodicTasks();
  }));

});
