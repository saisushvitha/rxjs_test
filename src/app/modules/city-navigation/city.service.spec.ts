/** Angular Imports */
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from '@angular/core/testing';

/** Local Imports */
import { City } from "../../shared/models/city";
import { CityService } from './city.service';

describe('CityService', () => {
  let service: CityService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make an http request to get a list of cities', () => {
    const testCitiesData: City[] = [
      {
        id: 1,
        name: "Summerside"
      },
      {
        id: 2,
        name: "Charlottetown"
      },
      {
        id: 3,
        name: "Halifax"
      }
    ]

    // Check that the response is correct
    service.getCities$().subscribe(
      (city: City[]) => {
        expect(city).toEqual(testCitiesData);
      }
    );

    // Should have made 1 request to the api
    const testCitiesRequest = httpTestingController.expectOne('api/cities');

    // The request should be a GET request
    expect(testCitiesRequest.request.method).toEqual('GET');

    // Respond with the test data
    testCitiesRequest.flush(testCitiesData);

    // Verify there are no outstanding requests
    httpTestingController.verify();
  })
});
