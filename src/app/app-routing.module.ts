import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AppComponent } from './app.component';
import { RequestpageComponent } from './paths/requestpage/requestpage.component';
import { NotificationPageComponent } from './paths/notification-page/notification-page.component';
import { HomePageComponent } from './paths/home-page/home-page.component';
import { EmailComponent } from './email/email.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path:'request', component: RequestpageComponent},
  {path: 'notifications', component: NotificationPageComponent},
  {path: 'emails', component: EmailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
