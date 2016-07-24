import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { URL } from '../../constants';
import { User } from '../user/user.model';


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
    return this.http.post(URL.CREMA_API + '/auth/login', user)
      .toPromise()
      .then(this.extractData)
      .catch(err => {
        console.error('Login error: ', JSON.stringify(err));
        return Promise.reject('Login failed');
      });
  }

  signup(user: User) {
    console.log('Signup: ', user);
    return this.http.post(URL.CREMA_API + '/auth/signup', user)
      .toPromise()
      .then(this.extractData)
      .catch(err => {
        console.error('Signup error: ', JSON.stringify(err));
        return Promise.reject('Signup failed');
      });
  }

  logout() {
    return this.http.post(URL.CREMA_API + '/auth/logout', {})
      .toPromise()
      .then(this.extractData)
      .catch(err => {
        console.error('Logout error: ', JSON.stringify(err));
        return Promise.reject('Logout failed');
      });
  }
}
