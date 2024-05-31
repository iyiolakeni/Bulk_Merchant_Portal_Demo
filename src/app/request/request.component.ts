import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError, forkJoin, from, of, throwError } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';
import { AppService } from '../app.service';
import { MerchantsComponent } from '../merchants/merchants.component';
import { ApiDetailsService } from '../api-details.service';
import { PosRequest } from '../posrequest';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
  @Input() n: number = 15; // The number of Items in a page
  currentPage = 1;
  posRequests: PosRequest[] = [];
  totalPages: number = 30;
  selectedRequest: any;
  selectedStatus: string = '';
  merchant: any;
  user: any;
  officerName: string ='';

  mergedData: {request: any, merchant: any}[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private sharedService: AppService,
    private apiService: ApiDetailsService
  ) {}

  //Function to determine if the page is on the home Page
  get defineHomePage(): boolean {
    return this.router.url === '/dashboard';
  }

  convertDate(dateString: string): string {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  openDialog(posRequest: any, merchant: any): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '750px',
      data: {
        status: posRequest.status,
        title: 'Details of ' + posRequest.RequestId,
        user: this.user.jobPosition,
        officer: posRequest.officer_name,
        name: this.user.user.firstname + ' ' + this.user.user.surname,
        tabs: [
          {
            label: 'Request Details',
            items: [
              { label: 'Request ID:', value: posRequest.RequestId },
              {
                label: 'Date of Request:',
                value: this.convertDate(posRequest.createdAt),
              },
              { label: 'Bank Account:', value: posRequest.bank },
              { label: 'Request Status:', value: posRequest.status },
              { label: 'Notes:', value: posRequest.Notes },
              {label: 'Officer In Charge', value: posRequest.officer_name}
            ],
          },
          {
            label: 'Business Details',
            items: [
              { label: 'Business Name', value: merchant.Merchant_Trade_Name },
              { label: 'Business Type', value: merchant.Business_type },
              { label: 'Business Location', value: merchant.Business_location },
              {
                label: 'Contact Name',
                value: merchant.Name_of_Primary_Contact,
              },
              { label: 'Phone Number', value: merchant.office_No },
              { label: 'Contact Location', value: merchant.office_email },
              { label: 'Contact Email', value: merchant.office_email },
            ],
          },
          {
            label: 'POS Terminal Contact',
            items: [
              {
                label: 'Location of Terminal',
                value: posRequest.location_of_terminal,
              },
              { label: 'Name', value: posRequest.contact_person },
              { label: 'Phone Number', value: posRequest.contact_mobile_no },
              // {label: 'Image', value: posRequest.images}
            ],
          },
        ],
      },
    });
  }

  ngOnInit() {
    this.user = this.sharedService.getUser();
    console.log(this.user.user.jobPosition);
    this.officerName = this.user.user.firstname + ' ' +this.user.user.surname;
    console.log(this.officerName);
    this.apiService.getRequest().subscribe(
      posRequests => {
        if (this.user.jobPosition === 'Account Officer') {
          posRequests = posRequests.filter((request: any) => request.officer_name === this.officerName);
        }
        this.posRequests = posRequests.reverse();
        console.log(this.posRequests);
  
        const merchantRequests = this.posRequests.map(posRequest =>{
          const merchantID = posRequest.MerchantID
          if (typeof merchantID === 'string' && merchantID !== 'string') {
            return this.apiService.getMerchantById(merchantID);
          } else {
            console.error('Invalid merchantID:', merchantID);
            return of(null); // Return an Observable of null if merchantID is invalid
          }
        }
        );
  
        forkJoin(merchantRequests).subscribe(
          merchants => {
            this.mergedData = this.posRequests.map((request, index) => ({
              request: request,
              merchant: merchants[index]
            
            }));
            console.log(this.mergedData)
          },
          error => {
            console.error(error);
          }
        );
      },
      error => {
        console.error(error);
      }
    );
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
