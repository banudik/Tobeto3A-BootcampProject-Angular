import { PageResponse } from "../../../../core/models/page-response";
import { GetListApplicationStateInformationResponse } from "./get-list-application-state-information-response";

export interface ApplicationStateInformationListItemDto extends PageResponse{
    [x: string]: any;
    items:GetListApplicationStateInformationResponse[];
}