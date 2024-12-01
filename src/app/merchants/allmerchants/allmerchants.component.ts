import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../modal/modal.component';
import { Title } from '@angular/platform-browser';
import { ApiDetailsService } from '../../api-details.service';
import { Merchant } from '../../merchant';
import { AppService } from '../../app.service';
import { share } from 'rxjs';


@Component({
  selector: 'app-allmerchants',
  templateUrl: './allmerchants.component.html',
  styleUrl: './allmerchants.component.css'
})
export class AllmerchantsComponent implements OnInit {
  @Input() n: number = 15;
  currentPage = 1;
  merchants: Merchant[] = [];
  totalPages: number = 30;
  searchName = '';
  searchField = 'Merchant_Trade_Name';
  user: any;
  loading: boolean = false;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private titleService: Title,
    private apiService: ApiDetailsService,
    private sharedService: AppService
  ) {}

  openDialog(merchant: any): void{
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '750px',
      data: {
        title: merchant.Merchant_Trade_Name,
        page: 'merchants',
        user: this.user.jobPosition,
        tabs: [
          {
          label: 'Merchant details',
          items: [
          {label: 'Merchant ID', value: merchant.MerchantID},
          {label: 'RC Number', value: merchant.RC_Number},
          {label: 'Business Name', value: merchant.Merchant_Trade_Name},
          {label: 'Business Type', value: merchant.Business_type},
          {label: 'Number of Branches', value: merchant.No_of_branches},
          {label: 'Website', value: merchant.website},
          ]
          },
          {
          label: 'Location and Opening Details',
          items: [
          {label: 'Business Location', value: merchant.Business_location},
          {label: 'Opening Hours', value: merchant.opening_hours},
          {label: 'Business Name', value: merchant.Merchant_Trade_Name},
          {label: 'Office Address', value: merchant.Office_address},
          {label: 'State', value: merchant.state},
          {label: 'LGA', value: merchant.LGA},
          ]
          },
          {
          label: 'Contact Details',
          items: [
          {label: 'Primary Contact', value: merchant.Name_of_Primary_Contact},
          {label: 'Secondary Contact', value: merchant.Name_of_Secondary_Contact},
          {label: 'Designation', value: merchant.Designation},
          {label: 'Designation', value: merchant.Designation2},
          {label: 'Phone Number', value: merchant.office_No},
          {label: 'Phone Number', value: merchant.office_No2},
          {label: 'Email', value: merchant.office_email},
          {label: 'Email', value: merchant.office_email2},
          ]
          },
        ]
      }
    })
  }

  search(){
    if(this.searchName){
    this.merchants = this.merchants.filter(merchant => 
      merchant[this.searchField].toLowerCase().includes(this.searchName.toLowerCase())
    )
  } else{
    this.ngOnInit();
  }
  }


  ngOnInit() {
    this.loading = true
    this.user = this.sharedService.getUser();
    this.titleService.setTitle('All Merchants');
    this.apiService.getAllMerchants().subscribe((response: any) => {
      this.merchants = response.reverse() as Merchant[];
      this.loading = false
    },
    error => {
      console.error(error)
    })
  }

nextPage() {
  if (this.currentPage < this.totalPages){
    this.currentPage++;
  }
}

previousPage() {
  if (this.currentPage > 1){
    this.currentPage--;
  }
}

}
