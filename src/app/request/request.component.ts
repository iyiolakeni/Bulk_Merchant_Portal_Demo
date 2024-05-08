import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrl: './request.component.css'
})
export class RequestComponent implements OnInit {
  data: any;
  refinedData: any[] =[];

  constructor(private http:HttpClient){}

  ngOnInit() {
    this.http.get('https://randomapi.com/api/1aguk5gh?key=FL25-19LM-QEN8-QH9T').pipe(
      catchError(error => {
        console.log('Error fetching data');
        return throwError('Unable to fetch data');
      })
    ).subscribe(response => {
      this.data = response;
      this.refinedData = this.data.results.map((item: any) => Object.values(item));
      console.log(this.refinedData);
    });
  }


}
