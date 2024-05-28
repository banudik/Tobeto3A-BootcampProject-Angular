import { PageResponse } from "../../../../core/models/page-response";
import { GetListBootcampLogsResponse } from "./get-list-bootcamp-logs";

export interface BootcampLogsListItemDto extends PageResponse{
    items:GetListBootcampLogsResponse[];
}