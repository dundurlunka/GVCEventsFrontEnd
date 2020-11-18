import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEventDetails } from '../models/eventDetails';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEventForm } from '../models/eventForm';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor (private http: HttpClient) { }

  getAll(): Observable<IEventDetails[]> {
    return this.http.get<IEventDetails[]>(`${ environment.apiUrl }/events`);
  }

  createEvent(eventObj: IEventForm): Observable<IEventDetails> {
    return this.http.post<IEventDetails>(`${ environment.apiUrl }/events`, eventObj);
  }

  updateEvent(eventObj: IEventForm, id: number): Observable<IEventForm> {
    return this.http.put<IEventForm>(`${ environment.apiUrl }/events/${ id }`, eventObj);
  }

  deleteEvent(id: number): Observable<IEventForm> {
    return this.http.delete<IEventDetails>(`${ environment.apiUrl }/events/${ id }`);
  }
}
