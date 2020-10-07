import { Component, OnInit } from '@angular/core';
import { ReplaySubject, BehaviorSubject } from "rxjs";
import { City } from "./model/city";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  public cities = new BehaviorSubject<City[]>([]);

  constructor() {
  }

  ngOnInit() {
    this.cities.subscribe();
  }

  onCitiesChange(cities: City[]) {
    this.cities.next(JSON.parse(JSON.stringify(cities)));
  }
}
