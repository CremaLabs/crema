import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise'; 

import { User } from '../user/user.model';

/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {

  constructor(private http: Http) {
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  login(user: User) {
    console.log('Login: ', user);
    return this.http.post('v1/auth/login', user)
      .toPromise()
      .then(this.extractData)
      .catch(err => console.error(err));
  }

  signup(user: User) {
    console.log('Signup: ', user);
    return this.http.post('v1/auth/signup', user)
      .toPromise()
      .then(this.extractData)
      .catch(err => console.error(err));

  }

  logout() {
    return this.http.post('v1/auth/logout', {})
      .toPromise()
      .then(this.extractData)
      .catch(err => console.error(err));
  }
}


