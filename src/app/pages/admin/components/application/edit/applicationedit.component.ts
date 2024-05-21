import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UpdateApplicationInformationRequest } from '../../../../../features/models/requests/application-information/update-application-information-request';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { GetByIdApplicationInformationResponse } from '../../../../../features/models/responses/application-information/get-by-id-application-information-response';
import { ApplicationInformationService } from '../../../../../features/services/concretes/application-information.service';
import { ApplicationStateInformationService } from '../../../../../features/services/concretes/application-state-information.service';
import { ApplicationStateInformationListItemDto } from '../../../../../features/models/responses/application-state-information/application-state-information-list-item-dto';
import { CommonModule } from '@angular/common';

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
  formMessage:string | null=null;
  applicationStates!:ApplicationStateInformationListItemDto;
  
  ngOnInit(): void {
    this.getApplicationStates();
    this.activatedRoute.params.subscribe((params: { [x: string]: number; }) => {
      this.getApplicationById(params["applicationId"])
  })
  
  }

  constructor(private formBuilder:FormBuilder,private applicationService:ApplicationInformationService,
    private router:Router,private change:ChangeDetectorRef, private activatedRoute:ActivatedRoute , 
    private applicationStateService:ApplicationStateInformationService
  ){}

  getApplicationById(id:number){
    this.applicationService.getById(id).subscribe(
      (response: GetByIdApplicationInformationResponse) => {
        this.currentApplication = response;
        
        this.createForm();
        
      },
      (error: any) => {
        console.error('Error fetching application:', error);
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
         console.log("Application Updated");
         (response.id)
        },
        error:(error)=>{
          this.formMessage="güncellenemedi";
          this.change.markForCheck();
        },
        complete:()=>{
          this.formMessage="Başarıyla Güncellendi";
          this.ApplicationForm.reset();
          this.change.markForCheck();

          setTimeout(()=>{
            this.router.navigate(['/adminpanel/applicationindex'])
          },2000)
        }
      })
    }}

    onFormSubmit(){
      const nameControl = this.ApplicationForm.get('name');

      if (nameControl && nameControl.invalid) {
        this.formMessage = "Lütfen gerekli alanları doldurun";
        return;
      }
    
      this.update();
    }
}
