import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Observable } from 'rxjs';

import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Md5 } from 'ts-md5/dist/md5';

import {
  getAuth,
  signInWithCustomToken,
  sendPasswordResetEmail,
} from 'firebase/auth';
import * as firebase from 'firebase/compat';
import { FirebaseApps } from '@angular/fire/app';
import { send } from 'process';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser: Observable<User>;
  auth = getAuth();
  authState: any = null;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.currentUser = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    console.log(this.currentUser);
  }

  // signInWithCustomToken(auth, token)
  //   .then((userCredential) => {
  //     // Signed in
  //     const user = userCredential.user;
  //     // ...
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // ...
  //   });

  async emailSignIn(email: string, password: string) {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log('You have successfully signed in');
    } catch (error) {
      console.log(error.message);
    }
  }

  async emailSignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => this.updateUserData(user))
      .then(() => console.log('welcome, your account has been created'))
      .then((user) => {
        this.afAuth.currentUser
          .then((u) => u.sendEmailVerification())
          .then(() => console.log('We sent you an email verification'))
          .catch((error) => console.log(error.message));
      })
      .catch((error) => console.log(error.message));
  }

  resetPassword(email: string) {
    return this.afAuth
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log('We`ve sent you a password reset link');
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  private updateUserData(user) {
    console.log(user.user.uid);
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.user.uid}`
    );
    const data: User = {
      uid: user.user.uid,
      email: user.user.email || null,
      displayName: user.user.displayName,
      photoURL:
        user.user.photoURL ||
        'http://www.gravatar.com/avatar/' +
          Md5.hashStr(user.user.uid) +
          '?=identicon',
    };

    return userRef.set(data, { merge: true });
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }
}
