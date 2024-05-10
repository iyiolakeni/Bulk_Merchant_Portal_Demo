import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private dataSource = new BehaviorSubject<any[]>([]);
  data = this.dataSource.asObservable();

  constructor() { }

  updateData(response: any){
    const posRequests = Object.values(response.results[0]);
    this.dataSource.next(posRequests);
  }
}
