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


constructor(private sharedService: AppService,
  private apiService: ApiDetailsService
){}

ngOnInit() {
  this.apiService.getRequest().subscribe(response => {
    console.log("Response is:",response);
  })

  this.apiService.getRequest().subscribe(data => { 
    // Retrieve all status from the data set
    const status = [...new Set(data.map((item: { status: string; }) => item.status))];
    console.log("Status is:", status);
    // const counts: { [status: string]: number } = data.reduce((counts: { [x: string]: number; }, item: { status: string | number; }) => { 
    //   // Use reduce to count the statuses
    //   if (!counts[item.status]) {
    //     counts[item.status] = 0;
    //   }
    //   counts[item.status]++;
    //   return counts;
    // }, {});

    this.dashboard = Object.entries(counts).map(([status, count]) => ({ status, count: Number(count) })).sort((a, b) => b.count - a.count);

    //Total Request count
    this.totalRequest = this.dashboard.reduce((total, item) => total + item.count, 0);
  });
}

logout(){
  this.sharedService.setUser(null);
}

}
