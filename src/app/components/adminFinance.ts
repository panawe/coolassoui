import {Component, OnInit} from '@angular/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {User} from '../models/user';
import {Constants} from '../app.constants';
import {Contribution} from '../models/contribution';
import {Project} from '../models/project';
import {BaseService} from '../services/base.service';
import {UserService} from '../services/user.service';
import {ProjectDropdown} from './dropdowns/dropdown.project';
@Component({
  selector: 'admin-finance',
  templateUrl: '../pages/adminFinance.html',
  providers: [BaseService, UserService, Constants, ProjectDropdown]
})
export class AdminFinance implements OnInit {
  data: any;
  public user: User;
  public loggedinUser: User;
  searchText: string;
  users: User[];
  contributions: Contribution[];
  projet: Project;
  payAmount: number;
  currencyCode: string = "CFA";
  USER_SEARCH_PARTS: string = Constants.USER_SEARCH_PARTS;
  SELECT_PROJECT: string = Constants.SELECT_PROJECT;
  error: string;
  public projectDropdown: ProjectDropdown;
  constructor(
    private prDropdown: ProjectDropdown,
    private baseService: BaseService,
    private userService: UserService) {
    this.loggedinUser = JSON.parse(Cookie.get('user'));
    this.projectDropdown = prDropdown;
  }
  ngOnInit() {
    this.user = JSON.parse(Cookie.get('user'));
    this.getUserContribution();
    this.baseService.getBudgetGraph()
      .subscribe((data: any) => {
        this.data = data;
      },
      error => console.log(error),
      () => console.log('Get budget Complete'));
  }

  public search() {
    this.error = null;
    if (this.searchText != null) {
      this.userService.search(this.searchText).subscribe((data: User[]) => {
        this.users = data;
        if (this.users == null || this.users.length <= 0) {
          this.error = Constants.NO_USER_FOUND;
        }
      },
        error => console.log(error),
        () => console.log('Find users with name like ' + this.searchText));
    }
  }

  getUserContribution() {
    this.baseService.getUserContributions(this.user)
      .subscribe((data: any) => {
        this.contributions = data;
      },
      error => console.log(error),
      () => console.log('Get budget Complete'));
  }

  savePayment() {
    this.error = "";
    if (this.projet == null || this.payAmount == null || this.payAmount <= 0) {
      if (this.projet == null) {
        this.error = "Selectionner le projet";
      } else {
        this.error = "Entree le montant";
      }
    } else {
      const parm: string = this.payAmount + "|" + this.currencyCode + "|" + this.projet.id + "|" + this.user.id + "|" + this.loggedinUser.id;
      this.baseService.savePayment(parm).subscribe((data: string) => {
        this.error = data;
        this.payAmount = null;
        this.projet = null;
        this.getUserContribution();
        this.baseService.getBudgetGraph()
          .subscribe((data: any) => {
            this.data = data;
          },
          error => console.log(error),
          () => console.log('Get budget Complete'));

      }, error => {
        console.log(error);
        this.error = "Use error systeme s'est produite";
      },
        () => {
          console.log('createPayment successful');
        }
      );
    }

  }
}
