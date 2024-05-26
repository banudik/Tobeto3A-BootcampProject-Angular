import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetByIdBlacklistResponse } from '../../../../../features/models/responses/blacklist/get-by-id-blacklist-response';
import { BlacklistService } from '../../../../../features/services/concretes/blacklist.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blacklistdetails',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './blacklistdetails.component.html',
  styleUrl: './blacklistdetails.component.css'
})
export class BlacklistdetailsComponent implements OnInit{
  currenBlacklist!:GetByIdBlacklistResponse;
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: number; }) => {
      this.getBlacklistById(params["blacklistId"])
  })
  }

  constructor(private blacklistService:BlacklistService,
    private router:Router,private change:ChangeDetectorRef, private activatedRoute:ActivatedRoute, private toastr:ToastrService
  ){}

  getBlacklistById(id:number){
    this.blacklistService.getById(id).subscribe(
      (response: GetByIdBlacklistResponse) => {
        this.currenBlacklist = response;
        
      },
      (error: any) => {
        this.toastr.error('Error fetching Blacklist:', error)
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        setTimeout(()=>{
          this.router.navigate(['/adminpanel/blacklistindex'])
        },2000)
      }
    );

  }
}
