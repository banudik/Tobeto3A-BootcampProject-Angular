import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetByIdApplicationStateInformationResponse } from '../../models/responses/application-state-information/get-by-id-application-state-information-response';
import { PageRequest } from '../../../core/models/page-request';
import { ApplicationStateInformationListItemDto } from '../../models/responses/application-state-information/application-state-information-list-item-dto';
import { CreateApplicationStateInformationRequest } from '../../models/requests/application-state-information/create-application-state-information-request';
import { UpdateApplicationStateInformationRequest } from '../../models/requests/application-state-information/update-application-state-information-request';
import { CreatedApplicationStateInformationResponse } from '../../models/responses/application-state-information/created-application-state-information-response';
import { UpdatedApplicationStateInformationResponse } from '../../models/responses/application-state-information/updated-application-state-information-response';
import { DeletedApplicationStateInformationResponse } from '../../models/responses/application-state-information/deleted-application-state-information-response';

@Injectable()

export abstract class ApplicationStateInformationBaseService {

  abstract getList(pageRequest:PageRequest):
  Observable<ApplicationStateInformationListItemDto>;
  abstract getById(id:number):
  Observable<GetByIdApplicationStateInformationResponse>;

  abstract add(request:CreateApplicationStateInformationRequest)
  :Observable<CreatedApplicationStateInformationResponse>;

  abstract update(request:UpdateApplicationStateInformationRequest)
  :Observable<UpdatedApplicationStateInformationResponse>;

abstract delete(id:number)
  :Observable<DeletedApplicationStateInformationResponse>;
}
