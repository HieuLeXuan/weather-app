import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FbService } from './service/fb.service';
import { UiService } from './service/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  showMenu = false;
  darkModeActive!: boolean;

  userEmail!: null | string;
  sub1: any;

  constructor(
    public ui: UiService,
    public fb: FbService,
    public router: Router,
  ) {}

  ngOnInit() {
    window.scroll(0, 0);

    this.sub1 = this.ui.darkModeState.subscribe((value) => {
      this.darkModeActive = value;
    });

    this.fb.auth.authState.subscribe((auth__state) => {
      if (auth__state) {
        this.userEmail = auth__state.email;
      }
    });
  }

  modeToggleSwitch() {
    this.ui.darkModeState.next(!this.darkModeActive);
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }
}
