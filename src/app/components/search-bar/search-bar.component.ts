import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {WeatherService} from "../../weather.service";
import {LocationResult} from "../../weather";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnDestroy{

  @Output() selectedLocation = new EventEmitter<LocationResult | null>();
  searchValue: string = '';
  autocompleteResults: LocationResult[] = [];
  autocompleteSubscription: Subscription = new Subscription;

  constructor(private weatherService: WeatherService, private toastr: ToastrService) {
  }

  handleSearch(locationName: string) {
    if (this.searchValue === '') {
      this.emit_selected_location(null)
    } else {
      let location = this.autocompleteResults.find(x => x.LocalizedName === locationName)
      if (location) {
        this.emit_selected_location(location);
      } else {
        this.weatherService.autocomplete(this.searchValue).subscribe(res => {
          this.autocompleteResults = res
        }, err => {
            this.toastr.error(err.message, `Error code: ${err.status}`);
        })
      }
    }
  }

  emit_selected_location(location: LocationResult | null) {
    this.selectedLocation.emit(location);
  }

  ngOnDestroy(): void {
    this.autocompleteSubscription.unsubscribe()
  }
}
