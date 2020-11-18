import { Component, Input, OnInit } from '@angular/core';
import { IEventDetails } from 'src/app/models/eventDetails';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  @Input() events: IEventDetails[];
  today: Date;

  constructor() { }

  ngOnInit(): void {
    this.today = new Date();
  }

  isDatePassed(startDate: string): boolean {
    return new Date(startDate) < this.today;
  }

  printOdds(oddsType: string, eventId: number, oddsValue: number) {
    console.log(`${eventId} ${oddsType} ${oddsValue}`)
  }
}
