/** Angular Imports */
import { By } from "@angular/platform-browser";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

/** Third-Party Imports */
import { of } from "rxjs";

/** Local Imports */
import { CityConditions } from "../../../shared/models/city-conditions";
import { CurrentConditionsComponent } from './current-conditions.component';

describe('CurrentConditionsComponent', () => {
  let component: CurrentConditionsComponent;
  let fixture: ComponentFixture<CurrentConditionsComponent>;

  const testCityConditions: CityConditions = {
    id: 1,
    name: "Charlottetown",
    temp: 24,
    windSpeed: 34
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrentConditionsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the current conditions on screen', () => {
    component.cityConditions$ = of(testCityConditions);

    fixture.detectChanges();

    const headerText = fixture.debugElement.query(By.css('#header')).nativeElement.textContent;
    const temperatureText = fixture.debugElement.query(By.css('#tempLabel')).nativeElement.textContent;
    const windSpeedText = fixture.debugElement.query(By.css('#windLabel')).nativeElement.textContent;

    expect(headerText).toBe(`Current Conditions for ${testCityConditions.name}`);
    expect(temperatureText).toBe(`Temperature: ${testCityConditions.temp} C`);
    expect(windSpeedText).toBe(`Wind Speed: ${testCityConditions.windSpeed} km/hr`);
  });
});
