import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { UpdateBootcampRequest } from '../../../../../features/models/requests/bootcamp/update-bootcamp-request';
import { GetByIdBootcampResponse } from '../../../../../features/models/responses/bootcamp/get-by-id-bootcamp-response';
import { BootcampService } from '../../../../../features/services/concretes/bootcamp.service';
import { InstructorService } from '../../../../../features/services/concretes/instructor.service';
import { BootcampStateService } from '../../../../../features/services/concretes/bootcamp-state.service';
import { BootcampStateListItemDto } from '../../../../../features/models/responses/bootcamp-state/bootcampstate-list-item-dto';
import { InstructorListItemDto } from '../../../../../features/models/responses/instructor/instructor-list-item-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bootcampedit',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './bootcampedit.component.html',
  styleUrl: './bootcampedit.component.css'
})
export class BootcampeditComponent  implements OnInit{

  currentBootcamp!:GetByIdBootcampResponse;
  BootcampUpdateForm!:FormGroup
  formMessage:string | null=null;
  instructors!:InstructorListItemDto;
  bootcampStates!:BootcampStateListItemDto;

  ngOnInit(): void {
    this.getInstructors();
    this.getBootcampStates();
    this.activatedRoute.params.subscribe((params: { [x: string]: number; }) => {
      this.getBootcampById(params["bootcampId"])
  })
    
  }

  constructor(private formBuilder:FormBuilder,private bootcampService:BootcampService,
    private router:Router,private change:ChangeDetectorRef, private activatedRoute:ActivatedRoute, private bootcampStateService:BootcampStateService
    , private instructorService:InstructorService
  ){}

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

onFileChange(event: any) {
  const file = event.target.files[0];
  this.BootcampUpdateForm?.get('file')?.setValue(file);
  console.log(this.BootcampUpdateForm.value.file);
}

createForm(){
    this.BootcampUpdateForm=this.formBuilder.group({
      id:[this.currentBootcamp.id],
      name:[this.currentBootcamp.name],
      instructorId:[this.currentBootcamp.instructorId],
      startDate:[this.currentBootcamp.startDate],
      endDate:[this.currentBootcamp.endDate],
      file:[File],
      description:[this.currentBootcamp.description],
      bootcampStateId:[this.currentBootcamp.bootcampStateId],
    })
}

  getBootcampById(id:number){
    this.bootcampService.getBootcampById(id).subscribe(
      (response: GetByIdBootcampResponse) => {
        this.currentBootcamp = response;
        console.log(this.currentBootcamp.name + " " + this.currentBootcamp.id);
        this.createForm();
        
      },
      (error: any) => {
        console.error('Error fetching bootcamp:', error);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        this.formMessage="bootcamp could not be found!";
        setTimeout(()=>{
          this.router.navigate(['/adminpanel/bootcampindex'])
        },2000)
      }
    );

  }

  update(){
    if(this.BootcampUpdateForm.valid){
      let bootcampModel:UpdateBootcampRequest = Object.assign({},this.BootcampUpdateForm.value);
      console.log(bootcampModel.file);
      
      let formData = new FormData();
      formData.append('id', bootcampModel.id.toString());
      formData.append('name', bootcampModel.name);
      formData.append('instructorId', bootcampModel.instructorId);
      formData.append('startDate', bootcampModel.startDate.toString());
      formData.append('endDate', bootcampModel.endDate.toString());
      formData.append('file', bootcampModel.file,);
      formData.append('description', bootcampModel.description);
      formData.append('bootcampStateId', bootcampModel.bootcampStateId.toString());



      
      this.bootcampService.update(formData).subscribe({
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
          this.BootcampUpdateForm.reset();
          this.change.markForCheck();

          setTimeout(()=>{
            this.router.navigate(['/adminpanel/bootcampindex'])
          },2000)
        }
      })
    }}

    onFormSubmit(){
      const nameControl = this.BootcampUpdateForm.get('name');

      if (nameControl && nameControl.invalid) {
        this.formMessage = "Lütfen gerekli alanları doldurun";
        return;
      }
    
      this.update();
    }
}
