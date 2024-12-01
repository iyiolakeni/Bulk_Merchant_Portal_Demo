import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppService } from '../app.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiDetailsService } from '../api-details.service';
import { Users } from '../users';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent implements OnInit {

  updateForm: FormGroup = new FormGroup({});
  formValid = false;
  generateRequest: FormGroup = new FormGroup({});
  updateRequest: FormGroup = new FormGroup({});
  requestID = this.data.tabs[0].items[0].value;
  user: any;
  userDetails: Users[] = [];
  selectedOfficerLocation: string = '';
  deployRequest: FormGroup = new FormGroup({});
  

  constructor(
    private popupRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiDetailsService,
    private formBuilder: FormBuilder,
    private sharedService: AppService
  ){}

  ngOnInit(): void {
    this.user = this.sharedService.getUser();
    console.log(this.user);
    
    console.log(this.data.name)
    this.updateForm = this.formBuilder.group({
      status: ['', Validators.required],
      AdditionalNotes: [''],
      ApprovedBy: [this.data.name]
    })

    this.generateRequest = this.formBuilder.group({
      Pos_RequestId: [this.requestID],
      Pos_Accounts: ['', Validators.required],
      PTSP: ['', Validators.required],
      Pos_Model: ['', Validators.required],
      Pos_Processor: ['', Validators.required],
      status: ['Approved']
    })
    
    this.updateRequest = this.formBuilder.group({
      status: ['in_process'],
      ApprovedBy: [this.data.name],
    ApprovedBy2: [this.user.user.firstname +' ' + this.user.user.surname]
    })

    this.deployRequest = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['']
    })

    this.apiService.getAllUsers().subscribe( data => {
      this.userDetails = data.filter((user: any) => user.jobPosition === 'POS Officer').map((user: any) => ({
        location: user.Location,
        name: user.firstname + ' ' + user.surname
      }));
      console.log(this.userDetails)
    })
  }

  updateProcess(){
    let request;
    if (this.updateForm.valid){
      console.log(this.updateForm.value)

      this.apiService.updateRequest(this.requestID, this.updateForm.value).subscribe(
        data => {
          console.log(data);
          request = {
              Pos_RequestId: data.RequestId,
  status: data.status
          }
          this.popupRef.close();
        }, error => {
          console.log(error)
        }
      )
      this.apiService.createPosRequest(request).subscribe(
        result => {
          console.log(result);
        }, error => {
          console.log(error)
        }
      )

    }else{
      this.formValid = true;
    }

  }

  generateSN(){
    console.log(this.requestID)
    if (this.generateRequest.valid)
    {
      console.log(this.generateRequest.value)
      this.apiService.generateSN(this.requestID, this.generateRequest.value).subscribe(
        data => {
          console.log(data);
          this.popupRef.close();
        }, error => {
          console.log(error)
        }
      )
      this.apiService.updateRequest(this.requestID, this.updateRequest.value).subscribe(
        result => {
          console.log(result);
        }, error => {
          console.log(error)
        }
      );
    }
    else{
      console.log(this.generateRequest.errors)
    }
  }

  
  selectedOfficer(){
    const officer = this.userDetails.find(
      user => user['name'] === this.deployRequest.get('name')?.value
    )
    if(officer ){
      console.log('Officer Name: '+this.deployRequest.get('name')?.value)
      this.selectedOfficerLocation = officer['location'];
      this.deployRequest.patchValue({
        location: this.selectedOfficerLocation
      })
      if(this.selectedOfficerLocation === null)
        {
          this.selectedOfficerLocation = 'No Location'
        }
      console.log('Location: ' + this.selectedOfficerLocation)
    }
  }

  deploy(){
    console.log(this.requestID)
    console.log(this.deployRequest.value)
    const form = {
      status: 'Deployed',
      DeliveredBy: this.deployRequest.value.name,
      DeliveryDate: new Date()
    }
    console.log('Form: ', form)
    if (this.deployRequest.valid){
      this.apiService.updateDeliveryStatus(this.requestID, form).subscribe(
        data => {
          console.log(data);
          this.popupRef.close();
        }, error => {
          console.log(error)
        }
      )
  }
}

}
