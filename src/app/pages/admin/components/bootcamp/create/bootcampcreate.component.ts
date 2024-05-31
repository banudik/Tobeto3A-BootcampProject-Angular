import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CreateBootcampRequest } from '../../../../../features/models/requests/bootcamp/create-bootcamp-request';
import { BootcampService } from '../../../../../features/services/concretes/bootcamp.service';
import { BootcampStateService } from '../../../../../features/services/concretes/bootcamp-state.service';
import { InstructorService } from '../../../../../features/services/concretes/instructor.service';
import { InstructorListItemDto } from '../../../../../features/models/responses/instructor/instructor-list-item-dto';
import { BootcampStateListItemDto } from '../../../../../features/models/responses/bootcamp-state/bootcampstate-list-item-dto';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { GetListBootcampStateResponse } from '../../../../../features/models/responses/bootcamp-state/get-list-bootcamp-state-response';
import { GetListInstructorResponse } from '../../../../../features/models/responses/instructor/get-list-instructor-response';
import { ValidationHelper } from '../../../../../core/helpers/validationtoastrmessagehelper';

@Component({
  selector: 'app-bootcampcreate',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './bootcampcreate.component.html',
  styleUrl: './bootcampcreate.component.css'
})
export class BootcampcreateComponent  implements OnInit{

  BootcampForm!:FormGroup
  instructors!:GetListInstructorResponse[];
  bootcampStates!:GetListBootcampStateResponse[];
  isloading:boolean = true;

  ngOnInit(): void {
    this.getInstructors();
    this.getBootcampStates();
    this.createForm();
  }

  constructor(private formBuilder:FormBuilder,private bootcampService:BootcampService,
    private router:Router,private change:ChangeDetectorRef, private bootcampStateService:BootcampStateService
    , private instructorService:InstructorService,private toastr:ToastrService,private validationHelper:ValidationHelper
  ){}

  createForm(){
    this.BootcampForm=this.formBuilder.group({
      name:['',[Validators.required]],
      instructorId:["",[Validators.required]],
      startDate:["",[Validators.required]],
      endDate:["",[Validators.required]],
      file:["",[Validators.required]],
      description:["",[Validators.required]],
      bootcampStateId:["",[Validators.required]],
    })
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.BootcampForm?.get('file')?.setValue(file);
  }

  getInstructors(){
    this.isloading = true;
    this.instructorService.GetListAll().subscribe((response)=>{
     this.instructors=response.items;
     this.isloading = false;
    })
 }

 getBootcampStates(){
  this.isloading = true;
  this.bootcampStateService.getList({ pageIndex: 0, pageSize: 100000}).subscribe((response)=>{
   this.bootcampStates=response.items;
   this.isloading = false;
  })
}

  add(){
    if(this.BootcampForm.valid){
      let bootcampModel:CreateBootcampRequest = Object.assign({},this.BootcampForm.value);
      
      let formData = new FormData();
      formData.append('name', bootcampModel.name);
      formData.append('instructorId', bootcampModel.instructorId);
      formData.append('startDate', bootcampModel.startDate.toString());
      formData.append('endDate', bootcampModel.endDate.toString());
      formData.append('file', bootcampModel.file);
      formData.append('description', bootcampModel.description);
      formData.append('bootcampStateId', bootcampModel.bootcampStateId.toString());

      this.bootcampService.add(formData).subscribe({
        //next => observable'dan gelen veri yakaladığımız fonksiyon
        next:(response)=>{
        },
        error:(error)=>{
          this.toastr.error("Failed to add: " +error.message);
          this.change.markForCheck();
        },
        complete:()=>{
          this.toastr.success("Succesfully added!");
          this.BootcampForm.reset();
          this.change.markForCheck();

          setTimeout(()=>{
            this.router.navigate(['/adminpanel/bootcampindex'])
          },2000)
        }
      })
    }}

    onFormSubmit(){
      this.validationHelper.checkValidation(this.BootcampForm);

      if (this.BootcampForm.invalid) {
        this.toastr.error("Invalid inputs!");
        return;
      }
    
      this.add();
    }
  }
