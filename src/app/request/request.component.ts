import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ModalService } from '../modal/modal.service';

interface Request {
  requestId: string;
  dateOfRequest: string;
  numberOfPosRequest: number;
  accountOfficer: string;
  requestStatus: string;
  bankAccount: string;
  user: any;
  userType: string;
}

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
  @Input() n: number = 10; // The number of Items in a page
  currentPage = 1;
  data: any;
  refinedData: Request[] = [];

  constructor(private http: HttpClient, private router: Router, private datePipe: DatePipe,
    private modalService: ModalService
  ) {}
  
  //Function to determine if the page is on the home Page
  get defineHomePage() : boolean{
    return this.router.url === '/';
  }

  convertDate(dateString: string): string {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
    }

    openModal(request: any){
      this.modalService.openModal(request);
    }

  ngOnInit() {
    this.http
      .get('https://randomapi.com/api/1aguk5gh?key=FL25-19LM-QEN8-QH9T')
      .pipe(
        catchError((error) => {
          console.log('Error fetching data');
          return throwError('Unable to fetch data');
        })
      )
      .subscribe((response: any) => {
        this.data = response;
        this.refinedData = this.newResult(this.data.results);
        console.log(this.refinedData);
      });
  }

  //Function to convert double array response to single array
  newResult(data: any[]): Request[]{
    let newData: Request[] = [];
    for (let item of data){
      for (let key in item){
        newData.push(item[key]);
      }
    }
    return newData;
  }
  //Pagination Logic
  get totalPages(): number {
    return Math.ceil(this.refinedData.length / this.n);
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
