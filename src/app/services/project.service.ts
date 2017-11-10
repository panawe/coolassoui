import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Project} from '../models/project';
import {Constants} from '../app.constants';

@Injectable()
export class ProjectService {

  private actionUrl: string;
  private headers: Headers;
  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }
  public getAll = (): Observable<Project[]> => {
    this.actionUrl = Constants.apiServer + '/service/project/getAllProjects';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Project[]>response.json())
      .catch(this.handleError);
  }

  public getProject = (projectId: string): Observable<Project> => {
    let toAdd = JSON.stringify(projectId);
    let actionUrl = Constants.apiServer + '/service/project/getProject';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getAllActiveProjects = (): Observable<Project[]> => {
    let actionUrl = Constants.apiServer + '/service/base/getAllActiveProjects';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Project[]>response.json())
      .catch(this.handleError);
  }

  public save = (project: Project): Observable<Project> => {
    let toAdd = JSON.stringify(project);
    console.log(toAdd);
    let actionUrl = Constants.apiServer + '/service/project/save';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public delete = (project: Project): Observable<Boolean> => {
    let toAdd = JSON.stringify(project);
    let actionUrl = Constants.apiServer + '/service/project/delete';
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
