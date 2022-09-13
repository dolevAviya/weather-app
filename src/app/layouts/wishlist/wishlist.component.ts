import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../../weather.service";
import {CurrentWeatherExtension, WishListItem} from "../../weather";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  wishlistKeys: WishListItem[] = [];
  wishlistWeathers: CurrentWeatherExtension[] = [];

  constructor(private weatherService: WeatherService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.wishlistKeys = this.weatherService.wishlistItems;
    this.wishlistKeys.forEach(location => this.weatherService.getCurrentWeather(location.id).subscribe(res => {
        if (!res.weather.LocalSource) {
          res.weather.LocalSource = {Name: location.name}
        }
        this.wishlistWeathers.push(res)
      },
      err => {
        this.toastr.error(err.message, `Error code: ${err.status}`);
      }
    ));
  }

}
