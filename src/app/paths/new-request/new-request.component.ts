import { Component , OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { tap, catchError, of, throwError } from 'rxjs';
import { AppService } from '../../app.service';
import { ApiDetailsService } from '../../api-details.service';

interface Item {
  label: string;
  value: string;
}

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrl: './new-request.component.css'
})
export class NewRequestComponent implements OnInit {

  newRequest: FormGroup = new FormGroup({});
  merchantID: string | null = null;
  merchantExist: boolean | null = null;
  user: any;
  fullname: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userAccount: AppService,
    private apiService: ApiDetailsService
  ) { }

  ngOnInit() {
    const state = this.router.lastSuccessfulNavigation?.extras.state;
  if (state) {
    console.log(state['newdata']);

    const merchantItem = state['newdata'].tabs[0].items.find((item: Item) => item.label === 'Merchant ID');
    this.merchantID = merchantItem ? merchantItem.value : null;
    console.log(this.merchantID);
  }

  this.user = this.userAccount.getUser();
  this.fullname = this.user.user.firstname + ' '+ this.user.user.surname

  this.newRequest = this.formBuilder.group({
        officer_name: [this.fullname],
        MerchantID: [this.merchantID || ''],
        No_of_POS_terminal: ['', Validators.required],
        location_of_terminal: ['', Validators.required],
        contact_person: ['', Validators.required],
        contact_mobile_no: ['', Validators.required],
        Business_Category: ['', Validators.required],
        bank: ['', Validators.required],
        Account_No: ['', Validators.required],
        CardType: ['', Validators.required],
        Notes: ['']
    })
  }

  onSubmit() {

    console.log('Form validity:', this.newRequest.valid);
    console.log('Form data:', this.newRequest.value)
    
    if (this.newRequest.valid) {
      const requestData = this.newRequest.value; 
  
      this.apiService.newRequest(requestData).subscribe(response => {
        console.log(response);
        console.log('Request added');
        this.router.navigate(['/request']);
      }, error => {
        console.log('POST request failed, error:', error);
      });
    } else {
      console.log(this.newRequest.errors);
    }
  }

  searchMerchant(){
    const merchant = this.newRequest.get('MerchantID')?.value;

    this.http.get(`https://bmp-node.onrender.com/merchant/${merchant}`).subscribe(
      response => {
        console.log(response);
        this.merchantExist = true;
      },
      error => {
        console.error(error);
        this.merchantExist = false;
      }
    )
  }

  resetMerchant(){
    this.merchantExist = null;
  }
}
