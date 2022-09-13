import {Component,  Input, SimpleChanges} from '@angular/core';
import {FiveDaysWeather, LocationResult} from "../../weather";
import {WeatherService} from "../../weather.service";

interface ngOnChanges {
}

@Component({
  selector: 'app-location-weather',
  templateUrl: './location-weather.component.html',
  styleUrls: ['./location-weather.component.scss']
})
export class LocationWeatherComponent implements ngOnChanges {
  @Input() location: LocationResult | undefined;
  @Input() fiveDaysWeather: FiveDaysWeather | undefined;
  isLocationClicked: boolean = false;

  constructor(private weatherService: WeatherService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.location) {
      this.isLocationClicked = this.weatherService.wishlistItems.some(location => location.id === this.location?.Key)
    }
  }

  toggleLocationWishlist() {
    if (this.location) {
      this.weatherService.toggleLocationWishlist({id: this.location.Key, name:this.location.LocalizedName})
      this.isLocationClicked = !this.isLocationClicked;
    }
  }

}
