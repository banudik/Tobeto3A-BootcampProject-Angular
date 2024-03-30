import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetListInstructorResponse } from '../../models/responses/instructor/get-list-instructor-response';
import { GetByIdInstructorResponse } from '../../models/responses/instructor/get-by-id-instructor-response';

@Injectable()
export abstract class InstructorBaseService {

  abstract getList():
  Observable<GetListInstructorResponse[]>;
  abstract getById():
  Observable<GetByIdInstructorResponse>;
}
