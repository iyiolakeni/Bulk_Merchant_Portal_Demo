import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';
import { AppService } from '../app.service';

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


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
  @Input() n: number = 15; // The number of Items in a page
  currentPage = 1;
  posRequests:any[] = [];
  totalPages: number = 30;
  selectedRequest: any;
  selectedStatus: string ='';

  constructor(private http: HttpClient, private router: Router, 
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private sharedService: AppService
    ) {}
  
  //Function to determine if the page is on the home Page
  get defineHomePage() : boolean{
    return this.router.url === '/dashboard';
  }
  
   convertDate(dateString: string): string {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
    }

    openDialog(posRequest: any): void{
      const dialogRef = this.dialog.open(ModalComponent, {
        width: '750px',
        data: {
          title: 'Details of '+ posRequest.requestId,
          tabs: [
            {
              label: 'Request Details',
              items: [
                {label: 'Request ID:', value: posRequest.requestId},
                {label: 'Date of Request:', value: this.convertDate(posRequest.dateOfRequest)},
                {label: 'Account Officer:', value: posRequest.accountOfficer},
                {label: 'Request Status:', value: posRequest.requestStatus},
                {label: 'Bank Account:', value: posRequest.bankAccount},
              ]
            },
            {
              label: 'Business Details',
              items: [
                {label: 'Business Name', value: posRequest.businessDetail.businessName},
                {label: 'Business Type', value: posRequest.businessDetail.type},
                {label: 'Business Location', value: posRequest.businessDetail.location},
                {label: 'Contact Name', value: posRequest.businessDetail.contact.name},
                {label: 'Phone Number', value: posRequest.businessDetail.contact.number},
                {label: 'Contact Location', value: posRequest.businessDetail.contact.location},
                {label: 'Contact Email', value: posRequest.businessDetail.contact.email},
              ]
            },
            {
              label: 'Business Owner Details',
              items: [
                // {value: }
                {label: 'Name', value: posRequest.user.fullname},
                {label: 'Age', value: posRequest.user.age},
                {label: 'Access Level', value: posRequest.user.userType},
                {label: 'Image', value: posRequest.user.images}
              ]
            }
          ]
        }
      });
    }

    ngOnInit() {
      this.http.get('https://randomapi.com/api/zd4nfefq?key=A57Y-OMZL-YRW4-7HW7')
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
          this.sharedService.updateData(response);
          console.log(this.sharedService)
          this.cdr.detectChanges();

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
