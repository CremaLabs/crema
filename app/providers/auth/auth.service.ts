import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Storage, LocalStorage } from 'ionic-angular';
import 'rxjs/add/operator/toPromise'; 

import { User } from '../user/user.model';

/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {
  local: Storage;

  constructor(private http: Http) {
    this.local = new Storage(LocalStorage);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  checkToken() {
    return this.local.get('jwt');
  //     .then(token => {
  //       if (!token) {
  //         return false;
  //       }
  //       if (token) {
  //         return this.http.get('http://localhost:3000/v1/users/currentuser', token)
  //           .toPromise()
  //           .then(res => {

  //           });
          
  //       }
  //     });
  }

// add to this function: save token to local storage: 'local-storage""'
  login(user: User) {
    console.log('Login: ', user);
    return this.http.post('http://localhost:8100/v1/auth/login', user)
      .toPromise()
      .then(res => {
        const resData = this.extractData(res);
        console.log(resData);
        return this.local.set('jwt', resData.token);
      })
      .catch(err => {
        console.error(err);
        return Promise.reject('Login failed');
      });
  }

// add to this function: save token to local storage: 'local-storage""'
  signup(user: User) {
    console.log('Signup: ', user);
    return this.http.post('http://localhost:8100/v1/auth/signup', user)
      .toPromise()
      .then(res => {
        const resData = this.extractData(res);
        console.log(resData);
        return this.local.set('jwt', resData.token);
      })
      .catch(err => {
        console.error(err);
        return Promise.reject('Signup failed');
      });
  }

  logout() {
    return this.local.remove('jwt')
      .then(() => {
        //logout
      });
  }
}


