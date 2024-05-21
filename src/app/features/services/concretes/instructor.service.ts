import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { InstructorBaseService } from '../abstracts/instructor-base.service';
import { GetListInstructorResponse } from '../../models/responses/instructor/get-list-instructor-response';
import { GetByIdInstructorResponse } from '../../models/responses/instructor/get-by-id-instructor-response';
import { environment } from '../../../../environments/environment.development';
import { InstructorListItemDto } from '../../models/responses/instructor/instructor-list-item-dto';
import { PageRequest } from '../../../core/models/page-request';
import { BootcampListItemDto } from '../../models/responses/bootcamp/bootcamp-list-item-dto';
import { UpdateInstructorRequest } from '../../models/requests/instructor/update-instructor-request';
import { DeletedInstructorResponse } from '../../models/responses/instructor/deleted-instructor-response';
import { UpdatedInstructorResponse } from '../../models/responses/instructor/updated-instructor-response';

@Injectable({
  providedIn: 'root'
})
export class InstructorService extends InstructorBaseService {




  private readonly apiUrl:string = `${environment.API_URL}/instructors`
  apiGetByIdUrl=""
  constructor(private httpClient:HttpClient) {super() }

  override delete(id: string): Observable<DeletedInstructorResponse> {
    return this.httpClient.delete<DeletedInstructorResponse>(`${this.apiUrl}/`+id);
  }
  override update(updateInstructorRequest: UpdateInstructorRequest): Observable<UpdatedInstructorResponse> {
    return this.httpClient.put<UpdatedInstructorResponse>(this.apiUrl,updateInstructorRequest);
  }

  override getList(pageRequest: PageRequest): Observable<InstructorListItemDto> {
    const newRequest: {[key: string]: string | number} = {
      pageIndex: pageRequest.pageIndex,
      pageSize: pageRequest.pageSize
    };

    return this.httpClient.get<InstructorListItemDto>(this.apiUrl, {
      params: newRequest
    }).pipe(
      map((response)=>{
        const newResponse:InstructorListItemDto={
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

  override getInstructorById(instructorId:string): Observable<GetByIdInstructorResponse> {
    return this.httpClient.get<GetByIdInstructorResponse>(`${this.apiUrl}/`+instructorId);
  }

  override GetListAll(): Observable<InstructorListItemDto> {
    const newRequest: {[key: string]: string | number} = {
      page: 0,
      pageSize: 100
    };

    return this.httpClient.get<InstructorListItemDto>(this.apiUrl, {
      params: newRequest
    }).pipe(
      map((response)=>{
        const newResponse:InstructorListItemDto={
          index:0,
          size:100000,
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