import { Component } from '@angular/core';
import { IEventDetails } from './models/eventDetails';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gvc-events';
  events: IEventDetails[];

  constructor (private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
    })
  }
}
