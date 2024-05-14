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

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'dashboard', component: HomePageComponent},
  {path: 'sign_up', component: SignupComponent},
  {
    path:'request', 
    component: RequestpageComponent,
    children: [{
      path: 'new_request',
      component: NewRequestComponent
    
    }]

  },
  {path: 'notifications', component: NotificationPageComponent},
  {path: 'emails', component: EmailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
