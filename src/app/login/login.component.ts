import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, switchMap, tap } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});

  showPassword = false;
  constructor(
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private sharedService: AppService
  ){}

ngOnInit(){
  this.loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })
  
}
  showPword(){
    this.showPassword = !this.showPassword;
  }
  onLogin(){
    if (this.loginForm.valid){
    const loginData = this.loginForm.value;

    this.http.post('https://bmp-node.onrender.com/users/login', loginData).pipe(
      tap(response => {
        console.log(response);
        console.log('Logged in');
        this.sharedService.setUser(response);
      }),
      catchError(error => {
        console.error('Error', error);

        return of(null);
      }),
      switchMap(()=>this.router.navigate(['/dashboard']))
    ).subscribe();
  }
  else {
    console.log(this.loginForm.errors)
  }
}

}
