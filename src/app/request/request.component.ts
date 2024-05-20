import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError, forkJoin, throwError } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';
import { AppService } from '../app.service';
import { MerchantsComponent } from '../merchants/merchants.component';
import { ApiDetailsService } from '../api-details.service';

interface PosRequest {
  [key: string]: any;
  RequestId: string;
  officer_name: string;
  MerchantID: string;
  No_of_POS_terminal: string;
  location_of_terminal: string;
  contact_person: string;
  contact_mobile_no: string;
  category_of_merchant_business: string;
  bank: string;
  Account_No: number;
  card_type: string;
  status: string;
  Notes: string;
  suppportingDocuments: string;
  updatedAt: string;
  createdAt: string;
  ApprovedBy: string;
  AdditionalNotes: string;
}

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
        title: 'Details of ' + posRequest.RequestId,
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
    this.http.get<PosRequest[]>('https://bmp-node.onrender.com/forms').subscribe(
      posRequests => {
        this.posRequests = posRequests.reverse();
        console.log(this.posRequests);
  
        const merchantRequests = this.posRequests.map(posRequest =>
          this.apiService.getMerchantById(posRequest.MerchantID)
        );
  
        forkJoin(merchantRequests).subscribe(
          merchants => {
            this.merchant = merchants;
            console.log(this.merchant);
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
