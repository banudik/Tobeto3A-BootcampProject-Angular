import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApplicationStateInformationService } from '../../../../../features/services/concretes/application-state-information.service';
import { CreateApplicationStateInformationRequest } from '../../../../../features/models/requests/application-state-information/create-application-state-information-request';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-applicationstatecreate',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './applicationstatecreate.component.html',
  styleUrl: './applicationstatecreate.component.css'
})
export class ApplicationstatecreateComponent  implements OnInit{

  ApplicationStateForm!:FormGroup
  formMessage:string | null=null;

  ngOnInit(): void {
    this.createForm();
  }

  constructor(private formBuilder:FormBuilder,private applicationStateService:ApplicationStateInformationService,
    private router:Router,private change:ChangeDetectorRef
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
          this.formMessage="Eklenemedi";
          this.change.markForCheck();
        },
        complete:()=>{
          this.formMessage="Başarıyla Eklendi";
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
    
      this.add();
    }
}
