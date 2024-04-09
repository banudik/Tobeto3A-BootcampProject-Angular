import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BootcampService } from '../../../services/concretes/bootcamp.service';
import { GetByIdBootcampResponse } from '../../../models/responses/bootcamp/get-by-id-bootcamp-response';
import { HttpClientModule } from '@angular/common/http';
import { BootcampListGroupComponent } from '../bootcamp-list-group/bootcamp-list-group.component';

@Component({
  selector: 'app-bootcamp-details',
  standalone: true,
  imports: [CommonModule,RouterModule,HttpClientModule,BootcampListGroupComponent],
  templateUrl: './bootcamp-details.component.html',
  styleUrl: './bootcamp-details.component.css'
})
export class BootcampDetailsComponent implements OnInit{


  getByIdBootcampResponse !: GetByIdBootcampResponse
  bootcampId: number = 1;
  // activatedRoute: any;
  // bootcampService: any;

  constructor(private bootcampService: BootcampService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: number; }) => {
      if (params["bootcampId"]) {
        this.getBootcampById(params["bootcampId"])
      } else { console.log("getById bootcamp error") }
    })
  }

  getBootcampById(bootcampId: number): void {
    this.bootcampService.getBootcampById(bootcampId).subscribe(
      (response: GetByIdBootcampResponse) => {
        console.log("geliyor " + response.name);
        this.getByIdBootcampResponse = response;
      },
      (error: any) => {
        console.error('Error fetching bootcamp:', error);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        console.log("getBootcampById error");
      }
    );
  }
}
