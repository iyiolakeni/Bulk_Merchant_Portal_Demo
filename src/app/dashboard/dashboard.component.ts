import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ApiDetailsService } from '../api-details.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
dashboard: { status: string, count: number }[] = [];
totalRequest: number = 0; 
isLoading = true;
user: any;

constructor(private sharedService: AppService,
  private apiService: ApiDetailsService
){}

ngOnInit() {
  this.user = this.sharedService.getUser();
  this.apiService.getRequest().subscribe(response => {
    console.log("Response is:",response);
  })

  this.apiService.requests$.subscribe(data => {
    if (this.user.jobPosition === 'Account Officer'){
      data = data.filter((item: any) => item.officer_name === this.user.user.firstname + ' ' + this.user.user.surname);
    }

    const statuses = ['approved','pending', 'in_process', 'denied','deployed']
    const counts: {[status: string]: number} = statuses.reduce((obj, status) =>({
      ...obj, [status]:0
    }), {})

    //count the status
    data.forEach((item: any) => {
      if (counts.hasOwnProperty(item.status)){
        counts[item.status]++
      }
    })

    this.dashboard = Object.entries(counts).map(([status, count]) => ({ status, count: Number(count) })).sort((a, b) => b.count - a.count);

    //Total Request count
    this.totalRequest = this.dashboard.reduce((total, item) => total + item.count, 0);
  });
  this.isLoading = false;
}

logout(){
  this.sharedService.setUser(null);
}

}
