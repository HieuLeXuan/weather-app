import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FbService } from 'src/app/service/fb.service';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  temp: number = 0;
  city = 'Rome';
  state: string = '';

  capitals = [];
  cardCity: any;
  followedCM: boolean = false;
  sub1: any;

  constructor(
    private http: HttpClient,
    private weatherService: WeatherService,
    private fbService: FbService,
  ) { }

  ngOnInit(): void {
    // getting the city placeID
    this.weatherService.getWeather(this.city).subscribe((payload: any) => {
      this.state = payload.weather[0].main;
      this.temp = Math.ceil(Number(payload.main.temp));

      console.log(this.state, this.temp);
    });

    // this.http.get('https://restcountries.eu/rest/v2/all').pipe((first())).subscribe(countries => {
    //   countries.forEach((country: any) => {
    //     if (country.capital.length) {
    //       this.capitals.push(country.capital);
    //     }
    //   });
    //   this.capitals.sort();
    // });

    // this.sub1 = this.fbService.getCities().subscribe((cities: any) => {
    //   Object.values(cities).forEach((city: any) => {
    //     if (city.name === 'Rome') {
    //       this.followedCM = true;
    //     }
    //   });
    // });
  }

}
