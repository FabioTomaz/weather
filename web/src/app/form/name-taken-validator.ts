import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from "@angular/forms";
import { City } from "../model/city";

@Directive({
  selector: '[appNameTaken]',
  providers: [ {provide: NG_VALIDATORS, useExisting: NameTakenValidatorDirective, multi: true} ]
})
export class NameTakenValidatorDirective implements Validator {
  @Input('appNameTaken') nameTaken: City[];

  validate(control: AbstractControl): { [ key: string ]: any } | null {
    return this.nameTaken ? this.isNameTaken(this.nameTaken)(control) : null;
  }

  isNameTaken(cities: City[]): ValidatorFn {
    return (control: AbstractControl): { [ key: string ]: any } | null => {
      const isTaken = cities.find((city) => city.name.toLowerCase() === control.value.toLowerCase());
      return isTaken ? {nameTaken: {value: control.value}} : null;
    };
  }
}
