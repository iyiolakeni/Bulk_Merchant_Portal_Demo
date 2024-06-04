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

  private requests = new BehaviorSubject<PosRequest[]>([]);
  public requests$ = this.requests.asObservable();
  

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
    return this.http.get<PosRequest[]>('https://bmp-node.onrender.com/forms').pipe(
      distinctUntilChanged(), // Only emit when the current value is different than the last.
      tap(requests => this.requests.next(requests))
    );
  }

  getCurrentRequests(): PosRequest[] {
    return this.requests.getValue();
  }
  
  updateRequests(newRequests: PosRequest[]): void {
    this.requests.next(newRequests);
  }

  newRequest(requestData: any): Observable<any>{
    return this.http.post<any>('https://bmp-node.onrender.com/forms/new', requestData).pipe(
      switchMap(() => timer(5000)), // Wait for 5 seconds
      switchMap(() => this.getRequest()) // Then fetch the requests
    );
  }

  updateRequest(requestID: string, formData: any): Observable<any>{
    return this.http.put(`https://bmp-node.onrender.com/forms/${requestID}`, formData)
  }

  generateSN(posSN: any): Observable<any>{
    return this.http.post('https://bmp-node.onrender.com/POS/newposrequest', posSN)
  }
}
