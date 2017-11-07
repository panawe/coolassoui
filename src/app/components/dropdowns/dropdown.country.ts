import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { BaseService } from '../../services/base.service';
import { Country } from '../../models/country';
 
@Injectable()
export class CountryDropdown {
  
  filteredCountries : Country[];
  countries : Country[] = []; 
  
  constructor(
    private baseService: BaseService) {
    this.getAllCountries();
  }
  
  filter(event) {
    this.filteredCountries = DropdownUtil.filter(event, this.countries);
    console.info("Filtered Countries: " + this.filteredCountries)
  }
  
  handleDropdownClick(event) {
    console.info(this.countries);
    this.filteredCountries = [];
    setTimeout(() => {
      this.filteredCountries = this.countries;
    }, 10)
    console.info("Filtered Countries: " + this.filteredCountries)
  }
  
  private getAllCountries(): void {
    console.info(this.countries);
    this.baseService.getAllCountries()
      .subscribe((data: Country[]) => this.countries = data,
      error => console.log(error),
      () => console.log('Get All Countries Complete'));
  }
  
}