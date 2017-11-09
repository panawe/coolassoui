import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Constants} from '../app.constants';
import {Advertisement} from '../models/advertisement';
import {Annonce} from '../models/annonce';
import {ChartData} from '../models/chartData';
import {Contact} from '../models/contact';
import {Contribution} from '../models/contribution';
import {Country} from '../models/country';
import {Html} from '../models/html';
import {News} from '../models/news';
import {Project} from '../models/project';
import {User} from '../models/user';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Injectable()
export class BaseService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public getHtml = (htmlId: number): Observable<Html> => {
    this.actionUrl = Constants.apiServer + '/service/base/getHtml/' + htmlId;
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Html>response.json())
      .catch(this.handleError);
  }

  public getBudgetGraph = (): Observable<string> => {
    this.actionUrl = Constants.apiServer + '/service/base/getBudgetGraph';
    return this.http.get(this.actionUrl)
      .map((response: Response) => <string>response.json())
      .catch(this.handleError);
  }

  public saveHtml = (html: Html): Observable<string> => {
    let toAdd = JSON.stringify(html);
    let actionUrl = Constants.apiServer + '/service/base/saveHtml';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getAllCountries = (): Observable<Country[]> => {
    let actionUrl = Constants.apiServer + '/service/base/getAllCountries';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Country[]>response.json())
      .catch(this.handleError);
  }

  public getContributions = (): Observable<Contribution[]> => {
    let actionUrl = Constants.apiServer + '/service/user/getContributions';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Contribution[]>response.json())
      .catch(this.handleError);
  }

  public getUserContributions = (user: User): Observable<Contribution[]> => {
    let actionUrl = Constants.apiServer + '/service/user/getUserContributions/' + user.id;
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Contribution[]>response.json())
      .catch(this.handleError);
  }

  public getActiveAnnonces = (): Observable<Annonce[]> => {
    let actionUrl = Constants.apiServer + '/service/announce/getActiveAnnounces';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Annonce[]>response.json())
      .catch(this.handleError);
  }
  public getAllProjects = (): Observable<Project[]> => {
    let actionUrl = Constants.apiServer + '/service/base/getAllProjects';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Project[]>response.json())
      .catch(this.handleError);
  }

  public getAllActiveProjects = (): Observable<Project[]> => {
    let actionUrl = Constants.apiServer + '/service/base/getAllActiveProjects';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Project[]>response.json())
      .catch(this.handleError);
  }
  public getAllProjectsWithPics = (): Observable<Project[]> => {
    let actionUrl = Constants.apiServer + '/service/project/getAllProjects';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Project[]>response.json())
      .catch(this.handleError);
  }

  public getAllSponsors = (): Observable<Project[]> => {
    let actionUrl = Constants.apiServer + '/service/sponsor/getAllSponsors';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Project[]>response.json())
      .catch(this.handleError);
  }

  public getAllAdvertisements = (): Observable<Advertisement[]> => {
    let actionUrl = Constants.apiServer + '/service/marketing/getActiveMarketings';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Advertisement[]>response.json())
      .catch(this.handleError);
  }

  public getAllSysConfig = (): Observable<Constants[]> => {
    let actionUrl = Constants.apiServer + '/service/base/getAllSysConfigs';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Constants[]>response.json())
      .catch(this.handleError);
  }

  public createPayment = (parm: string): Observable<string> => {
    let toAdd = JSON.stringify(parm);
    let actionUrl = Constants.apiServer + '/service/payment/createPayment';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public makePayment = (parm: string): Observable<string> => {
    let toAdd = JSON.stringify(parm);
    let actionUrl = Constants.apiServer + '/service/payment/makePayment';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }


  public savePayment = (parm: string): Observable<string> => {
    let toAdd = JSON.stringify(parm);
    let actionUrl = Constants.apiServer + '/service/user/savePayment';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }
  public sendMail = (contact: Contact): Observable<boolean> => {
    let toAdd = JSON.stringify(contact);
    let actionUrl = Constants.apiServer + '/service/base/sendMail';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        if (response && response.json() == 'Success') {
          return true;
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
