import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, Subscription } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { UiService } from 'src/app/service/ui.service';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  city!: string;
  state!: string;
  temp!: number;
  hum!: number;
  wind!: number;
  today!: string;
  daysForecast!: {[key: string]: any};
  cityIllustrationPath!: string;
  sub2!: Subscription;

  constructor(
    public activeRouter: ActivatedRoute,
    public weather: WeatherService,
    public ui: UiService,
    private toater: ToastrService
  ) {}

  ngOnInit(): void {
    const todayNumberInWeek = new Date().getDay();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.today = days[todayNumberInWeek];
    this.sub2 = this.activeRouter.paramMap
      .pipe(
        concatMap((route: any) => {
          this.city = route.params.city;
          switch (this.city.toLowerCase()) {
            case 'paris':
              this.cityIllustrationPath = '../../../assets/cities/france.svg';
              break;
            case 'doha':
              this.cityIllustrationPath = '../../assets/cities/qatar.svg';
              break;
            case 'rabat':
              this.cityIllustrationPath = '../../assets/cities/rabat.svg';
              break;
            case 'tunis':
              this.cityIllustrationPath = '../../assets/cities/tunis.svg';
              break;
            case 'tokyo':
              this.cityIllustrationPath = '../../assets/cities/japan.svg';
              break;
            default:
              this.cityIllustrationPath = '../../assets/cities/default.svg';
          }
          return forkJoin(
            this.weather.getWeather(this.city),
            this.weather.getForecast(this.city)
          );
        })
      )
      .subscribe(
        (payload: any) => {
          this.state = payload[0].weather[0].main;
          this.temp = Math.ceil(Number(payload[0].main.temp));
          this.hum = payload[0].main.humidity;
          this.wind = Math.round(Math.round(payload[0].wind.speed));
          const dates = {};
          for (const res of payload[1]) {
            const date = new Date(res.dt_txt).toDateString().split(' ')[0];
            if ((dates as any)[date]) {
              (dates as any)[date].counter += 1;
              (dates as any)[date].temp += res.main.temp;
            } else {
              (dates as any)[date] = {
                state: res.weather[0].main,
                temp: res.main.temp,
                counter: 1,
              };
            }
          }
          Object.keys(dates).forEach((day) => {
            (dates as any)[day].temp = Math.round(
              (dates as any)[day].temp / (dates as any)[day].counter
            );
          });
          delete (dates as any)[Object.keys(dates)[0]];
          this.daysForecast = dates;
        },
        (err) => {
          this.toater.error(err.error.message);
        }
      );
  }

  ngOnDestroy(): void {
    this.sub2.unsubscribe();
  }
}
