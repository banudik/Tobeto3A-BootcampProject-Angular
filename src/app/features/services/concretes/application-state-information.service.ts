import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {ApplicationStateInformationBaseService } from '../abstracts/application-state-information-base.service';
import { GetByIdApplicationStateInformationResponse } from '../../models/responses/application-state-information/get-by-id-application-state-information-response';
import { PageRequest } from '../../../core/models/page-request';
import { UpdatedBootcampStateResponse } from '../../models/responses/bootcamp-state/updated-bootcamp-state-response';
import { environment } from '../../../../environments/environment.development';
import { ApplicationStateInformationListItemDto } from '../../models/responses/application-state-information/application-state-information-list-item-dto';
import { UpdatedApplicationStateInformationResponse } from '../../models/responses/application-state-information/updated-application-state-information-response';
import { DeletedApplicationStateInformationResponse } from '../../models/responses/application-state-information/deleted-application-state-information-response';
import { CreateApplicationStateInformationRequest } from '../../models/requests/application-state-information/create-application-state-information-request';
import { UpdateApplicationStateInformationRequest } from '../../models/requests/application-state-information/update-application-state-information-request';
import { CreatedApplicationStateInformationResponse } from '../../models/responses/application-state-information/created-application-state-information-response';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStateInformationService extends ApplicationStateInformationBaseService {

  private readonly apiUrl:string = `${environment.API_URL}/applicationstateinformations`
  
  constructor(private httpClient:HttpClient) {super() }

  override getList(pageRequest:PageRequest): Observable<ApplicationStateInformationListItemDto> {
    const newRequest: {[key: string]: string | number} = {
      pageIndex: pageRequest.pageIndex,
      pageSize: pageRequest.pageSize
    };

    return this.httpClient.get<ApplicationStateInformationListItemDto>(this.apiUrl, {
      params: newRequest
    }).pipe(
      map((response)=>{
        const newResponse:ApplicationStateInformationListItemDto={
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

  override getById(id:number):Observable<GetByIdApplicationStateInformationResponse> {
    return this.httpClient.get<GetByIdApplicationStateInformationResponse>(`${this.apiUrl}/`+id);
  }
 
  override add(request: CreateApplicationStateInformationRequest): Observable<CreatedApplicationStateInformationResponse> {
    return this.httpClient.post<CreatedApplicationStateInformationResponse>(this.apiUrl,request);
  }
  override update(request: UpdateApplicationStateInformationRequest): Observable<UpdatedApplicationStateInformationResponse> {
    return this.httpClient.put<UpdatedBootcampStateResponse>(this.apiUrl,request);
  }
  override delete(id: number): Observable<DeletedApplicationStateInformationResponse> {
    return this.httpClient.delete<DeletedApplicationStateInformationResponse>(`${this.apiUrl}/`+id)
  }

}