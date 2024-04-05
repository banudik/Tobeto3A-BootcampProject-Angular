import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BootcampBaseService } from '../abstracts/bootcamp-base.service';
import { GetListBootcampResponse } from '../../models/responses/bootcamp/get-list-bootcamp-response';
import { GetByIdBootcampResponse } from '../../models/responses/bootcamp/get-by-id-bootcamp-response';
import { environment } from '../../../../environments/environment';
import { BootcampListItemDto } from '../../models/responses/bootcamp/bootcamp-list-item-dto';
import { PageRequest } from '../../../core/models/page-request';

@Injectable({
  providedIn: 'root'
})
export class BootcampService extends BootcampBaseService {
  private readonly apiUrl:string = `${environment.API_URL}/bootcamps`

  
  constructor(private httpClient:HttpClient) {super() }


  override getList(pageRequest: PageRequest): Observable<BootcampListItemDto> {
    const newRequest: {[key: string]: string | number} = {
      page: pageRequest.page,
      pageSize: pageRequest.pageSize
    };

    return this.httpClient.get<BootcampListItemDto>(this.apiUrl, {
      params: newRequest
    }).pipe(
      map((response)=>{
        const newResponse:BootcampListItemDto={
          index:pageRequest.page,
          size:pageRequest.pageSize,
          count:response.count,
          hasNext:response.hasNext,
          hasPrevious:response.hasPrevious,
          items:response.items,
<<<<<<< HEAD
          pages:response.pages,
        
=======
          pages:response.pages
>>>>>>> 4fdfc8b74e336b5211824f8eea93dacfa9817e30
        };
        return newResponse;
      })
    )
  }
  

   override getBootcampListByInstructorId(pageRequest: PageRequest, instructorId: string): Observable<BootcampListItemDto> {
    const newRequest: {[key: string]: string | number} = {
      page: pageRequest.page,
      pageSize: pageRequest.pageSize,
      instructorId: instructorId,
<<<<<<< HEAD
      
=======
>>>>>>> 4fdfc8b74e336b5211824f8eea93dacfa9817e30
    };
  
    return this.httpClient.get<BootcampListItemDto>(`${this.apiUrl}/getbootcampbyinstructorid`, {
      params: newRequest
    }).pipe(
      map((response)=>{
        const newResponse:BootcampListItemDto={
          index:pageRequest.page,
          size:pageRequest.pageSize,
          count:response.count,
          hasNext:response.hasNext,
          hasPrevious:response.hasPrevious,
          items:response.items,
<<<<<<< HEAD
          pages:response.pages,
          
=======
          pages:response.pages

>>>>>>> 4fdfc8b74e336b5211824f8eea93dacfa9817e30
        };
        return newResponse;
      })
      )
    }
}


