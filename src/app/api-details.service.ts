import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Merchant } from './merchant';
import {PosRequest} from './posrequest'

@Injectable({
  providedIn: 'root'
})
export class ApiDetailsService {
  // merchantApi: any;

  constructor(
    private http: HttpClient
  ) { }

  getAllMerchants(): Observable<any>{
    return this.http.get<Merchant[]>('https://bmp-node.onrender.com/merchant/allMerchants');
  }

  getMerchantById(merchantID: string): Observable<Merchant>{
    return this.http.get<Merchant>(`https://bmp-node.onrender.com/merchant/${merchantID}`)
  }

  getRequest():Observable<any>{
    return this.http.get<PosRequest[]>('https://bmp-node.onrender.com/forms')
  }

  approveRequest(requestID: string, formData: any): Observable<any>{
    return this.http.put(`https://bmp-node.onrender.com/forms/${requestID}`, formData)
  }
}
