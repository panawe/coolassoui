import {Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild} from '@angular/core';
import {Project} from '../models/project';
import {ProjectService} from '../services/project.service';
import {Constants} from '../app.constants';
import {FileUploader} from './fileUploader';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {DataTableModule, DialogModule, InputTextareaModule, CheckboxModule} from 'primeng/primeng';
import {User} from '../models/user';
@Component({
  selector: 'app-admin-project',
  templateUrl: '../pages/adminProject.html',
  providers: [ProjectService],
  styles: [` 
* { 
  margin: 0; 
  padding: 0;
}`]
})
export class AdminProject implements OnInit, OnDestroy {

  public projects: Project[];
  public error: String = '';
  public selectedProject: Project;
  displayDialog: boolean;
  picName: string;
  displayPic = false;
  project: Project = new Project();
  newProject: boolean;
  cols: any[];
  @ViewChild(FileUploader) fileUploader: FileUploader;

  DETAIL: string = Constants.DETAIL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;

  constructor
    (
    private projectService: ProjectService,
    private changeDetectorRef: ChangeDetectorRef
    ) {

  }
  ngOnInit() {
    this.getAll();
    this.cols = [
      {field: 'title', header: Constants.TITLE, sortable: 'true', filter: 'true', style: {'width': '30%'}},
      {field: 'startDate', header: Constants.START_DATE, type: 'Date', sortable: 'true'},
      {field: 'endDate', header: Constants.END_DATE, type: 'Date', sortable: 'true'},
      {field: 'projectedStartDate', header: Constants.PROJECTED_START_DATE, type: 'Date', sortable: 'true'},
      {field: 'projectedEndDate', header: Constants.PROJECTED_END_DATE, type: 'Date', sortable: 'true'},
      {field: 'budget', type: 'money', header: Constants.BUDGET, sortable: 'false', filter: 'false'}
    ];
  }

  ngOnDestroy() {
    this.projects = null;
    this.error = null;
    this.selectedProject = null;
    this.project = null;
    //this.cols=null;
  }

  public getAll(): void {
    this.projects = [];
    this.projectService.getAll()
      .subscribe((data: Project[]) => this.projects = data,
      error => console.log(error),
      () => console.log('Get all Project complete'));
  }


  showDialogToAdd() {
    this.newProject = true;
    this.project = new Project();
    this.displayDialog = true;
  }

  save() {
    try {
      this.error = '';
      this.projectService.save(this.project)
        .subscribe(result => {
          if (result.id > 0) {
            this.project = result;
            this.putInTable();
          }
          else {
            this.error = Constants.saveFailed;
            this.displayDialog = true;
          }
        })
    }
    catch (e) {
      console.log(e);
    }


  }

  delete() {
    try {
      this.error = '';
      this.projectService.delete(this.project)
        .subscribe(result => {
          if (result) {
            this.removeFromTable();
          }
          else {
            this.error = Constants.deleteFailed;
            this.displayDialog = true;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

  putInTable() {
    if (this.newProject)
      this.projects.push(this.project);
    else
      this.projects[this.findSelectedIndex()] = this.project;

    var onTheFly: Project[] = [];
    onTheFly.push(...this.projects);
    this.projects = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.projects.splice(this.findSelectedIndex(), 1);
    var onTheFly: Project[] = [];
    onTheFly.push(...this.projects);
    this.projects = onTheFly;
    this.resetData();
  }

  resetData() {
    this.project = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newProject = false;
    this.project = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: Project): Project {
    let aProject = new Project();
    for (let prop in e) {
      aProject[prop] = e[prop];
    }
    return aProject;
  }

  findSelectedIndex(): number {
    return this.projects.indexOf(this.selectedProject);
  }

  showDialogToUploadImage(data) {
    this.fileUploader.showDialogToUploadImage("projects", data);
  }

  setCurrentProject(aProject) {
    Cookie.set('projectId', aProject.id);
  }

  showLarge(name: string) {
    this.picName = name;
    this.displayPic = true;
  }
}
