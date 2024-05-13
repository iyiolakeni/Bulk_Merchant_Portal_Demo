import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  user: any; //Retrieve user login details

  private dataSource = new BehaviorSubject<any[]>([]);
  data = this.dataSource.asObservable();



  constructor() { }

  // function to retrieve user
  setUser(user: any){
    this.user = user;
    console.log(this.user);
  }

  getUser(){
    return this.user;
  }

  updateData(response: any){
    const posRequests = Object.values(response.results[0]);
    this.dataSource.next(posRequests);
  }
}
