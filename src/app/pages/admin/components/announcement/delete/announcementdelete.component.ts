import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetByIdAnnouncementResponse } from '../../../../../features/models/responses/announcement/get-by-id-announcement-response';
import { AnnouncementService } from '../../../../../features/services/concretes/announcement.service';
import { CommonModule } from '@angular/common';
import { DeletedAnnouncementResponse } from '../../../../../features/models/responses/announcement/deleted-announcement-response';

@Component({
  selector: 'app-announcementdelete',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './announcementdelete.component.html',
  styleUrl: './announcementdelete.component.css'
})
export class AnnouncementdeleteComponent implements OnInit{
  currentAnnouncement!:GetByIdAnnouncementResponse;
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: number; }) => {
      this.getAnnouncementById(params["announcementId"])
  })
  }

  constructor(private announcementService:AnnouncementService,
    private router:Router,private change:ChangeDetectorRef, private activatedRoute:ActivatedRoute, private toastr:ToastrService
  ){}

  getAnnouncementById(id:number){
    this.announcementService.getByAnoouncementId(id).subscribe(
      (response: GetByIdAnnouncementResponse) => {
        this.currentAnnouncement = response;
        
      },
      (error: any) => {
        this.toastr.error('Error fetching Announcement:', error)
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        setTimeout(()=>{
          this.router.navigate(['/adminpanel/announcementindex'])
        },2000)
      }
    );

  }

  deleteAnnouncement(id:number){
    this.announcementService.delete(id).subscribe(
      (response: DeletedAnnouncementResponse) => {
        this.toastr.success("Announcement Deleted Successfully");
        this.router.navigate(['/adminpanel/announcementindex'])
      },
      (error: any) => {
        this.toastr.error('Error fetching Announcement:', error);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        setTimeout(()=>{
          this.router.navigate(['/adminpanel/announcementindex'])
        },1)
      }
    );
  }
}