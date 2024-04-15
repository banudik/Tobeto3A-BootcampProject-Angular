import { Injectable } from '@angular/core';
import { ApplicationInformationBaseService } from '../abstracts/application-information-base.service'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetListApplicationInformationResponse } from '../../models/responses/application-information/get-list-application-information-response';
import { GetByIdApplicationInformationResponse } from '../../models/responses/application-information/get-by-id-application-information-response';
import { CreatedApplicationInformationResponse } from '../../models/responses/application-information/created-application-information-response';
import { environment } from '../../../../environments/environment';
import { CreateApplicationInformationRequest } from '../../models/requests/application-information/create-application-information-request';

@Injectable({
  providedIn: 'root'
})
export class ApplicationInformationService extends ApplicationInformationBaseService {
  
  apiGetListUrl=""
  apiGetByIdUrl=""
  private readonly apiUrl:string = `${environment.API_URL}/ApplicationInformations`
  constructor(private httpClient:HttpClient) {super() }

  override getList(): Observable<GetListApplicationInformationResponse[]> {
    return this.httpClient.get<GetListApplicationInformationResponse[]>(this.apiGetListUrl);
  }

  override getById(): Observable<GetByIdApplicationInformationResponse> {
  return this.httpClient.get<GetByIdApplicationInformationResponse>(this.apiGetByIdUrl);
  }

  override addApplication(createApplicationInformationRequest:CreateApplicationInformationRequest): Observable<CreatedApplicationInformationResponse> {
    return this.httpClient.post<CreatedApplicationInformationResponse>(`${this.apiUrl}`,createApplicationInformationRequest);
  }
}