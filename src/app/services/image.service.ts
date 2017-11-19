import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {  Image } from '../models/image';
import { Constants } from '../app.constants';

@Injectable()
export class  ImageService { 

  private actionUrl: string;
  private headers: Headers;
  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }
  
  public getAll = (): Observable<Image[]> => {
    this.actionUrl = Constants.apiServer + '/service/campusimage/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Image[]>response.json())
      .catch(this.handleError);
  }

    public getActiveImages = (): Observable<Image[]> => {
      this.actionUrl = Constants.apiServer + '/service/campusimage/getActiveImages';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Image[]>response.json())
      .catch(this.handleError);
  }
  
  public getImage = (campusImageId: string): Observable<Image> => {
    let toAdd = JSON.stringify(campusImageId);
    let actionUrl = Constants.apiServer + '/service/campusimage/getImage';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public save = (campusImage: Image): Observable<Image> => {
    let toAdd = JSON.stringify(campusImage);
    let actionUrl = Constants.apiServer + '/service/campusimage/save';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public delete = (campusImage: Image): Observable<Boolean> => {
    let toAdd = JSON.stringify(campusImage);
    let actionUrl = Constants.apiServer + '/service/campusimage/delete';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
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
