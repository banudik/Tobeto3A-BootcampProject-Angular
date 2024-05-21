import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { GetByIdApplicationStateInformationResponse } from '../../../../../features/models/responses/application-state-information/get-by-id-application-state-information-response';
import { ApplicationStateInformationService } from '../../../../../features/services/concretes/application-state-information.service';
import { UpdateBootcampStateRequest } from '../../../../../features/models/requests/bootcamp-state/update-bootcamp-state-request';
import { UpdateApplicationStateInformationRequest } from '../../../../../features/models/requests/application-state-information/update-application-state-information-request';
import { ApplicationStateInformationListItemDto } from '../../../../../features/models/responses/application-state-information/application-state-information-list-item-dto';

@Component({
  selector: 'app-applicationstateedit',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './applicationstateedit.component.html',
  styleUrl: './applicationstateedit.component.css'
})
export class ApplicationstateeditComponent  implements OnInit{
  currentApplicationState!:GetByIdApplicationStateInformationResponse;
  ApplicationStateForm!:FormGroup
  formMessage:string | null=null;
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: number; }) => {
      this.getApplicationStateById(params["applicationStateId"])
  })
  }

  constructor(private formBuilder:FormBuilder,private applicationStateService:ApplicationStateInformationService,
    private router:Router,private change:ChangeDetectorRef, private activatedRoute:ActivatedRoute
  ){}

  getApplicationStateById(id:number){
    this.applicationStateService.getById(id).subscribe(
      (response: GetByIdApplicationStateInformationResponse) => {
        this.currentApplicationState = response;
        this.createForm();
        
      },
      (error: any) => {
        console.error('Error fetching applicationState:', error);
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
         console.log(response.name + " Updated");
         (response.name)
        },
        error:(error)=>{
          this.formMessage="güncellenemedi";
          this.change.markForCheck();
        },
        complete:()=>{
          this.formMessage="Başarıyla Güncellendi";
          this.ApplicationStateForm.reset();
          this.change.markForCheck();

          setTimeout(()=>{
            this.router.navigate(['/adminpanel/applicationstateindex'])
          },2000)
        }
      })
    }}

    onFormSubmit(){
      const nameControl = this.ApplicationStateForm.get('name');

      if (nameControl && nameControl.invalid) {
        this.formMessage = "Lütfen gerekli alanları doldurun";
        return;
      }
    
      this.update();
    }
}
