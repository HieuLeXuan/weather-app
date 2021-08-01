import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FbService } from 'src/app/service/fb.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  @Input() showMenu!: boolean; 

  constructor(
    private router: Router,
    private fbService: FbService,
  ) { }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    this.toggleMenu();
    this.router.navigateByUrl('/login');
    localStorage.removeItem('user');
    this.fbService.auth.signOut();
  }

}
