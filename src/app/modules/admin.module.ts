import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AdminTree} from '../components/adminTree';
import {AdminMain} from '../components/adminMain';
import {AdminProfile} from '../components/adminProfile';
import {AdminProject} from '../components/adminProject';
import {AdminFinance} from '../components/adminFinance';
import {AdminPub} from '../components/adminPub';
import {AdminAnnonce} from '../components/adminAnnonce';
import {AdminMenu} from '../components/menu/adminMenu';
import {CommonSharedModule} from './common.shared.module';
import { FroalaEditorModule } from 'angular-froala-wysiwyg';

const routes: Routes = [
  {path: 'adminMain', component: AdminMain},
  {path: 'adminTree', component: AdminTree},
  {path: 'adminAnnonce', component: AdminAnnonce},
  {path: 'adminProject', component: AdminProject},
  {path: 'adminFinance', component: AdminFinance},
  {path: 'adminProfile', component: AdminProfile},
  {path: 'adminPub', component: AdminPub}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes), CommonSharedModule,FroalaEditorModule.forRoot() 
  ],

  exports: [CommonSharedModule],

  declarations: [AdminMenu, AdminMain, AdminTree, AdminProfile, AdminAnnonce, AdminProject, AdminFinance, AdminPub],

  providers: []
})

export class AdminModule {}