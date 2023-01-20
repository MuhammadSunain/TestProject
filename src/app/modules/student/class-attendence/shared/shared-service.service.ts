import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  private subject = new Subject<any>();

  sendClickEvent(t:any) {
    this.subject.next(t);
  }

  getClickEvent():Observable<any> {
    return this.subject.asObservable();
  }
}
