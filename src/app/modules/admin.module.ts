import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AdminTree} from '../components/adminTree';
import {AdminMain} from '../components/adminMain';
import {AdminProfile} from '../components/adminProfile';
import {AdminProject} from '../components/adminProject';
import {AdminFinance} from '../components/adminFinance';
import {AdminPub} from '../components/adminPub';
import {AdminNews} from '../components/adminNews';
import {AdminVideo} from '../components/adminVideo';
import {AdminImage} from '../components/adminImage';
import {AdminMenu} from '../components/menu/adminMenu';
import {CommonSharedModule} from './common.shared.module';
import { FroalaEditorModule,FroalaViewModule } from 'angular-froala-wysiwyg';

import { FileUploader }                             from '../components/fileUploader';
const routes: Routes = [
  {path: 'adminMain', component: AdminMain},
  {path: 'adminTree', component: AdminTree},
  {path: 'adminNews', component: AdminNews},
  {path: 'adminVideo', component: AdminVideo},
  {path: 'adminImage', component: AdminImage},
  {path: 'adminProject', component: AdminProject},
  {path: 'adminFinance', component: AdminFinance},
  {path: 'adminProfile', component: AdminProfile},
  {path: 'adminPub', component: AdminPub}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes), CommonSharedModule , FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()
  ],

  exports: [CommonSharedModule],

  declarations: [FileUploader, AdminMenu, AdminMain, AdminTree, AdminProfile,
    AdminVideo, AdminImage,AdminNews, AdminProject, AdminFinance, AdminPub],

  providers: []
})

export class AdminModule {}