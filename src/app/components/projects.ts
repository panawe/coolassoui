import {Component, OnInit} from '@angular/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {User} from '../models/user';
import {Constants} from '../app.constants';
import {ChartData} from '../models/chartData';
import {Project} from '../models/project';
import {BaseService} from '../services/base.service';

@Component({
  selector: 'projects',
  templateUrl: '../pages/projects.html',
  providers: [BaseService, Constants]
})
export class Projects implements OnInit {
  data: any;
  projects: Project[] = [];
  picName: string;
  displayPic = false;

  constructor(private baseService: BaseService) {

  }
  ngOnInit() {
    this.baseService.getBudgetGraph()
      .subscribe((data: any) => {
        this.data = data;
      },
      error => console.log(error),
      () => console.log('Get budget Complete'));

    this.baseService.getAllProjectsWithPics()
      .subscribe((data: Project[]) => {
        this.projects = data;
        console.log(this.projects);
      },
      error => console.log(error),
      () => console.log('Get projects Complete'));
  }
  showLarge(name: string) {
    this.picName = name;
    this.displayPic = true;
  }
}
