import { PageResponse } from "../../../../core/models/page-response";
import { GetListChapterResponse } from "./get-list-chapter-response";

export interface ChapterListItemDto extends PageResponse{
    items:GetListChapterResponse[];
}