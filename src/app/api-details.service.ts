import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged, switchMap, tap, timer } from 'rxjs';
import { Merchant } from './merchant';
import {PosRequest} from './posrequest'
import { Users } from './users';

@Injectable({
  providedIn: 'root'
})
export class ApiDetailsService {


  constructor(
    private http: HttpClient
  ) { } 

  getAllUsers(): Observable<any>{
    return this.http.get<Users>('https://bmp-node.onrender.com/users');
  }

  getAllMerchants(): Observable<any>{
    return this.http.get<Merchant[]>('https://bmp-node.onrender.com/merchant/allMerchants');
  }

  getMerchantById(merchantID: string): Observable<Merchant>{
    return this.http.get<Merchant>(`https://bmp-node.onrender.com/merchant/${merchantID}`)
  }

  getRequest(): Observable<PosRequest[]> {
    return this.http.get<PosRequest[]>('https://bmp-node.onrender.com/forms')
  }

  //Function to get the Real Time update every 5 secs an update happens
  getRealTimeUpdates(): Observable<any[]>{
    return timer(0, 1000).pipe(
      switchMap(()=> this.getRequest())
    )
  }

  newRequest(requestData: any): Observable<any>{
    return this.http.post<any>('https://bmp-node.onrender.com/forms/new', requestData)
  }

  updateRequest(requestID: string, formData: any): Observable<any>{
    return this.http.put(`https://bmp-node.onrender.com/forms/${requestID}`, formData)
  }

  generateSN(posSN: any): Observable<any>{
    return this.http.post('https://bmp-node.onrender.com/POS/newposrequest', posSN)
  }
}
