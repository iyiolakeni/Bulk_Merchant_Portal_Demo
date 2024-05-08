import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  dashboard = [{
    status: 'Pending',
    title: 'Pending Task',
    count: 10,
    icon: 'bi bi-bag-x-fill',
  },
{
  status: 'Approved',
    title: 'Approved Task',
    count: 10,
    icon: 'bi bi-arrow-up-right-cricle-fill',
  },
{
  status: 'Processing',
    title: 'In Porcess Task',
    count: 10,
    icon: 'bi bi-marker-tip',
  },
{
  status: 'Rejected',
    title: 'Pending Task',
    count: 10,
    icon: 'bi bi-exclamation-triangle-fill',
},
{
  status: 'Deployed',
    title: 'Deployed Task',
    count: 10,
    icon: 'bi bi-bag-x-fill',
},
{
  status: 'Total',
    title: 'Total Task',
    count: 50,
    icon: 'bi bi-bag-x-fill',
}
]

}
