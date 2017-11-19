import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {Home} from './components/home';
import {Login} from './components/login';
import {Arbre} from './components/tree';
import {Statuts} from './components/statuts';
import {Reglements} from './components/reglements';
import {Projects} from './components/projects';
import {Donate} from './components/donate';
import {VideoImage} from './components/videoImage';
import {NewsSingle} from './components/newsSingle';
export const routes: Routes = [
  {path: 'home', component: Home},
  {path: 'login', component: Login},
  {path: 'videoImage', component: VideoImage},
  {path: 'donate', component: Donate},
  {path: 'newsSingle', component: NewsSingle},
  {path: 'statuts', component: Statuts},
  {path: 'reglements', component: Reglements},
  {path: 'projects', component: Projects},
  {path: 'arbre', component: Arbre},
  {path: 'admin', loadChildren: './modules/admin.module#AdminModule'},
  {path: '', component: Home, pathMatch: 'full'}
];
