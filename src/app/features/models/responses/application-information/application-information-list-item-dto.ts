import { PageResponse } from "../../../../core/models/page-response";
import { GetListApplicationInformationResponse } from "./get-list-application-information-response";


export interface ApplicationInformatinListItemDto extends PageResponse{
    items:GetListApplicationInformationResponse[];
}