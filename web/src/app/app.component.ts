import { Component } from '@angular/core';
import { SpinnerService, CityService } from "./api";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  cities = new BehaviorSubject([]);

  constructor(
    private cityService: CityService,
    public spinnerService: SpinnerService
  ) {
  }

  onCitiesChange(cities: string[]) {
    this.cityService.getCitiesWeather(cities).subscribe((citiesResponse) => {
      console.log(citiesResponse);
      this.cities.next(citiesResponse);
    });
  }
}
