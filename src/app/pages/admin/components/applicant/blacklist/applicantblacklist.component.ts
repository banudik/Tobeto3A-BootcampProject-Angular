import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { GetByIdApplicantResponse } from '../../../../../features/models/responses/applicant/get-by-id-applicant-response';
import { ApplicantService } from '../../../../../features/services/concretes/applicant.service';
import { BlacklistService } from '../../../../../features/services/concretes/blacklist.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateBlacklistRequest } from '../../../../../features/models/requests/blacklist/create-blacklist-request';

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
  formMessage:string | null=null;
  isLoading: boolean = false;
  
  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params: { [x: string]: string; }) => {
      this.getApplicantById(params["applicantId"])
  })
  }

  constructor(private applicantService:ApplicantService,
    private router:Router,private change:ChangeDetectorRef, private activatedRoute:ActivatedRoute, private blacklistService:BlacklistService, private formBuilder:FormBuilder
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
        console.error('Error fetching applicant:', error);
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
      console.log("giriyor");
      
      let blacklistModel:CreateBlacklistRequest = Object.assign({},this.BlacklistForm.value);
      this.blacklistService.blackListApplicant(blacklistModel).subscribe({
        //next => observable'dan gelen veri yakaladığımız fonksiyon
        next:(response)=>{
          
         alert(this.currentApplicant.firstName +" "+this.currentApplicant.lastName+" is blaclisted until "+ blacklistModel.date )
        },
        error:(error)=>{
          this.formMessage="Eklenemedi";
          this.change.markForCheck();
        },
        complete:()=>{
          this.formMessage="Başarıyla Eklendi";
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
    const nameControl = this.BlacklistForm.get('reason');

    if (nameControl && nameControl.invalid) {
      this.formMessage = "Lütfen gerekli alanları doldurun";
      return;
    }
  
    this.add();
  }
}
