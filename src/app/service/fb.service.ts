import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { DataWeather } from '../pages/models/data_weather.model';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class FbService {
  userData: any;

  weatherCollection!: AngularFirestoreCollection<DataWeather>;
  weathers: Observable<DataWeather[]>;

  constructor(public auth: AngularFireAuth, public fs: AngularFirestore) {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.removeItem('user');
      }
    });

    this.weatherCollection = this.fs.collection<DataWeather>('data_weather');
    this.weathers = this.weatherCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as DataWeather;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
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

  getCity(name?: string) {
    return this.weathers.pipe(
      map((weather) => {
        let fl = weather.filter((wea) => wea.city_name === name);
        return fl.length > 0 ? fl[0] : false;
      })
    );
  }

  addCity(dataWeather: any) {
    return this.fs.collection('data_weather').add(dataWeather);
  }

  updateCity(id: string, weather: DataWeather) {
    return this.weatherCollection.doc(id).update(weather);
  }
}
