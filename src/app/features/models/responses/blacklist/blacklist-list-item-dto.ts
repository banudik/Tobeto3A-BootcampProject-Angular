import { PageResponse } from "../../../../core/models/page-response";
import { GetListBlacklistResponse } from "./get-list-blacklist-response";

export interface BlacklistListItemDto extends PageResponse{
    items:GetListBlacklistResponse[];
}