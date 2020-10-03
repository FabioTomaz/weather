import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  cityInput: string;

  cities: string[] = [];

  @Output() citiesChange = new EventEmitter<string[]>();

  constructor() { }

  onRemove(item: string) {
    const index = this.cities.indexOf(item);
    if (index > -1) {
      this.cities.splice(index, 1);
    }
  }

  addCity() {
    this.cities.push(this.cityInput);
  }

  confirmCities() {
    this.citiesChange.emit(this.cities);
  }
}
