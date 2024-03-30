import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetListBootcampResponse } from '../../models/responses/bootcamp/get-list-bootcamp-response';
import { GetByIdBootcampResponse } from '../../models/responses/bootcamp/get-by-id-bootcamp-response';

@Injectable()
export abstract class BootcampBaseService {

  abstract getList():
  Observable<GetListBootcampResponse[]>;
  abstract getById():
  Observable<GetByIdBootcampResponse>;
}
