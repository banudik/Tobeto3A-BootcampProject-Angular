import { PageResponse } from "../../../../core/models/page-response";
import { GetListBootcampStateResponse } from "./get-list-bootcamp-state-response";

export interface BootcampStateListItemDto extends PageResponse{
    items:GetListBootcampStateResponse[];
}