import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { CountriesService } from '../countries.service';
import { passwordMatchValidator } from './confirm-password';

@Component({
  selector: 'app-reactive-form',
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.css',
  standalone: true
})

export class ReactiveFormComponent {

  constructor(private countriesService: CountriesService) { }

  allCountries: any;
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];

  loadingCountries = true;
  submitted = false;
  error = false;


  ngOnInit(): void {
    this.countriesService.getCountries().subscribe({
      next: (response) => {
        this.loadingCountries = false;
        this.allCountries = response;

        console.log(this.allCountries);

        for (let country of response) {
          this.countries.push(country.name);
        }
      },
      error: (err) => { console.error(err) }
    })
  }
  countryHovered = false;
  stateHovered = false;
  cityHovered = false;

  countryFieldHover() {
    this.countryHovered = true;
  }

  countryFieldLeave() {
    this.countryHovered = false;
  }

  stateFieldHover() {
    this.stateHovered = true;
  }

  stateFieldLeave() {
    this.stateHovered = false;
  }

  cityFieldHover() {
    this.cityHovered = true;
  }

  cityFieldLeave() {
    this.cityHovered = false;
  }

  setCountry(country: string) {
    this.reactiveForm.get('country')?.setValue(country);
    this.countryFieldLeave();
    this.reactiveForm.get('state')?.setValue("");
    this.reactiveForm.get('city')?.setValue("");
  }

  getStates(selectedCountry: string | null | undefined) {
    this.stateFieldHover();

    if (selectedCountry != null || selectedCountry != undefined) {

      let index = this.allCountries.findIndex((country: { name: string; }) => country.name == selectedCountry)
      this.states = this.allCountries[index]?.states;
      console.log(this.states);
    }

  }

  setState(state: string) {
    this.reactiveForm.get('state')?.setValue(state);
    this.stateFieldLeave();
    this.reactiveForm.get('city')?.setValue("");
  }

  getCities(selectedCountry: string | null | undefined, selectedState: string | null | undefined) {
    this.cityFieldHover();

    if ((selectedState != null || selectedState != undefined) && (selectedCountry != null || selectedCountry != undefined)) {

      let countryIndex = this.allCountries.findIndex((country: { name: string; }) => country.name == selectedCountry);
      let stateIndex = this.allCountries[countryIndex]?.states.findIndex((city: { name: string; }) => city.name == selectedState);
      this.cities = this.allCountries[countryIndex]?.states[stateIndex]?.cities;
      console.log(this.cities);

    }
  }


  setCity(city: string) {
    this.reactiveForm.get('city')?.setValue(city);
    this.cityFieldLeave();
  }

  onSubmit() {
    if (this.reactiveForm.valid) {
      console.log("Form Submitted Successfully", this.reactiveForm.value);
      this.submitted = true;
      setTimeout(() => {
        this.submitted = false;
      }, 4000);
    } else {
      console.error("Error: Invalid Form Details");
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 4000);
      this.reactiveForm.markAllAsTouched();
    }
  }

  reactiveForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required, Validators.min(18), Validators.max(130)]),
    password: new FormControl('', [Validators.required]),
    confirm_password: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
  },
    { validators: passwordMatchValidator }
  );


}
