import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetByIdBlacklistResponse } from '../../../../../features/models/responses/blacklist/get-by-id-blacklist-response';
import { BlacklistService } from '../../../../../features/services/concretes/blacklist.service';
import { DeletedBlacklistResponse } from '../../../../../features/models/responses/blacklist/deleted-blacklist-response';

@Component({
  selector: 'app-blacklistdelete',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './blacklistdelete.component.html',
  styleUrl: './blacklistdelete.component.css'
})
export class BlacklistdeleteComponent  implements OnInit{
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

  deleteBlacklist(id:number){
    this.blacklistService.delete(id).subscribe(
      (response: DeletedBlacklistResponse) => {
        this.toastr.success("Blacklist Deleted Successfully");
        this.router.navigate(['/adminpanel/blacklistindex'])
      },
      (error: any) => {
        this.toastr.error('Error fetching Announcement:', error);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        setTimeout(()=>{
          this.router.navigate(['/adminpanel/blacklistindex'])
        },1)
      }
    );
  }
}
