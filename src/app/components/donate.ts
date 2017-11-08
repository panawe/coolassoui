import {Component, OnInit} from '@angular/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {User} from '../models/user';
import {Constants} from '../app.constants';
import {BaseService} from '../services/base.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'donate',
  templateUrl: '../pages/donate.html',
  providers: [BaseService, Constants]
})
export class Donate implements OnInit {

  public user: User;

  constructor(private baseService: BaseService,
    private route: ActivatedRoute) {
    this.user = JSON.parse(Cookie.get('user'));
  }
  ngOnInit() {
    if (this.user == null) {
      this.user = JSON.parse(Cookie.get('user'));
    }
    //From Paypal site
    this.route
      .queryParams
      .subscribe(params => {
        //paymentId=PAY-0TR3831618395802RLGVZNDQ&token=EC-90D15469GV506001R&PayerID=XQ6KAQ8EW6L9E
        const paymentId: string = params['paymentId'];
        console.log(params);
        console.log('paymentId: ', paymentId);
        if (paymentId != null) {

          //Get other stuff
          let token: string = "";
          let PayerID: string = "";
          let projectId: string = "";
          let lidye: string = "";

          this.route
            .queryParams
            .subscribe(params => {
              token = params['token'];
              console.log('token: ', token);
            });

          this.route
            .queryParams
            .subscribe(params => {
              PayerID = params['PayerID'];
              console.log('PayerID: ', PayerID);
            });

          this.route
            .queryParams
            .subscribe(params => {
              projectId = params['projectId'];
              console.log('projectId: ', projectId);
            });

          this.route
            .queryParams
            .subscribe(params => {
              lidye = params['lidye'];
              console.log('lidye: ', lidye);
            });

          this.baseService.makePayment(token + "|" + paymentId + "|" + PayerID + "|" + this.user.id + "|" + projectId + "|" + lidye)
            .subscribe(result => {
              if (result) {
                console.log(result);
              }
            });

        }

      });
  }
}
