import { DatePipe } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  constructor(
    private datePipe: DatePipe,
    private router: Router,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ){} 

  convertDate(dateString: string): string {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
    }

  async newRequest(data: any){
      this.router.navigate(['/request/new_request'],
        {
          state: {newdata: data}
        }
      )
      console.log('before navigation', data)
      this.dialogRef.close();
    }

  acceptRequest(data: any){
    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(result=> {
      this.dialog.open(PopupComponent, {
        data: data
      })
    })
  }

}
