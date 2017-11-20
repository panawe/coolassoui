import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Rapport} from '../models/rapport';
import {Constants} from '../app.constants';

@Injectable()
export class RapportService {

  private actionUrl: string;
  private headers: Headers;
  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }
  public getAll = (): Observable<Rapport[]> => {
    this.actionUrl = Constants.apiServer + '/service/rapport/getAll';
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Rapport[]>response.json())
      .catch(this.handleError);
  }

  public getRapport = (rapportId: string): Observable<Rapport> => {
    let toAdd = JSON.stringify(rapportId);
    let actionUrl = Constants.apiServer + '/service/rapport/getRapport';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }


  public save = (rapport: Rapport): Observable<Rapport> => {
    let toAdd = JSON.stringify(rapport);
    console.log(toAdd);
    let actionUrl = Constants.apiServer + '/service/rapport/save';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public delete = (rapport: Rapport): Observable<Boolean> => {
    let toAdd = JSON.stringify(rapport);
    let actionUrl = Constants.apiServer + '/service/rapport/delete';
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
