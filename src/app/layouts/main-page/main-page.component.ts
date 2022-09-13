import {Component, OnDestroy, OnInit} from '@angular/core';
import {WeatherService} from "../../weather.service";
import {FiveDaysWeather, LocationResult} from "../../weather";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";

//215854 - Tel Aviv key
const DEFAULT_LOCATION_KEY = "215854";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
})
export class MainPageComponent implements OnInit, OnDestroy {
  fiveDays: FiveDaysWeather | undefined;
  currentLocation: LocationResult | undefined;
  fiveDaysSubscription: Subscription = new Subscription;
  locationSubscription: Subscription = new Subscription;

  constructor(private weatherService: WeatherService, private route: ActivatedRoute,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    let key = this.route.snapshot.paramMap.get('id')
    if (!key) {
      key = DEFAULT_LOCATION_KEY
    }
    this.get_five_days_weather(key);
    this.locationSubscription = this.weatherService.getLocationByKey(key).subscribe(
      res => this.currentLocation = res,
      err => this.toastr.error(err.message, `Error code: ${err.status}`)
    )
  }

  get_five_days_weather(key: string) {
    this.fiveDaysSubscription = this.weatherService.get5dayWeather(key).subscribe(
      res => this.fiveDays = res,
      err => this.toastr.error(err.message, `Error code: ${err.status}`)
    )
  }

  select_location(location: LocationResult | null) {
    if (location) {
      this.currentLocation = location;
      this.get_five_days_weather(location.Key)
    } else {
      this.currentLocation = undefined;
      this.fiveDays = undefined;
    }
  }

  ngOnDestroy(): void {
    this.locationSubscription.unsubscribe();
    this.fiveDaysSubscription.unsubscribe();
  }
}
