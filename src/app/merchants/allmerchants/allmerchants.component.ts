import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-allmerchants',
  templateUrl: './allmerchants.component.html',
  styleUrl: './allmerchants.component.css'
})
export class AllmerchantsComponent implements OnInit {
  @Input() n: number = 15;
  currentPage = 1;
  merchants: any;
  totalPages: number = 30;

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.http.get<any[]>('https://bmp-node.onrender.com/merchant/allMerchants').subscribe(response => {
      this.merchants = response;
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
