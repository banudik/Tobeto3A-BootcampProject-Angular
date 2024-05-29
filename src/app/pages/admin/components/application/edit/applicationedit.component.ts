import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UpdateApplicationInformationRequest } from '../../../../../features/models/requests/application-information/update-application-information-request';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { GetByIdApplicationInformationResponse } from '../../../../../features/models/responses/application-information/get-by-id-application-information-response';
import { ApplicationInformationService } from '../../../../../features/services/concretes/application-information.service';
import { ApplicationStateInformationService } from '../../../../../features/services/concretes/application-state-information.service';
import { ApplicationStateInformationListItemDto } from '../../../../../features/models/responses/application-state-information/application-state-information-list-item-dto';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ValidationHelper } from '../../../../../core/helpers/validationtoastrmessagehelper';

@Component({
  selector: 'app-applicationedit',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './applicationedit.component.html',
  styleUrl: './applicationedit.component.css'
})
export class ApplicationeditComponent   implements OnInit{
  currentApplication!:GetByIdApplicationInformationResponse;
  ApplicationForm!:FormGroup
  applicationStates!:ApplicationStateInformationListItemDto;
  
  ngOnInit(): void {
    this.getApplicationStates();
    this.activatedRoute.params.subscribe((params: { [x: string]: number; }) => {
      this.getApplicationById(params["applicationId"])
  })
  
  }

  constructor(private formBuilder:FormBuilder,private applicationService:ApplicationInformationService,
    private router:Router,private change:ChangeDetectorRef, private activatedRoute:ActivatedRoute , 
    private applicationStateService:ApplicationStateInformationService,private toastr:ToastrService,private validationHelper:ValidationHelper
  ){}

  getApplicationById(id:number){
    this.applicationService.getById(id).subscribe(
      (response: GetByIdApplicationInformationResponse) => {
        this.currentApplication = response;
        
        this.createForm();
        
      },
      (error: any) => {
        this.toastr.error('Error fetching application:', error.details);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        setTimeout(()=>{
          this.router.navigate(['/adminpanel/applicationindex'])
        },2000)
      }
    );
  }

    getApplicationStates(){
      this.applicationStateService.getList({ pageIndex: 0, pageSize: 100000}).subscribe((response)=>{
       this.applicationStates=response;
      })
    }

  createForm(){
    this.ApplicationForm=this.formBuilder.group({
      id:[this.currentApplication.id],
      applicationStateInformationId:[this.currentApplication.applicationStateInformationId,[Validators.required]]
    })
  }

  update(){
    if(this.ApplicationForm.valid){
      let applicationModel:UpdateApplicationInformationRequest = Object.assign({},this.ApplicationForm.value);
      this.applicationService.update(applicationModel).subscribe({
        //next => observable'dan gelen veri yakaladığımız fonksiyon
        next:(response)=>{

        },
        error:(error)=>{
          this.toastr.error('Application could not be updated!');
          this.change.markForCheck();
        },
        complete:()=>{
          this.toastr.success('Application successfully updated');
          this.ApplicationForm.reset();
          this.change.markForCheck();

          setTimeout(()=>{
            this.router.navigate(['/adminpanel/applicationindex'])
          },2000)
        }
      })
    }}

    onFormSubmit(){
      this.validationHelper.checkValidation(this.ApplicationForm);

      if (this.ApplicationForm.invalid) {
        this.toastr.error('Invalid inputs');
        return;
      }
    
      this.update();
    }
}
