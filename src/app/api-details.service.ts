import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, distinctUntilChanged, finalize, switchMap, tap, timer } from 'rxjs';
import { Merchant } from './merchant';
import {PosRequest} from './posrequest'
import { Users } from './users';
import { FORMS, MERCHANT, POS, USERS } from './constants/url.constant';

@Injectable({
  providedIn: 'root'
})
export class ApiDetailsService {


  constructor(
    private http: HttpClient
  ) { } 

  private refreshSource = new Subject<void>();

  refresh$ = this.refreshSource.asObservable();
  
  getAllUsers(): Observable<any>{
    return this.http.get<Users>(`${USERS}`);
  }

  getAllMerchants(): Observable<any>{
    return this.http.get<Merchant[]>(`${MERCHANT}/allMerchants`);
  }

  getMerchantById(merchantID: string): Observable<Merchant>{
    return this.http.get<Merchant>(`${MERCHANT}/${merchantID}`)
  }

  getPaginatedRequest(limit: number, offset: number): Observable<PosRequest[]> {
    const params = new HttpParams().set('limit', limit.toString()).set('offset', offset.toString());

    return this.http.get<PosRequest[]>(`${FORMS}`, {params})
  }

  getRequest(): Observable<PosRequest[]>{
    return this.http.get<PosRequest[]>(`${FORMS}`)
  }
  //Function to get the Real Time update every 5 secs an update happens
  getRealTimeUpdates(): Observable<any[]>{
    return timer(0, 1000).pipe(
      switchMap(()=> this.getRequest())
    )
  }

  newRequest(requestData: any): Observable<any>{
    return this.http.post<any>(`${FORMS}/new`, requestData)
  }

  updateRequest(requestID: string, formData: any): Observable<any>{
    return this.http.put(`${FORMS}/${requestID}`, formData).pipe(
      finalize(()=> this.refreshSource.next())
    )
  }

  //POS Request
  generateSN(requestID: string, posSN: any): Observable<any>{
    return this.http.put(`${POS}/updateRequest/${requestID}`, posSN).pipe(
      finalize(()=> this.refreshSource.next)
    )
  }

  createPosRequest(formData: any): Observable<any>{
    return this.http.post(`${POS}/newposrequest`, formData)
  
  }

  getAllPosBusinessRequest():Observable<any>{
    return this.http.get<PosRequest[]>(`${POS}/allrequest`);
  }

  updatePosStatus(requestId:string, status: string): Observable<any>{
    return this.http.put(`${POS}/updateStatus/${requestId}`, {status}).pipe(
      finalize(()=> this.refreshSource.next())
    )
  }

  updateDeliveryStatus(requestId:string, form: any): Observable<any>{
    return this.http.put(`${POS}/updateStatus/${requestId}`, form).pipe(
      finalize(()=> this.refreshSource.next())
    )
  }

}
