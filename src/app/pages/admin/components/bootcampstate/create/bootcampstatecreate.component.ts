import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { BootcampStateService } from '../../../../../features/services/concretes/bootcamp-state.service';
import { Router, RouterModule } from '@angular/router';
import { CreateBootcampStateRequest } from '../../../../../features/models/requests/bootcamp-state/create-bootcamp-state-request';

@Component({
  selector: 'app-bootcampstatecreate',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './bootcampstatecreate.component.html',
  styleUrl: './bootcampstatecreate.component.css'
})
export class BootcampstatecreateComponent implements OnInit{

  BootcampStateForm!:FormGroup
  formMessage:string | null=null;

  ngOnInit(): void {
    this.createForm();
  }

  constructor(private formBuilder:FormBuilder,private bootcampStateService:BootcampStateService,
    private router:Router,private change:ChangeDetectorRef
  ){}

  createForm(){
    this.BootcampStateForm=this.formBuilder.group({
      name:["",[Validators.required]]
    })
  }

  add(){
    if(this.BootcampStateForm.valid){
      let bootcampStateModel:CreateBootcampStateRequest = Object.assign({},this.BootcampStateForm.value);
      this.bootcampStateService.add(bootcampStateModel).subscribe({
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
          this.BootcampStateForm.reset();
          this.change.markForCheck();

          setTimeout(()=>{
            this.router.navigate(['/adminpanel/bootcampstateindex'])
          },2000)
        }
      })
    }}

    onFormSubmit(){
      const nameControl = this.BootcampStateForm.get('name');

      if (nameControl && nameControl.invalid) {
        this.formMessage = "Lütfen gerekli alanları doldurun";
        return;
      }
    
      this.add();
    }
}
