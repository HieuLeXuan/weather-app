import { Component, OnInit } from '@angular/core';
import { FbService } from 'src/app/service/fb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cities: any;

  constructor(private fbService: FbService) {}

  ngOnInit(): void {
    // this.cities = this.fbService.items;
    this.fbService.weathers.subscribe(val => {
      this.cities = val;
    });
  }
}
