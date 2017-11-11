import {Constants} from '../app.constants';
import {Pub} from '../models/pub';
import {Contribution} from '../models/contribution';
import {News} from '../models/news';
import {Project} from '../models/project';
import {User} from '../models/user';
import {BaseService} from '../services/base.service';
import {NewsService} from '../services/news.service';
import {ProjectDropdown} from './dropdowns/dropdown.project';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Component({
  moduleId: 'module.id',
  selector: 'app-home',
  templateUrl: '../pages/home.html',
  providers: [BaseService, NewsService, Constants, ProjectDropdown]
})

export class Home implements OnInit {
  user: User;
  pubs: Pub[];
  PROJECT: string = Constants.PROJECT;
  SELECT_PROJECT: string = Constants.SELECT_PROJECT;
  payAmount: number;
  projet: Project;
  contributions: Contribution[];
  newss: News[];
  error: string = "";
  firstNewsId: number = 1;
  currencyCode: string = "USD";
  public projectDropdown: ProjectDropdown;
  constructor(
    private prDropdown: ProjectDropdown,
    private baseService: BaseService,
    private newsService: NewsService,
    private router: Router) {
    this.projectDropdown = prDropdown;
  }

  ngOnInit() {
    console.log('in AppComponent init');
    this.error = "";
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

    this.baseService.getAllActivePubs()
      .subscribe((data: Pub[]) => {
        this.pubs = data;
        console.log(this.pubs);
      },
      error => console.log(error),
      () => console.log('Get All Sponsors Complete'));

    this.baseService.getContributions()
      .subscribe((data: Contribution[]) => {
        this.contributions = data;
      },
      error => console.log(error),
      () => console.log('Get All Contributions Complete'));

    this.newsService.getFirst3()
      .subscribe((data: News[]) => {
        this.newss = data;
        this.firstNewsId = this.newss[0].id;
        console.log(this.newss);
      },
      error => console.log(error),
      () => console.log('Get first 3 News complete'));
  }


  public donate() {
    this.error = "";
    if (this.projet == null || this.payAmount == null || this.payAmount <= 0) {
      if (this.projet == null) {
        this.error = "Selectionner le projet";
      } else {
        this.error = "Entree le montant";
      }

    } else if (this.user == null || this.user.id == 0) {
      Cookie.set('don', this.payAmount + "|" + this.currencyCode + "|" + this.projet.id);
      this.router.navigate(["/login"]);
    } else {
      const parm: string = this.payAmount + "|" + this.currencyCode + "|" + this.projet.id + "|" + this.user.id;
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

  setCurrentNews(aNews) {
    Cookie.set('newsId', aNews.id);
  }
}
