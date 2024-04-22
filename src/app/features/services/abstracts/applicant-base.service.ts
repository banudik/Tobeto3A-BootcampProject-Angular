import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetListApplicantResponse } from '../../models/responses/applicant/get-list-applicant-response';
import { GetByIdApplicantResponse } from '../../models/responses/applicant/get-by-id-applicant-response';

@Injectable()
  
export abstract class ApplicantBaseService {

  abstract getList(): 
  Observable<GetListApplicantResponse[]>;

  abstract getApplicantById(applicantId:string): 
  Observable<GetByIdApplicantResponse>;
}
