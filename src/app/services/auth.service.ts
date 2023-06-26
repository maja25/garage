import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from './user.service';

@Injectable()
export default class AuthService {
  user: User;

  constructor(
    public readonly fbAuth: AngularFireAuth,
    private readonly userService: UserService,
    private readonly router: Router
  ) {
    this.user = userService.getUserLoggedIn();
  }

  login() {
    this.fbAuth.authState.subscribe((auth) => {
      if (auth) {
        this.user = auth;
        this.userService.setUserLoggedIn(this.user);
        console.log('You are authenticated');
      } else {
        console.log('You are not authenticated');
      }
    });
  }

  logout() {
    this.fbAuth.signOut().then(() => {
      this.router.navigate(['']);
      this.userService.clearUser();
      console.log('You are logged out');
    });
  }
}
