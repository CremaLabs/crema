import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Storage, LocalStorage } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';

import { URL } from '../../constants';
import { User } from '../user/user.model';


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
    return this.local.get('jwt')
      .then(token => {
        let headers = new Headers();
        headers.append('Authorization', `JWT ${token}`)
        return this.http.get(URL.CREMA_API + '/auth/checkToken', { headers }).toPromise();
      });
  }

// add to this function: save token to local storage: 'local-storage""'
  login(user: User) {
    return this.http.post(URL.CREMA_API + '/auth/login', user)
      .toPromise()
      .then(res => {
        const resData = this.extractData(res);
        return this.local.set('jwt', resData.token);
      })
      .catch(err => {
        console.error('Login error: ', JSON.stringify(err));
        return Promise.reject('Login failed');
      });
  }

// add to this function: save token to local storage: 'local-storage""'
  signup(user: User) {
    return this.http.post(URL.CREMA_API + '/auth/signup', user)
      .toPromise()
      .then(res => {
        const resData = this.extractData(res);
        return this.local.set('jwt', resData.token);
      })
      .catch(err => {
        console.error('Signup error: ', JSON.stringify(err));
        return Promise.reject('Signup failed');
      });
  }

  logout() {
    return this.local.remove('jwt');
  }
}
