import { Injectable } from '@angular/core';
import { ApplicantBaseService } from '../abstracts/applicant-base.service';
import { HttpClient } from '@angular/common/http';
import { GetListApplicantResponse } from '../../models/responses/applicant/get-list-applicant-response';
import { Observable, map } from 'rxjs';
import { GetByIdApplicantResponse } from '../../models/responses/applicant/get-by-id-applicant-response';
import { environment } from '../../../../environments/environment';
import { DeletedApplicantResponse } from '../../models/responses/applicant/deleted-applicant-response';
import { ApplicantListItemDto } from '../../models/responses/applicant/applicant-list-item-dto';
import { PageRequest } from '../../../core/models/page-request';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService extends ApplicantBaseService {

  override delete(id: string): Observable<DeletedApplicantResponse> {
    return this.httpClient.delete<DeletedApplicantResponse>(`${this.apiUrl}/`+id);
  }


  private readonly apiUrl:string = `${environment.API_URL}/applicants`
  
  constructor(private httpClient:HttpClient) {super() }

  override getList(pageRequest:PageRequest): Observable<ApplicantListItemDto> {
    const newRequest: {[key: string]: string | number} = {
      pageIndex: pageRequest.pageIndex,
      pageSize: pageRequest.pageSize
    };

    return this.httpClient.get<ApplicantListItemDto>(this.apiUrl, {
      params: newRequest
    }).pipe(
      map((response)=>{
        const newResponse:ApplicantListItemDto={
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
  
  override getApplicantById(applicantId:string): Observable<GetByIdApplicantResponse> {
    return this.httpClient.get<GetByIdApplicantResponse>(`${this.apiUrl}/`+applicantId);
  }
}