import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  
  constructor(
    private router: Router,
    public sharedServices: AppService
  ){}
  
  show = false;
  show2 = false;
  user: any;

  ngOnInit(): void {
    this.user = this.sharedServices.getUser();
    console.log(this.user)
  }
  
  toggle() {
    this.show = !this.show;
  }
  toggle2() {
    this.show2 = !this.show2;
  }

  logout(){
    this.sharedServices.setUser(null);
    console.log(this.sharedServices.getUser())
    this.router.navigate([''])
  }
}
