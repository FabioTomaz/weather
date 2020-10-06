import { Component } from '@angular/core';
import { SpinnerService } from "./api";
import { BehaviorSubject } from "rxjs";
import { City } from "./model/city";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  cities = new BehaviorSubject<City[]>([]);

  constructor(
    public spinnerService: SpinnerService
  ) {
  }

  onCitiesChange(cities: City[]) {
      this.cities.next(cities);
  }
}
