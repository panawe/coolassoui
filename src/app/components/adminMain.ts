import {Component, OnInit} from '@angular/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {User} from '../models/user';
import {Constants} from '../app.constants';
import {Mail} from '../models/mail';
import {Html} from '../models/html';
import {BaseService} from '../services/base.service';

@Component({
  selector: 'admin-main',
  templateUrl: '../pages/adminMain.html',
  providers: [BaseService, Constants],
  styles: [` 
* { 
  margin: 0; 
  padding: 0;
}`]
})
export class AdminMain implements OnInit {

  public user: User;
  statuts: Html = new Html();
  reglements: Html = new Html();
  msg: string;
  public mail: Mail = new Mail();
  constructor(private baseService: BaseService) {
    this.user = JSON.parse(Cookie.get('user'));
  }
  ngOnInit() {
  }

  onTabChange(evt) {
    this.msg = "";
    if (evt.index == 0) {
      //mail
    } else if (evt.index == 1) {
      //status
      this.baseService.getHtml(1)
        .subscribe((data: Html) => {
          this.statuts = data;
        },
        error => console.log(error),
        () => console.log('Get Status Complete'));

    } else if (evt.index == 2) {
      //Reglements 
      this.baseService.getHtml(2)
        .subscribe((data: Html) => {
          this.reglements = data;
        },
        error => console.log(error),
        () => console.log('Get Status Complete'));
    }
  }

  saveHtml(id: number) {
    this.msg = "";
    if (id == 1) {//status
      if (this.statuts.id == null || this.statuts.id == 0) {
        this.statuts.id = 1;
      }
      this.baseService.saveHtml(this.statuts)
        .subscribe((data: string) => {
          this.msg = data;
        },
        error => console.log(error),
        () => console.log('Save Statuts Complete'));
    } else if (id == 2) {
      if (this.reglements.id == null || this.reglements.id == 0) {
        this.reglements.id = 2;
      }
      this.baseService.saveHtml(this.reglements)
        .subscribe((data: string) => {
          this.msg = data;
        },
        error => console.log(error),
        () => console.log('Save Reglements Complete'));
    }
  }

  sendMassMail() {
    if (this.mail.body == null || this.mail.subject == null) {
      this.msg = "Saisissez le contenu et le sujet du mail";
    } else {
      this.mail.sender= this.user;
      this.baseService.sendMassMail(this.mail)
        .subscribe((data: string) => {
          this.msg = data;
        },
        error => console.log(error),
        () => console.log('sendMassMail Complete'));
    }
  }
}
