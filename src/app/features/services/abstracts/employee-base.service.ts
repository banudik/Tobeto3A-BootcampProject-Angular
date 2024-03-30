import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetListEmployeeResponse } from '../../models/responses/employee/get-list-employee-response';
import { GetByIdEmployeeResponse } from '../../models/responses/employee/get-by-id-employee-response';

@Injectable()
export abstract class EmployeeBaseService {

  abstract getList():
  Observable<GetListEmployeeResponse[]>;
  abstract getById():
  Observable<GetByIdEmployeeResponse>;
}
