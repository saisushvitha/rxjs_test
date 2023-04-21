/** Angular Imports */
import { ActivatedRoute, convertToParamMap } from "@angular/router";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

/** Third-Party Imports */
import { of } from "rxjs";

/** Local Imports */
import { CityConditions } from "../../shared/models/city-conditions";
import { WeatherComponent } from './weather.component';
import { WeatherService } from "./weather.service";

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;

  const mockedWeatherService = jasmine.createSpyObj('WeatherService', ['getCityConditions$'])

  const testCityConditionsData: CityConditions = {
    id: 4,
    name: "Summerside",
    temp: 13,
    windSpeed: 23
  }

  mockedWeatherService.getCityConditions$.and.returnValue(of(testCityConditionsData));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherComponent ],
      providers: [
        {
          provide: WeatherService,
          useValue: mockedWeatherService
        },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({id: 4}))
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the WeatherService with the id from the current route', (done: DoneFn) => {
    component.cityConditions$?.subscribe(() => {
      expect(mockedWeatherService.getCityConditions$).toHaveBeenCalledOnceWith(4);
      done();
    })
  });

});
