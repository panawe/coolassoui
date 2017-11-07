import {Component, OnInit, Output, EventEmitter, NgZone} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {UserService} from '../services/user.service';
import {BaseService} from '../services/base.service';
import {Constants} from '../app.constants';
import {User} from '../models/user';
import {Country} from '../models/Country';
import {AppComponent} from '../app.component';
import {FamilyTree} from '../models/familyTree';
import {ChartModule, MenuItem, Message} from 'primeng/primeng';
import {CountryDropdown} from './dropdowns/dropdown.country';

@Component({
  selector: 'admin-tree',
  templateUrl: '../pages/adminTree.html',
  providers: [UserService, Constants, BaseService, CountryDropdown],
  styles: [`/*Now the CSS*/
* { 
  margin: 0; 
  padding: 0;
}

.tree {
  font-family: 'Avenir Book', sans-serif;
  width:99%;
  float: none;
  margin:0 auto;
}

.tree ul {
  padding-top: 20px; 
  position: relative;
  
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
}

.tree li {
  float: left; 
  text-align: center;
  list-style-type: none;
  position: relative;
  padding: 20px 5px 0 5px;
  
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
}

/*We will use ::before and ::after to draw the connectors*/

.tree li::before, .tree li::after{
  content: '';
  position: absolute; top: 0; right: 50%;
  border-top: 1px solid #2191c0;
  width: 50%; height: 20px;
}
.tree li::after{
  right: auto; left: 50%;
  border-left: 1px solid #2191c0;
}

/*We need to remove left-right connectors from elements without 
any siblings*/
.tree li:only-child::after, .tree li:only-child::before {
  display: none;
}

/*Remove space from the top of single children*/
.tree li:only-child{ padding-top: 0;}

/*Remove left connector from first child and 
right connector from last child*/
.tree li:first-child::before, .tree li:last-child::after{
  border: 0 none;
}
/*Adding back the vertical connector to the last nodes*/
.tree li:last-child::before{
  border-right: 1px solid #2191c0;
  border-radius: 0 5px 0 0;
  -webkit-border-radius: 0 5px 0 0;
  -moz-border-radius: 0 5px 0 0;
}
.tree li:first-child::after{
  border-radius: 5px 0 0 0;
  -webkit-border-radius: 5px 0 0 0;
  -moz-border-radius: 5px 0 0 0;
}

/*Time to add downward connectors from parents*/
.tree ul ul::before{
  content: '';
  position: absolute; top: 0; left: 50%;
  border-left: 1px solid #2191c0;
  width: 0; height: 20px;
}

/************************************************
 * Third Level Styles
 ************************************************/

.tree ul ul ul {
  max-width:140px;
}
.tree ul ul ul li {
  float: left; 
  text-align: center;
  list-style-type: none;
  position: relative;
  padding: 0 5px 10px 5px;
  border-left: 1px solid #2191c0;
  border-left:0;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  margin-left:10px;
  top:-10px;
}

/*We will use ::before and ::after to draw the connectors*/

.tree ul ul ul li:before {
  border-top: 1px solid #2191c0;
  position:relative;
  top:20%;
  width:10%;
}
.tree ul ul ul li::after{
  right: auto; 
  left: -1px;
  border-left: 1px solid #2191c0;
  border-bottom:1px;
  height:70px;
}

/*We need to remove left-right connectors from elements without 
any siblings*/
.tree ul ul ul li:only-child::after, .tree ul ul ul li:only-child::before {
  display: none;
}

/*Remove space from the top of single children*/
.tree ul ul ul li:only-child{ padding-top: 0;}

/*Remove left connector from first child and 
right connector from last child*/
.tree ul ul ul li:first-child::before, 
.tree ul ul ul li:last-child::after{
  border:none;
  
}

.tree ul ul ul li:last-child::after {
  border-bottom:1px solid #2191c0;
  top:-60px;
  width:7px;
}
/*Adding back the vertical connector to the last nodes*/
.tree ul ul ul li:last-child::before{
  border-right: 0;
    border-radius: 0 0 0 0;
  -webkit-border-radius: 0 0 0 0;
  -moz-border-radius: 0 0 0 0;

}
.tree ul ul ul li:first-child::after{
  border-radius: 0 0 0 0;
  -webkit-border-radius: 0 0 0 0;
  -moz-border-radius: 0 0 0 0;
}

/*Time to add downward connectors from parents*/
.tree ul ul ul::before{
  content: '';
  position: absolute; 
  top: 0; 
  left:9px;
  border-left: 1px solid #2191c0;
  width: 0; 
  height: 100;
}

.tree ul ul ul li img {
  margin:0;
  padding:0;
  padding-right:3px;
}

/*******************************/

.tree li a{
  border: 1px solid #f4f4f4;
  background: #f4f4f4;
  padding: 5px 10px;
  text-decoration: none;
  color: #2191c0;
  font-family: 'Fira Sans', sans-serif;
  font-size: 12px;
  display: inline-block;
  box-shadow: 0 -3px 0 #2191c0;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
}

/*Time for some hover effects*/
/*We will apply the hover effect the the lineage of the element also*/
.tree li a:hover, .tree li a:hover+ul li a {
  background: #cbe9d2; color: #fff; border: 1px solid #cbe9d2;
}

.tree ul ul ul li a:hover {
  border-color: #2191c0;
}
/*Connector styles on hover*/
.tree li a:hover+ul li::after, 
.tree li a:hover+ul li::before, 
.tree li a:hover+ul::before, 
.tree li a:hover+ul ul::before {
  border-color:  #cbe9d2;
}

.tree li a {
  max-width:110px;
}
.tree li a img {
  float:left;
  margin-bottom:5px;
  box-sizing: content-box !important;
  border-radius:5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;  
}

.childCount {
    background-color: #f2c250;
    background-image: -webkit-gradient(radial, center center, 0, center center, 15, color-stop(5%, #ffcf55), color-stop(95%, #eab53a));
    background-image: -moz-radial-gradient(circle 15px at center center, #ffcf55 5%, #eab53a 95%);
    background-image: -o-radial-gradient(circle 15px at center center, #ffcf55 5%, #eab53a 95%);
    background-image: radial-gradient(circle 15px at center center, #ffcf55 5%, #eab53a 95%);
    color: white;
    text-shadow: 0 0 2px #d68505;
    font-size: 12px;
    font-weight: 500;
    position: absolute;
    left: 75%;
    bottom: 45px;
    padding: 3px;
    line-height: 15px;
    min-width: 15px;
    border-radius: 9999px;
}
   
    `]
})

export class AdminTree implements OnInit {
  familyTree: FamilyTree = new FamilyTree();
  searchText: string;
  public users: User[];
  usersPop: User[];
  user: User;
  newUser: User = new User();
  actionLabel: string;
  public error: string;
  displayDialog: boolean;
  popupLabel: string;
  action: number;
  USER_SEARCH_PARTS: string = Constants.USER_SEARCH_PARTS;
  msgs: Message[] = [];
  MALE: string = Constants.MALE;
  FEMALE: string = Constants.FEMALE;
  COUNTRY_RESIDENCE: string = Constants.COUNTRY_RESIDENCE;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  COUNTRY_ORIGIN: string = Constants.COUNTRY_ORIGIN;
  ALIVE: string = Constants.ALIVE;
  DEAD: string = Constants.DEAD;
  public countryDropdown: CountryDropdown;

  constructor(
    private userService: UserService,
    private cDropdown: CountryDropdown) {
    this.countryDropdown = cDropdown;
  }

  ngOnInit(): void {
    // TODO Auto-generated method stub 
    if (Cookie.get('user')) {
      this.user = JSON.parse(Cookie.get('user'));
    }
    if (!this.user) {
      this.user = new User();
      this.user.id = 86;//Atoki
    }
    this.userService.getFamilyTree(this.user)
      .subscribe((data: FamilyTree) => {
        this.familyTree = data;
        this.user = this.familyTree.user;
      },
      error => console.log(error),
      () => console.log('Get All Countries Complete'));
  }

  getUserTree(aUser: User) {
    console.log(aUser);
    this.user = aUser;
    this.userService.getFamilyTree(aUser)
      .subscribe((data: FamilyTree) => this.familyTree = data,
      error => console.log(error),
      () => console.log('Get All Countries Complete'));
  }

  getSelectedUserTree() {
    this.userService.getFamilyTree(this.user)
      .subscribe((data: FamilyTree) => this.familyTree = data,
      error => console.log(error),
      () => console.log('Get All Countries Complete'));
  }

  getParentTree(aUser: User) {
    console.log(aUser);
    if (aUser.dad) {
      this.user = aUser.dad;
      this.userService.getFamilyTree(aUser.dad)
        .subscribe((data: FamilyTree) => this.familyTree = data,
        error => console.log(error),
        () => console.log('Get All Countries Complete'));
    }
  }

  public search() {
    this.error = null;
    if (this.searchText != null) {
      this.userService.search(this.searchText).subscribe((data: User[]) => {
        this.users = data;
        if (this.users == null || this.users.length <= 0) {
          this.error = Constants.NO_USER_FOUND;
        }
      },
        error => console.log(error),
        () => console.log('Find users with name like ' + this.searchText));
    }
  }

  public searchPop() {
    this.error = null;
    if (this.searchText != null) {
      this.userService.search(this.searchText).subscribe((data: User[]) => {
        this.usersPop = data;
        if (this.usersPop == null || this.usersPop.length <= 0) {
          this.error = Constants.NO_USER_FOUND;
        }
      },
        error => console.log(error),
        () => console.log('Find users with name like ' + this.searchText));
    }
  }
  showDialog(action: number) {
    this.action = action;
    this.error = "";
    this.displayDialog = true;
    if (action == 5) {
      this.newUser = this.user;
    } else {
      this.newUser = new User();
    }
    if (action == 1) {
      this.popupLabel = 'Ajouter enfant';
      this.actionLabel = 'Ajouter un enfant de ' + this.user.firstName + ' ' + this.user.lastName;
    } else if (action == 2) {
      this.popupLabel = 'Ajouter epoux';
      this.actionLabel = 'Ajouter un epoux de ' + this.user.firstName + ' ' + this.user.lastName;
    } else if (action == 3) {
      this.popupLabel = 'Ajouter Parent';
      this.actionLabel = 'Ajouter un parent de ' + this.user.firstName + ' ' + this.user.lastName;
    } else if (action == 4) {
      this.popupLabel = 'Supprimer relation';
      this.actionLabel = 'Supprimer relation de ' + this.user.firstName + ' ' + this.user.lastName;
    } else if (action == 5) {
      this.popupLabel = 'Modifier';
      this.actionLabel = 'Modifier ' + this.user.firstName + ' ' + this.user.lastName;
    }

  }

  changeTree(aUser: User) {
    console.log('changing tree. Action =' + this.action + ', source user = ' + this.user + ' , selected user =' + aUser);
    if (this.action == 1) {//add kid
      if (this.user.sex == "M") {
        aUser.data = this.user.id + ",5";
      } else {
        aUser.data = this.user.id + ",4";
      }
    } else if (this.action == 2) {//epoux  
      if (this.user.sex == aUser.sex) {
        this.error = Constants.SAME_SEX;
        return;
      }
      if (this.user.sex == "M") {
        aUser.data = this.user.id + ",3";
      } else {
        aUser.data = this.user.id + ",2";
      }
    } else if (this.action == 3) {//Parent 
      aUser.data = this.user.id + ",1";
    } else if (this.action == 4) {//delete. 
      aUser.data = this.user.id + ",0";
    }
    try {
      this.userService.saveFamilyLink(aUser)
        .subscribe(result => {
          this.error = result.error;
          if (!result.error.startsWith("Echec")) {
            this.getUserTree(this.user);
          }
        })
    }
    catch (e) {
      this.error = Constants.ERROR_OCCURRED;
    }
  }

  saveUser() {
    console.log('changing tree. Action =' + this.action + ', source user = ' + this.user + ' , New user =' + this.newUser);
    this.error = '';
    if (this.newUser.sex == null || this.newUser.firstName == null ||
      this.newUser.lastName == null || this.newUser.cityResidence == null ||
      this.newUser.cityOrigin == null || this.newUser.countryOrigin == null ||
      this.newUser.countryResidence == null) {
      this.error = Constants.MISSING_REQUIRED_FIELD;
      return;
    }
    if (this.action == 5) {//modify user 
      try {
        this.userService.saveUser(this.newUser)
          .subscribe(result => {
            this.error = result.error;
            if (!result.error.startsWith("Echec")) {
              this.user = result;
              this.newUser = new User();
            }
          })
      }
      catch (e) {
        this.error = Constants.ERROR_OCCURRED;
      }
    } else {// brand new guy
      if (this.action == 6) {//just create the user
        this.newUser.data = null;
      } else if (this.action == 1) {//add kid
        if (this.user.sex == "M") {
          this.newUser.data = this.user.id + ",5";
        } else {
          this.newUser.data = this.user.id + ",4";
        }
      } else if (this.action == 2) {//epoux  
        if (this.user.sex == this.newUser.sex) {
          this.error = Constants.SAME_SEX;
          return;
        }
        if (this.user.sex == "M") {
          this.newUser.data = this.user.id + ",3";
        } else {
          this.newUser.data = this.user.id + ",2";
        }
      } else if (this.action == 3) {//Parent 
        this.newUser.data = this.user.id + ",1";
      } else if (this.action == 4) {//delete. this will not come here
        this.newUser.data = this.user.id + ",0";
      }
      try {
        this.userService.createUser(this.newUser)
          .subscribe(result => {
            this.error = result.error;
            if (!result.error.startsWith("Echec")) {
              if (this.action == 6) {
                this.user = result;
              }
              this.getUserTree(this.user);
              this.newUser = new User();
            }
          })
      }
      catch (e) {
        this.error = Constants.ERROR_OCCURRED;
      }
    }
  }
}
