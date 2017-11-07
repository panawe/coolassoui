import {Constants} from '../app.constants';
import {FamilyTree} from '../models/familyTree';
import {User} from '../models/user';
import {Component, OnInit} from '@angular/core';
import {TreeNode, Message} from 'primeng/primeng';
import {TooltipModule} from 'primeng/primeng';
import {UserService} from '../services/user.service';
import {Cookie} from 'ng2-cookies';
@Component({
  selector: 'tree',
  templateUrl: '../pages/tree.html',
  providers: [UserService, Constants],
  styles: [`
/*Now the CSS*/
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
export class Arbre implements OnInit {
  familyTree: FamilyTree = new FamilyTree();
  searchText: string;
  public users: User[];
  user:User;
  public error: string;
  USER_SEARCH_PARTS: string = Constants.USER_SEARCH_PARTS;
  constructor(
    private userService: UserService, ) {

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
      .subscribe((data: FamilyTree) => this.familyTree = data,
      error => console.log(error),
      () => console.log('Get All Countries Complete'));
  }

  getUserTree(aUser: User) {
    console.log(aUser);
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
}