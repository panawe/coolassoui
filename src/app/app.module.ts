import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {Constants} from './app.constants';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {routes} from './app.routes';
import {Home} from './components/home';
import {Login} from './components/login';
import {Arbre} from './components/tree';
import {Statuts} from './components/statuts';
import {Reglements} from './components/reglements';
import {Projects} from './components/projects';
import {VideoImage} from './components/videoImage';
import {NewsSingle} from './components/newsSingle';
import {CommonSharedModule} from './modules/common.shared.module';
import {FroalaViewModule} from 'angular-froala-wysiwyg';
import {Donate} from './components/donate';
import {
  BaseService, UserService
} from './services/';
import {GlobalEventsManager} from './services/globalEventsManager';

@NgModule({
  declarations: [
    AppComponent, Home, Login, Arbre, Statuts, Reglements, Projects, NewsSingle, Donate, VideoImage
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, FormsModule, HttpModule, CommonSharedModule, FroalaViewModule.forRoot(),
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],

  providers: [BaseService, UserService, Constants, GlobalEventsManager
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
