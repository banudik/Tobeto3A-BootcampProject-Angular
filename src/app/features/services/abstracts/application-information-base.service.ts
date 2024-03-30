import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetListApplicationInformationResponse } from '../../models/responses/application-information/get-list-application-information-response';
import { GetByIdApplicationInformationResponse } from '../../models/responses/application-information/get-by-id-application-information-response';

@Injectable({
  providedIn: 'root'
})
export abstract class ApplicationInformationBaseService {

  abstract getList():
  Observable<GetListApplicationInformationResponse[]>;

  abstract getById(): 
  Observable<GetByIdApplicationInformationResponse>;
}
