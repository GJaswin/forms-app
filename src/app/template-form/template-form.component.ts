import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CountriesService } from '../countries.service';
import { ConfirmPasswordDirective } from './confirm-password.directive';

interface FormDetails {
  name: string;
  email: string;
  phone: number | undefined;
  age: number | undefined;
  password: string;
  confirm_password: string;
  address: string;
  country: string;
  state: string;
  city: string;

}

@Component({
  selector: 'app-template-form',
  imports: [NgIf, NgFor, FormsModule, ConfirmPasswordDirective],
  templateUrl: './template-form.component.html',
  styleUrl: './template-form.component.css',
})



export class TemplateFormComponent {

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
    this.details.country = country;
    this.countryFieldLeave();
    this.details.state = "";
    this.details.city = "";
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
    this.details.state = state;
    this.stateFieldLeave();
    this.details.city = "";
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
    this.details.city = city;
    this.cityFieldLeave();
  }

  onSubmit(templateForm: NgForm) {
    if (templateForm.valid) {
      console.log("Submitted", this.details);
      this.submitted = true;
      setTimeout(() => {
        this.submitted = false;
      }, 4000);
    } else {
      console.error("Error: Invalid Form Details");
      templateForm.form.markAllAsTouched();
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 4000);
    }

  }



  details: FormDetails = {
    name: '',
    email: '',
    phone: undefined,
    age: undefined,
    password: '',
    confirm_password: '',
    address: '',
    country: '',
    state: '',
    city: ''
  }


}


