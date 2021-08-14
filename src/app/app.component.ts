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

  userEmail!: null | string;
  sub1: any;

  constructor(
    public uiService: UiService,
    public fbService: FbService,
    public router: Router,
  ) {}

  ngOnInit() {
    this.fbService.auth.authState.subscribe((auth__state) => {
      if (auth__state) {
        this.userEmail = auth__state.email;
      }
    });
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }
}
