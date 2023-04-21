/** Angular Imports */
import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';

/** Third-Party Imports */
import { Observable, Subscription, timer } from "rxjs";
import { map, share } from 'rxjs/operators';
import { DateTime, Settings, Info, Zone } from 'luxon';
/** Local Imports */
import { CityConditions } from "../../../shared/models/city-conditions";

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.scss']
})
export class CurrentConditionsComponent implements OnInit {

  @Input() public cityConditions$: Observable<CityConditions> | null = null;
  time = new Date();
  rxTime = new Date();
  intervalId: any;
  subscription!: Subscription;
  tzNames!: string[];
  public selectedTz!: string;
  public localTimeZoneCode!: moment.Moment;
  public localUtcOffset!: moment.Moment;
  utcDate: moment.Moment | undefined;
  tzDate: moment.Moment | undefined;
  formattedDate: any;

  constructor() { }

  ngOnInit(): void {
    let cityName1;
    this.cityConditions$?.subscribe(
      res => {
        cityName1 ='America/'+res.name
        // console.log(cityname);
        this.updateTime(cityName1); });
        // console.log("outside",this.cityName);
    // this.updateTime(this.cityName);    
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);
    this.subscription = timer(0, 1000)
    .pipe(
      map(() => new Date()),
      share()
    )
    .subscribe(time => {
      let hour = this.rxTime.getHours();
      let minuts = this.rxTime.getMinutes();
      let seconds = this.rxTime.getSeconds();
      //let a = time.toLocaleString('en-US', { hour: 'numeric', hour12: true });
      let NewTime = hour + ":" + minuts + ":" + seconds
      // console.log(NewTime);
      this.rxTime = time;
    });
  }

  private updateTime(timeZone: string) {
    const currentTime = new Date().getTime();

    this.utcDate = moment(currentTime).utc();

    this.tzDate = moment(currentTime).tz(timeZone);
     this.formattedDate = (moment(this.tzDate)).format('DD-MMM-YYYY HH:mm:ss')
    console.log("time",this.formattedDate);
  }
  

  ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
