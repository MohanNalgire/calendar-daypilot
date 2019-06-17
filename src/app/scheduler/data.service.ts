import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DayPilot} from 'daypilot-pro-angular';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {UTILITIES} from '../utilities.constant';

@Injectable()
export class DataService {

  constructor(private http : HttpClient){
  }

  getEvents(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {
    //POST — creating a new resource
    return this.http.get(`${UTILITIES.baseURL}/events`,
    {
      params:{
        "start_gte":from.toString(),
        "end_let":to.toString()
      }
    }
    ) as Observable<any>;
  }

  getResources(): Observable<any[]> {
    return this.http.get(`${UTILITIES.baseURL}/resources`) as Observable<any>;
  }

  createEvent(params: CreateEventParams): Observable<CreateEventResponse> {
      return this.http.post(`${UTILITIES.baseURL}/events`, params).pipe(map((response:any) => {
      return {
        id: response.id,
        start: params.start,
        end: params.end,
        resource: params.resource,
        text: params.text
      };
    }));
  }

  moveEvent(params: MoveEventParams): Observable<any> {
    //PUT — updating a resource with new and existing information
    //but here 
    //PATCH — modifying an existing resource with just new information
    return this.http.patch(`${UTILITIES.baseURL}/events/${params.id}`, params);
  }

  deleteEvent(id: string): Observable<any> {
    //
    return this.http.delete(`${UTILITIES.baseURL}/events/${id}`);
  }

  updateEvent(params: UpdateEventParams): Observable<any> {
    //PATCH — modifying an existing resource with just new information
    return this.http.patch(`${UTILITIES.baseURL}/events/${params.id}`, params);
  }

}

export interface CreateEventParams {
  start: DayPilot.Date;
  end: DayPilot.Date;
  text: string;
  resource: string;
}

export interface CreateEventResponse {
  start: DayPilot.Date;
  end: DayPilot.Date;
  text: string;
  resource: string;
  id: string;
}

export interface MoveEventParams {
  id: string;
  start: DayPilot.Date;
  end: DayPilot.Date;
  resource: string;
}

export interface UpdateEventParams {
  id: string;
  text: string;
  
}
