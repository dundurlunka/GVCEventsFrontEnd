import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

import { IEventDetails } from '../models/eventDetails';
import { Injectable } from '@angular/core';
import { EventService } from '../services/events.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsResolver implements Resolve<IEventDetails[]> {

  constructor (private eventService: EventService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEventDetails[]> {
    return this.eventService.getAll();
  }
}
