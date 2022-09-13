import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './layouts/main-page/main-page.component';
import {HttpClientModule} from "@angular/common/http";
import { WishlistComponent } from './layouts/wishlist/wishlist.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import {FormsModule} from "@angular/forms";
import { LocationWeatherComponent } from './components/location-weather/location-weather.component';
import { WishlistWeatherCardComponent } from './components/wishlist-weather-card/wishlist-weather-card.component';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    WishlistComponent,
    TopBarComponent,
    SearchBarComponent,
    LocationWeatherComponent,
    WishlistWeatherCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
