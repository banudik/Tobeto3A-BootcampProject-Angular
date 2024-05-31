import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { GetByIdApplicationStateInformationResponse } from '../../../../../features/models/responses/application-state-information/get-by-id-application-state-information-response';
import { ApplicationStateInformationService } from '../../../../../features/services/concretes/application-state-information.service';
import { UpdateBootcampStateRequest } from '../../../../../features/models/requests/bootcamp-state/update-bootcamp-state-request';
import { UpdateApplicationStateInformationRequest } from '../../../../../features/models/requests/application-state-information/update-application-state-information-request';
import { ApplicationStateInformationListItemDto } from '../../../../../features/models/responses/application-state-information/application-state-information-list-item-dto';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ValidationHelper } from '../../../../../core/helpers/validationtoastrmessagehelper';

@Component({
  selector: 'app-applicationstateedit',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './applicationstateedit.component.html',
  styleUrl: './applicationstateedit.component.css'
})
export class ApplicationstateeditComponent  implements OnInit{
  currentApplicationState!:GetByIdApplicationStateInformationResponse;
  ApplicationStateForm!:FormGroup
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: number; }) => {
      this.getApplicationStateById(params["applicationStateId"])
  })
  }

  constructor(private formBuilder:FormBuilder,private applicationStateService:ApplicationStateInformationService,
    private router:Router,private change:ChangeDetectorRef, private activatedRoute:ActivatedRoute,private toastr:ToastrService,private validationHelper:ValidationHelper
  ){}

  getApplicationStateById(id:number){
    this.applicationStateService.getById(id).subscribe(
      (response: GetByIdApplicationStateInformationResponse) => {
        this.currentApplicationState = response;
        this.createForm();
        
      },
      (error: any) => {
        this.toastr.error('Error fetching applicationState:', error.details);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        setTimeout(()=>{
          this.router.navigate(['/adminpanel/applicationstateindex'])
        },2000)
      }
    );

  }
  

  createForm(){
    this.ApplicationStateForm=this.formBuilder.group({
      id:[this.currentApplicationState.id],
      name:[this.currentApplicationState.name,[Validators.required]]
    })
  }

  update(){
    if(this.ApplicationStateForm.valid){
      let applicationStateModel:UpdateApplicationStateInformationRequest = Object.assign({},this.ApplicationStateForm.value);
      this.applicationStateService.update(applicationStateModel).subscribe({
        //next => observable'dan gelen veri yakaladığımız fonksiyon
        next:(response)=>{

        },
        error:(error)=>{
          this.toastr.error('Application State could not be updated');
          this.change.markForCheck();
        },
        complete:()=>{
          this.toastr.success('Application State successfully updated');
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
        this.toastr.error('Invalid inputs');
        return;
      }
    
      this.update();
    }
}
