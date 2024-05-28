import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { GetByIdApplicantResponse } from '../../../../../features/models/responses/applicant/get-by-id-applicant-response';
import { ApplicantService } from '../../../../../features/services/concretes/applicant.service';
import { BlacklistService } from '../../../../../features/services/concretes/blacklist.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateBlacklistRequest } from '../../../../../features/models/requests/blacklist/create-blacklist-request';
import { ToastrService } from 'ngx-toastr';
import { ValidationHelper } from '../../../../../core/helpers/validationtoastrmessagehelper';

@Component({
  selector: 'app-applicantblacklist',
  standalone: true,
  imports: [RouterModule,CommonModule,ReactiveFormsModule],
  templateUrl: './applicantblacklist.component.html',
  styleUrl: './applicantblacklist.component.css'
})
export class ApplicantblacklistComponent implements OnInit{
  currentApplicant!:GetByIdApplicantResponse;
  BlacklistForm!:FormGroup;
  isLoading: boolean = false;
  
  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params: { [x: string]: string; }) => {
      this.getApplicantById(params["applicantId"])
  })
  }

  constructor(private applicantService:ApplicantService,
    private router:Router,private change:ChangeDetectorRef, private activatedRoute:ActivatedRoute, private blacklistService:BlacklistService, private formBuilder:FormBuilder,private toastr:ToastrService,private validationHelper:ValidationHelper
  ){}

  getApplicantById(id:string){
    this.isLoading = true;
    this.applicantService.getApplicantById(id).subscribe(
      (response: GetByIdApplicantResponse) => {
        this.currentApplicant = response;
        this.createForm();
        this.isLoading = false;
      },
      (error: any) => {
        this.toastr.error('Error fetching applicant:', error.details);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        setTimeout(()=>{
          this.router.navigate(['/adminpanel/applicantindex'])
        },2000)
      }
    );

  }

  createForm(){
    this.BlacklistForm=this.formBuilder.group({
      applicantId:[this.currentApplicant.id,[Validators.required]],
      reason:["",[Validators.required]],
      date:["",[Validators.required]]
    })
  }

  add(){
    
    if(this.BlacklistForm.valid){
      let blacklistModel:CreateBlacklistRequest = Object.assign({},this.BlacklistForm.value);
      this.blacklistService.blackListApplicant(blacklistModel).subscribe({
        //next => observable'dan gelen veri yakaladığımız fonksiyon
        next:(response)=>{
          
         
        },
        error:(error)=>{
          this.toastr.error("Error while")
          this.change.markForCheck();
        },
        complete:()=>{
          this.toastr.success(this.currentApplicant.firstName +" "+this.currentApplicant.lastName+" is blaclisted until "+ blacklistModel.date )
          this.BlacklistForm.reset();
          this.change.markForCheck();

          setTimeout(()=>{
            this.router.navigate(['/adminpanel/applicantindex'])
          },2000)
        }
      })
    }
  }

  onFormSubmit(){
    this.validationHelper.checkValidation(this.BlacklistForm);

    if (this.BlacklistForm.invalid) {
      this.toastr.error( "Invalid inputs");
      return;
    }
  
    this.add();
  }
}
