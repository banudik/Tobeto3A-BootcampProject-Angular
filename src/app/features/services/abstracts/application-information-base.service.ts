import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetListApplicationInformationResponse } from '../../models/responses/application-information/get-list-application-information-response';
import { GetByIdApplicationInformationResponse } from '../../models/responses/application-information/get-by-id-application-information-response';
import { CreatedApplicationInformationResponse } from '../../models/responses/application-information/created-application-information-response';
import { CreateApplicationInformationRequest } from '../../models/requests/application-information/create-application-information-request';

@Injectable({
  providedIn: 'root'
})
export abstract class ApplicationInformationBaseService {

  abstract getList():
  Observable<GetListApplicationInformationResponse[]>;

  abstract getById(): 
  Observable<GetByIdApplicationInformationResponse>;

  abstract addApplication(createApplicationInformationRequest:CreateApplicationInformationRequest):
  Observable<CreatedApplicationInformationResponse>;
}
