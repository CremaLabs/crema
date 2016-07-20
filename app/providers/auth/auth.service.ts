import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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

  login(user: User) {
    // TODO: Implement real login
    console.log('Login: ', user);
    const fakeUserData = {fullName: 'Fake User', username: 'fakeuser', id: 1};
    return Promise.resolve(fakeUserData);
  }

  signup(user: User) {
    // TODO: Implement real signup
    console.log('Sign up: ', user);
    const fakeUserData = {fullName: 'Fake User', username: 'fakeuser', id: 1};
    return Promise.resolve(fakeUserData);
  }

  logout() {
    // TODO: Implement real logout
    return Promise.resolve();
  }

}
