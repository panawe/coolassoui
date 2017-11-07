import {Component, OnInit} from '@angular/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {User} from '../models/user';
import {Constants} from '../app.constants';
import {Html} from '../models/html';
import {BaseService} from '../services/base.service';

@Component({
  selector: 'statuts',
  templateUrl: '../pages/statuts.html',
  providers: [BaseService, Constants]
})
export class Statuts implements OnInit {
  statuts: Html = new Html();
  constructor(private baseService: BaseService) {

  }
  ngOnInit() {
    this.baseService.getHtml(1)
      .subscribe((data: Html) => {
        this.statuts = data;
      },
      error => console.log(error),
      () => console.log('Get Status Complete'));
  }
}
