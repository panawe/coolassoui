import {Component, OnInit} from '@angular/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {User} from '../models/user';
import {Constants} from '../app.constants';
import {Transaction} from '../models/Transaction';
import {Contribution} from '../models/contribution';
import {Project} from '../models/project';
import {BaseService} from '../services/base.service';
import {UserService} from '../services/user.service';
import {ProjectDropdown} from './dropdowns/dropdown.project';
@Component({
  selector: 'admin-finance',
  templateUrl: '../pages/adminFinance.html',
  providers: [BaseService, UserService, Constants, ProjectDropdown],
  styles: [` 
* { 
  margin: 0; 
  padding: 0;
}`]
})
export class AdminFinance implements OnInit {
  data: any;
  public user: User;
  public loggedinUser: User;
  searchText: string;
  users: User[];
  transaction: Transaction = new Transaction();
  transactions: Transaction[] = [];
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
    this.getUserTransactions();
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

  getUserTransactions() {
    this.baseService.getUserTransactions(this.user)
      .subscribe((data: any) => {
        this.transactions = data;
      },
      error => console.log(error),
      () => console.log('Get budget Complete'));
  }

  savePayment() {
    this.error = "";
    if (this.transaction.project == null || this.transaction.amount == null || this.transaction.amount <= 0) {
      if (this.transaction.project == null) {
        this.error = "Selectionner le projet";
      } else {
        this.error = "Entree le montant";
      }
    } else {
      this.transaction.modifiedBy = this.loggedinUser.id;
      if (this.transaction.io == 1) {
        this.transaction.user = this.user;
      }else{
        this.transaction.user = this.loggedinUser;
      }
      this.baseService.savePayment(this.transaction).subscribe((data: string) => {
        this.error = data;
        this.putInTable();
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

  putInTable() {
    if (this.transaction) {
      this.transactions.push(this.transaction);
    } else {
      this.transactions[this.findSelectedIndex()] = this.transaction;
    }
    var onTheFly: Transaction[] = [];
    onTheFly.push(...this.transactions);
    this.transactions = onTheFly;

    this.resetData();
  }

  resetData() {
    this.transaction = new Transaction();
  }

  findSelectedIndex(): number {
    return this.transactions.indexOf(this.transaction);
  }
}
