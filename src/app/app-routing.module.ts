import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AppComponent } from './app.component';
import { RequestpageComponent } from './paths/requestpage/requestpage.component';
import { NotificationPageComponent } from './paths/notification-page/notification-page.component';
import { HomePageComponent } from './paths/home-page/home-page.component';
import { EmailComponent } from './email/email.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NewRequestComponent } from './paths/new-request/new-request.component';
import {RequestComponent} from './request/request.component'
import { MerchantsComponent } from './merchants/merchants.component';
import { AllmerchantsComponent } from './merchants/allmerchants/allmerchants.component';
import { NewMerchantComponent } from './merchants/new-merchant/new-merchant.component';
import { authGuard } from './auth.guard';
const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'dashboard', component: HomePageComponent,
    // canActivate: [authGuard]
  },
  {path: 'sign_up', component: SignupComponent},
  {
    path:'request', 
    component: RequestpageComponent,
    // canActivate: [authGuard],
    children: [
      {path: 'new_request', component: NewRequestComponent},
      {path: '', component: RequestComponent}
  ]
  },
  {
    path: 'merchants',
    component: MerchantsComponent,
    // canActivate: [authGuard],
    children: [
      {path: '', component: AllmerchantsComponent},
      {path: 'new_merchant', component: NewMerchantComponent}
    ]
  },
  {path: 'notifications', component: NotificationPageComponent,
    // canActivate: [authGuard]
  },
  {path: 'emails', component: EmailComponent,
    // canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
