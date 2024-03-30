import { Injectable } from '@angular/core';
import { ApplicantBaseService } from '../abstracts/applicant-base.service';
import { HttpClient } from '@angular/common/http';
import { GetListApplicantResponse } from '../../models/responses/applicant/get-list-applicant-response';
import { Observable } from 'rxjs';
import { GetByIdApplicantResponse } from '../../models/responses/applicant/get-by-id-applicant-response';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService extends ApplicantBaseService {
  apiGetListUrl=""
  apiGetByIdUrl=""
  constructor(private httpClient:HttpClient) {super() }

  override getList(): Observable<GetListApplicantResponse[]> {
    return this.httpClient.get<GetListApplicantResponse[]>(this.apiGetListUrl);
  }
  override getById(): Observable<GetByIdApplicantResponse> {
    return this.httpClient.get<GetByIdApplicantResponse>(this.apiGetByIdUrl);
    
  }
}