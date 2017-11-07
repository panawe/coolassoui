import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { User } from '../models/user';
import { Constants } from '../app.constants';
import { UserService } from '../services/user.service';
import {CountryDropdown} from './dropdowns/dropdown.country';

@Component({
  selector: 'admin-profile',
  templateUrl: '../pages/adminProfile.html',  
  providers: [UserService, Constants, CountryDropdown] 
})
export class  AdminProfile implements OnInit {

  public user: User; 
  error: string;
  public countryDropdown: CountryDropdown;
 MALE: string = Constants.MALE;
  FEMALE: string = Constants.FEMALE;
  COUNTRY_RESIDENCE: string = Constants.COUNTRY_RESIDENCE;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  COUNTRY_ORIGIN: string = Constants.COUNTRY_ORIGIN;
  ALIVE: string = Constants.ALIVE;
  DEAD: string = Constants.DEAD;  
  constructor(private userService: UserService,
    private cDropdown: CountryDropdown) {
    this.countryDropdown = cDropdown;
    this.user = JSON.parse(Cookie.get('user'));    
    this.userService.getById(this.user)
      .subscribe((data: User) => {
        this.user = data
        //this.user.birthDate = new Date(this.user.birthDate);
      },
      error => console.log(error),
      () => console.log('Get user complete'));
      
  }
  ngOnInit() { 
  }
  

  public saveUser() {
    this.error = '';
    if (this.user.sex == null || this.user.firstName == null ||
      this.user.lastName == null || this.user.email == null ||
      this.user.password == null || this.user.cityResidence == null ||
      this.user.cityOrigin == null || this.user.countryOrigin == null ||
      this.user.countryResidence == null) {
      this.error = Constants.MISSING_REQUIRED_FIELD;
    } else {
            try {
              this.userService.saveUser(this.user)
                .subscribe(result => {
            this.error = result.error;
            if (!result.error.startsWith("Echec")) {
              this.user = result; 
            }
          })
      }
      catch (e) {
        this.error = Constants.ERROR_OCCURRED;
      }
    }

  }
}
