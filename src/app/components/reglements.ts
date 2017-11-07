import {Component, OnInit} from '@angular/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {User} from '../models/user';
import {Constants} from '../app.constants';
import { Html } from '../models/html';
import {BaseService} from '../services/base.service';

@Component({
  selector: 'reglements',
  templateUrl: '../pages/reglements.html',
  providers: [BaseService, Constants]
})
export class Reglements implements OnInit {
   reglements: Html = new Html();
  constructor(private baseService: BaseService) {

  }
  ngOnInit() {
    this.baseService.getHtml(2)
      .subscribe((data: Html) => {
        this.reglements = data;
      },
      error => console.log(error),
      () => console.log('Get Reglements Complete'));
  }
}
