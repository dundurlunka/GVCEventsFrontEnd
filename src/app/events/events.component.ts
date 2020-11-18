import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEventDetails } from '../models/eventDetails';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: IEventDetails[] = [];
  editMode: boolean;

  constructor (private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.editMode = false;

    this.route.data.forEach((data) => {
      this.events = data['events'];
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  updateEvents(updatedEvents: IEventDetails[]) {
    this.events = updatedEvents;
  }
}
