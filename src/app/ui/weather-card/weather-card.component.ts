import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { FbService } from 'src/app/service/fb.service';
import { UiService } from 'src/app/service/ui.service';
import { WeatherService } from 'src/app/service/weather.service';
import { DataWeather } from './../../pages/models/data_weather.model';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
})
export class WeatherCardComponent implements OnInit, OnDestroy {
  @Input() set city(city: string) {
    this.cityName = city;
    this.weatherService
      .getWeather(city)
      .pipe(first())
      .subscribe(
        (payload) => {
          this.state = payload.weather[0].main;
          this.temp = Math.ceil(payload.main.temp);
        },
        (err) => {
          this.toater.error('', err.error.message);
        }
      );

    this.weatherService
      .getForecast(city)
      .pipe(first())
      .subscribe(
        (payload) => {
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
        },
        (err) => {
          this.toater.error('', err.error.message);
        }
      );
  }

  @Input() addMode!: boolean;
  @Output() cityStored = new EventEmitter();
  citesWeather!: Object;
  state!: string;
  temp!: number;
  maxTemp!: number;
  minTemp!: number;
  cityName!: string;

  constructor(
    private weatherService: WeatherService,
    private router: Router,
    private uiService: UiService,
    private fbService: FbService,
    private toater: ToastrService
  ) {}

  ngOnInit(): void {
    // this.fbService.updateCity('MbT18S4WkslzRuY2yLh4', {city_name: 'Hanoi', maxTemp: 40, minTemp: 40, state: 'ass', temp: 40});
  }

  ngOnDestroy(): void {}

  updateCity(id: string, weather: DataWeather) {
    this.fbService
      .updateCity(id, weather)
      .then(() => this.toater.success('City has been successfully updated!'))
      .catch((err) => console.log(err));
  }

  storeCity(weather: DataWeather) {
    this.fbService
    .addCity(weather)
    .then(() => {
      this.resetInfoWeather();
      this.cityStored.emit();
      this.toater.success('City has been successfully added!');
    })
    .catch((error) => {
      console.log(error);
    });
  }

  resetInfoWeather() {
    this.cityName = '';
    this.maxTemp = 0;
    this.minTemp = 0;
    this.state = '';
    this.temp = 0;
  }

  addCity() {
    let DataWeather = {
      city_name: this.cityName,
      maxTemp: this.maxTemp,
      minTemp: this.minTemp,
      state: this.state,
      temp: this.temp,
    };
    const isAddCity = this.fbService.getCity(this.cityName).subscribe((res: any) => {
      if (res) {
        this.updateCity(res.id, DataWeather);
        this.resetInfoWeather();
      } else {
        this.storeCity(DataWeather);
      }
      isAddCity.unsubscribe();
    });
  }
}
