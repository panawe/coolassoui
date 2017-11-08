import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { BaseService } from '../../services/base.service';
import { Project } from '../../models/project';
 
@Injectable()
export class ProjectDropdown {
  
  filteredProjects : Project[];
  projects : Project[] = []; 
  
  constructor(
    private baseService: BaseService) {
    this.getAllProjects();
  }
  
  filter(event) {
    this.filteredProjects = DropdownUtil.filter(event, this.projects);
    console.info("Filtered Projects: " + this.filteredProjects)
  }
  
  handleDropdownClick(event) {
    console.info(this.projects);
    this.filteredProjects = [];
    setTimeout(() => {
      this.filteredProjects = this.projects;
    }, 10)
    console.info("Filtered Projects: " + this.filteredProjects)
  }
  
  private getAllProjects(): void {
    console.info(this.projects);
    this.baseService.getAllActiveProjects()
      .subscribe((data: Project[]) => this.projects = data,
      error => console.log(error),
      () => console.log('Get All Projects Complete'));
  }
  
}