import { Component } from '@angular/core';
import { CityService } from "./api/city.service";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  cities = new BehaviorSubject([]);

  constructor(private cityService: CityService) {

  }

  onCitiesChange(cities: string[]) {
    this.cityService.getCitiesWeather(cities).subscribe((citiesResponse) => {
      console.log(citiesResponse);
      this.cities.next(citiesResponse);
    });
  }
}
