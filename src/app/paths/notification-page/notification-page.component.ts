import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html',
  styleUrl: './notification-page.component.css'
})
export class NotificationPageComponent implements OnInit {
 constructor(private titleService: Title){}

 ngOnInit(): void {
   this.titleService.setTitle('Notification Page')
 }
}
