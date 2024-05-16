import { Component , OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router, NavigationStart} from '@angular/router';
import { tap, catchError, of, switchMap } from 'rxjs';

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

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit() {
    const state = this.router.lastSuccessfulNavigation?.extras.state;
  if (state) {
    console.log(state['newdata']);

    const merchantItem = state['newdata'].tabs[0].items.find((item: Item) => item.label === 'Merchant ID');
    this.merchantID = merchantItem ? merchantItem.value : null;
    console.log(this.merchantID);
  }


    this.newRequest = this.formBuilder.group({
        officer_name: ['', Validators.required],
        MerchantID: [this.merchantID || '', Validators.required],
        No_of_POS_terminal: ['', Validators.required],
        location_of_terminal: ['', Validators.required],
        contact_person: ['', Validators.required],
        contact_mobile_no: ['', Validators.required],
        Business_Category: ['', Validators.required],
        bank: ['', Validators.required],
        Account_No: ['', Validators.required],
        CardType: ['', Validators.required],
        FormStatus: ['', Validators.required],
        Notes: [''],
    })
  }

  onSubmit(){
    if (this.newRequest.valid){
      const requestData = this.newRequest.value;

      this.http.post('https://bmp-node.onrender.com/forms/new', requestData).pipe(
        tap(response => {
          console.log(response);
          console.log('Request added');
        }),
        catchError(error =>{
          console.error(error);

          return of(null);
        }),
        switchMap(() => this.router.navigate(['/requests']))
      ).subscribe();
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
