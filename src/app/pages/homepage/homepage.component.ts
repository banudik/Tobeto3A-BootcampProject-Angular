import { Component ,OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { GetListBootcampResponse } from '../../Models/Responses/Bootcamp/get-list-bootcamp-response';
import { CommonModule } from '@angular/common';
import { HttpClient } from "@angular/common/http";
import { bootcampResponseModel } from '../../Models/Responses/ResponseModel/bootcampResponseModel';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit{
  apiUrl = "http://localhost:5001/api/Bootcamps/GetAllAsync";
  Bootcamps: GetListBootcampResponse[] = [];


  constructor(private HttpClient: HttpClient) {}

  ngOnInit(): void {
    console.log("asd");
    this.getBootcamps();
  }

   getBootcamps() {
     this.HttpClient.get<bootcampResponseModel>(this.apiUrl).subscribe(
       (response) => {
         this.Bootcamps = response.data;
       }
     );
   }

  // getListBootcamps(){
  //   this.HttpClient.get<bootcampResponseModel[]>(this.apiUrl)
  //   .subscribe({
  //     next:(response:bootcampResponseModel[])=>{
  //       console.log("Cevap geldi :",response);
  //       this.Bootcamps=response;
  //     },
  //     error:(error)=>{console.log("cevap hatalı :",error)},
  //     complete:()=>{console.log("istek sonlandı")}
  //   })
  // }

}
