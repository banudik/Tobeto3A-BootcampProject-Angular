import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetListBootcampImageResponse } from '../../models/responses/bootcamp-image/get-list-bootcamp-image-response';
import { GetByIdBootcampImageResponse } from '../../models/responses/bootcamp-image/get-by-id-bootcamp-image-response';

@Injectable()

export abstract class BootcampImageBaseService {

  abstract getList():
  Observable<GetListBootcampImageResponse[]>;
  abstract getById(): 
  Observable<GetByIdBootcampImageResponse>;
}
