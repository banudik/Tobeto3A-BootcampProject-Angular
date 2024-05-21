import { PageResponse } from "../../../../core/models/page-response";
import { GetListApplicantResponse } from "./get-list-applicant-response";


export interface ApplicantListItemDto extends PageResponse{
    items:GetListApplicantResponse[];
}