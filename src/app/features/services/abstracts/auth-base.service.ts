import { Injectable } from "@angular/core";
import { ApplicantForRegisterRequest } from "../../models/requests/auth/applicant-for-register-request";
import { Observable } from "rxjs";
import { UserForRegisterResponse } from "../../models/responses/auth/user-for-register-response";
import { AccessTokenModel } from "../../models/responses/auth/access-token-model";
import { TokenModel } from "../../models/responses/auth/token-model";
import { CreateEmployeeRequest } from "../../models/requests/employee/create-employee-request";
import { CreatedEmployeeResponse } from "../../models/responses/employee/created-employee-response";
import { CreateInstructorRequest } from "../../models/requests/instructor/create-instructor-request";
import { CreatedInstructorResponse } from "../../models/responses/instructor/created-instructor-response";

@Injectable()
export abstract class AuthBaseService {
    abstract registerApplicant(applicantforRegisterRequest: ApplicantForRegisterRequest)
        : Observable<TokenModel>

    abstract registerEmployee(createEmployeeRequest: CreateEmployeeRequest)
        : Observable<CreatedEmployeeResponse>;

    abstract registerInstructor(createInstructorRequest: CreateInstructorRequest)
        : Observable<CreatedInstructorResponse>;
}