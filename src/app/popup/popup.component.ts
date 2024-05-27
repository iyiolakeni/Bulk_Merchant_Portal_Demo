import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppService } from '../app.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiDetailsService } from '../api-details.service';

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
    private apiService: ApiDetailsService,
    private formBuilder: FormBuilder
  ){}
// const user: any;

  ngOnInit(): void {
    
    console.log(this.data.name)
    this.updateForm = this.formBuilder.group({
      status: ['', Validators.required],
      AdditionalNotes: ['', Validators.required],
      ApprovedBy: [this.data.name]
    })
  }

  updateProcess(){
    if (this.updateForm.valid){
      console.log(this.updateForm.value)
      const requestID = this.data.tabs[0].items[0].value;

      this.apiService.approveRequest(requestID, this.updateForm.value).subscribe(
        data => {
          console.log(data);
          this.popupRef.close()
        }, error => {
          console.log(error)
        }
      )

    }else{
      this.formValid = true;
    }

  }
}
