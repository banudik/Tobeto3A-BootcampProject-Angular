import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetByIdAnnouncementResponse } from '../../../../../features/models/responses/announcement/get-by-id-announcement-response';
import { AnnouncementService } from '../../../../../features/services/concretes/announcement.service';

@Component({
  selector: 'app-announcementdetails',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './announcementdetails.component.html',
  styleUrl: './announcementdetails.component.css'
})
export class AnnouncementdetailsComponent implements OnInit{
  currentAnnouncement!:GetByIdAnnouncementResponse;
  isLoading:boolean = true;
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: number; }) => {
      this.getAnnouncementById(params["announcementId"])
  })
  }

  constructor(private announcementService:AnnouncementService,
    private router:Router,private change:ChangeDetectorRef, private activatedRoute:ActivatedRoute, private toastr:ToastrService
  ){}

  getAnnouncementById(id:number){
    this.isLoading = true;
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
    this.isLoading = false;
  }
}
