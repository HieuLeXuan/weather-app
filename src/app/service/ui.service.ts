import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  darkModeState!: BehaviorSubject<boolean>;

  constructor() {
    // Todo: if the user is signed in get the default value from firebase.
    this.darkModeState = new BehaviorSubject<boolean>(false);
  }
}
