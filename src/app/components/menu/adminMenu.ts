import {User} from '../../models/user';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, NavigationExtras} from '@angular/router';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-admin-menu',
  templateUrl: '../../pages/menu/adminMenu.html',
  styles: [` .nav>li.active>a {
    background: 0;
    color: #0078ae;
    font-weight: bold;
    border-left: 10px solid #2191c0;
}
    `]
})
export class AdminMenu implements OnInit {

  public adminTree: string;
  public adminMain: string;
  public adminPub: string;
  public adminNews: string;
  public adminProject: string;
  public adminFinance: string;
  public adminProfile: string;
  user: User;
  constructor(
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {

    if (this.user == null) {
      if (Cookie.get('user'))
        this.user = JSON.parse(Cookie.get('user'));
      if (this.user == null) {
        this.user = new User();
        this.user.id = 0;
      }
    }

    this.route
      .queryParams
      .subscribe(params => {
        this.adminTree = params['adminTree'];
        this.adminMain = params['adminMain'];
        this.adminPub = params['adminPub'];
        this.adminNews = params['adminNews'];
        this.adminProject = params['adminProject'];
        this.adminFinance = params['adminFinance'];
        this.adminProfile = params['adminProfile'];
      })
  }
}
