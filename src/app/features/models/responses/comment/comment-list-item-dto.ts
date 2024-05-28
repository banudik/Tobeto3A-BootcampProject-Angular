import { PageResponse } from "../../../../core/models/page-response";
import { GetListCommentResponse } from "./get-list-comment-response";

export interface CommentListItemDto extends PageResponse{
    items:GetListCommentResponse[];
}