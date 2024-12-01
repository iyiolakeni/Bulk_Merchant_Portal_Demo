import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, of, switchMap, tap } from 'rxjs';
import { USERS } from '../constants/url.constant';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  jobPosition = '';
  showPassword = false;
  confirmPwrod = false;
  signupForm: FormGroup = new FormGroup({});
  submitHandler$ : Observable<any> = new Observable<any>(); 
  locations: string[] = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
    "FCT"
];

  constructor (
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ){}
  showPword(){
    this.showPassword = !this.showPassword;
  }
  confirmPword(){
    this.confirmPwrod = !this.confirmPwrod;
  }

  ngOnInit(){
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]], 
      jobPosition: [''], 
      Location: [''],
      firstname: ['', [Validators.required]], 
      surname: ['', [Validators.required]], 
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
}, { validator: this.checkPasswords } 
)
  }

  checkPasswords(group: FormGroup){
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirm_password')?.value;

    return password === confirmPassword ? null : { notSame: true };
  }

  onSubmit(){
    if (this.signupForm.valid){
    const formData = this.signupForm.value;
    
    this.http.post(`${USERS}/signup`, formData).pipe(
      tap(response =>{
      console.log(response);
      console.log('Form submitted');
    }),
    catchError(error =>{
      console.error('Error', error);

      return of(null);
    }),
 switchMap(()=> this.router.navigate(['']))
  ).subscribe();
}
else {
  console.error('Invalid Form'),
  console.log(this.signupForm.errors)
}
  }
}
