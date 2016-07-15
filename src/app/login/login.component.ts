import { Component, OnInit } from '@angular/core';

// import the User model
import { User } from './login.model';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  constructor() {
  }

  ngOnInit() {
    // this.user.username ='';
    // this.user.password='';
  }


}
