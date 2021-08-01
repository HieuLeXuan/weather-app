import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FbService } from 'src/app/service/fb.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn = this.fbService.isAuth();
  showMenu: boolean = false;

  constructor(
    private router: Router,
    public fbService: FbService,
  ) { }

  ngOnInit() {}

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }

}
