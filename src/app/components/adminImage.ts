import { Component, OnInit,OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Image } from '../models/image';
import { ImageService } from '../services/image.service';
import { Constants } from '../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { FileUploader } from './fileUploader';
import { DataTableModule, DialogModule, InputTextareaModule,CheckboxModule } from 'primeng/primeng';
import { User } from '../models/user';  
@Component({ 
  selector: 'app-admin-campusimage',
  templateUrl: '../pages/adminImage.html' ,
  providers: [ImageService],
  styles: [` 
* { 
  margin: 0; 
  padding: 0;
}`]
})
export class AdminImage implements OnInit,OnDestroy {

  public images: Image[];
  public error: String = '';
  public selectedImage: Image;
  displayDialog: boolean;
  image: Image = new Image();
  newImage: boolean;
  cols : any[];
  @ViewChild(FileUploader) fileUploader:FileUploader;

  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;

  constructor
  (
    private imageService: ImageService, 
    private changeDetectorRef : ChangeDetectorRef
  ) {

  }
  ngOnInit() {
    this.getAll();
     this.cols = [
        //{field: 'title', header: Constants.TITLE, sortable : 'false', filter : 'true'},
        {field: 'description', header: Constants.DESCRIPTION, sortable : 'false', filter : 'true', style: {'width': '58%'}},
        {field: 'status', header:Constants.ACTIVE, sortable : 'true', filter : 'true', style: {'width': '15%'}},
        {field: 'rank', header: Constants.RANK, sortable : 'true', filter : 'true', style: {'width': '15%'}}
    ];
  }
  ngOnDestroy() {
    this.images = null;
    this.error = null;
    this.selectedImage = null;
    this.image = null;
    this.cols = null;
  }
  public getAll(): void {
    this.images = [];
    this.imageService.getAll()
      .subscribe((data: Image[]) => this.images = data,
      error => console.log(error),
      () => console.log('Get all Images complete'));
  }


  showDialogToAdd() {
    this.newImage = true;
    this.image = new Image();
    this.displayDialog = true;
  }

  save() {
    try {
         this.error = '';
        this.imageService.save(this.image)
        .subscribe(result => {
          if (result.id > 0) {            
            this.image = result;
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
          this.imageService.delete(this.image)
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
    if (this.newImage)
      this.images.push(this.image);
    else
      this.images[this.findSelectedIndex()] = this.image;

    var onTheFly : Image [] = [];
    onTheFly.push(...this.images);
    this.images = onTheFly;
    
    this.resetData();
  }

  removeFromTable() {
    this.images.splice(this.findSelectedIndex(), 1);
    var onTheFly : Image [] = [];
    onTheFly.push(...this.images);
    this.images = onTheFly;
    this.resetData();
  }
  
  resetData() {
    this.image = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newImage = false;
    this.image = this.clone(evt.data);
    this.displayDialog = true;
  }

   clone(e: Image): Image {
        let aImage = new Image();
        for(let prop in e) {
            aImage[prop] =e[prop];
        }
        return aImage;
    }
  
  findSelectedIndex(): number {
    return this.images.indexOf(this.selectedImage);
  }
  
  showDialogToUploadImage(data) {
    this.fileUploader.showDialogToUploadImage("gallery", data);
  }

}
