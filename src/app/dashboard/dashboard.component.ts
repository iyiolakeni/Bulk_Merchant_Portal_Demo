import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
dashboard: { status: string, count: number }[] = [];
totalRequest: number = 0;

constructor(private sharedService: AppService){}

ngOnInit() {
  this.sharedService.data.subscribe(data => { // Subscribe to the data
    const counts: { [status: string]: number } = data.reduce((counts, item) => { // Use reduce to count the statuses
      if (!counts[item.requestStatus]) {
        counts[item.requestStatus] = 0;
      }
      counts[item.requestStatus]++;
      return counts;
    }, {});

    this.dashboard = Object.entries(counts).map(([status, count]) => ({ status, count: Number(count) })).sort((a, b) => b.count - a.count);

    //Total Request count
    this.totalRequest = this.dashboard.reduce((total, item) => total + item.count, 0);
  });
}

logout(){
  this.sharedService.setUser(null);
}

}
