import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ModalService } from '../modal/modal.service';


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
  @Input() n: number = 10; // The number of Items in a page
  currentPage = 1;
  data: any = [];
  numbers = Array.from({length: 30}, (_, i) => i+ 1);
  totalPages: number = 30;

  constructor(private http: HttpClient, private router: Router, private datePipe: DatePipe,
    private modalService: ModalService
  ) {}
  
  //Function to determine if the page is on the home Page
  get defineHomePage() : boolean{
    return this.router.url === '/';
  }

  getRequestProperty(request: any, key: string): any {
    return request[key];
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
            console.error('Error fetching data', error);
            return throwError('Unable to fetch data');
          })
        )
        .subscribe((response: any) => {
          console.log(response)
          this.data = response.results;
         console.log(this.data)
        })
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
