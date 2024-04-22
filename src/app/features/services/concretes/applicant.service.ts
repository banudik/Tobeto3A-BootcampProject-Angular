import { Injectable } from '@angular/core';
import { ApplicantBaseService } from '../abstracts/applicant-base.service';
import { HttpClient } from '@angular/common/http';
import { GetListApplicantResponse } from '../../models/responses/applicant/get-list-applicant-response';
import { Observable, map } from 'rxjs';
import { GetByIdApplicantResponse } from '../../models/responses/applicant/get-by-id-applicant-response';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService extends ApplicantBaseService {
  apiGetListUrl=""
  apiGetByIdUrl=""

  private readonly apiUrl:string = `${environment.API_URL}/applicants`
  
  constructor(private httpClient:HttpClient) {super() }

  override getList(): Observable<GetListApplicantResponse[]> {
    return this.httpClient.get<GetListApplicantResponse[]>(this.apiGetListUrl);
  }
  
  override getApplicantById(applicantId:string): Observable<GetByIdApplicantResponse> {
    const newRequest: {[key: string]: string | string} = {
      id: applicantId
    };
  
    return this.httpClient.get<GetByIdApplicantResponse>(`${this.apiUrl}/${applicantId}`, {
      params: newRequest
    }).pipe(
      map((response) => {
        const newResponse: GetByIdApplicantResponse = {
          id: response.id,
          firstName: response.firstName,
          lastName: response.lastName,
          dateOfBirth: response.dateOfBirth,
          nationalIdentity: response.nationalIdentity,
          about: response.about,
          email: response.email,
          userName: response.userName
        };
        return newResponse;
      })
    );
  }
}