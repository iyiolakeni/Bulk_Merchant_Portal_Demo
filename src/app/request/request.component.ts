import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

interface PosRequest {
requestId: string,
      dateOfRequest: string,
      numberOfPosRequest: number,
      accountOfficer: string,
      requestStatus: string,
      bankAccount: number,
      businessDetail: {
        location: string,
        businessName: string,
        type: string,
          contact: {
           name: string,
           number: string,
            location: string,
          email: string
          }
        },
       user: {
          fullname: string,
          age: number,
          images: string,
          userType: string
        },
        notification: {
          message: string
        }
}

interface ApiResponse {
  [key: string]: PosRequest;
}

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
  @Input() n: number = 10; // The number of Items in a page
  currentPage = 1;
  posRequests: PosRequest[]=[];
  totalPages: number = 30;
  selectedRequest: any;

  constructor(private http: HttpClient, private router: Router, private datePipe: DatePipe,
    ) {}
  
  //Function to determine if the page is on the home Page
  get defineHomePage() : boolean{
    return this.router.url === '/';
  }

  selectRequest(posRequest: any): void {
    this.selectedRequest = posRequest;
  }


  convertDate(dateString: string): string {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
    }

    ngOnInit() {
      this.http.get('https://randomapi.com/api/1aguk5gh?key=FL25-19LM-QEN8-QH9T')
        .pipe(
          catchError((error) => {
            console.error('Error fetching data', error);
            return throwError('Unable to fetch data');
          })
        )
        .subscribe((response: any) => {
          // Extracting the array of PosRequest objects from the response
          this.posRequests =Object.values(response.results[0]);
          console.log(this.posRequests);
          // Now you can use posRequests array in your component
          // console.log(this.posRequests);
        });
    }
 


  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++; //Increase current page by 1 if total page still has more elements asides the current page
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  


}
