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

  /***** PUBLIC *****/

  /**
   * checkToken - validate token stored in the LocalStorage
   *
   * @return {Promise<any>} that resolves if the token is valid, and rejects if token is invalid
   */
  checkToken() {
    return this.local.get('jwt')
      .then(token => {
        if (!token) { throw new Error('Empty token - Unauthenticated'); }
        let headers = new Headers();
        headers.append('Authorization', `JWT ${token}`)
        return this.http.get(URL.CREMA_API + '/auth/checkToken', { headers }).toPromise();
      });
  }


  /**
   * login - log user in and store JWT token in LocalStorage for later use
   *
   * @param  {User} user credentials
   * @return {Promise<any>} that resolves on login success and rejects on login error
   */
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


  /**
   * signup - sign up user and store JWT token in LocalStorage
   *
   * @param  {User}
   * @return {Promise<any>} that resolves on sign-up success and rejects on failure
   */
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


  /**
   * logout - deletes the cached JWT token
   *
   * @return {Promise<void>} that resolves when token is removed from cached
   */
  logout() {
    return this.local.remove('jwt');
  }

  /***** PRIVATE *****/

  /* Extract JSON data from the body */
  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
