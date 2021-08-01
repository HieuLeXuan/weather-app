import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  city!: string;
  state!: string;
  temp!: number;
  hum!: number;
  wind!: number;

  today!: string;

  day1Name!: string;
  day1State!: string;
  day1Tamp!: number;

  day2Name!: string;
  day2State!: string;
  day2Tamp!: number;
  
  day3Name!: string;
  day3State!: string;
  day3Tamp!: number;
  
  day4Name!: string;
  day4State!: string;
  day4Tamp!: number;

  day5Name!: string;
  day5State!: string;
  day5Tamp!: number;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    
  }

}
