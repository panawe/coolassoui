import {Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild} from '@angular/core';
import {Pub} from '../models/pub';
import {PubService} from '../services/pub.service';
import {Constants} from '../app.constants';
import {FileUploader} from './fileUploader';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {DataTableModule, DialogModule, InputTextareaModule, CheckboxModule} from 'primeng/primeng';
import {User} from '../models/user';
@Component({
  selector: 'app-admin-pub',
  templateUrl: '../pages/adminPub.html',
  providers: [PubService],
  styles: [` 
* { 
  margin: 0; 
  padding: 0;
}`]
})
export class AdminPub implements OnInit, OnDestroy {
  public pubs: Pub[];
  public error: String = '';
  public selectedPub: Pub;
  displayDialog: boolean;
  picName: string;
  displayPic = false;
  pub: Pub = new Pub();
  newPub: boolean;
  cols: any[];
  @ViewChild(FileUploader) fileUploader: FileUploader;
  DETAIL: string = Constants.DETAIL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;
  constructor
    (
    private pubService: PubService,
    private changeDetectorRef: ChangeDetectorRef
    ) {

  }
  ngOnInit() {
    this.getAll();
    this.cols = [
      {field: 'description', header: Constants.DESCRIPTION, sortable: 'true', filter: 'true', style: {'width': '30%'}},
      {field: 'link', header: Constants.URL, sortable: 'true', style: {'width': '20%'}},
      {field: 'beginDate', header: Constants.START_DATE, type: 'Date', sortable: 'true'},
      {field: 'endDate', header: Constants.END_DATE, type: 'Date', sortable: 'true'},
      {field: 'rank', header: Constants.RANK,  sortable: 'true'},
      {field: 'status', header: Constants.ACTIVE,  sortable: 'true'},
      {field: 'cost', type: 'money', header: Constants.COST, sortable: 'true'}
    ];
  }

  ngOnDestroy() {
    this.pubs = null;
    this.error = null;
    this.selectedPub = null;
    this.pub = null;
  }

  public getAll(): void {
    this.pubs = [];
    this.pubService.getAll()
      .subscribe((data: Pub[]) => this.pubs = data,
      error => console.log(error),
      () => console.log('Get all Pub complete'));
  }

  showDialogToAdd() {
    this.newPub = true;
    this.pub = new Pub();
    this.displayDialog = true;
  }

  save() {
    try {
      this.error = '';
      this.pubService.save(this.pub)
        .subscribe(result => {
          if (result.id > 0) {
            this.pub = result;
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
      this.pubService.delete(this.pub)
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
    if (this.newPub)
      this.pubs.push(this.pub);
    else
      this.pubs[this.findSelectedIndex()] = this.pub;
    var onTheFly: Pub[] = [];
    onTheFly.push(...this.pubs);
    this.pubs = onTheFly;
    this.resetData();
  }

  removeFromTable() {
    this.pubs.splice(this.findSelectedIndex(), 1);
    var onTheFly: Pub[] = [];
    onTheFly.push(...this.pubs);
    this.pubs = onTheFly;
    this.resetData();
  }

  resetData() {
    this.pub = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newPub = false;
    this.pub = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: Pub): Pub {
    let aPub = new Pub();
    for (let prop in e) {
      aPub[prop] = e[prop];
    }
    return aPub;
  }

  findSelectedIndex(): number {
    return this.pubs.indexOf(this.selectedPub);
  }

  showDialogToUploadImage(data) {
    this.fileUploader.showDialogToUploadImage("pubs", data);
  }

  setCurrentPub(aPub) {
    Cookie.set('pubId', aPub.id);
  }

  showLarge(name: string) {
    this.picName = name;
    this.displayPic = true;
  }
}
