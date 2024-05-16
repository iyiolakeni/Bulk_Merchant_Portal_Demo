import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrl: './merchants.component.css'
})
export class MerchantsComponent implements OnInit {


  constructor(
    private titleService: Title
  ){}

  ngOnInit(): void {
    this.titleService.setTitle('Merchant Page')
  }
}
