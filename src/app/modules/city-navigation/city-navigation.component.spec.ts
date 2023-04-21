/** Angular Imports */
import { By } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";
import { ComponentFixture, TestBed } from '@angular/core/testing';

/** Third-Party Imports */
import { of } from "rxjs";

/** Local Imports */
import { City } from "../../shared/models/city";
import { CityNavigationComponent } from './city-navigation.component';
import { CityService } from "./city.service";

describe('CityNavigationListComponent', () => {
  let component: CityNavigationComponent;
  let fixture: ComponentFixture<CityNavigationComponent>;

  const mockedCityService = jasmine.createSpyObj('CityService', ['getCities$']);

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

  mockedCityService.getCities$.and.returnValue(of(testCitiesData));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityNavigationComponent ],
      imports: [ RouterTestingModule ],
      providers: [{
        provide: CityService,
        useValue: mockedCityService
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should obtain a list of cities from the CityService', (done: DoneFn) => {
    expect(mockedCityService.getCities$).toHaveBeenCalled();

    component.cities$?.subscribe(
      (cities: City[]) => {
        expect(cities).toEqual(testCitiesData);
        done();
      }
    )
  });

  it('should display the list of cities', () => {
    const linkList = fixture.debugElement.queryAll((By.css('a')));

    expect(linkList.length).toBe(testCitiesData.length);

    // Check that all city names are displayed and link to the correct urls
    for (let i = 0; i < testCitiesData.length; i++) {
      let link = linkList[i];
      expect(link.nativeElement.textContent).toBe(testCitiesData[i].name);
      expect(link.properties['href']).toBe(`/${testCitiesData[i].id}`)
    }
  });
});
