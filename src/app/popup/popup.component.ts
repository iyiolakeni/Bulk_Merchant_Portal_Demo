import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppService } from '../app.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent implements OnInit {

  updateForm: FormGroup = new FormGroup({});
  formValid = false;

  constructor(
    private popupRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sharedService: AppService,
    private formBuilder: FormBuilder
  ){}
// const user: any;

  ngOnInit(): void {
    // console.log(this.data.user)
    this.updateForm = this.formBuilder.group({
      status: ['', Validators.required],
      AdditionalNotes: ['', Validators.required]
    })
  }

  updateProcess(){
    if (this.updateForm.valid){
      console.log(this.updateForm.value)
    }else{
      this.formValid = true;
    }

  }
}
