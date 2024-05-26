import { Component, OnInit } from '@angular/core';
import { GetByIdUserResponse } from '../../../../../../features/models/responses/users/get-by-id-user-response';
import { UserService } from '../../../../../../features/services/concretes/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userdetails',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.css'
})
export class UserdetailsComponent  implements OnInit{
  currentUser!:GetByIdUserResponse;
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: string; }) => {
      this.getUserById(params["userId"])
  })
  }

  constructor(private userService:UserService,
    private router:Router, private activatedRoute:ActivatedRoute
  ){}

  getUserById(id:string){
    this.userService.getByUserId(id).subscribe(
      (response: GetByIdUserResponse) => {
        this.currentUser = response;
        console.log(this.currentUser);
        
      },
      (error: any) => {
        console.error('Error fetching User:', error);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        setTimeout(()=>{
          this.router.navigate(['/adminpanel/'])
        },2000)
      }
    );

  }
}
