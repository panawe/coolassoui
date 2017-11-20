import {Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild} from '@angular/core';
import {Rapport} from '../models/rapport';
import {RapportService} from '../services/rapport.service';
import {Constants} from '../app.constants';
import {FileUploader} from './fileUploader';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {DataTableModule, DialogModule, InputTextareaModule, CheckboxModule} from 'primeng/primeng';
import {User} from '../models/user';
@Component({
  selector: 'app-admin-rapport',
  templateUrl: '../pages/adminRapport.html',
  providers: [RapportService],
  styles: [` 
* { 
  margin: 0; 
  padding: 0;
}`]
})
export class AdminRapport implements OnInit, OnDestroy {

  public rapports: Rapport[];
  public error: String = '';
  public selectedRapport: Rapport;
  displayDialog: boolean;
  rapport: Rapport = new Rapport();
  newRapport: boolean;
  cols: any[];
  user: User = new User();
  @ViewChild(FileUploader) fileUploader: FileUploader;

  DETAIL: string = Constants.DETAIL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;

  constructor
    (
    private rapportService: RapportService,
    private changeDetectorRef: ChangeDetectorRef
    ) {

  }
  ngOnInit() {
    this.user = JSON.parse(Cookie.get('user'));
    this.getAll();
    this.cols = [
      {field: 'rapportDate', header: Constants.DATE, type: 'Date', sortable: 'true', style: {'width': '15%'}},
      {field: 'title', header: Constants.TITLE, sortable: 'true', filter: 'true', style: {'width': '60%'}},
      {field: 'author', header: Constants.AUTEUR, sortable: 'true', filter: 'true', style: {'width': '25%'}}      
    ];
  }

  ngOnDestroy() {
    this.rapports = null;
    this.error = null;
    this.selectedRapport = null;
    this.rapport = null;
    //this.cols=null;
  }

  public getAll(): void {
    this.rapports = [];
    this.rapportService.getAll()
      .subscribe((data: Rapport[]) => this.rapports = data,
      error => console.log(error),
      () => console.log('Get all Rapport complete'));
  }


  showDialogToAdd() {
    this.newRapport = true;
    this.rapport = new Rapport();
    this.displayDialog = true;
  }

  save() {
    try {
      this.error = '';
      this.rapportService.save(this.rapport)
        .subscribe(result => {
          if (result.id > 0) {
            this.rapport = result;
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
      this.rapportService.delete(this.rapport)
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
    if (this.newRapport)
      this.rapports.push(this.rapport);
    else
      this.rapports[this.findSelectedIndex()] = this.rapport;

    var onTheFly: Rapport[] = [];
    onTheFly.push(...this.rapports);
    this.rapports = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.rapports.splice(this.findSelectedIndex(), 1);
    var onTheFly: Rapport[] = [];
    onTheFly.push(...this.rapports);
    this.rapports = onTheFly;
    this.resetData();
  }

  resetData() {
    this.rapport = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    if (this.user.role == 1) {//admin
      this.newRapport = false;
      this.rapport = this.clone(evt.data);
      this.rapport.rapportDate = new Date(this.rapport.rapportDate);
      this.displayDialog = true;
    }
  }

  clone(e: Rapport): Rapport {
    let aRapport = new Rapport();
    for (let prop in e) {
      aRapport[prop] = e[prop];
    }
    return aRapport;
  }

  findSelectedIndex(): number {
    return this.rapports.indexOf(this.selectedRapport);
  }

  showDialogToUploadImage(data) {
    this.fileUploader.showDialogToUploadImage("rapport", data);
  }

  setCurrentRapport(aRapport) {
    Cookie.set('rapportId', aRapport.id);
  }
}
