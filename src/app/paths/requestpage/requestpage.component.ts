import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-requestpage',
  templateUrl: './requestpage.component.html',
  styleUrl: './requestpage.component.css'
})
export class RequestpageComponent implements OnInit {

  constructor(
    private titleService: Title
  ){}

  ngOnInit(): void {
    this.titleService.setTitle('Request Page')
  }
}
