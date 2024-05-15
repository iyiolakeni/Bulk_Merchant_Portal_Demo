import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

interface Merchant{
  MerchantID: string,
  Merchant_Trade_Name: string,
  Business_type: string,
  Business_location: string,
  RC_Number: number,
  No_of_branches: number,
  opening_hours: string,
  website: string,
  Office_address: string,
  LGA: string,
  state: string,
  Name_of_Primary_Contact: string,
  office_No: string,
  Mobile_No1: string,
  office_email: string,
  Designation: string,
  Name_of_Secondary_Contact: string,
  Designation2: string,
  office_No2: string,
  Mobile_No2: string,
  office_email2: string;
}

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

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.http.get('https://bmp-node.onrender.com/merchant/allMerchants').
    subscribe((response: any) => {
      this.merchants = response as Merchant[];
      console.log(this.merchants)
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
