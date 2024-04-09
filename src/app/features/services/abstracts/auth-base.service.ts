import { Injectable } from "@angular/core";
import { ApplicantForRegisterRequest } from "../../models/requests/auth/applicant-for-register-request";
import { Observable } from "rxjs";
import { UserForRegisterResponse } from "../../models/responses/auth/user-for-register-response";

@Injectable()
export abstract class AuthBaseService{
    abstract registerApplicant(applicantforRegisterRequest:ApplicantForRegisterRequest)
                     :Observable<UserForRegisterResponse>
}