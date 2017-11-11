import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Pub} from '../models/pub';
import {Constants} from '../app.constants';

@Injectable()
export class PubService {

  private actionUrl: string;
  private headers: Headers;
  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }
  public getAll = (): Observable<Pub[]> => {
    this.actionUrl = Constants.apiServer + '/service/pub/getAllPubs';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Pub[]>response.json())
      .catch(this.handleError);
  }

  public getPub = (pubId: string): Observable<Pub> => {
    let toAdd = JSON.stringify(pubId);
    let actionUrl = Constants.apiServer + '/service/pub/getPub';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getAllActivePubs = (): Observable<Pub[]> => {
    let actionUrl = Constants.apiServer + '/service/base/getAllActivePubs';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Pub[]>response.json())
      .catch(this.handleError);
  }

  public save = (pub: Pub): Observable<Pub> => {
    let toAdd = JSON.stringify(pub);
    console.log(toAdd);
    let actionUrl = Constants.apiServer + '/service/pub/save';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public delete = (pub: Pub): Observable<Boolean> => {
    let toAdd = JSON.stringify(pub);
    let actionUrl = Constants.apiServer + '/service/pub/delete';
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
