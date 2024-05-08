import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) {}

  openModal(data: any) {
    this.dialog.open(ModalComponent, {
      data: data
    });
  }

}
