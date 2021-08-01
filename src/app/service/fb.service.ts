import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class FbService {
  userData: any;

  constructor(public auth: AngularFireAuth, public fs: AngularFirestore) {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  isAuth() {
    return this.auth.authState.pipe(first());
  }

  async login(email: string, password: string) {
    var result = await this.auth.signInWithEmailAndPassword(email, password);
    return result;
  }

  async register(email: string, password: string) {
    var result = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    return result;
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.fs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // getCities() {
  //   return this.auth.uid().pipe(
  //     switchMap((uid: any) => {
  //       return this.fs.read(`${uid}`);
  //     })
  //   );
  // }

  // addCity(name: string) {
  //   return this.auth.uid().pipe(
  //     switchMap((uid) => {
  //       return this.fs
  //         .write(`${uid}/${name}`, { name, added: new Date() })
  //         .pipe(first());
  //     }),
  //     first()
  //   );
  // }
}
