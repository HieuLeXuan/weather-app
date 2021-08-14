import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { first, map, startWith } from 'rxjs/operators';
import { FbService } from 'src/app/service/fb.service';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  city = 'Hanoi';
  state: string = '';
  temp: number = 0;
  maxTemp!: number;
  minTemp!: number;
  currentDate!: Date;

  selectedCity!: string;
  capitals: string[] = [];
  cardCity: any;
  followedCM: boolean = false;
  // showNote: boolean = false;

  // auto complete search
  myControl = new FormControl();
  filteredOptions!: Observable<string[]>;

  constructor(
    private http: HttpClient,
    private weatherService: WeatherService,
    private fbService: FbService
  ) {}

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.capitals.filter(capital => capital.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {
    // auto complete search
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    // get info weather city
    this.weatherService.getWeather(this.city).subscribe((payload: any) => {
      this.state = payload.weather[0].main;
      this.temp = Math.ceil(Number(payload.main.temp));
    });

    this.weatherService.getForecast(this.city).subscribe((payload: any) => {
      this.maxTemp = Math.round(payload[0].main.temp);
      this.minTemp = Math.round(payload[0].main.temp);
      for (const res of payload) {
        if (
          new Date().toLocaleDateString('en-GB') ===
          new Date(res.dt_txt).toLocaleDateString('en-GB')
        ) {
          this.maxTemp =
            res.main.temp > this.maxTemp
              ? Math.round(res.main.temp)
              : this.maxTemp;
          this.minTemp =
            res.main.temp < this.minTemp
              ? Math.round(res.main.temp)
              : this.minTemp;
        }
      }
    });

    this.http
      .get('https://restcountries.eu/rest/v2/all')
      .pipe(first())
      .subscribe((countries: any) => {
        countries.forEach((country: any) => {
          if (country.capital.length) {
            this.capitals.push(country.capital);
          }
        });
        this.capitals.sort();
      });

    this.fbService.getCity(this.city).subscribe((res) => {
      if (res) {
        this.followedCM = true;
      }
    });

    this.currentDate = new Date();
  }

  selectCity(city: any) {
    if (this.capitals.includes(city)) {
      this.cardCity = city;
      // this.showNote = false;
    } else if (city.length > 0) {
      // this.showNote = true;
    }
  }

  addCityOfTheMonth() {
    let DataWeather = {
      city_name: 'Hanoi',
      maxTemp: this.maxTemp,
      minTemp: this.minTemp,
      state: this.state,
      temp: this.temp,
    };
    this.fbService
      .addCity(DataWeather)
      .then((res) => {
        this.followedCM = true;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
