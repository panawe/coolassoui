import {Constants} from './app.constants';
import {Advertisement} from './models/advertisement';
import {Sponsor} from './models/sponsor';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {User} from './models/user';
import {Project} from './models/project';
import {Cookie} from 'ng2-cookies';
import {Router} from '@angular/router';
import {ProjectDropdown} from './components/dropdowns/dropdown.project';
import {Annonce} from './models/annonce';
import {Contribution} from './models/contribution';
import {GlobalEventsManager} from "./services/globalEventsManager";
import {BaseService} from "./services/base.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GlobalEventsManager, BaseService, Constants, ProjectDropdown]
})
export class AppComponent  implements OnInit {
  user: User;
  public projectDropdown: ProjectDropdown;
  constructor(
    private router: Router, 
    private baseService: BaseService,
    private globalEventsManager: GlobalEventsManager) {
  }
  ngOnInit() {
    console.log('in AppComponent init');
    if (this.user == null) {
      //console.log('User = '+Cookie.get('user'));
      if (Cookie.get('user'))
        this.user = JSON.parse(Cookie.get('user'));
      if (this.user == null) {
        //console.log('User1= '+this.user);
        this.user = new User();
        this.user.id = 0;
      }
    }
    this.globalEventsManager.showNavBar.subscribe((data: boolean) => {
      console.log('globalEventsManager reached');
      this.user = JSON.parse(Cookie.get('user'));
    }, error => console.log(error));
  }



  ngOnDestroy() {
    // prevent memory leak when component  
  }
  public logout() {
    Cookie.deleteAll();
    this.user = new User();
    this.user.id = 0;
    this.router.navigate(["/"])
  }

  public updateUser(aUser) {
    this.user = aUser;
  }
  public refreshUser() {
    this.user = JSON.parse(Cookie.get('user'));
    if (this.user == null) {
      this.user = new User();
    }
  }
}
