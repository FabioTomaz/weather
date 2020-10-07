import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { CityService, SpinnerService } from "../api";
import { MatDialog } from "@angular/material";
import { DialogComponent } from "./dialog/dialog.component";
import { City } from "../model/city";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: [ './form.component.css' ]
})
export class FormComponent {

  cityInput: string;

  cities: City[] = [];

  @Output() citiesChange = new EventEmitter<City[]>();

  constructor(
    private formBuilder: FormBuilder,
    private cityService: CityService,
    private dialog: MatDialog,
    public spinnerService: SpinnerService
  ) {
  }

  onRemove(item: City) {
    const index = this.cities.indexOf(item);
    if (index > -1) {
      this.cities.splice(index, 1);
    }
  }

  addCity() {
    this.cityService.getCityByName(this.cityInput.toLowerCase()).subscribe(
      (city) => {
        this.cities.push(city);
        this.cityInput = "";
      },
      (error) => {
        if (error.status === 404) {
          this.openDialog("City does not exist!", null);
        }
      }
    );
  }

  confirmCities() {
    this.citiesChange.emit(this.cities);
  }

  openDialog(title: string, message: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: {title: title, message: message}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
