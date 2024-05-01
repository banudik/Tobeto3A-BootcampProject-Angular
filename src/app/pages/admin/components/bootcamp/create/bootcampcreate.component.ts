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

@Component({
  selector: 'app-bootcampcreate',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './bootcampcreate.component.html',
  styleUrl: './bootcampcreate.component.css'
})
export class BootcampcreateComponent  implements OnInit{

  BootcampForm!:FormGroup
  formMessage:string | null=null;
  instructors!:InstructorListItemDto;
  bootcampStates!:BootcampStateListItemDto;

  ngOnInit(): void {
    this.getInstructors();
    this.getBootcampStates();
    this.createForm();
  }

  constructor(private formBuilder:FormBuilder,private bootcampService:BootcampService,
    private router:Router,private change:ChangeDetectorRef, private bootcampStateService:BootcampStateService
    , private instructorService:InstructorService
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
    this.instructorService.GetListAll().subscribe((response)=>{
     this.instructors=response;
    })
 }

 getBootcampStates(){
  this.bootcampStateService.getList({ page: 0, pageSize: 100000}).subscribe((response)=>{
   this.bootcampStates=response;
  })
}

  add(){
    if(this.BootcampForm.valid){
      let bootcampModel:CreateBootcampRequest = Object.assign({},this.BootcampForm.value);
      console.log(bootcampModel.file);
      //console.log(fileInput);
      
      
      let formData = new FormData();
      formData.append('name', bootcampModel.name);
      formData.append('instructorId', bootcampModel.instructorId);
      formData.append('startDate', bootcampModel.startDate.toString());
      formData.append('endDate', bootcampModel.endDate.toString());
      formData.append('file', bootcampModel.file);
      formData.append('description', bootcampModel.description);
      formData.append('bootcampStateId', bootcampModel.bootcampStateId.toString());
      console.log(formData.get('file'));
      
      this.bootcampService.add(formData).subscribe({
        //next => observable'dan gelen veri yakaladığımız fonksiyon
        next:(response)=>{
         alert(response.name)
        },
        error:(error)=>{
          console.log(bootcampModel);
          
          this.formMessage="Eklenemedi" + error.message;
          this.change.markForCheck();
        },
        complete:()=>{
          this.formMessage="Başarıyla Eklendi";
          this.BootcampForm.reset();
          this.change.markForCheck();

          setTimeout(()=>{
            this.router.navigate(['/adminpanel/bootcampindex'])
          },2000)
        }
      })
    }}

    onFormSubmit(){
      const nameControl = this.BootcampForm.get('name');

      if (nameControl && nameControl.invalid) {
        this.formMessage = "Lütfen gerekli alanları doldurun";
        return;
      }
    
      this.add();
    }
  }
