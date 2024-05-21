import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetByIdApplicantResponse } from '../../models/responses/applicant/get-by-id-applicant-response';
import { ApplicantListItemDto } from '../../models/responses/applicant/applicant-list-item-dto';
import { DeletedApplicantResponse } from '../../models/responses/applicant/deleted-applicant-response';
import { PageRequest } from '../../../core/models/page-request';

@Injectable()
  
export abstract class ApplicantBaseService {

  abstract getList(pageRequest:PageRequest):
  Observable<ApplicantListItemDto>;

  abstract getApplicantById(applicantId:string): 
  Observable<GetByIdApplicantResponse>;

abstract delete(id:string)
  :Observable<DeletedApplicantResponse>;


}
