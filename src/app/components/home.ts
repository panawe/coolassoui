import {Constants} from '../app.constants';
import {Advertisement} from '../models/advertisement';
import {Contribution} from '../models/contribution';
import {News} from '../models/news';
import {Project} from '../models/project';
import {User} from '../models/user';
import {BaseService} from '../services/base.service';
import {NewsService} from '../services/news.service';
import {ProjectDropdown} from './dropdowns/dropdown.project';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Component({
  moduleId: 'module.id',
  selector: 'app-home',
  templateUrl: '../pages/home.html',
  providers: [BaseService, NewsService, Constants, ProjectDropdown]
})

export class Home implements OnInit {
  user: User;
  marketings: Advertisement[];
  PROJECT: string = Constants.PROJECT;
  SELECT_PROJECT: string = Constants.SELECT_PROJECT;
  payAmount: number;
  projet: Project;
  contributions: Contribution[];
  newss: News[];
  firstNewsId:number=1;
  public projectDropdown: ProjectDropdown;
  constructor(
    private prDropdown: ProjectDropdown,
    private baseService: BaseService,
    private newsService: NewsService) {
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

    this.newsService.getFirst3()
      .subscribe((data: News[]) => {
        this.newss = data;
        this.firstNewsId=this.newss[0].id;
        console.log(this.newss);
      },
      error => console.log(error),
      () => console.log('Get first 3 News complete'));
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

  setCurrentNews(aNews) {
    Cookie.set('newsId', aNews.id);
  }
}
