import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EmailComponent } from './email/email.component';
import { NotificationComponent } from './notification/notification.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RequestComponent } from './request/request.component';
import { HttpClientModule } from '@angular/common/http';
import { RequestpageComponent } from './paths/requestpage/requestpage.component';
import { NotificationPageComponent } from './paths/notification-page/notification-page.component';
import { HomePageComponent } from './paths/home-page/home-page.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatDialogModule} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { ModalComponent } from './modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewRequestComponent } from './paths/new-request/new-request.component';
import { MerchantsComponent } from './merchants/merchants.component';
import { AllmerchantsComponent } from './merchants/allmerchants/allmerchants.component';
import { NewMerchantComponent } from './merchants/new-merchant/new-merchant.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    SidebarComponent,
    EmailComponent,
    NotificationComponent,
    NavbarComponent,
    RequestComponent,
    RequestpageComponent,
    NotificationPageComponent,
    HomePageComponent,
    ModalComponent,
    NewRequestComponent,
    MerchantsComponent,
    AllmerchantsComponent,
    NewMerchantComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
