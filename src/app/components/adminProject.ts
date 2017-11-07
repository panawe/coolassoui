import {Component, OnInit} from '@angular/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {User} from '../models/user';
import {Constants} from '../app.constants';
import {UserService} from '../services/user.service';

@Component({
  selector: 'admin-project',
  templateUrl: '../pages/adminProject.html',
  providers: [UserService, Constants]
})
export class AdminProject implements OnInit {

  public user: User;
  constructor(private userService: UserService) {
    this.user = JSON.parse(Cookie.get('user'));
  }
  ngOnInit() {
  }
}
