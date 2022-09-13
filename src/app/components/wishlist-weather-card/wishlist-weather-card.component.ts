import {Component, Input} from '@angular/core';
import {WeatherService} from "../../weather.service";
import {CurrentWeatherExtension} from "../../weather";
import {Router} from "@angular/router";

@Component({
  selector: 'app-wishlist-weather-card',
  templateUrl: './wishlist-weather-card.component.html',
  styleUrls: ['./wishlist-weather-card.component.scss']
})
export class WishlistWeatherCardComponent{
  @Input() currentWeather: CurrentWeatherExtension | undefined;
  isLocationClicked: boolean = true;

  constructor(private weatherService: WeatherService, private router: Router) {
  }

  toggleLocationWishlist() {
    if (this.currentWeather && this.currentWeather.weather.LocalSource) {
      this.weatherService.toggleLocationWishlist({id: this.currentWeather.key, name: this.currentWeather.weather.LocalSource?.Name})
      this.isLocationClicked = !this.isLocationClicked
    }
  }

  redirect(){
    this.router.navigate(['/main', {id: this.currentWeather?.key}]).then();
  }

}
