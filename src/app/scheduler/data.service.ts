import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DayPilot} from 'daypilot-pro-angular';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";


@Injectable()
export class DataService {

  constructor(private http : HttpClient){
  }

  getEvents(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {
    console.log('from',from,'to',to);
    return this.http.get("http://localhost:3000/events",
    {
      params:{
        "start_gte":from.toString(),
        "end_let":to.toString()
      }
    }
    ) as Observable<any>;
    /*
    http://localhost:3000/events?start_like=2019-06-06T18:00:00&end_like=2019-06-06T20:00:00
    return this.http.get("/api/backend_events.php?from=" + from.toString() + "&to=" + to.toString()) as Observable<any>;
    */

  }

  getResources(): Observable<any[]> {
    //return this.http.get("/api/backend_resources.php") as Observable<any>;

    return this.http.get("http://localhost:3000/resources") as Observable<any>;
  }

  createEvent(params: CreateEventParams): Observable<CreateEventResponse> {
    //return this.http.post("/api/backend_create.php", params).pipe(map((response:any) => {
      return this.http.post("http://localhost:3000/events", params).pipe(map((response:any) => {
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
    return this.http.post("/api/backend_move.php", params);
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.post("/api/backend_delete.php", {id: id});
  }

  updateEvent(params: UpdateEventParams): Observable<any> {
    return this.http.post("/api/backend_update.php", params);
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
