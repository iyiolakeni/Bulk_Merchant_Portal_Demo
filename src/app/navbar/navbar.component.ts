import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppService } from '../app.service';

@Component({
  selector: 'app-navbar', 
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  constructor(
    private titleService: Title,
    public sharedService: AppService
  ){}
title: string = '';
user: any;

  ngOnInit(){
    this.title = this.titleService.getTitle();
    this.user = this.sharedService.getUser();
    console.log(this.user)
    }

}
