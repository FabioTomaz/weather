import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { CityService } from "../api";
import { MatDialog } from "@angular/material";
import { DialogComponent } from "./dialog/dialog.component";
import { City } from "../model/city";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: [ './form.component.css' ]
})
export class FormComponent implements OnInit {

  citiesForm: FormGroup;

  cityInput: string;

  cities: City[] = [];

  @Output() citiesChange = new EventEmitter<City[]>();

  constructor(
    private formBuilder: FormBuilder,
    private cityService: CityService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    // this.citiesForm = new FormGroup({
    //   name: new FormControl(this.cityInput, [
    //     Validators.pattern("^[a-zA-Z\\s]*$"),
    //     // this.isCityNameTaken
    //   ])
    // });
  }

  // get name() {
  //   return this.citiesForm.get('name');
  // }

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

  // Correct validator funcion
  isCityNameTaken(component: AbstractControl): ValidationErrors {
    this.cities.find(city => {
      if (city.name === this.cityInput.toLowerCase()) {
        // found the city
        return {
          cityNameTaken: {
            valid: false
          }
        };
      }
    });

    // Everything is ok
    return null;
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
