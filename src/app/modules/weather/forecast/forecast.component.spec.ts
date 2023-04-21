import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ForecastCityConditions } from 'src/app/shared/models/city-conditions';

import { ForecastComponent } from './forecast.component';

describe('ForecastComponent', () => {
  let component: ForecastComponent;
  let fixture: ComponentFixture<ForecastComponent>;
  const testForecastCityConditions: ForecastCityConditions = {
    id: 1,
    name: "Charlottetown",
    forecast:[{
      day: "Monday",
      temp: 12,
    
    }]
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForecastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the current conditions on screen', () => {
    component.forecastConditions$= of(testForecastCityConditions);

    fixture.detectChanges();

    const headerText = fixture.debugElement.query(By.css('#header')).nativeElement.textContent;
    const dayText = fixture.debugElement.query(By.css('#dayText')).nativeElement.textContent;
   const tempText = fixture.debugElement.query(By.css('#tempText')).nativeElement.textContent;

    expect(headerText).toBe(`Forecast`);
     expect(dayText).toBe(`${testForecastCityConditions.forecast.map(value=> value.day)}`);
     expect(tempText).toBe(`${testForecastCityConditions.forecast.map(value=> value.temp)}°C`);
  });
});
