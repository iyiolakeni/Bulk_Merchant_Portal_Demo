import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  constructor(
    private titleService: Title
  ){}
title: string = '';

  ngOnInit(){
    this.title = this.titleService.getTitle();
  }

}
