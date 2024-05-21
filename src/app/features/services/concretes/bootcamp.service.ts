import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BootcampBaseService } from '../abstracts/bootcamp-base.service';
import { GetListBootcampResponse } from '../../models/responses/bootcamp/get-list-bootcamp-response';
import { GetByIdBootcampResponse } from '../../models/responses/bootcamp/get-by-id-bootcamp-response';
import { environment } from '../../../../environments/environment';
import { BootcampListItemDto } from '../../models/responses/bootcamp/bootcamp-list-item-dto';
import { PageRequest } from '../../../core/models/page-request';
import { CreateBootcampRequest } from '../../models/requests/bootcamp/create-bootcamp-request';
import { UpdateBootcampRequest } from '../../models/requests/bootcamp/update-bootcamp-request';
import { CreatedBootcampResponse } from '../../models/responses/bootcamp/created-bootcamp-response';
import { DeletedBootcampResponse } from '../../models/responses/bootcamp/deleted-bootcamp-response';
import { UpdatedBootcampResponse } from '../../models/responses/bootcamp/updated-bootcamp-response';

@Injectable({
  providedIn: 'root'
})
export class BootcampService extends BootcampBaseService {
  
  private readonly apiUrl:string = `${environment.API_URL}/bootcamps`

  
  constructor(private httpClient:HttpClient) {super() }


  override add(request: FormData): Observable<CreatedBootcampResponse> {
    return this.httpClient.post<CreatedBootcampResponse>(this.apiUrl,request);
  }


  override update(request: FormData): Observable<UpdatedBootcampResponse> {
    return this.httpClient.put<UpdatedBootcampResponse>(this.apiUrl,request);
  }


  override delete(id: number): Observable<DeletedBootcampResponse> {
    return this.httpClient.delete<DeletedBootcampResponse>(`${this.apiUrl}/`+id)
  }



  override getBootcampById(bootcampId: number): Observable<GetByIdBootcampResponse> {
    const newRequest: {[key: string]: string | number} = {
      id: bootcampId
    };
  
    return this.httpClient.get<GetByIdBootcampResponse>(`${this.apiUrl}/${bootcampId}`, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: GetByIdBootcampResponse = {
          id: response.id,
          name: response.name,
          instructorId: response.instructorId,
          instructorFirstName: response.instructorFirstName,
          instructorLastName: response.instructorLastName,
          startDate: response.startDate,
          description: response.description,
          endDate: response.endDate,
          bootcampStateId: response.bootcampStateId,
          bootcampStateName: response.bootcampStateName,
          bootcampImageId: response.bootcampImageId,
          bootcampImageImagePath: response.bootcampImageImagePath
        };
        return newResponse;
      })
    );
  }


  override getList(pageRequest: PageRequest): Observable<BootcampListItemDto> {
    const newRequest: {[key: string]: string | number} = {
      pageIndex: pageRequest.pageIndex,
      pageSize: pageRequest.pageSize
    };

    return this.httpClient.get<BootcampListItemDto>(this.apiUrl, {
      params: newRequest
    }).pipe(
      map((response)=>{
        const newResponse:BootcampListItemDto={
          index:pageRequest.pageIndex,
          size:pageRequest.pageSize,
          count:response.count,
          hasNext:response.hasNext,
          hasPrevious:response.hasPrevious,
          items:response.items,
          pages:response.pages
        };
        
        return newResponse;
      })
    )
  }

  override getListByBootcampNameSearch(pageRequest: PageRequest,search:string,instructorId:string): Observable<BootcampListItemDto> {
    const newRequest: {[key: string]: string | number} = {
      pageIndex: pageRequest.pageIndex,
      pageSize: pageRequest.pageSize,
      search: search,
      instructorId: instructorId
    };

    return this.httpClient.get<BootcampListItemDto>(`${this.apiUrl}/getbootcampListByBootcampNameSearch`, {
      params: newRequest
    }).pipe(
      map((response)=>{
        const newResponse:BootcampListItemDto={
          index:pageRequest.pageIndex,
          size:pageRequest.pageSize,
          count:response.count,
          hasNext:response.hasNext,
          hasPrevious:response.hasPrevious,
          items:response.items,
          pages:response.pages
        };
        
        return newResponse;
      })
    )
  }
  

   override getBootcampListByInstructorId(pageRequest: PageRequest, instructorId: string): Observable<BootcampListItemDto> {
    const newRequest: {[key: string]: string | number} = {
      pageIndex: pageRequest.pageIndex,
      pageSize: pageRequest.pageSize,
      instructorId: instructorId,
    };
  
    return this.httpClient.get<BootcampListItemDto>(`${this.apiUrl}/getbootcampbyinstructorid`, {
      params: newRequest
    }).pipe(
      map((response)=>{
        const newResponse:BootcampListItemDto={
          index:pageRequest.pageIndex,
          size:pageRequest.pageSize,
          count:response.count,
          hasNext:response.hasNext,
          hasPrevious:response.hasPrevious,
          items:response.items,
          pages:response.pages

        };
        return newResponse;
      })
      )
    }
}


