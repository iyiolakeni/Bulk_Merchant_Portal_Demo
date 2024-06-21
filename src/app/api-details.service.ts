import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, distinctUntilChanged, finalize, switchMap, tap, timer } from 'rxjs';
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

  private refreshSource = new Subject<void>();

  refresh$ = this.refreshSource.asObservable();
  
  getAllUsers(): Observable<any>{
    return this.http.get<Users>('https://bmp-node.onrender.com/users');
  }

  getAllMerchants(): Observable<any>{
    return this.http.get<Merchant[]>('https://bmp-node.onrender.com/merchant/allMerchants');
  }

  getMerchantById(merchantID: string): Observable<Merchant>{
    return this.http.get<Merchant>(`https://bmp-node.onrender.com/merchant/${merchantID}`)
  }

  getPaginatedRequest(limit: number, offset: number): Observable<PosRequest[]> {
    const params = new HttpParams().set('limit', limit.toString()).set('offset', offset.toString());

    return this.http.get<PosRequest[]>('https://bmp-node.onrender.com/forms', {params})
  }

  getRequest(): Observable<PosRequest[]>{
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
    return this.http.put(`https://bmp-node.onrender.com/forms/${requestID}`, formData).pipe(
      finalize(()=> this.refreshSource.next())
    )
  }

  //POS Request
  generateSN(requestID: string, posSN: any): Observable<any>{
    return this.http.post(`https://bmp-node.onrender.com/POS/updateRequest/${requestID}`, posSN).pipe(
      finalize(()=> this.refreshSource.next)
    )
  }

  createPosRequest(): Observable<any>{
    return this.http.post('https://bmp-node.onrender.com/POS/newposrequest', {})
  
  }

  getAllPosBusinessRequest():Observable<any>{
    return this.http.get<PosRequest[]>('https://bmp-node.onrender.com/POS/allrequest');
  }

  updatePosStatus(requestId:string, status: string): Observable<any>{
    return this.http.put(`https://bmp-node.onrender.com/POS/updateStatus/${requestId}`, {status}).pipe(
      finalize(()=> this.refreshSource.next())
    )
  }

}
