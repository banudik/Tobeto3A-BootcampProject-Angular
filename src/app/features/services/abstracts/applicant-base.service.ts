import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetByIdApplicantResponse } from '../../models/responses/applicant/get-by-id-applicant-response';
import { ApplicantListItemDto } from '../../models/responses/applicant/applicant-list-item-dto';
import { DeletedApplicantResponse } from '../../models/responses/applicant/deleted-applicant-response';
import { PageRequest } from '../../../core/models/page-request';
import { UpdateApplicantRequest } from '../../models/requests/applicant/update-applicant-request';
import { UpdatedApplicantResponse } from '../../models/responses/applicant/updated-applicant-response';

@Injectable()
  
export abstract class ApplicantBaseService {

  abstract getList(pageRequest:PageRequest):
  Observable<ApplicantListItemDto>;

  abstract getApplicantById(applicantId:string): 
  Observable<GetByIdApplicantResponse>;

abstract delete(id:string)
  :Observable<DeletedApplicantResponse>;

  abstract update(updateApplicantRequest: UpdateApplicantRequest)
  : Observable<UpdatedApplicantResponse>;
}
