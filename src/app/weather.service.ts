import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {LocationResult, FiveDaysWeather, CurrentWeatherExtension, CurrentWeather, WishListItem} from "./weather";
import {catchError, map} from "rxjs/operators";

const API_KEY = "wfuNt9dTqgiBlHGJNFtVcY9YfcOjmorr";
const API_URL = "https://dataservice.accuweather.com";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {
  }

  autocomplete(text: string): Observable<LocationResult[]> {
    let url = API_URL + "/locations/v1/cities/autocomplete?apikey=" + API_KEY + "&q=" + text;
    return this.http.get<LocationResult[]>(url).pipe(catchError(err => throwError(err)))
  }

  getCurrentWeather(locationId: string): Observable<CurrentWeatherExtension> {
    let url = API_URL + "/currentconditions/v1/" + locationId + "?apikey=" + API_KEY;
    return this.http.get<CurrentWeather[]>(url).pipe(map((res: CurrentWeather[]) => {
      return {
        key: locationId, weather: res[0]
      }
    }), catchError(err => throwError(err)))
  };

  get5dayWeather(locationId: string, inCelsius: boolean = true): Observable<FiveDaysWeather> {
    let url = API_URL + "/forecasts/v1/daily/5day/" + locationId + "?apikey=" + API_KEY + "&metric=" + inCelsius
    return this.http.get<FiveDaysWeather>(url).pipe(catchError(err => throwError(err)))
  }

  getLocationByKey(key: string): Observable<LocationResult> {
    let url = API_URL + "/locations/v1/" + key + "?apikey=" + API_KEY;
    return this.http.get(url).pipe(map((res: any) => {
      return {
        Version: res.Version,
        Key: res.Key,
        Type: res.Type,
        Rank: res.Rank,
        LocalizedName: res.LocalizedName,
        Country: {
          ID: res.Country.ID,
          LocalizedName: res.Country.LocalizedName,
        },
        AdministrativeArea: {
          ID: res.AdministrativeArea.Id,
          LocalizedName: res.AdministrativeArea.LocalizedName,
        }
      }
    }), catchError(err => throwError(err)))
  }

  toggleLocationWishlist(item: WishListItem) {
    if (this.wishlistItems.includes(item)) {
      this.wishlistItems = this.wishlistItems.filter(x => x !== item)
    } else {
      this.wishlistItems.unshift(item)
    }
  }

  wishlistItems: WishListItem[] = [{id: "215854", name: "Tel Aviv"}];
}


