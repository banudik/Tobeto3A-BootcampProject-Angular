import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CreateBootcampStateRequest } from '../../../../../features/models/requests/bootcamp-state/create-bootcamp-state-request';
import { BootcampStateService } from '../../../../../features/services/concretes/bootcamp-state.service';
import { UpdateBootcampStateRequest } from '../../../../../features/models/requests/bootcamp-state/update-bootcamp-state-request';
import { GetByIdBootcampStateResponse } from '../../../../../features/models/responses/bootcamp-state/get-by-id-bootcamp-state-response';
import { CommonModule } from '@angular/common';
import { ValidationHelper } from '../../../../../core/helpers/validationtoastrmessagehelper';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bootcampstateedit',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './bootcampstateedit.component.html',
  styleUrl: './bootcampstateedit.component.css'
})
export class BootcampstateeditComponent implements OnInit{

  currentBootcampState!:GetByIdBootcampStateResponse;
  BootcampStateForm!:FormGroup

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: number; }) => {
      this.getBootcampStateById(params["bootcampStateId"])
  })
    
  }

  constructor(private formBuilder:FormBuilder,private bootcampStateService:BootcampStateService,
    private router:Router,private change:ChangeDetectorRef, private activatedRoute:ActivatedRoute,private validationhelper:ValidationHelper,private toastr:ToastrService
  ){}

  createForm(){
    this.BootcampStateForm=this.formBuilder.group({
      id:[this.currentBootcampState.id],
      name:[this.currentBootcampState.name,[Validators.required]]
    })
  }

  getBootcampStateById(id:number){
    this.bootcampStateService.getById(id).subscribe(
      (response: GetByIdBootcampStateResponse) => {
        this.currentBootcampState = response;
        this.createForm();
        
      },
      (error: any) => {
        console.error('Error fetching bootcampState:', error);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        this.toastr.error("bootcampstate could not be found!");
        setTimeout(()=>{
          this.router.navigate(['/adminpanel/bootcampstateindex'])
        },2000)
      }
    );

  }

  update(){
    if(this.BootcampStateForm.valid){
      let bootcampStateModel:UpdateBootcampStateRequest = Object.assign({},this.BootcampStateForm.value);
      this.bootcampStateService.update(bootcampStateModel).subscribe({
        //next => observable'dan gelen veri yakaladığımız fonksiyon
        next:(response)=>{
         //console.log(response.name + " Updated");
         //(response.name)
        },
        error:(error)=>{
          this.toastr.error("bootcampstate could not be updated!");
          this.change.markForCheck();
        },
        complete:()=>{
          this.toastr.success("bootcampstate updated successfully");
          this.BootcampStateForm.reset();
          this.change.markForCheck();

          setTimeout(()=>{
            this.router.navigate(['/adminpanel/bootcampstateindex'])
          },2000)
        }
      })
    }}

    onFormSubmit(){
      this.validationhelper.checkValidation(this.BootcampStateForm);

      if (this.BootcampStateForm.invalid) {
        this.toastr.error("Invalid inputs!");
        return;
      }
    
      this.update();
    }
}
