import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, switchMap, tap } from 'rxjs';
import { MERCHANT } from '../../constants/url.constant';
import { ApiResponse } from '../../response';

@Component({
  selector: 'app-new-merchant',
  templateUrl: './new-merchant.component.html',
  styleUrl: './new-merchant.component.css'
})
export class NewMerchantComponent implements OnInit {

  newMerchant: FormGroup = new FormGroup({});
  errorMessage: string = ''
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient,
    private router: Router
  ){}

  ngOnInit(){
    this.newMerchant = this.formBuilder.group({
      Merchant_Trade_Name: ['', Validators.required],
      Business_type: ['', Validators.required],
      RC_Number: ['', Validators.required],
      No_of_branches: ['', Validators.required],
      Business_location: ['', Validators.required],
      opening_hours: ['', Validators.required],
      website: ['', Validators.required],
      Office_address: ['', Validators.required],
      LGA: ['', Validators.required],
      state: ['', Validators.required],
      Name_of_Primary_Contact: ['', Validators.required],
      office_No: ['', Validators.required],
      Mobile_No1: ['', Validators.required],
      office_email: ['', Validators.required],
      Designation: ['', Validators.required],
      Name_of_Secondary_Contact: ['', Validators.required],
      Designation2: ['', Validators.required],
      office_No2: ['', Validators.required],
      Mobile_No2: ['', Validators.required],
      office_email2: ['', Validators.required]
    })
    }

    onSubmit(){
      if (this.newMerchant.valid){
        this.loading = true;
        const merchantData = this.newMerchant.value;

        this.http.post(`${MERCHANT}/newMerchant`, merchantData).pipe(
          tap(response => {
            console.log(response);
            const {success, message} = response as ApiResponse
            if (success !== true){
              this.errorMessage = message
            }else{
              this.router.navigate(['/merchants'])
            }
          }),
          catchError(error =>{
            this.loading = false;
            return of(null);
          }),
        ).subscribe()
      }
      else{
            this.loading = false;
        this.errorMessage = 'Invalid Fields'
        return;
      }
    }
}
