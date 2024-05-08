import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  @Input() n:number = 10;
  notifications =[
    {
    amount: 789545,
    status: 'Processing',
    requestId: 'Req78872',
    time: '2 minutes ago',
    officerName: 'Muyiwa Areo',
    officerDesignation: 'BD'
  },
  {
    amount: 789545,
    status: 'Deployed',
    requestId: 'Req78872',
    time: '2 minutes ago',
    officerName: 'Muyiwa Areo',
    officerDesignation: 'BD'
  },{
    amount: 789545,
    status: 'Approved',
    requestId: 'Req78872',
    time: '2 minutes ago',
    officerName: 'Muyiwa Areo',
    officerDesignation: 'BD'
  },{
    amount: 789545,
    status: 'Approved',
    requestId: 'Req78872',
    time: '2 minutes ago',
    officerName: 'Muyiwa Areo',
    officerDesignation: 'BD'
  },{
    amount: 789545,
    status: 'Pending',
    requestId: 'Req78872',
    time: '2 minutes ago',
    officerName: 'Muyiwa Areo',
    officerDesignation: 'BD'
  },{
    amount: 789545,
    status: 'Approved',
    requestId: 'Req78872',
    time: '2 minutes ago',
    officerName: 'Muyiwa Areo',
    officerDesignation: 'BD'
  },{
    amount: 789545,
    status: 'Rejected',
    requestId: 'Req78872',
    time: '2 minutes ago',
    officerName: 'Muyiwa Areo',
    officerDesignation: 'BD'
  },{
    amount: 789545,
    status: 'Approved',
    requestId: 'Req78872',
    time: '2 minutes ago',
    officerName: 'Muyiwa Areo',
    officerDesignation: 'BD'
  },
]

status: {[key: string]: string} = {
  Approved: 'bi bi-check2-all text-bg-success p-1 rounded-circle',
  Rejected: 'bi bi-patch-exclamation-fill text-bg-danger p-1 rounded-circle',
  Pending: 'bi bi-arrow-repeat text-bg-primary p-1 rounded-circle',
  Processing: 'bi bi-p-circle-fill text-light-info p-1 rounded-circle',
  Deployed:'bi bi-minecart text-bg-info p-1 rounded-circle'
}

getStatusClass(status:string): string{
  return this.status[status] || '';
}
constructor() {
}
}
