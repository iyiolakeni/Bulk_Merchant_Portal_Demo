import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiDetailsService } from './api-details.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  user: any; //Retrieve user login details

  private dataSource = new BehaviorSubject<any[]>([]);
  data = this.dataSource.asObservable();



  constructor(
    // private apiDetails: ApiDetailsService
  ) { }

  // function to retrieve user
  setUser(user: any){
    this.user = user;
    sessionStorage.setItem('user', JSON.stringify(this.user));
    // console.log(this.user);
  }

  isLoggedIn(): boolean {
    return !!this.user;
  }

  getUser(){
    if (!this.user){
      const storedUser = sessionStorage.getItem('user');
      if (storedUser){
        this.user = JSON.parse(storedUser);
      }
    }
    console.log(this.user);
    return this.user;
  }

  updateData(response: any){
    const posRequests = Object.values(response.results[0]);
    this.dataSource.next(posRequests);
  }
}
