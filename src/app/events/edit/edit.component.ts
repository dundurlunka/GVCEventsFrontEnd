import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IEventDetails } from 'src/app/models/eventDetails';
import { IEventForm } from 'src/app/models/eventForm';
import { EventService } from 'src/app/services/events.service';
import { JQ_TOKEN } from 'src/app/services/jquery.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Input() events: IEventDetails[];
  @Output() updatedEvents: EventEmitter<IEventDetails[]> = new EventEmitter<IEventDetails[]>();

  constructor (@Inject(JQ_TOKEN) private $: any,
    private eventService: EventService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
  }

  saveEvent(targetButton, id: number) {
    let tableRowChildren = this.$(targetButton).parent().parent().children();
    let eventName = tableRowChildren[1].textContent;
    let oddsForFirstTeam = tableRowChildren[2].textContent;
    let oddsForDraw = tableRowChildren[3].textContent;
    let oddsForSecondTeam = tableRowChildren[4].textContent;
    let startDate = tableRowChildren[5].textContent;

    // creates the model
    let eventObj: IEventForm = {
      name: eventName,
      oddsForFirstTeam: +oddsForFirstTeam,
      oddsForDraw: +oddsForDraw,
      oddsForSecondTeam: +oddsForSecondTeam,
      startDate: new Date(startDate).toJSON()
    };

    // sends request to the service
    this.eventService.updateEvent(eventObj, id)
      .subscribe(() => {
        this.toastrService.success('Успешна промяна на събитие');

        // updates event in collection
        let indexOfUpdatedEvent = this.events.indexOf(this.events.find(e => e.id == id));
        this.events[indexOfUpdatedEvent].name = eventName;
        this.events[indexOfUpdatedEvent].oddsForFirstTeam = eventObj.oddsForFirstTeam;
        this.events[indexOfUpdatedEvent].oddsForDraw = eventObj.oddsForDraw;
        this.events[indexOfUpdatedEvent].oddsForSecondTeam = eventObj.oddsForSecondTeam;
        this.events[indexOfUpdatedEvent].startDate = eventObj.startDate;

        // send updated events to parent
        this.updatedEvents.emit(this.events);

      })
  }

  deleteEvent(id: number) {
    this.eventService.deleteEvent(id)
      .subscribe(() => {
        this.toastrService.success('Успешно изтрихте събитие');

        this.events = this.events.filter(event => event.id != id);

        this.updatedEvents.emit(this.events);
      })
  }

  createEvent() {
    let currentDate = new Date();
    currentDate.setHours(21);
    currentDate.setMinutes(59);

    let newEvent: IEventForm = {
      startDate: currentDate.toJSON()
    }

    this.eventService.createEvent(newEvent)
      .subscribe(data => {
        this.toastrService.success("Успешно създадохте събитие");

        this.events.push(data);

        this.updatedEvents.emit(this.events);
      })
  }
}
