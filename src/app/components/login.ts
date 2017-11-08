import {Component, OnInit, Output, EventEmitter, NgZone} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {UserService} from '../services/user.service';
import {BaseService} from '../services/base.service';
import {Constants} from '../app.constants';
import {User} from '../models/user';
import {Country} from '../models/Country';
import {AppComponent} from '../app.component';
import {ChartModule} from 'primeng/primeng';
import {GlobalEventsManager} from "../services/globalEventsManager";

import {CountryDropdown} from './dropdowns/dropdown.country';
import {
  EditorModule, TabViewModule, PasswordModule, SharedModule, StepsModule, MenuItem,
  FileUploadModule, InputTextModule, CalendarModule, DropdownModule, AutoCompleteModule,
  MessagesModule, Message
} from 'primeng/primeng';

@Component({
  selector: 'user-login-form',
  templateUrl: '../pages/login.html',
  providers: [UserService, Constants, BaseService, CountryDropdown]
})

export class Login implements OnInit {
  error = '';
  passwordSent = '';
  button = '';
  user: User;
  msgs: Message[] = [];
  don: string;
  I_AM_MEMBER: string = Constants.I_AM_MEMBER;
  I_AM_SUBSCRIBE: string = Constants.I_AM_SUBSCRIBE;
  SEND_ME_MY_PASSWORD: string = Constants.SEND_ME_MY_PASSWORD;
  MALE: string = Constants.MALE;
  FEMALE: string = Constants.FEMALE;
  COUNTRY_RESIDENCE: string = Constants.COUNTRY_RESIDENCE;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  COUNTRY_ORIGIN: string = Constants.COUNTRY_ORIGIN;
  public countryDropdown: CountryDropdown;

  constructor(
    private router: Router,
    private userService: UserService,
    private baseService: BaseService,
    private globalEventsManager: GlobalEventsManager,
    private cDropdown: CountryDropdown) {
    this.user = new User();
    this.countryDropdown = cDropdown;
  }

  ngOnInit() {

    this.user = new User();

    if (Cookie.get('don')) {
      this.don = Cookie.get('don');
      console.log(this.don);
      if (this.don != null && this.don != "") {
        this.error = "Vous devez vous connecter pour effectuer completer le payement/don."
      }
    }
  }

  public login() {
    try {
      if (this.button == 'password') {
        this.sendPassword();
      } else {
        this.userService.login(this.user)
          .subscribe(result => {
            if (result == true) {
              this.globalEventsManager.showNavBar.emit(this.user);

              this.user = JSON.parse(Cookie.get('user'));

              if (this.don != null && this.don != "") {
                this.error = "";
                this.donate();
              } else {
                if (this.user.role == 1) {//admin
                  this.router.navigate(["/admin/adminTree"]);
                } else { //others
                  this.router.navigate(["/"]);
                }
              }
            }
            else {
              this.error = Constants.INVALID_USER_PASS;
            }
          })
      }
    }
    catch (e) {
      this.error = Constants.ERROR_OCCURRED;
    }


  }


  public donate() {
    const parm: string = this.don + "|" + (this.user == null ? 1 : this.user.id);
    this.baseService.createPayment(parm).subscribe((data: string) => {
      Cookie.delete('don');
      window.location.href = data;
      console.log(data);
    }, error => {
      console.log(error);
      console.log('createPayment failed');
    },
      () => {
        console.log('createPayment successful');
      }
    );

  }

  public sendPassword() {
    try {
      this.userService.sendPassword(this.user)
        .subscribe(result => {
          if (result == true) {
            this.passwordSent = Constants.PASSWORD_SENT + this.user.email;
          }
          else {
            this.error = Constants.PASSWORD_NOT_SENT;
          }
        })
    }
    catch (e) {
      this.error = Constants.ERROR_OCCURRED;
    }

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
        this.userService.registerOnline(this.user)
          .subscribe(result => {
            const user: User = result;
            if (result.error == null) {
              this.user = JSON.parse(Cookie.get('user'));
              this.globalEventsManager.showNavBar.emit(this.user);
              if (this.don != null && this.don != "") {
                this.error = "";
                this.donate();
              } else {

                if (this.user.role == 1) {//student
                  this.router.navigate(["/admin/adminTree"]);
                } else {
                  this.router.navigate(["/"]);
                }
              }
              //window.location.reload();
            } else {
              this.error = user.error;
            }
          })
      }
      catch (e) {
        this.error = Constants.ERROR_OCCURRED;
      }
    }

  }

}
