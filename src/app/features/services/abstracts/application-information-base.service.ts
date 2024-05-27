import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetListApplicationInformationResponse } from '../../models/responses/application-information/get-list-application-information-response';
import { GetByIdApplicationInformationResponse } from '../../models/responses/application-information/get-by-id-application-information-response';
import { CreatedApplicationInformationResponse } from '../../models/responses/application-information/created-application-information-response';
import { CreateApplicationInformationRequest } from '../../models/requests/application-information/create-application-information-request';
import { PageRequest } from '../../../core/models/page-request';
import { UpdateApplicationInformationRequest } from '../../models/requests/application-information/update-application-information-request';
import { UpdatedApplicationInformationResponse } from '../../models/responses/application-information/updated-application-information-response';
import { DeletedApplicationInformationResponse } from '../../models/responses/application-information/deleted-application-information-response';
import { ApplicationInformatinListItemDto } from '../../models/responses/application-information/application-information-list-item-dto';

@Injectable({
  providedIn: 'root'
})
export abstract class ApplicationInformationBaseService {

  abstract getList(pageRequest:PageRequest):
  Observable<ApplicationInformatinListItemDto>;

  abstract getById(applicationId:number): 
  Observable<GetByIdApplicationInformationResponse>;

  abstract addApplication(createApplicationInformationRequest:CreateApplicationInformationRequest):
  Observable<CreatedApplicationInformationResponse>;

  abstract update(request:UpdateApplicationInformationRequest)
  :Observable<UpdatedApplicationInformationResponse>;
abstract delete(id:number)
  :Observable<DeletedApplicationInformationResponse>;
}
