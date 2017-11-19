import {Component, ChangeDetectorRef, OnInit} from '@angular/core';
import {Video} from '../models/video';
import {VideoService} from '../services/video.service';
import {Constants} from '../app.constants';
import {Image} from '../models/Image';
import {VideoPair} from '../models/videopair';
import {Lightbox} from 'angular2-lightbox';
import {ImageService} from '../services/image.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
@Component({
  selector: 'app-videos',
  templateUrl: '../pages/videoImage.html',
  providers: [VideoService, ImageService, Constants]
})
export class VideoImage implements OnInit {

  //videoPairs: VideoPair[] = [];
  videos: Video[]= [];
  images: Image[] = [];
  private _albums: any[] = [];
  constructor
    (private domSanitizer: DomSanitizer,
    private videoService: VideoService,
    private imageService: ImageService,
    private _lightbox: Lightbox,
    private Constants: Constants, private changeDetectorRef: ChangeDetectorRef
    ) {


  }

  ngOnInit() {

    this.imageService.getActiveImages()
      .subscribe((data: Image[]) => {
        this.images = data;
        for (let i = 0; i < data.length; i++) {
          const src = 'assets/images/gallery/' + data[i].pic;
          const caption = data[i].description;
          const thumb = 'assets/images/gallery/' + data[i].pic;
          const album = {
            src: src,
            caption: caption,
            thumb: thumb
          };

          this._albums.push(album);
        }
        /**
        for (let i = 0; i < data.length; i++) {
          let image = data[i];
          console.log(image.pic);
          this.images.push({ source: 'assets/images/gallery/' + image.pic, alt: '', title: image.description });

        } */
      },
      error => console.log(error),
      () => console.log('Get Active CampusImages complete'));


    this.videoService.getActiveVideos()
      .subscribe((data: Video[]) => {
        this.videos= data;
        
        /**var j = 0;

        for (let i = 0; i < videos.length; i++) {
          var videoPair = new VideoPair();
          videoPair.video1 = videos[i];
          if (++i < videos.length) {
            videoPair.video2 = videos[i];
          } else {
            videoPair.video2 = new Video();
          }
          this.videoPairs[j++] = videoPair;
        }*/


      },
      error => console.log(error),
      () => console.log('Get all Active Videos complete'));

    //this.changeDetectorRef.detectChanges();
  }

  open(index: number): void {
    // open lightbox
    console.log("Openning " + index);
    this._lightbox.open(this._albums, index);
  }
  public sanitize(url): SafeResourceUrl {
    if (url != null) {
      return this.domSanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + url + "?autoplay=0");
    } else {
      return null;
    }
  }
}
