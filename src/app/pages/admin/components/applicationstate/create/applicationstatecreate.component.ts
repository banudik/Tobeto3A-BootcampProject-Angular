import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApplicationStateInformationService } from '../../../../../features/services/concretes/application-state-information.service';
import { CreateApplicationStateInformationRequest } from '../../../../../features/models/requests/application-state-information/create-application-state-information-request';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ValidationHelper } from '../../../../../core/helpers/validationtoastrmessagehelper';

@Component({
  selector: 'app-applicationstatecreate',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './applicationstatecreate.component.html',
  styleUrl: './applicationstatecreate.component.css'
})
export class ApplicationstatecreateComponent  implements OnInit{

  ApplicationStateForm!:FormGroup

  ngOnInit(): void {
    this.createForm();
  }

  constructor(private formBuilder:FormBuilder,private applicationStateService:ApplicationStateInformationService,
    private router:Router,private change:ChangeDetectorRef,private toastr:ToastrService,private validationHelper:ValidationHelper
  ){}

  createForm(){
    this.ApplicationStateForm=this.formBuilder.group({
      name:["",[Validators.required]]
    })
  }

  add(){
    if(this.ApplicationStateForm.valid){
      let ApplicationStateModel:CreateApplicationStateInformationRequest = Object.assign({},this.ApplicationStateForm.value);
      this.applicationStateService.add(ApplicationStateModel).subscribe({
        //next => observable'dan gelen veri yakaladığımız fonksiyon
        next:(response)=>{
         alert(response.name)
        },
        error:(error)=>{
          this.toastr.error("Application State Could not be added!");
          this.change.markForCheck();
        },
        complete:()=>{
          this.toastr.success("Application state added!");
          this.ApplicationStateForm.reset();
          this.change.markForCheck();

          setTimeout(()=>{
            this.router.navigate(['/adminpanel/applicationstateindex'])
          },2000)
        }
      })
    }}

    onFormSubmit(){
      this.validationHelper.checkValidation(this.ApplicationStateForm);

      if (this.ApplicationStateForm.invalid) {
        this.toastr.error("Invalid inputs");
        return;
      }
    
      this.add();
    }
}
