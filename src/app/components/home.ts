import {Constants} from '../app.constants';
import {Advertisement} from '../models/advertisement';
import {Annonce} from '../models/annonce';
import {Contribution} from '../models/contribution';
import {Project} from '../models/project';
import { User } from '../models/user';
import {BaseService} from '../services/base.service';
import {ProjectDropdown} from './dropdowns/dropdown.project';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Component({
  moduleId: 'module.id',
  selector: 'app-home',
  templateUrl: '../pages/home.html',
  providers: [BaseService, Constants, ProjectDropdown]
})

export class Home  implements OnInit {
  user: User;
  marketings: Advertisement[];
  PROJECT: string = Constants.PROJECT;
  SELECT_PROJECT: string = Constants.SELECT_PROJECT;
  payAmount: number;
  projet: Project;
  contributions: Contribution[];
  annonces: Annonce[];
  public projectDropdown: ProjectDropdown;
  constructor(
    private prDropdown: ProjectDropdown,
    private baseService: BaseService) {
    this.projectDropdown = prDropdown;
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

    this.baseService.getAllAdvertisements()
      .subscribe((data: Advertisement[]) => {
        this.marketings = data;
        console.log(this.marketings);
      },
      error => console.log(error),
      () => console.log('Get All Sponsors Complete'));

    this.baseService.getContributions()
      .subscribe((data: Contribution[]) => {
        this.contributions = data;
      },
      error => console.log(error),
      () => console.log('Get All Contributions Complete'));

    this.baseService.getActiveAnnonces()
      .subscribe((data: Annonce[]) => {
        this.annonces = data;
      },
      error => console.log(error),
      () => console.log('Get All getActiveAnnonces Complete'));
  }


  public donate() {
    const parm: string = String(this.payAmount + "|" + this.projet.id + "|" + this.user == null ? 0 : this.user.id);
    this.baseService.createPayment(parm).subscribe((data: string) => {
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
}
