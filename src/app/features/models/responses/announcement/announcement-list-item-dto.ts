import { PageResponse } from "../../../../core/models/page-response";
import { GetListAnnouncementResponse } from "./get-list-announcement-response";

export interface AnnouncementListItemDto extends PageResponse{
    items:GetListAnnouncementResponse[];
}