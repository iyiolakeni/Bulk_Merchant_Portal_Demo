import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';

interface Request {
  requestId: number;
  numberOfPosRequest: number;
  accountOfficer: string;
  userType: string;
}

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  @Input() n: number = 10;
  data: any;
  refinedData: Request[][] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('https://randomapi.com/api/1aguk5gh?key=FL25-19LM-QEN8-QH9T').pipe(
      catchError(error => {
        console.log('Error fetching data');
        return throwError('Unable to fetch data');
      })
    ).subscribe((response: any) => {
      this.data = response;
      this.refinedData = this.data.results.map((item: any) => Object.values(item) as Request[]);
      console.log(this.refinedData);
    });
  }
}