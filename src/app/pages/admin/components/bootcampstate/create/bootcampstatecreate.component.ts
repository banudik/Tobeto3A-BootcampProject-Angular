import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { BootcampStateService } from '../../../../../features/services/concretes/bootcamp-state.service';
import { Router, RouterModule } from '@angular/router';
import { CreateBootcampStateRequest } from '../../../../../features/models/requests/bootcamp-state/create-bootcamp-state-request';
import { CommonModule } from '@angular/common';
import { ValidationHelper } from '../../../../../core/helpers/validationtoastrmessagehelper';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bootcampstatecreate',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './bootcampstatecreate.component.html',
  styleUrl: './bootcampstatecreate.component.css'
})
export class BootcampstatecreateComponent implements OnInit{

  BootcampStateForm!:FormGroup

  ngOnInit(): void {
    this.createForm();
  }

  constructor(private formBuilder:FormBuilder,private bootcampStateService:BootcampStateService,
    private router:Router,private change:ChangeDetectorRef,private validationHelper:ValidationHelper,private toastr:ToastrService
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
         //alert(response.name)
        },
        error:(error)=>{
          this.toastr.error("Bootcamp State Could not be Added!");
          this.change.markForCheck();
        },
        complete:()=>{
          this.toastr.success("Bootcamp State successfully Added!");
          this.BootcampStateForm.reset();
          this.change.markForCheck();

          setTimeout(()=>{
            this.router.navigate(['/adminpanel/bootcampstateindex'])
          },2000)
        }
      })
    }}

    onFormSubmit(){
      this.validationHelper.checkValidation(this.BootcampStateForm);

      if (this.BootcampStateForm.invalid) {
        this.toastr.error("Invalid inputs!");
        return;
      }
    
      this.add();
    }
}
